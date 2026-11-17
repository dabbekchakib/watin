import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ServicesIndex } from '@/components/sections/services-index';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'nav' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    title: t('servicesPage'),
    description: meta('description'),
    path: '/services',
    siteName: meta('siteName'),
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  return <ServicesIndex />;
}
