import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

/**
 * Build-time render of the whole page. scripts/prerender.mjs injects the
 * result into dist/index.html so crawlers and AI bots that do not run
 * JavaScript still see the full content; the client then hydrates it.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
