import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { AboutSection } from '@/components/sections/about-section';
import { CtaSection } from '@/components/sections/cta-section';
import { MethodSection } from '@/components/sections/method-section';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'about' });
  const meta = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('text'),
    path: '/a-propos',
    siteName: meta('siteName'),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  return (
    <>
      <AboutSection />
      <MethodSection />
      <CtaSection />
    </>
  );
}
