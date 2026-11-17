import type { MetadataRoute } from 'next';

import { services } from '@/content/services';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '',
    '/services',
    '/a-propos',
    '/contact',
    ...services.map((service) => `/services/${service.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, `${baseUrl}/${item}${path}`]),
        ),
      },
    })),
  );
}
