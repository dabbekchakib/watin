import clsx, { type ClassValue } from 'clsx';

import { site } from './site';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.phones[0].whatsapp}?text=${encodeURIComponent(message)}`;
}
