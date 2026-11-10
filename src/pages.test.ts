import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildPageGraph } from './lib/pageSchema';
import { findPage, servicePages } from './pages';

const root = resolve(__dirname, '..');

describe('service pages', () => {
  it('have unique, URL-safe slugs', () => {
    const slugs = servicePages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('keep titles <= 60 and descriptions <= 155 characters, all unique', () => {
    for (const page of servicePages) {
      expect(page.metaTitle.length, page.slug).toBeLessThanOrEqual(60);
      expect(page.metaDescription.length, page.slug).toBeLessThanOrEqual(155);
    }
    expect(new Set(servicePages.map((p) => p.metaTitle)).size).toBe(servicePages.length);
  });

  it('only link to pages that exist, never to themselves', () => {
    for (const page of servicePages) {
      for (const slug of page.related) {
        expect(findPage(`/${slug}`), `${page.slug} → ${slug}`).toBeDefined();
        expect(slug).not.toBe(page.slug);
      }
    }
  });

  it('are all listed in sitemap.xml and llms.txt', () => {
    const sitemap = readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8');
    const llms = readFileSync(resolve(root, 'public/llms.txt'), 'utf8');
    for (const page of servicePages) {
      expect(sitemap).toContain(`<loc>https://mcprogc.com/${page.slug}</loc>`);
      expect(llms).toContain(`https://mcprogc.com/${page.slug}`);
    }
  });

  it('resolve with or without trailing slash and .html', () => {
    expect(findPage('/night-work')?.slug).toBe('night-work');
    expect(findPage('/night-work/')?.slug).toBe('night-work');
    expect(findPage('/night-work.html')?.slug).toBe('night-work');
    expect(findPage('/')).toBeUndefined();
    expect(findPage('/does-not-exist')).toBeUndefined();
  });

  it('build a JSON-LD graph with breadcrumbs and FAQ matching the page', () => {
    for (const page of servicePages) {
      const graph = buildPageGraph(page)['@graph'] as Array<Record<string, unknown>>;
      const types = graph.map((n) => n['@type']);
      expect(types).toContain('WebPage');
      expect(types).toContain('BreadcrumbList');
      const faq = graph.find((n) => n['@type'] === 'FAQPage') as { mainEntity: unknown[] } | undefined;
      expect(faq?.mainEntity.length ?? 0).toBe(page.faqs.length);
      if (page.serviceType) expect(types).toContain('Service');
    }
  });
});
