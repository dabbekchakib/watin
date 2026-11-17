import { getLocale, getTranslations } from 'next-intl/server';

import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { BlurImage } from '@/components/ui/blur-image';
import { SectionHeading } from '@/components/ui/section-heading';
import { services } from '@/content/services';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export async function ServicesIndex() {
  const t = await getTranslations('services');
  const locale = (await getLocale()) as Locale;

  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading title={t('title')} intro={t('intro')} />

        <div className="border-line mt-16 border-t">
          {services.map((service, index) => {
            const copy = service.copy[locale];
            return (
              <ScrollReveal key={service.slug}>
                <article className="group border-line grid gap-5 border-b py-8 md:grid-cols-[auto_160px_1fr_1fr_auto] md:items-center md:gap-8">
                  <span className="text-teal/40 text-3xl font-extrabold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="clip-w bg-navy relative hidden h-24 overflow-hidden md:block">
                    <BlurImage
                      src={service.image}
                      alt={copy.name}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-navy text-[1.5rem]">{copy.name}</h3>
                  <p className="text-body max-w-[52ch] text-[0.95rem]">{copy.description}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="border-navy text-navy hover:border-teal-d hover:bg-teal-d inline-flex w-fit items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors hover:text-white"
                  >
                    {t('detail')}
                    <span
                      aria-hidden="true"
                      className="inline-block"
                      style={{ transform: 'scaleX(var(--dir-sign))' }}
                    >
                      →
                    </span>
                  </Link>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
