import { ArrowRight, Check, Phone } from 'lucide-react';
import { contactConfig, whyChooseMeConfig } from '../config';
import { responsiveImageProps } from '../lib/responsiveImage';
import { pageBySlug, type ServicePage } from '../pages';
import { Footer } from './Footer';

const phoneHref = `tel:${contactConfig.phone.replace(/\D/g, '')}`;
/** Height of the title bar Google My Maps draws at the top of an embedded map */
const MY_MAPS_HEADER_PX = 64;
const logoSrc = `${import.meta.env.BASE_URL}mc-pro-logo.webp`;

export function SiteHeader() {
  return (
    <header className="bg-forest-dark text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between gap-6">
        <a href="/" aria-label="MC PRO, Inc. home">
          <img src={logoSrc} alt="MC PRO, Inc." className="h-10 md:h-12 w-auto" width={160} height={48} />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-body text-white/80">
          <a href="/#services" className="hover:text-white transition-colors">Services</a>
          <a href="/service-area" className="hover:text-white transition-colors">Service Area</a>
          <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
        <a
          href={phoneHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-forest-dark transition-colors"
        >
          <Phone className="w-4 h-4" strokeWidth={1.75} />
          <span>{contactConfig.phone}</span>
        </a>
      </div>
    </header>
  );
}

export function ServicePageView({ page }: { page: ServicePage }) {
  const related = page.related.map(pageBySlug);

  return (
    <div className="bg-offwhite text-softblack">
      <SiteHeader />

      <section className="bg-forest-dark text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 md:pb-24">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm font-body text-white/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white/90">{page.navLabel}</li>
            </ol>
          </nav>
          <h1 className="font-sans font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl">
            {page.h1}
          </h1>
          <div className="mt-8 max-w-3xl space-y-4 text-white/75 font-body text-base md:text-lg leading-relaxed">
            {page.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={phoneHref}
              data-track="hero"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-forest-dark font-semibold rounded-full shadow-lg hover:bg-white/90 transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={1.75} />
              Call {contactConfig.phone}
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-forest-dark transition-colors"
            >
              Request a consultation
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </section>

      {page.mapEmbedUrl ? (
        <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-8 md:-mt-12">
          <div className="relative h-80 sm:h-96 md:h-[520px] overflow-hidden rounded-[2rem] shadow-xl bg-white">
            {/* Shift the iframe up and clip it so the My Maps title bar (map name, owner, share) is hidden.
                Google's logo and terms at the bottom stay visible. */}
            <iframe
              src={page.mapEmbedUrl}
              width="100%"
              style={{ border: 0, top: -MY_MAPS_HEADER_PX, height: `calc(100% + ${MY_MAPS_HEADER_PX}px)` }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={page.mapTitle}
              className="absolute left-0 w-full"
            />
          </div>
        </div>
      ) : page.image && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-8 md:-mt-12">
          <div className="relative h-64 sm:h-80 md:h-[460px] overflow-hidden rounded-[2rem] shadow-xl">
            <img
              {...responsiveImageProps(page.image, '(min-width: 1280px) 1184px, 100vw')}
              alt={page.imageAlt ?? ''}
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16">
        {page.serviceType && (
          <section aria-labelledby="by-the-numbers">
            <h2 id="by-the-numbers" className="font-sans font-bold tracking-tight text-2xl md:text-3xl mb-6">
              {whyChooseMeConfig.statsLabel}
            </h2>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {whyChooseMeConfig.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-softblack/12 bg-white px-5 py-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-sans font-extrabold text-3xl md:text-4xl text-forest-dark">
                    {stat.text ?? `${stat.value}${stat.suffix}`}
                  </dd>
                  <dd className="mt-2 font-body text-sm text-softblack/70 leading-snug">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-sans font-bold tracking-tight text-2xl md:text-3xl mb-5">{section.heading}</h2>
            {section.body?.map((paragraph) => (
              <p key={paragraph} className="font-body text-base md:text-lg text-softblack/75 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {section.bullets.map((item) => (
                  <li key={item} className="flex gap-3 font-body text-softblack/80">
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-forest-dark" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.cities && (
              <ul className="mt-4 grid gap-x-6 gap-y-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 font-body text-softblack/80">
                {section.cities.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {page.faqs.length > 0 && (
          <section>
            <h2 className="font-sans font-bold tracking-tight text-2xl md:text-3xl mb-6">Frequently asked questions</h2>
            <div className="divide-y divide-softblack/10 border-y border-softblack/10">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="font-sans font-semibold text-lg md:text-xl mb-2">{faq.question}</h3>
                  <p className="font-body text-softblack/75 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="font-sans font-bold tracking-tight text-2xl md:text-3xl mb-6">Related services</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <a
                    href={`/${item.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-softblack/12 bg-white px-5 py-4 font-sans font-semibold hover:border-forest-dark transition-colors"
                  >
                    {item.navLabel}
                    <ArrowRight className="w-4 h-4 text-forest-dark transition-transform group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <section className="bg-forest-dark text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-20 text-center">
          <h2 className="font-sans font-bold tracking-tight text-3xl md:text-4xl">Talk to MC PRO about your project</h2>
          <p className="mt-4 font-body text-white/70 text-base md:text-lg">
            Call{' '}
            <a href={phoneHref} data-track="cta-text" className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white">
              {contactConfig.phone}
            </a>
            , email{' '}
            <a href={`mailto:${contactConfig.email}`} data-track="cta-text" className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white">
              {contactConfig.email}
            </a>{' '}
            or send us your bid package.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={phoneHref}
              data-track="cta"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-forest-dark font-semibold rounded-full hover:bg-white/90 transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={1.75} />
              Call {contactConfig.phone}
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-forest-dark transition-colors"
            >
              Request a consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
