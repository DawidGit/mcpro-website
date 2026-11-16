import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { trackContactLinkClicks } from './lib/leadTracking'

trackContactLinkClicks();

// Lazy-image fade-in (data-loaded) is handled by an inline script in index.html <head>.

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
