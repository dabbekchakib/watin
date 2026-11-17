import { site } from '@/lib/site';

export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const address = {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: 'TN',
  };

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'WATIN | وتين',
        alternateName: 'WATIN',
        slogan: site.slogan,
        address,
        telephone: site.phones.map((phone) => phone.label),
        founders: site.directors.map((director) => ({ '@type': 'Person', name: director.name })),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#business`,
        name: 'WATIN',
        address,
        telephone: site.phones.map((phone) => phone.label),
        parentOrganization: { '@id': `${baseUrl}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
