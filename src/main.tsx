import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register the offline PWA service worker (relative path → works on any host/subpath)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => {
        console.log("[TurkSpeed] Service worker registered — offline mode ready.", reg.scope);
      })
      .catch((err) => {
        console.warn("[TurkSpeed] Service worker registration skipped:", err);
      });
  });
}
