import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { SplitReveal } from '@/components/animations/split-reveal';
import { MagneticButton } from '@/components/animations/magnetic-button';
import { BlurImage } from '@/components/ui/blur-image';
import { SectionHeading } from '@/components/ui/section-heading';
import { CtaSection } from '@/components/sections/cta-section';
import { MethodSection } from '@/components/sections/method-section';
import { getService, getServiceIndex, services } from '@/content/services';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const service = getService(slug);
  if (!service) return {};

  const meta = await getTranslations({ locale, namespace: 'meta' });
  const copy = service.copy[locale as Locale];

  return buildMetadata({
    locale,
    title: copy.name,
    description: copy.description,
    path: `/services/${slug}`,
    siteName: meta('siteName'),
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const service = getService(slug);
  if (!service) notFound();

  setRequestLocale(locale as Locale);
  const current = locale as Locale;
  const copy = service.copy[current];
  const t = await getTranslations('services');
  const index = getServiceIndex(slug);
  const previous = services[(index - 1 + services.length) % services.length]!;
  const next = services[(index + 1) % services.length]!;

  return (
    <>
      <section className="bg-navy relative overflow-hidden pt-16 pb-24 text-white">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <SplitReveal
              as="h1"
              text={copy.name}
              onLoad
              className="max-w-[16ch] text-[clamp(2.6rem,6vw,5.5rem)] text-white"
            />
            <p className="mt-7 max-w-[52ch] text-lg text-white/75">{copy.description}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <MagneticButton href="/contact" variant="light">
                {t('cta')}
              </MagneticButton>
              <MagneticButton href="/services">{t('all')}</MagneticButton>
            </div>
          </div>
          <div className="clip-w bg-ink relative aspect-[4/3] w-full overflow-hidden">
            <BlurImage
              src={service.image}
              alt={copy.name}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(19,58,111,0.35),rgba(20,153,143,0.08))]" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading title={t('keyPoints')} />
          <ScrollReveal>
            <ul className="grid gap-5">
              {copy.points.map((point, pointIndex) => (
                <li key={point} className="border-line flex items-start gap-5 border-b pb-5">
                  <span className="text-teal text-2xl font-extrabold">
                    {String(pointIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink text-[1.15rem] font-semibold">{point}</span>
                </li>
              ))}
            </ul>
            <nav
              aria-label={t('all')}
              className="border-line mt-12 grid gap-4 border-t pt-8 sm:grid-cols-2"
            >
              <Link href={`/services/${previous.slug}`} className="group text-start">
                <small className="text-teal-d block text-sm font-bold">{t('previous')}</small>
                <span className="text-navy group-hover:text-teal-d mt-1 block text-lg font-bold transition-colors">
                  <span
                    aria-hidden="true"
                    className="inline-block"
                    style={{ transform: 'scaleX(var(--dir-sign))' }}
                  >
                    ←
                  </span>{' '}
                  {previous.copy[current].name}
                </span>
              </Link>
              <Link href={`/services/${next.slug}`} className="group text-end">
                <small className="text-teal-d block text-sm font-bold">{t('next')}</small>
                <span className="text-navy group-hover:text-teal-d mt-1 block text-lg font-bold transition-colors">
                  {next.copy[current].name}{' '}
                  <span
                    aria-hidden="true"
                    className="inline-block"
                    style={{ transform: 'scaleX(var(--dir-sign))' }}
                  >
                    →
                  </span>
                </span>
              </Link>
            </nav>
          </ScrollReveal>
        </div>
      </section>

      <MethodSection />
      <CtaSection />
    </>
  );
}
