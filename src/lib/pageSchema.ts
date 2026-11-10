import { siteConfig } from '../config';
import type { ServicePage } from '../pages';
import { BUSINESS_ID, CANONICAL, WEBSITE_ID, businessNode } from './schema';

export function pageUrl(page: ServicePage): string {
  return `${CANONICAL}/${page.slug}`;
}

/** schema.org graph for a service / location page: WebPage, business, Service, breadcrumbs, FAQ. */
export function buildPageGraph(page: ServicePage) {
  const url = pageUrl(page);
  const breadcrumbId = `${url}#breadcrumb`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.metaTitle,
      description: page.metaDescription,
      inLanguage: siteConfig.language || 'en',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': BUSINESS_ID },
      breadcrumb: { '@id': breadcrumbId },
    },
    businessNode(),
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL}/` },
        { '@type': 'ListItem', position: 2, name: page.navLabel, item: url },
      ],
    },
  ];

  if (page.serviceType) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.navLabel,
      serviceType: page.serviceType,
      description: page.metaDescription,
      url,
      provider: { '@id': BUSINESS_ID },
      areaServed: [
        { '@type': 'City', name: 'Chicago' },
        { '@type': 'State', name: 'Illinois' },
        { '@type': 'State', name: 'Wisconsin' },
      ],
    });
  }

  if (page.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

export interface PageHead {
  title: string;
  description: string;
  canonical: string;
  jsonLd: string;
}

/** Everything scripts/prerender.mjs swaps into the index.html template for a page. */
export function buildPageHead(page: ServicePage): PageHead {
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    canonical: pageUrl(page),
    jsonLd: JSON.stringify(buildPageGraph(page), null, 2),
  };
}
