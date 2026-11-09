// Injects the server-rendered app into dist/index.html after `vite build`.
// Run via `npm run build`; expects the SSR bundle in dist-ssr/.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'dist/index.html');
const ssrDir = resolve(root, 'dist-ssr');

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

const placeholder = '<div id="root"></div>';
const html = readFileSync(htmlPath, 'utf8');
if (!html.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
}

const appHtml = render();
if (!appHtml.includes('<h1')) {
  throw new Error('prerender: rendered app has no <h1>; refusing to ship an empty page');
}

writeFileSync(htmlPath, html.replace(placeholder, `<div id="root">${appHtml}</div>`));
rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerender: injected ${appHtml.length} chars of HTML into dist/index.html`);
