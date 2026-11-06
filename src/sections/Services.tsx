import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Building2,
  Camera,
  ClipboardList,
  Diamond,
  Home,
  Moon,
  PenLine,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { servicesConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Camera,
  ClipboardList,
  Diamond,
  Home,
  Moon,
  PenLine,
  Sparkles,
  Users,
  Wrench,
};

/**
 * Layered service rows: a rounded photo with an offset outline frame and a light card that
 * overlaps the photo. Sides alternate from row to row; on mobile the card overlaps the bottom of the photo.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hasServicesContent =
    Boolean(servicesConfig.titleLine1 || servicesConfig.titleLine2Italic) ||
    servicesConfig.services.length > 0;

  useEffect(() => {
    if (!hasServicesContent) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Each row animates on its own as it scrolls into view.
      const rows = listRef.current?.querySelectorAll<HTMLElement>('.service-row') ?? [];
      rows.forEach((row) => {
        const media = row.querySelector('.service-media');
        const card = row.querySelector('.service-card');
        const fromLeft = row.dataset.side === 'left';
        ScrollTrigger.create({
          trigger: row,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            if (media) {
              tl.fromTo(media, { x: fromLeft ? -60 : 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
            }
            if (card) {
              tl.fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6');
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasServicesContent]);

  if (!hasServicesContent) return null;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 md:py-32 bg-forest-dark scroll-mt-24 overflow-hidden"
    >
      {/* Soft background glows for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-forest-light/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-48 h-[28rem] w-[28rem] rounded-full bg-forest-mid/70 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="opacity-0 mb-16 md:mb-24">
          {servicesConfig.subtitle && (
            <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
              {servicesConfig.subtitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl">
            {servicesConfig.titleLine1 && (
              <span className="font-sans font-bold text-white tracking-tight">
                {servicesConfig.titleLine1}
              </span>
            )}
            {servicesConfig.titleLine1 && servicesConfig.titleLine2Italic ? ' ' : null}
            {servicesConfig.titleLine2Italic && (
              <span className="font-serif italic font-normal text-white/80">
                {servicesConfig.titleLine2Italic}
              </span>
            )}
          </h2>
          {servicesConfig.description && (
            <p className="mt-6 text-white/60 font-body text-base md:text-lg max-w-3xl leading-relaxed">
              {servicesConfig.description}
            </p>
          )}
        </div>

        <div ref={listRef} className="flex flex-col gap-24 md:gap-48">
          {servicesConfig.services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Camera;
            const mediaLeft = index % 2 === 0;
            return (
              <article
                key={index}
                data-side={mediaLeft ? 'left' : 'right'}
                className="service-row relative grid grid-cols-1 md:grid-cols-12 items-center"
              >
                {service.image && (
                  <div
                    className={`service-media opacity-0 relative md:row-start-1 md:col-span-8 ${
                      mediaLeft ? 'md:col-start-1' : 'md:col-start-5'
                    }`}
                  >
                    {/* Offset outline frame, shifted to the outer side */}
                    <div
                      aria-hidden
                      className={`absolute inset-0 rounded-[2rem] border border-white/20 -translate-y-3 md:-translate-y-5 ${
                        mediaLeft ? '-translate-x-3 md:-translate-x-5' : 'translate-x-3 md:translate-x-5'
                      }`}
                    />
                    <div
                      className="group relative h-64 sm:h-80 md:h-[440px] overflow-hidden rounded-[2rem]"
                    >
                      <img
                        src={service.image}
                        alt={service.imageAlt ?? ''}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-forest-dark/10 to-transparent" />
                    </div>
                  </div>
                )}

                <div
                  className={`service-card opacity-0 relative z-10 md:row-start-1 mx-3 sm:mx-6 md:mx-0 ${
                    service.image ? '-mt-20 md:mt-0 md:col-span-6' : 'md:col-span-8'
                  } ${mediaLeft ? 'md:col-start-7' : 'md:col-start-1'}`}
                >
                  <div
                    className={`bg-offwhite text-softblack shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] p-7 sm:p-9 lg:p-11 rounded-3xl md:translate-y-20 ${
                      mediaLeft ? 'md:rounded-tr-[5rem]' : 'md:rounded-tl-[5rem]'
                    }`}
                  >
                    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-dark text-white">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </span>
                    <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-softblack mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-softblack/65 font-body leading-relaxed">
                      {service.description}
                    </p>
                    {service.bullets && service.bullets.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {service.bullets.map((item, bulletIndex) => (
                          <li
                            key={`${index}-${bulletIndex}`}
                            className="rounded-full border border-softblack/12 bg-white px-3.5 py-1.5 text-xs md:text-[0.8rem] font-body text-softblack/75 leading-snug"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
