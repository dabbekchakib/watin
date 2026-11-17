import { getTranslations } from 'next-intl/server';

import { MethodStairs } from '@/components/animations/method-stairs';
import { SectionHeading } from '@/components/ui/section-heading';

export async function MethodSection() {
  const t = await getTranslations('method');

  const steps = [1, 2, 3, 4].map((index) => ({
    title: t(`step${index}Title`),
    description: t(`step${index}Description`),
  }));

  return (
    <section id="approche" className="section">
      <div className="wrap">
        <SectionHeading title={t('title')} intro={t('intro')} />
        <div className="mt-14">
          <MethodStairs steps={steps} />
        </div>
      </div>
    </section>
  );
}
