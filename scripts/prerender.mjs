// Prerenders every route after `vite build`, using dist/index.html as the template.
// - "/"           → dist/index.html (home head stays as written in index.html)
// - "/<slug>"     → dist/<slug>.html with its own title, description, canonical,
//                   Open Graph / Twitter tags and JSON-LD (nginx serves it at /<slug>).
// Run via `npm run build`; expects the SSR bundle in dist-ssr/.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { render, routes } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

const placeholder = '<div id="root"></div>';
const template = readFileSync(resolve(distDir, 'index.html'), 'utf8');
if (!template.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
}

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Replace exactly one match or fail the build, so a template change can't silently ship stale head tags. */
function replaceOnce(html, pattern, replacement, label) {
  const matches = html.match(new RegExp(pattern.source, pattern.flags.replace('g', '') + 'g'));
  if (!matches || matches.length !== 1) {
    throw new Error(`prerender: expected exactly one ${label} in template, found ${matches ? matches.length : 0}`);
  }
  return html.replace(pattern, replacement);
}

function metaContent(html, attr, name, value, label) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`);
  return replaceOnce(html, pattern, `$1${escapeAttr(value)}$2`, label);
}

function withHead(html, head) {
  let out = html;
  out = replaceOnce(out, /<title>[^<]*<\/title>/, `<title>${escapeAttr(head.title)}</title>`, '<title>');
  out = metaContent(out, 'name', 'description', head.description, 'meta description');
  out = replaceOnce(out, /(<link rel="canonical" href=")[^"]*(")/, `$1${head.canonical}$2`, 'canonical');
  out = metaContent(out, 'property', 'og:url', head.canonical, 'og:url');
  out = metaContent(out, 'property', 'og:title', head.title, 'og:title');
  out = metaContent(out, 'property', 'og:description', head.description, 'og:description');
  out = metaContent(out, 'name', 'twitter:url', head.canonical, 'twitter:url');
  out = metaContent(out, 'name', 'twitter:title', head.title, 'twitter:title');
  out = metaContent(out, 'name', 'twitter:description', head.description, 'twitter:description');
  const jsonLd = head.jsonLd.replace(/</g, '\\u003c');
  out = replaceOnce(
    out,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    () => `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
    'JSON-LD block',
  );
  return out;
}

function renderInto(html, path) {
  const appHtml = render(path);
  if (!appHtml.includes('<h1')) {
    throw new Error(`prerender: ${path} rendered without an <h1>; refusing to ship an empty page`);
  }
  return html.replace(placeholder, `<div id="root">${appHtml}</div>`);
}

writeFileSync(resolve(distDir, 'index.html'), renderInto(template, '/'));
console.log('prerender: /');

for (const route of routes) {
  writeFileSync(resolve(distDir, route.file), renderInto(withHead(template, route.head), route.path));
  console.log(`prerender: ${route.path} → ${route.file}`);
}

rmSync(ssrDir, { recursive: true, force: true });
