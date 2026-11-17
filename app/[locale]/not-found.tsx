import { getLocale, getTranslations } from 'next-intl/server';

import { MagneticButton } from '@/components/animations/magnetic-button';
import { GrowthArrow } from '@/components/animations/growth-arrow';
import { routing, type Locale } from '@/i18n/routing';

export default async function LocaleNotFound() {
  let current: Locale = routing.defaultLocale;
  try {
    const locale = await getLocale();
    if (routing.locales.includes(locale as Locale)) current = locale as Locale;
  } catch {
    current = routing.defaultLocale;
  }
  const t = await getTranslations('notFound');

  return (
    <section className="bg-navy relative grid min-h-[75vh] place-items-center overflow-hidden py-24 text-center text-white">
      <GrowthArrow className="absolute inset-0 h-full w-full opacity-20" />
      <div className="wrap relative">
        <p className="text-teal-l text-[clamp(5rem,16vw,12rem)] leading-none font-extrabold">404</p>
        <h1 className="mx-auto mt-4 max-w-[20ch] text-[clamp(2rem,5vw,3.5rem)] text-white">
          {t('title')}
        </h1>
        <p className="mx-auto mt-5 max-w-[48ch] text-white/70">{t('text')}</p>
        <div className="mt-10 flex justify-center">
          <MagneticButton href="/" variant="light">
            {t('back')}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
