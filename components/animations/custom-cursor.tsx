'use client';

import { m, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

import { useIsTouch, usePrefersReducedMotion } from '@/hooks/use-media-query';

export function CustomCursor() {
  const touch = useIsTouch();
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 42, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 700, damping: 42, mass: 0.25 });

  useEffect(() => {
    if (touch || reduce) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setActive(
        Boolean(target?.closest('a, button, [data-cursor="hover"], input, textarea, select')),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [touch, reduce, x, y]);

  if (touch || reduce) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[130] hidden md:block"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <m.div
        className="bg-teal-l/80 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 mix-blend-multiply"
        animate={{
          scale: active ? 3.2 : 1,
          backgroundColor: active ? 'rgba(20,153,143,0.15)' : 'rgba(55,194,182,0.8)',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </m.div>
  );
}
