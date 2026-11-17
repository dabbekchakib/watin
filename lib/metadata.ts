import type { Metadata } from 'next';

import { routing, type Locale } from '@/i18n/routing';

const languages = Object.fromEntries(
  routing.locales.map((locale) => [locale, `/${locale}`]),
) as Record<Locale, string>;

export function localizedAlternates(path = '') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const languagesMap = Object.fromEntries(
    routing.locales.map((locale) => [locale, `/${locale}${clean === '/' ? '' : clean}`]),
  );

  return {
    canonical: `/fr${clean === '/' ? '' : clean}`,
    languages: {
      ...languagesMap,
      'x-default': '/fr',
    },
  };
}

export function buildMetadata({
  locale,
  title,
  description,
  path = '',
  siteName,
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  siteName: string;
}): Metadata {
  const alternatePaths = localizedAlternates(path);
  const canonical = (alternatePaths.languages as Record<string, string>)[locale] ?? '/fr';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title,
    description,
    applicationName: siteName,
    alternates: { ...alternatePaths, canonical },
    openGraph: {
      type: 'website',
      siteName,
      locale: locale === 'ar' ? 'ar_TN' : locale === 'fr' ? 'fr_FR' : 'en_US',
      url: canonical,
      title,
      description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  };
}

export { languages };
