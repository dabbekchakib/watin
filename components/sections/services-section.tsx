import { getLocale, getTranslations } from 'next-intl/server';

import { HorizontalServices } from '@/components/sections/horizontal-services';
import { SectionHeading } from '@/components/ui/section-heading';
import { services } from '@/content/services';
import type { Locale } from '@/i18n/routing';

export async function ServicesSection() {
  const t = await getTranslations('services');
  const locale = (await getLocale()) as Locale;

  const items = services.map((service) => {
    const copy = service.copy[locale];
    return {
      slug: service.slug,
      name: copy.name,
      description: copy.description,
      points: copy.points,
      image: service.image,
      alt: `${copy.name} — WATIN`,
    };
  });

  return (
    <section id="services" className="section bg-mist overflow-hidden">
      <div className="wrap mb-12">
        <SectionHeading title={t('title')} intro={t('intro')} />
      </div>
      <HorizontalServices items={items} />
    </section>
  );
}
