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

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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

      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 78%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.12,
              }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [hasServicesContent]);

  if (!hasServicesContent) return null;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-24 md:py-32 bg-forest-dark scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="opacity-0 mb-12 md:mb-16 lg:mb-20">
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

        {/* One row per service: card and photo side by side, sides alternating row to row
            (stacked on mobile, card first). */}
        <div ref={gridRef} className="flex flex-col gap-px bg-white/10 w-full">
          {servicesConfig.services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Camera;
            const photoFirst = index % 2 === 1;
            return (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-px">
                <div
                  className={`service-card group bg-forest-dark p-6 md:p-10 lg:p-14 opacity-0 transition-all duration-500 hover:bg-forest-mid flex flex-col justify-center ${
                    service.image ? '' : 'md:col-span-2'
                  }`}
                >
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-sans font-semibold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/50 font-body leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {service.description}
                  </p>
                  {service.bullets && service.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-white/45 font-body leading-snug group-hover:text-white/65 transition-colors duration-300 list-disc pl-4 marker:text-white/35">
                      {service.bullets.map((item, bulletIndex) => (
                        <li key={`${index}-${bulletIndex}`}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {service.image && (
                  <div
                    className={`service-card group relative overflow-hidden bg-forest-mid opacity-0 h-56 sm:h-72 md:h-auto md:min-h-[360px] ${
                      photoFirst ? 'md:order-first' : ''
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt ?? ''}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-forest-dark/20 group-hover:bg-forest-dark/0 transition-colors duration-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
