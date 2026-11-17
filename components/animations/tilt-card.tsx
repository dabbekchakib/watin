'use client';

import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { ReactNode } from 'react';

import { useIsTouch } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20 });
  const reduce = useReducedMotion();
  const touch = useIsTouch();
  const disabled = reduce || touch;

  return (
    <m.div
      className={cn('will-change-transform', className)}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      onMouseMove={(event) => {
        if (disabled) return;
        const rect = event.currentTarget.getBoundingClientRect();
        rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 8);
        rotateX.set(-(((event.clientY - rect.top) / rect.height - 0.5) * 8));
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
