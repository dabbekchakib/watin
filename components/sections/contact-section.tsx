import { getTranslations } from 'next-intl/server';

import { ContactForm } from '@/components/sections/contact-form';
import { SectionHeading } from '@/components/ui/section-heading';
import { site } from '@/lib/site';

export async function ContactSection() {
  const t = await getTranslations('contact');

  return (
    <section id="contact" className="section border-line border-t bg-white">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading title={t('title')} intro={t('intro')} />
          <div className="mt-10 grid gap-7">
            <div className="border-teal border-s-4 ps-5">
              <p className="text-teal-d text-sm font-bold">{t('addressLabel')}</p>
              <a
                href={site.address.maps}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="text-ink hover:text-teal-d mt-2 inline-block font-bold transition-colors"
              >
                {t('street')}
                <br />
                {t('city')}
              </a>
            </div>
            <div className="border-teal border-s-4 ps-5">
              <p className="text-teal-d text-sm font-bold">{t('phoneLabel')}</p>
              <div className="mt-2 flex flex-col items-start gap-1">
                {site.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    dir="ltr"
                    className="text-ink hover:text-teal-d font-bold transition-colors"
                  >
                    {phone.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
