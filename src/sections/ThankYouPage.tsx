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
        {/* Hero: the whole photo at its own proportions, sized from the viewport height so the photo,
            copy and review button all fit on one desktop screen. Heading sits on the photo from md up. */}
        <section className="px-6 md:px-12 pt-4">
          <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto mb-3 text-sm font-body text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white/90">Thank you</li>
            </ol>
          </nav>
          <div className="relative mx-auto w-full md:w-[min(100%,max(400px,calc((100svh-600px)*1280/714)))]">
            <img
              src={handshake}
              srcSet={`${handshakeBase}-640.webp 640w, ${handshakeBase}-1280.webp 1280w`}
              sizes="(min-width: 768px) 800px, 100vw"
              alt="MC Pro project lead shaking hands with a client on a commercial construction site"
              width={1280}
              height={714}
              fetchPriority="high"
              className="block w-full h-auto aspect-[1280/714] rounded-2xl shadow-2xl"
            />
            <div aria-hidden className="hidden md:block absolute inset-0 rounded-2xl bg-gradient-to-t from-forest-dark/90 via-forest-dark/10 via-45% to-transparent" />
            <h1 className="mt-4 md:mt-0 md:absolute md:inset-x-0 md:bottom-0 md:px-6 md:py-5 font-sans font-bold tracking-tight text-2xl md:text-[clamp(20px,calc((100svh-600px)*0.09),40px)] leading-tight md:drop-shadow-lg">
              Thank you for choosing MC Pro, INC.
            </h1>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 md:px-12 pt-4 md:pt-6 pb-20 md:pb-28">
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

          <h2 className="mt-6 font-sans font-bold tracking-tight text-xl md:text-2xl">Share your experience</h2>
          <div className="mt-3 flex flex-wrap gap-4">
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
