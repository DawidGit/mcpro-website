import {
  contactConfig,
  servicesConfig,
  siteConfig,
} from '../config';

/** Shared schema.org helpers for the home page graph (SeoJsonLd) and prerendered service pages. */
export const CANONICAL = siteConfig.canonicalUrl.replace(/\/$/, '');
export const BUSINESS_ID = `${CANONICAL}/#business`;
export const WEBSITE_ID = `${CANONICAL}/#website`;

export function phoneToE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits[0]}-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

/** The GeneralContractor / LocalBusiness node, referenced by @id from every page. */
export function businessNode() {
  const businessId = BUSINESS_ID;
  return {
    '@type': ['GeneralContractor', 'HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': businessId,
    name: siteConfig.siteName,
    legalName: siteConfig.legalName,
    alternateName: ['MCProGC', 'Mc Pro', 'MC Pro INC'],
    description: siteConfig.businessDescription,
    url: `${CANONICAL}/`,
    image: siteConfig.ogImage,
    logo: siteConfig.logoUrl,
    telephone: phoneToE164(contactConfig.phone),
    email: contactConfig.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.addressLocality,
      addressRegion: siteConfig.addressRegion,
      postalCode: siteConfig.postalCode,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    hasMap: siteConfig.googleMapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Streamwood' },
      { '@type': 'City', name: 'Chicago' },
      { '@type': 'AdministrativeArea', name: 'Cook County' },
      { '@type': 'AdministrativeArea', name: 'DuPage County' },
      { '@type': 'State', name: 'Illinois' },
      { '@type': 'State', name: 'Wisconsin' },
    ],
    serviceType: servicesConfig.services.map((s) => s.title),
    knowsAbout: [
      'Restaurant remodeling',
      'Retail and pharmacy remodeling',
      'Hospitality renovation',
      'Night and after-hours construction',
      'Demolition',
      'Rough and finish carpentry',
      'Acoustical ceilings (ACT)',
      'Commercial tile installation',
      'Solid surface and granite countertops',
      'Concrete cutting and coring',
      'Residential remodeling',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'MC Pro Construction Services',
      itemListElement: servicesConfig.services.map((service, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: { '@id': businessId },
          areaServed: { '@type': 'State', name: 'Illinois' },
        },
      })),
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: phoneToE164(contactConfig.phone),
        email: contactConfig.email,
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
    sameAs: siteConfig.sameAs.length > 0 ? siteConfig.sameAs : undefined,
  };
}
