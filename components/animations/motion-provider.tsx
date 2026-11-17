'use client';

import { LazyMotion } from 'motion/react';

import type { ReactNode } from 'react';

const loadFeatures = () => import('motion/react').then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
