import { useEffect } from 'react';
import { faqConfig, siteConfig } from '../config';
import { BUSINESS_ID, CANONICAL, WEBSITE_ID, businessNode } from '../lib/schema';

function buildGraph() {
  const businessId = BUSINESS_ID;
  const websiteId = WEBSITE_ID;
  const faqId = `${CANONICAL}/#faq`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${CANONICAL}/`,
        name: siteConfig.siteName,
        description: siteConfig.businessDescription,
        inLanguage: siteConfig.language || 'en',
        publisher: { '@id': businessId },
      },
      businessNode(),
      {
        '@type': 'FAQPage',
        '@id': faqId,
        url: `${CANONICAL}/#faq`,
        mainEntity: faqConfig.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

/** Injects semantic JSON-LD @graph for SEO, local GEO, and AI search (GEO).
 * Same nodes as the static block in index.html; no BreadcrumbList on the home page
 * (a breadcrumb of #anchors on one page is not a real trail). */
export function SeoJsonLd() {
  useEffect(() => {
    const scriptId = 'mcpro-jsonld';
    // Remove static fallback JSON-LD so crawlers see a single @graph.
    document
      .querySelectorAll('script[type="application/ld+json"]:not(#' + scriptId + ')')
      .forEach((node) => node.remove());

    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = scriptId;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(buildGraph());

    const setMeta = (selector: string, attr: string, value: string) => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute(attr, value);
    };

    document.title = siteConfig.siteTitle;
    setMeta('meta[name="description"]', 'content', siteConfig.siteDescription);
    setMeta('meta[name="keywords"]', 'content', siteConfig.keywords);
    setMeta('meta[name="author"]', 'content', siteConfig.siteName);
    setMeta('link[rel="canonical"]', 'href', `${CANONICAL}/`);
    setMeta('meta[property="og:url"]', 'content', `${CANONICAL}/`);
    setMeta('meta[property="og:title"]', 'content', siteConfig.siteTitle);
    setMeta('meta[property="og:description"]', 'content', siteConfig.siteDescription);
    setMeta('meta[property="og:image"]', 'content', siteConfig.ogImage);
    setMeta('meta[property="og:site_name"]', 'content', siteConfig.siteName);
    setMeta('meta[name="twitter:url"]', 'content', `${CANONICAL}/`);
    setMeta('meta[name="twitter:title"]', 'content', siteConfig.siteTitle);
    setMeta('meta[name="twitter:description"]', 'content', siteConfig.siteDescription);
    setMeta('meta[name="twitter:image"]', 'content', siteConfig.ogImage);
    setMeta('meta[name="geo.region"]', 'content', `US-${siteConfig.addressRegion}`);
    setMeta('meta[name="geo.placename"]', 'content', siteConfig.addressLocality);
    setMeta('meta[name="geo.position"]', 'content', `${siteConfig.latitude};${siteConfig.longitude}`);
    setMeta('meta[name="ICBM"]', 'content', `${siteConfig.latitude}, ${siteConfig.longitude}`);
  }, []);

  return null;
}
