import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { introGridConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

// Per-image animation config: unique direction, rotation, parallax depth, stagger order
const imageAnimConfigs = [
  // img0: tall left — sweeps in from the left
  { clipFrom: 'inset(0% 100% 0% 0%)', rotation: -2, parallax: [-6, 6], delay: 0 },
  // img1: top center — drops in from above
  { clipFrom: 'inset(0% 0% 100% 0%)', rotation: 1.5, parallax: [-3, 3], delay: 0.12 },
  // img2: top right — slides in from the right
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: -1.2, parallax: [-5, 5], delay: 0.08 },
  // img3: tall center — rises from below
  { clipFrom: 'inset(100% 0% 0% 0%)', rotation: 1, parallax: [-4, 4], delay: 0.22 },
  // img4: bottom right — slides in from the right
  { clipFrom: 'inset(0% 0% 0% 100%)', rotation: -1.5, parallax: [-7, 7], delay: 0.18 },
];

export function IntroGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const descriptionBodyId = useId();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef(false);
  /** Height of the mission card while collapsed — the collage starts just under it (minus an overlap). */
  const [collapsedCardHeight, setCollapsedCardHeight] = useState<number | null>(null);

  useEffect(() => {
    expandedRef.current = descriptionExpanded;
  }, [descriptionExpanded]);

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // Only measure the collapsed state, so expanding the card grows it over the collage
    // instead of pushing the collage down.
    const update = () => {
      if (!expandedRef.current) setCollapsedCardHeight(el.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const descriptionParagraphs = useMemo(
    () =>
      introGridConfig.description
        .split(/\n\n+/)
        .map((para) => para.trim())
        .filter(Boolean),
    []
  );

  const collapseN = introGridConfig.descriptionCollapsedParagraphCount;
  const descriptionIsCollapsible =
    typeof collapseN === 'number' &&
    collapseN > 0 &&
    descriptionParagraphs.length > collapseN;

  const visibleDescriptionParagraphs =
    !descriptionIsCollapsible || descriptionExpanded
      ? descriptionParagraphs
      : descriptionParagraphs.slice(0, collapseN ?? 0);

  const readMoreLabel =
    introGridConfig.descriptionReadMoreLabel ?? 'Read more';
  const readLessLabel =
    introGridConfig.descriptionReadLessLabel ?? 'Show less';

  const hasIntroGridContent =
    Boolean(introGridConfig.titleLine1) ||
    Boolean(introGridConfig.titleLine2) ||
    introGridConfig.portfolioImages.length > 0;

  useEffect(() => {
    if (!hasIntroGridContent) return;

    const ctx = gsap.context(() => {
      // ── Title: mask-reveal per line ──
      const titleWrap = titleLine1Ref.current?.parentElement?.parentElement;
      if (titleWrap) {
        ScrollTrigger.create({
          trigger: titleWrap,
          start: 'top 85%',
          onEnter: () => {
            // fromTo with explicit y: 0 — GSAP reads the CSS translate-y-[110%] as a pixel `y`,
            // so animating only yPercent would leave the lines hidden.
            gsap.fromTo(
              [titleLine1Ref.current, titleLine2Ref.current],
              { y: 0, yPercent: 110 },
              {
                y: 0,
                yPercent: 0,
                duration: 1.1,
                ease: 'power4.out',
                stagger: 0.13,
              }
            );
          },
          once: true,
        });
      }

      // ── Description: fade up ──
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            textRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.35 }
          );
        },
        once: true,
      });

      // ── Grid images: per-image directional reveal + rotation + scale + parallax ──
      const gridItems = gridRef.current?.querySelectorAll('.grid-item');
      if (gridItems) {
        gridItems.forEach((item, i) => {
          const img = item.querySelector('img');
          const cfg = imageAnimConfigs[i];
          if (!cfg) return;

          // One-shot reveal on scroll-enter
          ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
              // Unhide (Tailwind opacity-0 used as pre-GSAP fallback)
              gsap.set(item, { opacity: 1 });

              // Clip-path directional reveal
              gsap.fromTo(
                item,
                { clipPath: cfg.clipFrom },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.3,
                  ease: 'power4.inOut',
                  delay: cfg.delay,
                }
              );

              if (img) {
                // Scale zoom-out (Ken Burns)
                gsap.fromTo(
                  img,
                  { scale: 1.45, rotate: cfg.rotation },
                  {
                    scale: 1.12,
                    rotate: 0,
                    duration: 1.8,
                    ease: 'power3.out',
                    delay: cfg.delay,
                  }
                );
              }
            },
            once: true,
          });

          // Continuous parallax (varied depth per image → layered 3D feel)
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: cfg.parallax[0] },
              {
                yPercent: cfg.parallax[1],
                ease: 'none',
                scrollTrigger: {
                  trigger: item,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [hasIntroGridContent]);

  if (!hasIntroGridContent) return null;

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative w-full pt-0 md:pt-1 pb-24 md:pb-32 bg-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* ── Title with split-line mask reveal ── */}
        <div className="mb-10 md:mb-14">
          <div className="max-w-3xl mx-auto text-center mb-6 md:mb-8">
            <div className="mb-6">
              <div className="overflow-hidden">
                <div
                  ref={titleLine1Ref}
                  className="translate-y-[110%]"
                >
                  <span className="block text-3xl md:text-4xl lg:text-5xl leading-[1.2] md:leading-[1.2] lg:leading-[1.2] font-sans font-bold text-softblack tracking-tight">
                    {introGridConfig.titleLine1}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  ref={titleLine2Ref}
                  className="translate-y-[110%]"
                >
                  <span className="block text-3xl md:text-4xl lg:text-5xl leading-[1.2] md:leading-[1.2] lg:leading-[1.2] font-serif italic font-normal text-softblack/70">
                    {introGridConfig.titleLine2}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission card and collage share one grid cell: the card sits on top and overlaps the
            collage's top edge; when expanded it grows down over the collage. */}
        <div
          className="grid"
          style={{ '--card-h': `${collapsedCardHeight ?? 0}px` } as CSSProperties}
        >
          <div
            ref={cardRef}
            className="[grid-area:1/1] self-start relative z-10 w-full max-w-4xl mx-auto px-1 sm:px-0"
          >
            <div
              ref={textRef}
              className="opacity-0 bg-offwhite text-softblack rounded-3xl md:rounded-tr-[5rem] p-7 sm:p-9 lg:p-12 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.45),0_8px_18px_-8px_rgba(0,0,0,0.25)]"
            >
              {introGridConfig.descriptionHeading && (
                <h3 className="font-sans font-bold text-softblack text-2xl md:text-3xl tracking-tight mb-5">
                  {introGridConfig.descriptionHeading}
                </h3>
              )}
              <div className="relative">
                <div id={descriptionBodyId} className="space-y-4">
                  {visibleDescriptionParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-base md:text-lg text-softblack/65 font-body leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
                {!descriptionExpanded && descriptionIsCollapsible && (
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-offwhite to-transparent"
                    aria-hidden
                  />
                )}
              </div>
              {descriptionIsCollapsible && (
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-forest-dark px-5 py-2.5 text-sm font-body font-semibold text-white hover:bg-forest-mid transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-dark"
                    aria-expanded={descriptionExpanded}
                    aria-controls={descriptionBodyId}
                    onClick={() => {
                      setDescriptionExpanded((prev) => !prev);
                      requestAnimationFrame(() => ScrollTrigger.refresh());
                    }}
                  >
                    {descriptionExpanded ? readLessLabel : readMoreLabel}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Collage: all photos form one rectangle; nothing sticks out of its outline ── */}
          <div
            ref={gridRef}
            className="[grid-area:1/1] mt-[calc(var(--card-h)-56px)] md:mt-[calc(var(--card-h)-104px)] grid grid-cols-2 grid-rows-[220px_160px_160px] md:grid-cols-4 md:grid-rows-2 md:h-[600px] gap-2 md:gap-3 overflow-hidden rounded-[2rem]"
          >
            {introGridConfig.portfolioImages.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className={`grid-item relative overflow-hidden group opacity-0 ${
                  index === 0 ? 'col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover will-change-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating accent text */}
        {introGridConfig.accentText && (
          <div className="mt-12 md:mt-16 flex justify-end">
            <p className="text-sm text-softblack/40 font-body tracking-wider uppercase">
              {introGridConfig.accentText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
