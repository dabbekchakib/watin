import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';

import { AppShell } from '@/components/layout/app-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { routing } from '@/i18n/routing';

import '../globals.css';

const sora = localFont({
  src: '../fonts/sora-latin.woff2',
  variable: '--font-sora',
  display: 'swap',
  weight: '100 800',
});

const cairo = localFont({
  src: [
    { path: '../fonts/cairo-arabic.woff2', weight: '200 1000' },
    { path: '../fonts/cairo-latin.woff2', weight: '200 1000' },
  ],
  variable: '--font-cairo',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: { default: t('title'), template: '%s — WATIN' },
    description: t('description'),
    applicationName: t('siteName'),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#133a6f' },
    { media: '(prefers-color-scheme: dark)', color: '#0d2545' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`${sora.variable} ${cairo.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <JsonLd />
          <AppShell locale={locale}>{children}</AppShell>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
