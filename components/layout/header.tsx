'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { key: 'services', href: '/#services' },
  { key: 'approach', href: '/#approche' },
  { key: 'about', href: '/#apropos' },
  { key: 'contact', href: '/#contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const common = useTranslations('common');
  const about = useTranslations('about');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-[90] border-b transition-[background-color,box-shadow,border-color] duration-500',
        scrolled
          ? 'border-line/80 bg-white/90 shadow-[0_8px_30px_rgba(13,37,69,0.06)] backdrop-blur-xl'
          : 'border-transparent bg-white/60 backdrop-blur-sm',
      )}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label={common('brand')}
        >
          <Image
            src="/watin-brand.jpg"
            alt=""
            width={360}
            height={227}
            priority
            className="h-11 w-auto"
          />
          <span className="flex flex-col gap-0.5">
            <b
              dir="ltr"
              className="text-navy text-[1.25rem] leading-none font-extrabold tracking-[0.02em]"
            >
              WATIN<i className="text-teal mx-[0.35em] font-light not-italic">|</i>
              <span className="font-arabic">وتين</span>
            </b>
            <span className="text-teal text-[0.62rem] font-bold tracking-[0.16em] uppercase">
              {about('slogan')}
            </span>
          </span>
        </Link>

        <nav
          id="main-navigation"
          aria-label={t('menu')}
          className={cn('links', open ? 'links-open' : '')}
        >
          {navigation.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              prefetch={false}
              className="nav-underline text-ink hover:text-teal-d text-[0.95rem] font-semibold transition-colors duration-300"
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link
            href="/services"
            prefetch={false}
            className="nav-underline text-ink hover:text-teal-d text-[0.95rem] font-semibold transition-colors duration-300 md:hidden"
            onClick={() => setOpen(false)}
          >
            {t('servicesPage')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            className="border-line hover:border-teal grid h-11 w-11 place-items-center rounded-xl border-2 bg-white transition-colors md:hidden"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={cn(
                  'bg-navy h-[2px] w-5 transition-transform duration-300',
                  open && 'translate-y-[7px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'bg-navy h-[2px] w-5 transition-opacity duration-200',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'bg-navy h-[2px] w-5 transition-transform duration-300',
                  open && '-translate-y-[7px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
