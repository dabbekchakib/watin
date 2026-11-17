'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import { TiltCard } from '@/components/animations/tilt-card';
import { BlurImage } from '@/components/ui/blur-image';
import { Link } from '@/i18n/navigation';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

export type ServiceItem = {
  slug: string;
  name: string;
  description: string;
  points: [string, string, string];
  image: string;
  alt: string;
};

export function HorizontalServices({ items }: { items: ServiceItem[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const locale = useLocale();
  const rtl = locale === 'ar';
  const t = useTranslations('services');

  useEffect(() => {
    if (reduce) return;
    let disposed = false;
    const cleanup = { current: () => {} };

    void import('@/lib/gsap').then(({ gsap }) => {
      if (disposed || !viewport.current || !track.current) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const distance = () =>
          Math.max(0, track.current!.scrollWidth - viewport.current!.clientWidth + 24);
        const direction = rtl ? 1 : -1;

        const horizontal = gsap.to(track.current, {
          x: () => direction * distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: viewport.current,
            start: 'top top+=96',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((image) => {
          gsap.fromTo(
            image,
            { xPercent: rtl ? -8 : 8 },
            {
              xPercent: rtl ? 8 : -8,
              ease: 'none',
              scrollTrigger: {
                trigger: image.closest('article'),
                containerAnimation: horizontal,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        });

        const refresh = () => horizontal.scrollTrigger?.refresh();
        window.addEventListener('resize', refresh);
        return () => window.removeEventListener('resize', refresh);
      });

      cleanup.current = () => mm.revert();
    });

    return () => {
      disposed = true;
      cleanup.current();
    };
  }, [reduce, rtl]);

  return (
    <div
      ref={viewport}
      data-lenis-prevent
      className="relative [scrollbar-width:none] overflow-x-auto overflow-y-hidden md:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      <div ref={track} className="flex w-max gap-6 px-[4%] pb-4 md:gap-8 md:px-[4%]">
        {items.map((service, index) => (
          <article
            key={service.slug}
            className="border-line flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--panel-radius)] border bg-white shadow-[0_20px_60px_rgba(13,37,69,0.08)] md:w-[min(70vw,840px)] md:flex-row"
          >
            <TiltCard className="clip-w relative h-[260px] shrink-0 overflow-hidden md:h-auto md:w-[46%]">
              <BlurImage
                data-parallax
                src={service.image}
                alt={service.alt}
                fill
                loading="lazy"
                fetchPriority="low"
                sizes="(max-width: 768px) 86vw, 40vw"
                className="scale-110 object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(19,58,111,0.32),rgba(20,153,143,0.06))]" />
              <span className="absolute end-5 bottom-5 text-[3rem] leading-none font-extrabold text-white/70">
                {String(index + 1).padStart(2, '0')}
              </span>
            </TiltCard>

            <div className="flex flex-1 flex-col justify-center p-7 md:p-10">
              <h3 className="text-navy text-[clamp(1.5rem,2.4vw,2.1rem)]">{service.name}</h3>
              <p className="text-body mt-4 max-w-[52ch]">{service.description}</p>
              <p className="text-teal-d mt-7 text-xs font-bold tracking-widest">{t('keyPoints')}</p>
              <ul className="mt-3 grid gap-2.5">
                {service.points.map((point) => (
                  <li key={point} className="text-ink relative ps-7 font-semibold">
                    <span
                      aria-hidden="true"
                      className="border-teal absolute start-0 top-[0.45em] h-2 w-3.5 border-s-[3px] border-b-[3px]"
                      style={{ transform: 'rotate(calc(-45deg * var(--dir-sign)))' }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${service.slug}`}
                className="group bg-teal-d hover:bg-navy mt-8 inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors"
              >
                {t('detail')}
                <span
                  aria-hidden="true"
                  className="inline-block"
                  style={{ transform: 'scaleX(var(--dir-sign))' }}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
