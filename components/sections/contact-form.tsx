'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { fieldStyles } from '@/components/ui/button';
import { services } from '@/content/services';
import type { Locale } from '@/i18n/routing';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('form');
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<Status>('idle');
  const [mode, setMode] = useState<'email' | 'whatsapp'>('whatsapp');

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t('nameError')),
        service: z.string().min(1),
        message: z.string().trim().min(10, t('messageError')),
      }),
    [t],
  );

  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', service: services[0]?.slug ?? '', message: '' },
  });

  const names = services.map((service) => ({
    slug: service.slug,
    name: service.copy[locale].name,
  }));

  const onSubmit = async (values: Values) => {
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          service: names.find((item) => item.slug === values.service)?.name ?? values.service,
          message: values.message,
          locale,
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        mode?: 'email' | 'whatsapp';
        url?: string;
      };

      if (!response.ok || !data.ok) throw new Error('contact_failed');

      setMode(data.mode ?? 'whatsapp');
      setStatus('success');
      if (data.mode === 'whatsapp' && data.url) {
        window.open(data.url, '_blank', 'noopener,noreferrer');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-mist grid gap-5 rounded-[var(--form-radius)] p-7 sm:p-9"
    >
      <label htmlFor="contact-name" className="text-ink grid gap-2 text-sm font-bold">
        {t('name')}
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={fieldStyles}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')}
        />
      </label>
      {errors.name ? (
        <p id="contact-name-error" role="alert" className="text-teal-d -mt-3 text-sm font-semibold">
          {errors.name.message}
        </p>
      ) : null}

      <label htmlFor="contact-service" className="text-ink grid gap-2 text-sm font-bold">
        {t('service')}
        <select id="contact-service" className={fieldStyles} {...register('service')}>
          {names.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
          <option value="other">{t('other')}</option>
        </select>
      </label>

      <label htmlFor="contact-message" className="text-ink grid gap-2 text-sm font-bold">
        {t('message')}
        <textarea
          id="contact-message"
          rows={5}
          className={`${fieldStyles} min-h-32 resize-y`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message')}
        />
      </label>
      {errors.message ? (
        <p
          id="contact-message-error"
          role="alert"
          className="text-teal-d -mt-3 text-sm font-semibold"
        >
          {errors.message.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="border-teal-d bg-teal-d hover:border-navy hover:bg-navy w-fit rounded-full border-2 px-8 py-3.5 font-bold text-white transition-colors disabled:cursor-wait disabled:opacity-60"
      >
        {status === 'sending' ? t('sending') : t('send')}
      </button>

      <p aria-live="polite" className="min-h-6 text-sm font-semibold">
        {status === 'success' ? (
          <span className="text-teal-d">
            {mode === 'email' ? t('successEmail') : t('successWhatsApp')}
          </span>
        ) : null}
        {status === 'error' ? <span className="text-teal-d">{t('error')}</span> : null}
      </p>
    </form>
  );
}
