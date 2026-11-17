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
        {/* Hero: full-bleed photo with the title, description and review button on top of it.
            A dark gradient (left on desktop, bottom on phones) keeps the text and button readable. */}
        <section className="relative isolate overflow-hidden">
          <img
            src={handshake}
            srcSet={`${handshakeBase}-640.webp 640w, ${handshakeBase}-1280.webp 1280w`}
            sizes="100vw"
            alt="MC Pro project lead shaking hands with a client on a commercial construction site"
            width={1280}
            height={714}
            fetchPriority="high"
            className="absolute inset-x-0 top-0 -z-10 h-[340px] w-full object-cover object-[55%_50%] md:inset-0 md:h-full md:object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(13_19_16/0.15)_0px,rgb(13_19_16/0)_80px,rgb(13_19_16/0.85)_250px,#0d1310_340px)] md:bg-[linear-gradient(to_right,rgb(13_19_16/0.95)_0%,rgb(13_19_16/0.7)_40%,rgb(13_19_16/0.1)_100%)]"
          />
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-10 md:py-8 md:min-h-[min(calc(100svh-88px),720px)] flex flex-col">
            <nav aria-label="Breadcrumb" className="text-sm font-body text-white/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-white">Thank you</li>
              </ol>
            </nav>

            <div className="mt-auto md:my-auto pt-44 md:pt-0 max-w-xl">
              <h1 className="font-sans font-bold tracking-tight text-3xl md:text-5xl leading-tight [text-shadow:0_2px_12px_rgb(0_0_0/0.5)]">
                Thank you for choosing MC Pro, INC.
              </h1>
              <p className="mt-4 md:mt-6 text-white/90 font-body text-base md:text-lg leading-relaxed [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
                Thank you for trusting us with your project. Most of our work comes from referrals, so a short Google
                review means a lot to our crew and helps other owners and property managers choose a contractor.
              </p>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 md:mt-8 inline-flex items-center gap-2 px-8 py-4 text-lg bg-white text-forest-dark font-semibold rounded-full shadow-xl ring-1 ring-black/10 hover:bg-white/90 transition-colors"
              >
                <Star className="w-5 h-5" strokeWidth={1.75} />
                Review us on Google
                <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 text-white/75 font-body text-base md:text-lg">
          <p>Thank you again. It was a pleasure working with you.</p>
          <p className="mt-2 font-semibold text-white">The MC Pro, INC. Team</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
