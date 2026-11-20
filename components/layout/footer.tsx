'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { Link } from '@/i18n/navigation';
import { site } from '@/lib/site';

export function Footer() {
  const t = useTranslations('nav');
  const common = useTranslations('common');
  const about = useTranslations('about');
  const footer = useTranslations('footer');

  return (
    <footer className="bg-ink text-white/65">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
        <div>
          <Link
            href="/"
            className="inline-flex rounded-lg bg-white p-3"
            aria-label={common('brand')}
          >
            <Image
              src="/watin-logo.png"
              alt={common('brand')}
              width={3670}
              height={2316}
              className="h-[80px] w-auto"
            />
          </Link>
          <p className="text-teal-l mt-5 max-w-[30ch] text-sm font-semibold tracking-[0.12em]">
            {about('slogan')}
          </p>
        </div>

        <div>
          <p className="mb-5 text-sm font-bold text-white">WATIN</p>
          <nav aria-label={t('menu')} className="flex flex-col items-start gap-3 text-sm">
            <Link href="/" prefetch={false} className="hover:text-teal-l transition-colors">
              {common('backHome')}
            </Link>
            <Link href="/services" prefetch={false} className="hover:text-teal-l transition-colors">
              {t('servicesPage')}
            </Link>
            <Link href="/a-propos" prefetch={false} className="hover:text-teal-l transition-colors">
              {t('about')}
            </Link>
            <Link href="/contact" prefetch={false} className="hover:text-teal-l transition-colors">
              {t('contact')}
            </Link>
          </nav>
        </div>

        <div>
          <p className="mb-5 text-sm font-bold text-white">{t('languages')}</p>
          <LanguageSwitcher compact />
          <div className="mt-6 flex flex-col gap-2 text-sm" dir="ltr">
            {site.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="hover:text-teal-l w-fit transition-colors"
              >
                {phone.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
        <div className="mb-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/politique-de-confidentialite" prefetch={false} className="hover:text-teal-l transition-colors">
            {footer('privacy')}
          </Link>
          <Link href="/conditions-generales" prefetch={false} className="hover:text-teal-l transition-colors">
            {footer('terms')}
          </Link>
        </div>
        <p>{footer('rights')}</p>
      </div>
    </footer>
  );
}
