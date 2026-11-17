export const site = {
  name: 'WATIN',
  nameAr: 'وتين',
  slogan: 'We Move. You Grow.',
  legalName: 'WATIN SARL',
  foundedIn: 2026,
  address: {
    street: "8 Rue d'Irak, B15, 3ème étage",
    city: '1002 Lafayette, Tunis',
    maps: "https://www.google.com/maps/search/?api=1&query=8+Rue+d'Irak+Lafayette+Tunis",
  },
  phones: [
    { label: '(+216) 96 584 737', href: 'tel:+21696584737', whatsapp: '21696584737' },
    { label: '(+216) 52 294 141', href: 'tel:+21652294141' },
  ],
  directors: [
    { name: 'Chakib Dabbek', initials: 'CD', role: 'roleDirector' },
    { name: 'Wafa Ghelici', initials: 'WG', role: 'roleDirectorFemale' },
  ],
} as const;

export const whatsappNumber = site.phones[0].whatsapp;
