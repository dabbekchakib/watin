'use client';

import { useEffect } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-media-query';
import { localeMotion, scrollProgress, scrollStore, scrollVelocity } from '@/lib/motion-store';
import type { Locale } from '@/i18n/routing';

export function SmoothScroll({ locale }: { locale: Locale }) {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    localeMotion.set(locale);
  }, [locale]);

  useEffect(() => {
    if (reduce || window.matchMedia('(max-width: 767px), (hover: none), (pointer: coarse)').matches)
      return;

    let cleanup = () => {};
    let cancelled = false;

    void Promise.all([import('lenis'), import('@/lib/gsap')]).then(
      ([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
        if (cancelled) return;

        const lenis = new Lenis({
          duration: 1.05,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
        });

        scrollStore.lenis = lenis;
        lenis.on('scroll', ({ velocity, progress }: { velocity: number; progress: number }) => {
          scrollVelocity.set(velocity);
          scrollProgress.set(progress);
          ScrollTrigger.update();
        });

        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener('load', refresh);

        cleanup = () => {
          window.removeEventListener('load', refresh);
          gsap.ticker.remove(raf);
          lenis.destroy();
          scrollStore.lenis = null;
          scrollVelocity.set(0);
        };
      },
    );

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduce]);

  return null;
}
