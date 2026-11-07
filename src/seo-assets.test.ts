import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { faqConfig, siteConfig } from './config';

const root = resolve(__dirname, '..');

describe('static SEO assets', () => {
  it('ships robots.txt that allows indexing and points to sitemap', () => {
    const robots = readFileSync(resolve(root, 'public/robots.txt'), 'utf8');
    expect(robots).toMatch(/User-agent:\s*\*/i);
    expect(robots).toMatch(/Allow:\s*\//i);
    expect(robots).toMatch(/Sitemap:\s*https:\/\/mcprogc\.com\/sitemap\.xml/i);
  });

  it('ships sitemap.xml with the homepage URL', () => {
    const sitemap = readFileSync(resolve(root, 'public/sitemap.xml'), 'utf8');
    expect(sitemap).toContain('https://mcprogc.com/');
    expect(sitemap).toContain('<urlset');
    expect(sitemap).not.toMatch(/#/);
  });

  it('has MC Pro title and geo meta in index.html', () => {
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    expect(html).toContain('MC Pro, INC.');
    expect(html).toContain('Streamwood');
    expect(html).toContain('geo.region');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('https://mcprogc.com/');
  });
  it('keeps the static FAQ schema in index.html in sync with faqConfig', () => {
    const html = readFileSync(resolve(root, 'index.html'), 'utf8');
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(match).not.toBeNull();
    const graph = JSON.parse(match![1])['@graph'] as Array<Record<string, unknown>>;
    const faq = graph.find((node) => node['@type'] === 'FAQPage') as
      | { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }
      | undefined;
    expect(faq).toBeDefined();
    expect(faq!.mainEntity.map((q) => q.name)).toEqual(faqConfig.faqs.map((f) => f.question));
    expect(faq!.mainEntity.map((q) => q.acceptedAnswer.text)).toEqual(faqConfig.faqs.map((f) => f.answer));
  });

  it('ships llms.txt with company facts', () => {
    const llms = readFileSync(resolve(root, 'public/llms.txt'), 'utf8');
    expect(llms).toContain('MC Pro, INC.');
    expect(llms).toContain('724 Bonded Parkway');
    expect(llms).toContain('(312) 405-0066');
  });

  it('keeps the meta description short enough for search results', () => {
    expect(siteConfig.siteDescription.length).toBeLessThanOrEqual(160);
  });
});
