/* TurkSpeed offline service worker — cache-first PWA shell */
const CACHE_NAME = 'turkspeed-cache-v2';
const PRECACHE_URLS = ['./', './index.html', './manifest.webmanifest', './icons/icon.png'];

// Install: precache the app shell (individual catches so one 404 never blocks install)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn('[TurkSpeed SW] Precache skipped:', url, err);
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: cache-first for same-origin GET, network fallback, offline navigation fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response && response.status === 200 && (response.type === 'basic' || response.type === 'default')) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          // Offline navigation → serve the cached app shell
          if (request.mode === 'navigate') {
            return caches.match('./index.html').then((shell) => shell || new Response('Offline', { status: 503 }));
          }
          return new Response('', { status: 503, statusText: 'Offline' });
        });
    })
  );
});
