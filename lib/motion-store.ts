'use client';

import { motionValue } from 'motion/react';

import type { Locale } from '@/i18n/routing';

export const scrollVelocity = motionValue(0);
export const scrollProgress = motionValue(0);
export const localeMotion = motionValue<Locale>('fr');

export const scrollStore = {
  lenis: null as { scrollTo: (target: string | number, options?: object) => void } | null,
};
