'use client';

import { AnimatePresence, m } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';

import { routing, type Locale } from '@/i18n/routing';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const nativeNames: Record<Locale, string> = {
  fr: 'Français',
  ar: 'العربية',
  en: 'English',
};

function Flag({ locale, className }: { locale: Locale; className?: string }) {
  if (locale === 'fr') {
    return (
      <svg viewBox="0 0 24 16" className={className} aria-hidden="true" focusable="false">
        <rect width="8" height="16" fill="#163ca8" />
        <rect x="8" width="8" height="16" fill="#fff" />
        <rect x="16" width="8" height="16" fill="#e2212f" />
      </svg>
    );
  }

  if (locale === 'ar') {
    return (
      <svg viewBox="0 0 24 16" className={className} aria-hidden="true" focusable="false">
        <g transform="translate(12 8) scale(0.2)" fill="#e70013">
          <path d="M-60-40H60v80H-60z" />
          <circle fill="#fff" r="20" />
          <circle r="15" />
          <circle fill="#fff" cx="4" r="12" />
          <path d="M-5 0l16.281-5.29L1.22 8.56V-8.56L11.28 5.29z" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className={className} aria-hidden="true" focusable="false">
      <rect width="24" height="16" fill="#fff" />
      {Array.from({ length: 7 }, (_, index) => (
        <rect key={index} y={index * (32 / 13)} width="24" height={16 / 13} fill="#b22234" />
      ))}
      <rect width="10" height={112 / 13} fill="#3c3b6e" />
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 5 }, (_, column) => (
          <circle
            key={`${row}-${column}`}
            cx={1.3 + column * 2}
            cy={1.4 + row * 2}
            r="0.42"
            fill="#fff"
          />
        )),
      )}
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('nav');
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [hash, setHash] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    const frame = requestAnimationFrame(update);
    window.addEventListener('hashchange', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={`${t('languages')} : ${nativeNames[locale]}`}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-colors duration-300',
          compact
            ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
            : 'border-line text-navy hover:border-teal hover:text-teal-d bg-white',
        )}
      >
        <GlobeIcon className="h-5 w-5" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('ms-0.5 h-3 w-3 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden="true"
          focusable="false"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <m.ul
            id={menuId}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-line absolute start-0 top-full z-[100] mt-2 min-w-[200px] origin-top rounded-2xl border bg-white p-1.5 shadow-[0_20px_50px_rgba(13,37,69,0.18)]"
          >
            {(routing.locales as readonly Locale[]).map((item) => (
              <li key={item}>
                <Link
                  href={`${pathname}${hash}`}
                  locale={item}
                  prefetch={false}
                  hrefLang={item}
                  lang={item}
                  aria-current={item === locale ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200',
                    item === locale
                      ? 'bg-mist text-teal-d'
                      : 'text-ink hover:bg-mist hover:text-teal-d',
                  )}
                >
                  <Flag
                    locale={item}
                    className="h-4 w-6 shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10"
                  />
                  <span className={cn('flex-1', item === 'ar' && 'font-arabic text-[0.95rem]')}>
                    {nativeNames[item]}
                  </span>
                  {item === locale ? <CheckIcon className="text-teal h-4 w-4" /> : null}
                </Link>
              </li>
            ))}
          </m.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
