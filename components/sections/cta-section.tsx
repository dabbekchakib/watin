import { getTranslations } from 'next-intl/server';

import { CtaFill } from '@/components/animations/cta-fill';

export async function CtaSection() {
  const t = await getTranslations('cta');

  return <CtaFill title={t('title')} subtitle={t('subtitle')} buttonLabel={t('button')} />;
}
