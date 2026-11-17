'use client';

import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

const SESSION_KEY = 'watin-preloader-v1';

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();
  const locale = useLocale();
  const rtl = locale === 'ar';

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      seen = false;
    }

    if (seen || reduce) {
      const frame = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(frame);
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* session storage indisponible */
      }
    }, 600);

    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          className="preloader bg-ink fixed inset-0 z-[120] grid place-items-center"
          initial={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }}
          exit={{
            clipPath: rtl
              ? 'polygon(0 0,100% 0,100% 100%,0 0)'
              : 'polygon(0 0,100% 0,100% 0,0 100%)',
          }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <m.svg
            viewBox="0 0 480 240"
            className="w-56 max-w-[60vw] overflow-visible sm:w-72"
            initial="hidden"
            animate="visible"
          >
            <m.path
              d="M40 40 L110 190 L180 40 L250 190 L320 40"
              fill="none"
              stroke="#fff"
              strokeWidth="26"
              strokeLinecap="square"
              strokeLinejoin="miter"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1 },
              }}
              transition={{ duration: reduce ? 0 : 0.65, ease: 'easeInOut' }}
              style={{ transform: 'scaleX(var(--dir-sign))', transformOrigin: 'center' }}
            />
            <m.path
              d="M180 205 C 260 190, 320 130, 395 52"
              fill="none"
              stroke="var(--teal-l)"
              strokeWidth="16"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1 },
              }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.4, ease: 'easeOut' }}
              style={{ transform: 'scaleX(var(--dir-sign))', transformOrigin: 'center' }}
            />
            <m.path
              d="M430 24 L390 88 L354 48 Z"
              fill="var(--teal-l)"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              transition={{ duration: reduce ? 0 : 0.25, delay: reduce ? 0 : 0.85 }}
              style={{ transform: 'scaleX(var(--dir-sign))', transformOrigin: '392px 55px' }}
            />
          </m.svg>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
