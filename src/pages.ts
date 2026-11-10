// Service & location landing pages. One entry = one prerendered URL (https://mcprogc.com/<slug>).
// This list drives the page component, the prerendered <head> (title, description, canonical,
// JSON-LD), internal links and the sitemap test. Keep facts in sync with config.ts and llms.txt.
// NDA: never name clients, brands or suppliers here.

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export interface PageSection {
  heading: string;
  body?: string[];
  bullets?: string[];
}

export interface PageFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  /** Short label for links (footer, related pages, breadcrumbs) */
  navLabel: string;
  /** <title> — keep at or under 60 characters */
  metaTitle: string;
  /** Meta description — keep at or under 155 characters */
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  image?: string;
  imageAlt?: string;
  /** schema.org Service.serviceType; omit for non-service pages (service area) */
  serviceType?: string;
  sections: PageSection[];
  faqs: PageFaq[];
  /** Slugs of related pages linked at the bottom */
  related: string[];
}

export const servicePages: ServicePage[] = [
  {
    slug: 'commercial-remodeling',
    navLabel: 'Commercial Remodeling',
    metaTitle: 'Commercial Remodeling Contractor, Chicago Area | MC Pro',
    metaDescription:
      'Commercial remodeling for restaurants, retail, banks, hotels and industrial sites in the Chicago area. Self-performed trades and night work.',
    eyebrow: 'Commercial Remodeling',
    h1: 'Commercial Remodeling Contractor for the Chicago Area',
    intro: [
      'MC Pro, INC. is a commercial remodeling general contractor based in Streamwood, Illinois. For 20 years we have remodeled and built out spaces for businesses that cannot afford to close: quick-service restaurants, retail stores and pharmacies, banks, hotels and industrial facilities.',
      'We take on the full scope of work or individual trade packages, and we self-perform the core trades with our own crews. That means fewer handoffs, consistent quality and a schedule we control.',
    ],
    image: assetPath('/service-commercial-buildout.jpg'),
    imageAlt: 'Commercial storefront interior during build-out with ceiling grid, framing and new counters',
    serviceType: 'Commercial remodeling',
    sections: [
      {
        heading: 'Spaces we remodel',
        bullets: [
          'Quick-service restaurants: over 200 remodels for a national brand, across 14 brand decor packages',
          'Retail stores and pharmacies',
          'Banks and service locations',
          'Hotels and hospitality spaces',
          'Industrial facilities',
        ],
      },
      {
        heading: 'Trades we self-perform',
        body: [
          'Our own crews handle the work that drives quality and schedule. Plumbing, HVAC and fire-sprinkler work is done by long-term partners we coordinate on site, and our MEP team is licensed in Illinois and Wisconsin.',
        ],
        bullets: [
          'Demolition',
          'Rough and finish carpentry',
          'Acoustical ceilings (ACT)',
          'Tile, floor grinding and prep',
          'Solid surface and granite fabrication and installation',
          'Concrete cutting, coring and pours',
          'Electrical',
          'Masonry restoration, polished concrete and epoxy floors',
          'Painting and wallcovering',
        ],
      },
      {
        heading: 'Remodeling while you stay open',
        body: [
          'Most of our clients keep serving customers during construction. We schedule demolition and noisy work overnight or after hours, phase the work in occupied spaces, coordinate inspections between shifts and send photo progress updates after every shift.',
        ],
      },
      {
        heading: 'How a project runs',
        bullets: [
          'Pre-construction: drawing verification, shop drawings, material ordering and schedule planning',
          'Mobilization with our own trucks, trailers, tools and dumpster',
          'Self-performed trades plus coordinated MEP partners',
          'Daily photo updates and inspections coordinated as we go',
          'Final punch list and handover',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you take full projects or individual trades?',
        answer:
          'Both. We manage the full scope of work as general contractor, or we deliver individual trade packages such as demolition, carpentry, ACT ceilings, tile or electrical.',
      },
      {
        question: 'Can our business stay open during the remodel?',
        answer:
          'Yes. We plan night and after-hours shifts and phase the work in occupied spaces so restaurants, stores and hotels keep operating.',
      },
      {
        question: 'Where do you work?',
        answer:
          'We are based in Streamwood, Illinois and work across the Chicago metropolitan area, Illinois and Wisconsin, with projects across the Midwest.',
      },
    ],
    related: ['restaurant-remodeling', 'retail-remodeling', 'hospitality-remodeling', 'night-work'],
  },
  {
    slug: 'restaurant-remodeling',
    navLabel: 'Restaurant Remodeling',
    metaTitle: 'Restaurant Remodeling Contractor in Illinois | MC Pro',
    metaDescription:
      'Quick-service restaurant remodels done overnight so you stay open. 200+ restaurant remodels across 14 brand decor packages. Streamwood, IL.',
    eyebrow: 'Restaurant Remodeling',
    h1: 'Restaurant Remodeling Contractor That Keeps You Open',
    intro: [
      'Restaurant remodeling is the core of our business. MC Pro, INC. has completed more than 200 remodels for a national quick-service restaurant brand, across 14 brand decor packages.',
      'We build around your operating hours. Front-of-house remodels have been completed in three overnight shifts while the restaurant stayed open every day.',
    ],
    image: assetPath('/service-commercial-restaurant.jpg'),
    imageAlt: 'Restaurant dining room remodel in progress with new booths, wood paneling and pendant lighting',
    serviceType: 'Restaurant remodeling',
    sections: [
      {
        heading: 'What we remodel',
        bullets: [
          'Dining rooms and front of house',
          'Brand decor package rollouts and re-imaging',
          'Counters, solid surface and granite tops',
          'Ceilings, lighting and electrical',
          'Floors: tile, grinding and prep, polished concrete and epoxy',
          'Restrooms, finishes, painting and wallcovering',
        ],
      },
      {
        heading: 'Built around your service hours',
        body: [
          'Demolition and noisy work happen overnight. Each morning the space is clean and ready for service, and you get photo updates after every shift. Inspections are coordinated between shifts so the schedule does not slip.',
        ],
      },
      {
        heading: 'Experience with brand standards',
        body: [
          'Working through 14 decor packages for one national brand taught us to follow brand standards exactly, verify drawings before work starts and order materials early so nothing holds up an overnight schedule.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does a restaurant remodel take?',
        answer:
          'It depends on scope. Front-of-house remodels have been completed in three overnight shifts while the restaurant stayed open every day.',
      },
      {
        question: 'Do you work with franchise owners and brand programs?',
        answer:
          'Yes. We have delivered more than 200 remodels for a national quick-service brand across 14 decor packages, and references are available on request.',
      },
      {
        question: 'Do you handle multiple locations?',
        answer:
          'Yes. We work across the Chicago area, Illinois and Wisconsin and take on restaurant projects across the Midwest.',
      },
    ],
    related: ['night-work', 'commercial-remodeling', 'epoxy-polished-concrete', 'service-area'],
  },
  {
    slug: 'retail-remodeling',
    navLabel: 'Retail & Pharmacy Remodeling',
    metaTitle: 'Retail & Pharmacy Remodeling Contractor | MC Pro',
    metaDescription:
      'Retail store, pharmacy and bank remodels in the Chicago area, phased so you keep serving customers. Self-performed trades. Call (312) 405-0066.',
    eyebrow: 'Retail & Pharmacy Remodeling',
    h1: 'Retail, Pharmacy and Bank Remodeling',
    intro: [
      'MC Pro, INC. remodels retail stores, pharmacies, banks and other service locations across the Chicago area. We phase the work so your doors stay open and your customers can still shop.',
      'Our own crews self-perform demolition, carpentry, ceilings, flooring, electrical and finishes, so one contractor is accountable for quality and schedule.',
    ],
    image: assetPath('/project-office-1.jpg'),
    imageAlt: 'Commercial interior with acoustical ceiling grid and linear lighting',
    serviceType: 'Retail remodeling',
    sections: [
      {
        heading: 'Typical retail scopes',
        bullets: [
          'Store refreshes and full interior remodels',
          'Pharmacy and service-counter build-outs',
          'Bank branch and service location updates',
          'Acoustical ceilings (ACT) and lighting',
          'Flooring, tile, polished concrete and epoxy',
          'Painting, wallcovering and finish carpentry',
        ],
      },
      {
        heading: 'Phased work in occupied spaces',
        body: [
          'We split the store into work zones, schedule loud and dusty work after hours, and leave each area clean before opening. Inspections are coordinated between shifts and you receive daily photo updates.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you work while the store is open?',
        answer:
          'Yes. We phase the work and move noisy tasks to night and after-hours shifts so the store keeps operating.',
      },
      {
        question: 'How are inspections handled?',
        answer:
          'We coordinate inspections between shifts as part of the schedule so work keeps moving.',
      },
    ],
    related: ['commercial-remodeling', 'night-work', 'epoxy-polished-concrete', 'service-area'],
  },
  {
    slug: 'hospitality-remodeling',
    navLabel: 'Hotel & Hospitality Renovation',
    metaTitle: 'Hotel & Hospitality Renovation Contractor, IL | MC Pro',
    metaDescription:
      'Hotel and hospitality renovations in Illinois and Wisconsin, phased around your guests with night and after-hours work. Streamwood, IL contractor.',
    eyebrow: 'Hotel & Hospitality',
    h1: 'Hotel and Hospitality Renovation Contractor',
    intro: [
      'MC Pro, INC. renovates hotels and hospitality spaces in Illinois and Wisconsin. We plan the work around your guests: phased areas, night and after-hours shifts and clean, safe spaces every morning.',
      'We self-perform the trades that matter most in guest-facing spaces, from demolition and carpentry to ceilings, tile, finishes and electrical.',
    ],
    image: assetPath('/project-restaurant-1.jpg'),
    imageAlt: 'Restaurant dining room with bar, lounge seating and custom lighting',
    serviceType: 'Hotel and hospitality renovation',
    sections: [
      {
        heading: 'Hospitality spaces we renovate',
        bullets: [
          'Lobbies and common areas',
          'Restaurants, bars and lounges',
          'Corridors and back-of-house areas',
          'Ceilings, lighting and electrical',
          'Tile, flooring and stone countertops',
          'Painting, wallcovering and finish carpentry',
        ],
      },
      {
        heading: 'Guests first',
        body: [
          'We phase the work so guests are not disturbed, keep work areas closed off and clean, and schedule noisy tasks for when they cause the least impact. You get photo updates after every shift.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can the hotel stay open during renovation?',
        answer:
          'Yes. We phase the work and use night and after-hours shifts so the property keeps operating.',
      },
      {
        question: 'Do you work outside Illinois?',
        answer:
          'Yes. Our MEP team is licensed in Illinois and Wisconsin and we take on projects across the Midwest.',
      },
    ],
    related: ['night-work', 'commercial-remodeling', 'restaurant-remodeling', 'service-area'],
  },
  {
    slug: 'night-work',
    navLabel: 'Night & After-Hours Work',
    metaTitle: 'Night & After-Hours Commercial Construction | MC Pro',
    metaDescription:
      'Overnight and after-hours remodeling so your business stays open. Phased work, inspections between shifts, daily photo updates. Chicago area.',
    eyebrow: 'Night & After-Hours Work',
    h1: 'Night and After-Hours Commercial Construction',
    intro: [
      'Closing for a remodel costs revenue and customers. MC Pro, INC. schedules demolition and noisy work overnight and after hours, so restaurants, stores, banks and hotels stay open while we build.',
      'Front-of-house restaurant remodels have been completed in three overnight shifts while the restaurant stayed open every day.',
    ],
    image: assetPath('/featured-office-complex.jpg'),
    imageAlt: 'Commercial building entrance lit up at dusk',
    serviceType: 'Night and after-hours construction',
    sections: [
      {
        heading: 'How night work runs',
        bullets: [
          'Overnight shifts for demolition and noisy work',
          'Phased work in occupied spaces',
          'Inspections coordinated between shifts',
          'Daily photo progress updates after every shift',
          'Space cleaned and ready before opening',
        ],
      },
      {
        heading: 'Why it works with our own crews',
        body: [
          'Night schedules leave no room for no-shows. Because we self-perform demolition, carpentry, ceilings, tile, electrical and finishes with our own crews, and bring our own trucks, trailers, tools and dumpster, we control who is on site and when.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which businesses use night and after-hours work?',
        answer:
          'Mostly businesses that cannot close: quick-service restaurants, retail stores and pharmacies, banks and service locations, and hotels.',
      },
      {
        question: 'How do I know what happened overnight?',
        answer:
          'You receive photo progress updates after every shift, and inspections are coordinated between shifts.',
      },
    ],
    related: ['restaurant-remodeling', 'retail-remodeling', 'hospitality-remodeling', 'commercial-remodeling'],
  },
  {
    slug: 'epoxy-polished-concrete',
    navLabel: 'Epoxy & Polished Concrete Floors',
    metaTitle: 'Epoxy & Polished Concrete Floors, Chicago Area | MC Pro',
    metaDescription:
      'Commercial epoxy floors, polished concrete, floor grinding and prep in the Chicago area, installed by our own crews. Streamwood, IL contractor.',
    eyebrow: 'Commercial Floors',
    h1: 'Epoxy and Polished Concrete Floors for Commercial Spaces',
    intro: [
      'MC Pro, INC. installs epoxy floors and polished concrete for restaurants, retail, industrial and other commercial spaces across the Chicago area. Floor grinding and prep are done by our own crews, so the surface is right before any coating goes down.',
      'Because we also self-perform concrete cutting, coring and pours, tile and masonry restoration, we can repair, level and finish floors as one scope.',
    ],
    serviceType: 'Epoxy and polished concrete flooring',
    sections: [
      {
        heading: 'Floor services',
        bullets: [
          'Epoxy floor coatings',
          'Polished concrete',
          'Floor grinding and surface prep',
          'Concrete cutting, coring and pours',
          'Commercial tile installation',
          'Masonry restoration',
        ],
      },
      {
        heading: 'Done after hours',
        body: [
          'Floor work can run on night and after-hours shifts, phased by area, so restaurants and stores keep operating while floors are prepared and finished.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you do floor prep yourselves?',
        answer:
          'Yes. Floor grinding and prep are self-performed by our own crews, together with concrete cutting, coring and pours.',
      },
      {
        question: 'Can floors be done without closing?',
        answer:
          'In many cases, yes. We phase floor work by area and schedule it overnight or after hours.',
      },
    ],
    related: ['commercial-remodeling', 'restaurant-remodeling', 'retail-remodeling', 'night-work'],
  },
  {
    slug: 'service-area',
    navLabel: 'Service Area',
    metaTitle: 'Service Area: Chicago Area, Illinois & Wisconsin | MC Pro',
    metaDescription:
      'MC Pro, INC. is based in Streamwood, IL and serves the Chicago metropolitan area, Illinois and Wisconsin, with projects across the Midwest.',
    eyebrow: 'Service Area',
    h1: 'Commercial Contractor Serving the Chicago Area, Illinois and Wisconsin',
    intro: [
      'MC Pro, INC. is based at 724 Bonded Parkway in Streamwood, Illinois, in the northwest suburbs of Chicago. From here we serve the Chicago metropolitan area, Illinois and Wisconsin, and take on projects across the Midwest.',
      'Our own trucks, vans, trailers and tools let us mobilize quickly, bring the dumpster and materials to site and start on schedule.',
    ],
    image: assetPath('/project-industrial-1.jpg'),
    imageAlt: 'Trucks at a commercial loading dock',
    sections: [
      {
        heading: 'Where we work',
        bullets: [
          'Streamwood and the northwest suburbs of Chicago',
          'Chicago and the Chicago metropolitan area, including Cook and DuPage counties',
          'Illinois',
          'Wisconsin (MEP team licensed in Illinois and Wisconsin)',
          'Projects across the Midwest',
        ],
      },
      {
        heading: 'Office and hours',
        body: [
          '724 Bonded Parkway, Streamwood, IL 60107. Monday to Friday 7:00 AM to 5:00 PM, Saturday by appointment. Call (312) 405-0066 or email office@mcprogc.com.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you work outside the Chicago area?',
        answer:
          'Yes. We work across Illinois and Wisconsin and take on projects across the Midwest, especially multi-location restaurant and retail programs.',
      },
    ],
    related: ['commercial-remodeling', 'restaurant-remodeling', 'retail-remodeling', 'hospitality-remodeling'],
  },
];

export function findPage(pathname: string): ServicePage | undefined {
  const slug = pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  return servicePages.find((page) => page.slug === slug);
}

export function pageBySlug(slug: string): ServicePage {
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) throw new Error(`Unknown page slug: ${slug}`);
  return page;
}
