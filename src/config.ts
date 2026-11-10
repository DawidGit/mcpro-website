// Site Configuration
import { servicePages } from "./pages";
// General Contractor Website - Illinois Commercial Construction

export interface SiteConfig {
  language: string;
  siteTitle: string;
  /** Meta description — keep under ~155 characters */
  siteDescription: string;
  /** Longer description used in schema.org data */
  businessDescription: string;
  siteName: string;
  legalName: string;
  canonicalUrl: string;
  ogImage: string;
  logoUrl: string;
  keywords: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  /** Google Business Profile link (used as schema.org hasMap) */
  googleMapsUrl: string;
  sameAs: string[];
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteName: "MC Pro, INC.",
  legalName: "MC Pro, INC.",
  siteTitle: "Commercial Remodeling Contractor Streamwood, IL | MC Pro",
  siteDescription:
    "Streamwood, IL commercial remodeling contractor for restaurants, retail & hospitality. Self-performed trades and night work. Call (312) 405-0066.",
  businessDescription:
    "MC Pro, INC. is a Streamwood, Illinois general contractor with 20 years of experience in commercial remodeling — restaurants, retail, hospitality and industrial — with self-performed trades and night work that keeps your business open. Call (312) 405-0066.",
  canonicalUrl: "https://mcprogc.com",
  ogImage: "https://mcprogc.com/og-image.jpg",
  logoUrl: "https://mcprogc.com/mc-pro-logo.png",
  keywords:
    "general contractor Streamwood, MC Pro INC, commercial remodeling Illinois, restaurant remodel contractor Chicago, retail remodel contractor, night work remodeling, ACT ceiling contractor Illinois, commercial tile contractor Chicago, finish carpentry contractor, MCProGC",
  streetAddress: "724 Bonded Parkway",
  addressLocality: "Streamwood",
  addressRegion: "IL",
  postalCode: "60107",
  // Exact pin of the MC PRO, INC Google Business Profile (https://maps.app.goo.gl/3nNP5sw82XaXk8jT9)
  latitude: 42.0174796,
  longitude: -88.1488804,
  googleMapsUrl: "https://maps.app.goo.gl/3nNP5sw82XaXk8jT9",
  sameAs: ["https://mcprogc.com", "https://maps.app.goo.gl/3nNP5sw82XaXk8jT9"],
};

const assetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  /** "caps" = small uppercase tagline, "serif" = large italic serif line */
  overlayTextStyle: "caps" | "serif";
  brandName: string;
  navLinks: { label: string; href: string }[];
}

export const heroConfig: HeroConfig = {
  backgroundText: "Build with us",
  heroImage: assetPath("/hero-construction2.png"),
  heroImageAlt: "High-rise commercial construction with cranes and reinforced concrete structure",
  // Rendered as the page H1 — keep the main keyword phrase in it
  overlayText: "Commercial Remodeling Contractor in Streamwood, IL — 20 Years of Experience",
  overlayTextStyle: "caps",
  brandName: "MC PRO",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

// Intro Grid Section - Trust & Proof
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  descriptionHeading: string;
  description: string;
  /** When set and there are more paragraphs, only this many show until expanded. Omit to always show full text. */
  descriptionCollapsedParagraphCount?: number;
  descriptionReadMoreLabel?: string;
  descriptionReadLessLabel?: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
}

