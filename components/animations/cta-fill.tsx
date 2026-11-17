'use client';

import { m, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';

import { MagneticButton } from '@/components/animations/magnetic-button';

function FillWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.7;
  const color = useTransform(
    progress,
    [start, Math.min(start + 0.3, 1)],
    ['rgba(255,255,255,0.62)', '#ffffff'],
  );

  return (
    <m.span style={{ color }} className="me-[0.25em] inline-block">
      {word}
    </m.span>
  );
}

export function CtaFill({
  title,
  subtitle,
  buttonLabel,
}: {
  title: string;
  subtitle: string;
  buttonLabel: string;
}) {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start end', 'center center'],
  });
  const words = title.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={section}
      id="cta"
      className="bg-ink grid min-h-[88vh] place-items-center py-28 text-white"
    >
      <div className="wrap text-center">
        <span className="eyebrow-rule bg-teal-l mx-auto mb-9" aria-hidden="true" />
        <h2 className="mx-auto max-w-[22ch] text-[clamp(2.7rem,8vw,8rem)] leading-[0.98] text-white">
          {words.map((word, index) => (
            <FillWord
              key={`${word}-${index}`}
              word={word}
              index={index}
              total={words.length}
              progress={scrollYProgress}
            />
          ))}
        </h2>
        <p className="mx-auto mt-9 max-w-[60ch] text-white/60">{subtitle}</p>
        <div className="mt-10">
          <MagneticButton href="/contact" variant="light">
            {buttonLabel}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
