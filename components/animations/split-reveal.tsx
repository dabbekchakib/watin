'use client';

import { m, useReducedMotion, type Variants } from 'motion/react';

import { cn } from '@/lib/utils';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

const elements = {
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  p: m.p,
  span: m.span,
  div: m.div,
};

export function SplitReveal({
  text,
  as = 'span',
  className,
  delay = 0,
  stagger = 0.045,
  onLoad = false,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  onLoad?: boolean;
}) {
  const reduce = useReducedMotion();
  const Component = elements[as];
  const words = text.split(/\s+/).filter(Boolean);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay },
    },
  };

  const word: Variants = {
    hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 1 : 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Component
      className={cn(className)}
      variants={container}
      initial="hidden"
      {...(onLoad
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, amount: 0.35 } })}
    >
      <span className="sr-only">{text}</span>
      {words.map((item, index) => (
        <span key={`${item}-${index}`}>
          <span className="word-mask" aria-hidden="true">
            <m.span className="inline-block" variants={word}>
              {item}
            </m.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Component>
  );
}
