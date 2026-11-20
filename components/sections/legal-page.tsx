import { getTranslations } from 'next-intl/server';

import { SectionHeading } from '@/components/ui/section-heading';

type Section = { heading: string; body: string[] };

export async function LegalPage({ namespace }: { namespace: 'privacy' | 'terms' }) {
  const t = await getTranslations(namespace);
  const sections = t.raw('sections') as Section[];

  return (
    <section className="section">
      <div className="wrap max-w-[860px]">
        <SectionHeading title={t('title')} intro={t('intro')} />
        <p className="text-body mt-4 text-sm">{t('updated')}</p>

        <div className="mt-12 grid gap-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-navy text-[1.35rem]">{section.heading}</h2>
              <div className="mt-3 grid gap-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
