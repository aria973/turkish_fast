import { useEffect, useState } from 'react';

// ============================================================
// Accessibility & display preferences (persisted, applied to <html>)
// ============================================================

export type TextScale = 'default' | 'large' | 'xlarge';

export interface Settings {
  textScale: TextScale;
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexicFont: boolean;
  showTranscripts: boolean;
  soundEnabled: boolean;
}

const STORAGE_KEY = 'turkspeed-settings-v1';

const DEFAULTS: Settings = {
  textScale: 'default',
  highContrast: false,
  reduceMotion: false,
  dyslexicFont: false,
  showTranscripts: true,
  soundEnabled: true,
};

const load = (): Settings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
};

export const TEXT_SCALE_LABEL: Record<TextScale, string> = {
  default: 'Default',
  large: 'Large',
  xlarge: 'Extra Large',
};

export interface SettingsApi extends Settings {
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  toggle: (key: 'highContrast' | 'reduceMotion' | 'dyslexicFont' | 'showTranscripts' | 'soundEnabled') => void;
  reset: () => void;
}

export const useSettings = (): SettingsApi => {
  const [settings, setSettings] = useState<Settings>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }

    const root = document.documentElement;
    root.dataset.textScale = settings.textScale;
    root.classList.toggle('hc', settings.highContrast);
    root.classList.toggle('reduce-motion', settings.reduceMotion);
    root.classList.toggle('dyslexic', settings.dyslexicFont);
  }, [settings]);

  // Respect the OS-level reduced-motion preference on first load
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setSettings(s => (s.reduceMotion ? s : { ...s, reduceMotion: true }));
    }
  }, []);

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings(s => ({ ...s, [key]: value }));

  const toggle = (key: 'highContrast' | 'reduceMotion' | 'dyslexicFont' | 'showTranscripts' | 'soundEnabled') =>
    setSettings(s => ({ ...s, [key]: !s[key] }));

  const reset = () => setSettings(DEFAULTS);

  return { ...settings, set, toggle, reset };
};
