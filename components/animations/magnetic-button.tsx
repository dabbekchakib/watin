'use client';

import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { ReactNode } from 'react';

import { buttonStyles, type ButtonVariant } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useIsTouch } from '@/hooks/use-media-query';

export function MagneticButton({
  children,
  href,
  variant = 'primary',
  className,
  external,
  ariaLabel,
}: {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const disabled = reduce || touch;

  const classes = buttonStyles(variant, className);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.22);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      className="inline-block will-change-transform"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {external || /^(https?:|tel:|mailto:)/.test(href) ? (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      ) : (
        <Link href={href} prefetch={false} className={classes} aria-label={ariaLabel}>
          {children}
        </Link>
      )}
    </m.span>
  );
}
