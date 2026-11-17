'use client';

import { m, useAnimationFrame, useMotionValue } from 'motion/react';
import { useLocale } from 'next-intl';
import { useRef } from 'react';

import { scrollVelocity } from '@/lib/motion-store';

export function MarqueeBand({ items, label }: { items: string[]; label: string }) {
  const rtl = useLocale() === 'ar';
  const track = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const initialized = useRef(false);

  useAnimationFrame((_, delta) => {
    const element = track.current;
    if (!element) return;
    const width = element.scrollWidth / 2;
    if (!width) return;

    if (!initialized.current) {
      x.set(rtl ? -width : 0);
      initialized.current = true;
    }

    const boost = Math.min(Math.abs(scrollVelocity.get()), 60) * 0.9;
    const drift = ((22 + boost) * delta) / 1000;
    const value = x.get() + (rtl ? drift : -drift);

    if (!rtl && value <= -width) x.set(value + width);
    else if (rtl && value >= 0) x.set(value - width);
    else x.set(value);
  });

  return (
    <section
      aria-label={label}
      className="border-line relative overflow-hidden border-y bg-white py-5"
    >
      <m.div
        aria-hidden="true"
        className="flex w-max will-change-transform"
        ref={track}
        style={{ x, direction: rtl ? 'rtl' : 'ltr' }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, index) => (
              <span key={`${copy}-${index}`} className="flex items-center whitespace-nowrap">
                <span className="text-navy/85 px-7 text-[clamp(1.05rem,2vw,1.6rem)] font-extrabold">
                  {item}
                </span>
                <span className="bg-teal inline-block h-3 w-3 -skew-x-12" />
              </span>
            ))}
          </div>
        ))}
      </m.div>
    </section>
  );
}
