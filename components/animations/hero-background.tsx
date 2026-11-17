'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useIsTouch, usePrefersReducedMotion } from '@/hooks/use-media-query';

const HeroCanvas = dynamic(() => import('./hero-canvas'), { ssr: false, loading: () => null });

export function HeroBackground() {
  const reduce = usePrefersReducedMotion();
  const touch = useIsTouch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!ready || reduce || touch) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-navy/10 absolute -start-[12%] top-[8%] h-[38vw] max-h-[520px] w-[38vw] max-w-[520px] rounded-full blur-3xl" />
        <div className="bg-teal/12 absolute -end-[10%] bottom-[2%] h-[32vw] max-h-[420px] w-[32vw] max-w-[420px] rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(20,153,143,0.09),transparent_45%)]" />
      <HeroCanvas />
    </div>
  );
}
