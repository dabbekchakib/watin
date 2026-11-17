'use client';

import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import type { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const reduce = useReducedMotion();
  const rtl = locale === 'ar';

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={
          reduce
            ? { opacity: 1 }
            : {
                opacity: 0,
                clipPath: rtl
                  ? 'polygon(0 0,100% 0,100% 100%,0 0)'
                  : 'polygon(0 0,100% 0,100% 0,0 100%)',
              }
        }
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