export const introGridConfig: IntroGridConfig = {
  // Section title hidden (empty) — the mission card is the section heading
  titleLine1: "",
  titleLine2: "",
  descriptionHeading: "Our Mission",
  description: `At Mc Pro, our mission is to deliver comprehensive, high-quality construction services that combine two decades of experience with craftsmanship, reliability, and innovation. We are dedicated to creating spaces that are not only visually impactful, but also functional, durable, and built to stand the test of time.

Our team has been building since 2006 — first under earlier company names, today as MC Pro, INC. We started as a trade subcontractor on commercial projects — stone and facades, tile, concrete, masonry restoration, carpentry, ceilings and painting — while remodeling our own residential investment properties. That hands-on experience across trades grew into a team that takes on entire projects, from demolition to final punch.

Today, we deliver remodels for restaurants, retail stores, pharmacies, banks, hotels and industrial facilities — in full scope of work or by individual trades. Many of our projects are completed at night or in phases, so our clients' businesses stay open while we work. Our goal is to simplify construction for our clients by acting as a single, reliable partner — coordinating every trade, material order and inspection from start to finish.

Our slogan, "Quality on Time," is more than just words — it defines how we operate every day. At Mc Pro, we truly stand behind it. We are committed to meeting deadlines without compromising craftsmanship, ensuring that every project is completed efficiently, professionally, and to the highest standard. We take pride in delivering exactly what we promise, when we promise it.

We are committed to maintaining the highest standards of workmanship, clear communication, and accountability at every stage. We believe that strong relationships, transparency, and consistency are the key to successful projects and long-term partnerships.

At Mc Pro, we don't just build structures — we build spaces that support businesses, enhance everyday living, and reflect the vision of our clients. Every project we take on is approached with precision, professionalism, and pride.`,
  descriptionCollapsedParagraphCount: 2,
  descriptionReadMoreLabel: "Read more",
  descriptionReadLessLabel: "Show less",
  portfolioImages: [
    // First image is the large tile of the collage
    { src: assetPath("/project-restaurant-1.jpg"), alt: "Restaurant dining room with bar, lounge seating and custom lighting" },
    { src: assetPath("/project-office-1.jpg"), alt: "Commercial interior with acoustical ceiling grid and linear lighting" },
    { src: assetPath("/featured-industrial.jpg"), alt: "Industrial facility with loading docks" },
    { src: assetPath("/value-safety.jpg"), alt: "Construction crew reviewing drawings on site" },
    { src: assetPath("/featured-office-complex.jpg"), alt: "Commercial building entrance at dusk" },
  ],
  accentText: "Licensed & Insured in Illinois • Full SOW or Individual Trades • Night & After-Hours Work",
};

// Services Section
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  /** Optional bullet list shown under the description */
  bullets?: string[];
  /** Optional photo shown next to this service in the grid (interleaved with service cards) */
  image?: string;
  imageAlt?: string;
  /** Links to the matching service pages (src/pages.ts), shown under the card */
  pageLinks?: FooterLink[];
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2Italic: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "What We Offer",
  titleLine1: "Our",
  titleLine2Italic: "Services",
  description: "From full scope of work to individual trade packages, we self-perform the core trades with our own crews — so you get fewer handoffs, consistent quality and a schedule we control.",
  services: [
    {
      iconName: "Building2",
      title: "Commercial Remodeling",
      pageLinks: [{ label: "Commercial remodeling", href: "/commercial-remodeling" }, { label: "Restaurants", href: "/restaurant-remodeling" }, { label: "Retail & pharmacy", href: "/retail-remodeling" }, { label: "Hotels & hospitality", href: "/hospitality-remodeling" }],
      image: assetPath("/service-commercial-restaurant.jpg"),
      imageAlt: "Restaurant dining room remodel in progress with new booths, wood paneling and pendant lighting",
      description:
        "Our core business: remodels and build-outs for businesses that cannot afford to close — delivered in full scope of work or by individual trades.",
      bullets: [
        "Quick-service restaurants",
        "Retail stores & pharmacies",
        "Banks & service locations",
        "Hotels & hospitality spaces",
        "Industrial facilities",
      ],
    },
    {
      iconName: "Wrench",
      title: "Self-Performed Trades",
      pageLinks: [{ label: "Polished concrete & floor prep", href: "/polished-concrete" }],
      image: assetPath("/service-crew-plans.jpg"),
      imageAlt: "MC Pro crew lead reviewing drawings on a framing job",
      description:
        "Our own crews handle the trades that drive quality and schedule, without relying on a chain of outside subcontractors.",
      bullets: [
        "Demolition",
        "Rough & finish carpentry",
        "Acoustical ceilings (ACT)",
        "Tile, floor grinding & prep",
        "Solid surface & granite — fabrication and installation",
        "Concrete cutting, coring & pours",
        "Electrical",
        "Masonry restoration & polished concrete",
        "Painting & wallcovering",
      ],
    },
    {
      iconName: "Moon",
      title: "Night & After-Hours Work",
      pageLinks: [{ label: "How our night work runs", href: "/night-work" }],
      image: assetPath("/featured-office-complex.jpg"),
      imageAlt: "Commercial building entrance lit up at dusk",
      description:
        "We schedule demolition and noisy work around your operating hours, so your business stays open while we build.",
      bullets: [
        "Overnight shifts",
        "Phased work in occupied spaces",
        "Inspections coordinated between shifts",
        "Daily photo progress updates",
      ],
    },
    {
      iconName: "ClipboardList",
      title: "General Contracting",
      image: assetPath("/service-site-coordination.jpg"),
      imageAlt: "MC Pro team coordinating on a commercial building site",
      description:
        "One accountable partner for the whole project — from mobilization to final punch list.",
      bullets: [
        "Full scope of work management",
        "Scheduling & trade coordination",
        "Plumbing, HVAC & fire-sprinkler partners",
        "MEP licensed in Illinois & Wisconsin",
        "Quality control & supervision",
      ],
    },
    {
      iconName: "PenLine",
      title: "Pre-Construction & Coordination",
      image: assetPath("/service-commercial-buildout.jpg"),
      imageAlt: "Commercial storefront interior during build-out with ceiling grid, framing and new counters",
      description:
        "We get the details right before work starts, so the job runs without surprises.",
      bullets: [
        "Shop drawings",
        "Drawing verification",
        "Material ordering & procurement",
        "Schedule planning",
      ],
    },
    {
      iconName: "Home",
      title: "Residential Remodeling",
      image: assetPath("/service-residential-remodel.jpg"),
      imageAlt: "Crew installing floor tile and trim during a home kitchen remodel",
      description:
        "We remodel our own investment properties and bring the same standards to homeowners' projects.",
      bullets: [
        "Full home remodeling",
        "Kitchen & bathroom renovations",
        "Investment property renovations",
        "Interior finishes & tile",
      ],
    },
  ],
};

