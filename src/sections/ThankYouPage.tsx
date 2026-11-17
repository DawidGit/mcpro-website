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

const handshakeBase = `${import.meta.env.BASE_URL}thank-you-handshake`;
const handshake = `${handshakeBase}.jpg`;

export function ThankYouPage() {
  useEffect(() => {
    document.title = thankYouHead.title;
  }, []);

  return (
    <div className="bg-offwhite text-softblack">
      <SiteHeader />

      <main className="bg-forest-dark text-white">
        {/* Hero: photo with the heading. Kept short so the review button below stays near the fold. */}
        <section className="relative isolate overflow-hidden">
          <img
            src={handshake}
            srcSet={`${handshakeBase}-640.webp 640w, ${handshakeBase}-1280.webp 1280w`}
            sizes="100vw"
            alt="MC Pro project lead shaking hands with a client on a commercial construction site"
            width={1280}
            height={714}
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_30%]"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-dark via-forest-dark/60 to-forest-dark/30" />
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6 pb-8 md:pb-12 min-h-[240px] md:min-h-[380px] flex flex-col">
            <nav aria-label="Breadcrumb" className="text-sm font-body text-white/80">
              <ol className="flex flex-wrap items-center gap-2">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-white">Thank you</li>
              </ol>
            </nav>
            <h1 className="mt-auto pt-12 max-w-4xl font-sans font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
              Thank you for choosing MC Pro, INC.
            </h1>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 md:px-12 pt-6 md:pt-8 pb-20 md:pb-28">
          <div className="space-y-3 text-white/75 font-body text-base md:text-lg leading-relaxed">
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

          <h2 className="mt-8 font-sans font-bold tracking-tight text-2xl md:text-3xl">Share your experience</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg bg-white text-forest-dark font-semibold rounded-full shadow-lg hover:bg-white/90 transition-colors"
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
