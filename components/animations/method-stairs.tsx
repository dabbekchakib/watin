'use client';

import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-media-query';

const heights = ['md:min-h-[190px]', 'md:min-h-[240px]', 'md:min-h-[290px]', 'md:min-h-[340px]'];

export function MethodStairs({ steps }: { steps: { title: string; description: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let disposed = false;
    let mm: ReturnType<(typeof import('@/lib/gsap'))['gsap']['matchMedia']> | null = null;

    void import('@/lib/gsap').then(({ gsap }) => {
      if (disposed || !root.current || !line.current) return;

      mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          const length = line.current!.getTotalLength();
          gsap.set(line.current, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(line.current, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 78%',
              end: 'bottom 70%',
              scrub: true,
            },
          });

          gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step) => {
            const rule = step.querySelector('[data-step-rule]');
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: step,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                },
              })
              .fromTo(
                step,
                { opacity: 0.55, y: 26 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
              )
              .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0);
          });
        }, root);

        return () => context.revert();
      });
    });

    return () => {
      disposed = true;
      mm?.revert();
    };
  }, [reduce]);

  return (
    <div ref={root} className="relative">
      <svg
        viewBox="0 0 1000 320"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-0 hidden h-full w-[calc(100%-2rem)] opacity-70 md:block"
        style={{ transform: 'scaleX(var(--dir-sign))' }}
      >
        <path
          ref={line}
          d="M10 300 C 170 292, 240 246, 300 236 S 460 206, 530 170 S 700 110, 780 74 S 920 34, 990 20"
          fill="none"
          stroke="var(--teal)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative grid gap-5 md:grid-cols-4 md:items-end md:gap-6">
        {steps.map((step, index) => (
          <article
            data-step
            key={step.title}
            className={`bg-mist relative flex flex-col overflow-hidden px-6 pt-7 pb-8 md:px-5 ${heights[index] ?? ''} ${
              index === 3 ? 'bg-navy text-white' : ''
            }`}
          >
            <span
              data-step-rule
              aria-hidden="true"
              className="origin-start bg-teal-l absolute inset-x-0 top-0 h-1.5"
            />
            <span
              className={`block text-[2.6rem] leading-none font-extrabold ${index === 3 ? 'text-teal-l' : 'text-teal'}`}
            >
              {index + 1}
            </span>
            <h3 className={`mt-4 text-[1.3rem] ${index === 3 ? 'text-white' : 'text-navy'}`}>
              {step.title}
            </h3>
            <p className={`mt-2 text-[0.95rem] ${index === 3 ? 'text-white/75' : 'text-body'}`}>
              {step.description}
            </p>
            <span
              className={`clip-w mt-7 hidden h-7 w-7 md:block ${index === 3 ? 'bg-teal-l' : 'bg-teal/30'}`}
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </div>
  );
}