// Why Choose Me Section - Repurposed as Process/About Section
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  /** Optional text shown instead of the animated number (e.g. "Zero") */
  text?: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "Why Choose Mc Pro",
  titleRegular: "Proven",
  titleItalic: "Excellence",
  statsLabel: "By The Numbers",
  stats: [
    { value: 20, suffix: "+", label: "Years of Construction Experience" },
    { value: 200, suffix: "+", label: "Restaurant Remodels" },
    { value: 14, suffix: "", label: "Brand Decor Packages Built" },
    { value: 0, suffix: "", text: "Zero", label: "Downtime — Your Business Stays Open" },
  ],
  featureCards: [
    {
      image: assetPath("/value-safety.jpg"),
      imageAlt: "Construction crew reviewing drawings on site",
      title: "Self-Performing Crew",
      description:
        "Our own carpenters, tile setters, electricians and demolition crew — fewer handoffs, consistent quality and a schedule we control.",
    },
    {
      image: assetPath("/project-restaurant-1.jpg"),
      imageAlt: "Restaurant dining room ready for guests",
      title: "Your Business Stays Open",
      description:
        "Night shifts and phased work let restaurants, stores and hotels keep serving customers while we remodel.",
    },
    {
      image: assetPath("/project-industrial-1.jpg"),
      imageAlt: "Trucks at a commercial loading dock",
      title: "Ready to Mobilize",
      description:
        "Our own trucks, vans, trailers and tools — we bring the dumpster and materials to site and start on schedule.",
    },
    {
      image: assetPath("/feature-progress-updates.jpg"),
      imageAlt: "MC Pro site lead photographing progress on a commercial interior build-out",
      title: "Daily Progress Updates",
      description:
        "Photo updates after every shift and inspections coordinated as we go, so you always know where the project stands.",
    },
  ],
  wideImage: assetPath("/team-wide.jpg"),
  wideImageAlt: "Construction team reviewing plans at a job site",
  wideTitle: "Your Vision, Our Expertise",
  wideDescription: "We believe in building relationships as strong as our structures. From the first consultation to project completion, you'll have a dedicated team focused on your success.",
};

