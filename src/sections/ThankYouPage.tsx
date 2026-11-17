import { ArrowUpRight } from 'lucide-react';
import { CANONICAL, WEBSITE_ID, BUSINESS_ID } from '../lib/schema';
import type { PageHead } from '../lib/pageSchema';
import { SiteHeader } from './ServicePageView';
import { Footer } from './Footer';

// Private review-request page sent to clients after a job (SMS, e-mail, QR code).
// Same role as pgmstone.com/thank-you: thank the client and send them to the
// Google Business Profile to leave a review. noindex, and not in sitemap.xml.

export const THANK_YOU_SLUG = 'thank-you';

/** MC PRO, INC Google Business Profile short link; opens the review dialog directly. */
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CSAtwW0foVY1EAI/review';

export function isThankYouPath(pathname: string): boolean {
  return pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '') === THANK_YOU_SLUG;
}

const title = 'Thank You | MC Pro, INC.';
const description = 'Thank you for choosing MC Pro, INC. Share your experience with a review on Google.';

export function thankYouHead(): PageHead & { robots: string } {
  const url = `${CANONICAL}/${THANK_YOU_SLUG}`;
  return {
    title,
    description,
    canonical: url,
    robots: 'noindex, follow',
    jsonLd: JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': BUSINESS_ID },
      },
      null,
      2,
    ),
  };
}

export function ThankYouPage() {
  return (
    <div className="bg-offwhite text-softblack">
      <SiteHeader />

      <main className="bg-forest-dark text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 pt-12 pb-20 md:pt-20 md:pb-28">
          <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">Thank you</p>
          <h1 className="font-sans font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-tight">
            Thank you for choosing MC Pro, INC.
          </h1>
          <div className="mt-8 space-y-4 text-white/75 font-body text-base md:text-lg leading-relaxed">
            <p>
              We truly appreciate the trust you placed in us. Since 2006, every project we build has carried the same
              promise: careful work, honest communication, and a finished space your business can rely on.
            </p>
            <p>
              As a local contractor, we grow mostly through word of mouth. The highest form of recognition for our work is
              a review from a client like you. If you have a moment, please share your experience on Google. It helps
              other business owners choose with confidence, and it means a great deal to our whole team.
            </p>
          </div>

          <div className="mt-10">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener"
              data-track="review-google"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest-dark font-semibold text-lg rounded-full shadow-lg hover:bg-white/90 transition-colors"
            >
              Review us on Google
              <ArrowUpRight className="w-5 h-5" strokeWidth={1.75} />
            </a>
          </div>

          <p className="mt-12 font-body text-white/75">
            Thank you again. It was a pleasure working with you.
            <br />
            <span className="text-white/50">The MC Pro, INC. Team</span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
