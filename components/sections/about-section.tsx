import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { SplitReveal } from '@/components/animations/split-reveal';
import { site } from '@/lib/site';

export async function AboutSection() {
  const t = await getTranslations('about');

  return (
    <section id="apropos" className="section bg-navy relative overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="bg-teal/10 absolute -end-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
      />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <ScrollReveal>
          <div className="rounded-[var(--panel-radius)] bg-white p-8 shadow-[0_28px_70px_rgba(0,0,0,0.28)] sm:p-12">
            <Image
              src="/watin-logo.png"
              alt="WATIN | وتين"
              width={3670}
              height={2316}
              className="h-auto w-full"
            />
          </div>
        </ScrollReveal>

        <div>
          <span className="eyebrow-rule bg-teal-l mb-6" aria-hidden="true" />
          <SplitReveal
            as="h2"
            text={t('title')}
            className="max-w-[18ch] text-[clamp(2rem,3.8vw,3.1rem)] text-white"
          />
          <p className="mt-6 max-w-[62ch] text-white/75">{t('text')}</p>

          <div className="mt-12 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-2">
            {site.directors.map((director) => (
              <div key={director.name} className="flex items-center gap-4">
                <span className="bg-teal-d grid h-14 w-14 shrink-0 place-items-center rounded-full text-lg font-extrabold text-white">
                  {director.initials}
                </span>
                <div>
                  <p className="font-bold text-white">{director.name}</p>
                  <p className="text-sm text-white/60">{t(director.role)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
