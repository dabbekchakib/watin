'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { CustomCursor } from '@/components/animations/custom-cursor';
import { MotionProvider } from '@/components/animations/motion-provider';
import { PageTransition } from '@/components/animations/page-transition';
import { Preloader } from '@/components/animations/preloader';
import { ScrollProgressBar } from '@/components/animations/scroll-progress-bar';
import { SmoothScroll } from '@/components/animations/smooth-scroll';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import type { Locale } from '@/i18n/routing';

export function AppShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = useTranslations('common');

  return (
    <MotionProvider>
      <a
        href="#content"
        className="bg-teal sr-only z-[140] rounded-full px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {t('skip')}
      </a>
      <ScrollProgressBar />
      <SmoothScroll locale={locale} />
      <Preloader />
      <PageTransition>
        <Header />
        <main id="content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </PageTransition>
      <CustomCursor />
    </MotionProvider>
  );
}
