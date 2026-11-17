import { getTranslations } from 'next-intl/server';

import { GrowthArrow } from '@/components/animations/growth-arrow';
import { HeroBackground } from '@/components/animations/hero-background';
import { MagneticButton } from '@/components/animations/magnetic-button';
import { SplitReveal } from '@/components/animations/split-reveal';
import Image from 'next/image';
import { heroImage } from '@/content/services';

export async function HeroSection() {
  const t = await getTranslations('hero');

  return (
    <section className="relative isolate overflow-hidden pt-10 pb-24 lg:pt-16 lg:pb-32">
      <HeroBackground />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="relative z-10">
          <SplitReveal
            as="h1"
            text={t('title')}
            onLoad
            delay={0.12}
            stagger={0.075}
            className="text-navy max-w-[14ch] text-[clamp(2.7rem,7.6vw,7.5rem)] leading-[0.94]"
          />
          <SplitReveal
            as="p"
            text={t('subtitle')}
            onLoad
            delay={0.25}
            stagger={0.012}
            className="text-body mt-8 max-w-[52ch] text-[1.05rem] leading-relaxed lg:text-[1.15rem]"
          />
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="/contact">{t('primaryCta')}</MagneticButton>
            <MagneticButton href="/services" variant="outline">
              {t('secondaryCta')}
            </MagneticButton>
          </div>
        </div>

        <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[600px]">
          <div className="clip-w bg-navy absolute inset-0 overflow-hidden">
            <Image
              src={heroImage}
              alt={`${t('tagTop')} — ${t('tagBottom')}`}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(19,58,111,0.42),rgba(20,153,143,0.12))]" />
          </div>
          <GrowthArrow className="absolute -inset-x-[6%] -inset-y-[3%] h-[106%] w-[112%]" />
          <div className="border-teal absolute start-[-3%] bottom-[6%] rounded-2xl border-s-4 bg-white px-5 py-4 shadow-[0_18px_45px_rgba(13,37,69,0.18)]">
            <span className="text-ink block text-[0.95rem] font-bold">{t('tagTop')}</span>
            <small className="text-body block text-sm">{t('tagBottom')}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
