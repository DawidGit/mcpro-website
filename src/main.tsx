import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Lazy images stay at opacity 0 until marked data-loaded (App.css fade-in).
// Mark them once they finish loading.
document.addEventListener('load', (e) => {
  const el = e.target;
  if (el instanceof HTMLImageElement && el.loading === 'lazy') {
    el.setAttribute('data-loaded', '');
  }
}, true);

// The HTML is prerendered, so the browser can finish loading an image (often from cache)
// before this module runs and its load event never reaches the listener above. Mark those
// too, otherwise they stay invisible.
document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
  if (img.complete && img.naturalWidth > 0) img.setAttribute('data-loaded', '');
});

const rootEl = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs): hydrate it.
// The dev server serves an empty root, so render from scratch there.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
