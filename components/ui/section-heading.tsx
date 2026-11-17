import { SplitReveal } from '@/components/animations/split-reveal';
import { cn } from '@/lib/utils';

export function SectionHeading({
  title,
  intro,
  light = false,
  center = false,
}: {
  title: string;
  intro?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn('max-w-[46ch]', center && 'mx-auto text-center')}>
      <span className="eyebrow-rule mb-6" aria-hidden="true" />
      <SplitReveal
        as="h2"
        text={title}
        className={cn(
          'text-[clamp(2rem,4vw,3.25rem)] leading-[1.08]',
          light ? 'text-white' : 'text-navy',
        )}
      />
      {intro ? (
        <p
          className={cn('mt-5 max-w-[62ch] text-[1.02rem]', light ? 'text-white/75' : 'text-body')}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
