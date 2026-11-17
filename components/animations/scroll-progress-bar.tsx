'use client';

import { m, useScroll, useSpring } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="origin-start bg-teal fixed inset-x-0 top-0 z-[110] h-1 shadow-[0_0_14px_var(--teal)]"
    />
  );
}
