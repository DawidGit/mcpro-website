import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Mark lazy images as loaded once they finish loading
document.addEventListener('load', (e) => {
  const el = e.target;
  if (el instanceof HTMLImageElement && el.loading === 'lazy') {
    el.setAttribute('data-loaded', '');
  }
}, true);

const rootEl = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs): hydrate it.
// The dev server serves an empty root, so render from scratch there.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
