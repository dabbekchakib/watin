import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { CtaSection } from '@/components/sections/cta-section';
import { HeroSection } from '@/components/sections/hero-section';
import { MarqueeBand } from '@/components/sections/marquee-band';
import { MethodSection } from '@/components/sections/method-section';
import { ServicesSection } from '@/components/sections/services-section';
import { services } from '@/content/services';
import { hasLocale } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    siteName: t('siteName'),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return null;
  setRequestLocale(locale);

  const marquee = await getTranslations('marquee');
  const currentLocale = locale as Locale;

  return (
    <>
      <HeroSection />
      <MarqueeBand
        items={services.map((service) => service.copy[currentLocale].name)}
        label={marquee('label')}
      />
      <ServicesSection />
      <MethodSection />
      <AboutSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
