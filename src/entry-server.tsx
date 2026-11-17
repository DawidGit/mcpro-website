import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { buildPageHead } from './lib/pageSchema';
import { servicePages } from './pages';
import { THANK_YOU_SLUG, thankYouHead } from './sections/ThankYouPage';

/**
 * Build-time render of the whole page. scripts/prerender.mjs injects the
 * result into dist/index.html so crawlers and AI bots that do not run
 * JavaScript still see the full content; the client then hydrates it.
 */
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}

/** Service / location pages and the noindex thank-you page to prerender, each with its own <head> values. */
export const routes = [
  ...servicePages.map((page) => ({
    path: `/${page.slug}`,
    file: `${page.slug}.html`,
    head: buildPageHead(page),
  })),
  { path: `/${THANK_YOU_SLUG}`, file: `${THANK_YOU_SLUG}.html`, head: thankYouHead() },
];
