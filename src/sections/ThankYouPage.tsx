import { useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Footer } from './Footer';
import { SiteHeader } from './ServicePageView';

export const THANK_YOU_SLUG = 'thank-you';
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CSAtwW0foVY1EAI/review';
export const thankYouHead = {
  title: 'Thank You | MC Pro, INC.',
  description: 'Thank you for choosing MC Pro, INC. Share your experience with a Google review.',
};

export function ThankYouPage() {
  useEffect(() => {
    document.title = thankYouHead.title;
  }, []);

  return (
    <div className="bg-offwhite text-softblack">
      <SiteHeader />

      <main className="bg-forest-dark text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8 pb-20 md:pb-28">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm font-body text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white/90">Thank you</li>
            </ol>
          </nav>

          <h1 className="font-sans font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-tight">
            Thank you for choosing MC Pro, INC.
          </h1>

          <div className="mt-8 space-y-4 text-white/75 font-body text-base md:text-lg leading-relaxed">
            <p>
              Thank you for trusting us with your project. Since 2006 our team has built every job on the same
              promise: careful work, honest communication and a finished space your business can rely on for years.
            </p>
            <p>
              Most of our work comes from referrals, and a review from a client is the best recognition we can get.
              If you have a moment, please share your experience. It helps other owners and property managers choose
              a contractor, and it means a lot to our crew.
            </p>
          </div>

          <h2 className="mt-12 font-sans font-bold tracking-tight text-2xl md:text-3xl">Share your experience</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-forest-dark font-semibold rounded-full shadow-lg hover:bg-white/90 transition-colors"
            >
              <Star className="w-4 h-4" strokeWidth={1.75} />
              Review us on Google
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </a>
          </div>

          <div className="mt-14 text-white/75 font-body text-base md:text-lg">
            <p>Thank you again. It was a pleasure working with you.</p>
            <p className="mt-2 font-semibold text-white">The MC Pro, INC. Team</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
