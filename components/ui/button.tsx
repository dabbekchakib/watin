import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'light';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal-d text-white border-teal-d hover:bg-navy hover:border-navy',
  outline: 'border-navy text-navy bg-white hover:bg-navy hover:text-white',
  light: 'border-white/70 text-white bg-transparent hover:bg-white hover:text-ink',
};

export const buttonStyles = (variant: ButtonVariant, className?: string) =>
  cn(
    'inline-flex items-center justify-center gap-3 rounded-full border-2 px-7 py-3.5 text-[0.95rem] font-bold transition-colors duration-300',
    variants[variant],
    className,
  );

export const fieldStyles =
  'w-full rounded-xl border-2 border-line bg-white px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-teal focus:ring-4 focus:ring-teal/15';
