'use client';

import { m, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

export function GrowthArrow({
  mode = 'load',
  className,
  title,
}: {
  mode?: 'load' | 'reveal';
  className?: string;
  title?: string;
}) {
  const reduce = useReducedMotion();
  const duration = reduce ? 0 : 1.5;
  const trigger =
    mode === 'reveal'
      ? { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }
      : { animate: { pathLength: 1, opacity: 1 } };

  const path = 'M20 470 C 150 450, 230 395, 310 315 S 450 145, 523 82';

  return (
    <svg
      className={cn('pointer-events-none', className)}
      viewBox="0 0 600 500"
      preserveAspectRatio="none"
      style={{ transform: 'scaleX(var(--dir-sign))' }}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d={path}
        fill="none"
        stroke="#fff"
        strokeWidth={17}
        strokeLinecap="round"
        opacity={0.75}
      />
      <m.path
        d={path}
        fill="none"
        stroke="var(--teal)"
        strokeWidth={9}
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        {...trigger}
        transition={{ duration, delay: reduce ? 0 : 0.15, ease: [0.5, 0, 0.2, 1] }}
      />
      <m.path
        d="M572 38 L540 100 L506 62 Z"
        fill="var(--teal-l)"
        style={{ transformOrigin: '535px 70px' }}
        initial={{ scale: reduce ? 1 : 0.5, opacity: reduce ? 1 : 0 }}
        {...(mode === 'reveal'
          ? { whileInView: { scale: 1, opacity: 1 }, viewport: { once: true, amount: 0.5 } }
          : { animate: { scale: 1, opacity: 1 } })}
        transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : duration + 0.1 }}
      />
    </svg>
  );
}