// FAQ Section
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "Common Questions",
  titleRegular: "Frequently",
  titleItalic: "Asked Questions",
  ctaText: "Still have questions about your project?",
  ctaButtonText: "Talk to Our Team",
  ctaHref: "#contact",
  faqs: [
    {
      id: "faq-1",
      question: "What types of projects do you handle?",
      answer: "We focus on commercial remodeling — quick-service restaurants, retail stores and pharmacies, banks, hotels and industrial facilities — as well as residential remodeling. Projects range from overnight front-of-house upgrades to full building expansions.",
    },
    {
      id: "faq-2",
      question: "Do you take full scope of work or individual trades?",
      answer: "Both. We can run the entire project as your general contractor, or join your team for specific trade packages such as demolition, carpentry, ACT ceilings, tile, countertops, concrete cutting or electrical.",
    },
    {
      id: "faq-3",
      question: "Can you complete the work without disrupting our business?",
      answer: "Yes. We regularly work overnight, after hours and in phases so restaurants, stores and hotels stay open. For example, we have completed front-of-house remodels in three overnight shifts while the restaurant served customers every day.",
    },
    {
      id: "faq-4",
      question: "How do you keep clients updated?",
      answer: "You get photo progress updates after every shift or workday, and we coordinate inspections as the work moves forward, so you always know where the project stands.",
    },
    {
      id: "faq-5",
      question: "Are you licensed and insured?",
      answer: "Yes. MC Pro, INC. is licensed and fully insured, and our MEP team holds licenses in Illinois and Wisconsin. Certificates of insurance are available on request.",
    },
    {
      id: "faq-6",
      question: "What areas do you serve?",
      answer:
        "MC Pro, INC. is based at 724 Bonded Parkway in Streamwood, Illinois. We serve the Chicago metropolitan area, Illinois and Wisconsin, and take on projects across the Midwest.",
    },
    {
      id: "faq-7",
      question: "Can you provide references?",
      answer: "Yes. References are available on request from construction managers, business owners, hospitality management and industrial clients we have worked with.",
    },
  ],
};

// Footer Section
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  email: string;
  locationText: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  servicesLabel: string;
  /** Links to the service / location pages (src/pages.ts); shown on every page */
  serviceLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "MC PRO",
  contactLabel: "Get in Touch",
  email: "office@mcprogc.com",
  locationText: "724 Bonded Parkway\nStreamwood, IL 60107",
  navigationLabel: "Navigation",
  navLinks: [
    // Root-relative so they also work from the service pages (Lenis smooth-scrolls them on /)
    { label: "Home", href: "/#home" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  servicesLabel: "Services",
  serviceLinks: servicePages.map((page) => ({ label: page.navLabel, href: `/${page.slug}` })),
  // Hidden until MC Pro has its own profiles. To restore, set the label to "Follow Us" and add
  // e.g. { iconName: "Linkedin", href: "https://www.linkedin.com/company/<profile>", label: "LinkedIn" }
  socialLabel: "",
  socialLinks: [],
  tagline: "We develop and build\nthe exceptional",
  copyright: "© 2026 MC Pro, INC. All rights reserved.",
  // Add legal pages here once they exist (e.g. { label: "Privacy Policy", href: "/privacy" })
  bottomLinks: [],
};

// Contact Section (New)
export interface ContactConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  description: string;
  phone: string;
  phoneLabel: string;
  email: string;
  emailLabel: string;
  address: string;
  addressLabel: string;
  hours: string;
  hoursLabel: string;
  formTitle: string;
  formDescription: string;
  mapEmbedUrl: string;
  /** Cloudflare Turnstile site key (public) — create at https://dash.cloudflare.com → Turnstile. */
  turnstileSiteKey: string;
}

export const contactConfig: ContactConfig = {
  subtitle: "Start Your Project",
  titleRegular: "Let's",
  titleItalic: "Connect",
  description:
    "Ready to start your construction project with MC Pro, INC. in Streamwood, IL? Call (312) 405-0066 or email office@mcprogc.com for a consultation.",
  phone: "(312) 405-0066",
  phoneLabel: "Phone",
  email: "office@mcprogc.com",
  emailLabel: "Email",
  address: "724 Bonded Parkway\nStreamwood, IL 60107",
  addressLabel: "Office",
  hours: "Monday – Friday: 7:00 AM – 5:00 PM\nSaturday: By Appointment",
  hoursLabel: "Hours",
  formTitle: "Request a Consultation",
  formDescription: "Fill out the form below and our team will respond within 24 business hours.",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=MC+PRO,+INC,+724+Bonded+Pkwy,+Streamwood,+IL+60107&z=16&output=embed",
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "",
};
