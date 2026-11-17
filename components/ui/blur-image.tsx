import Image, { type ImageProps } from 'next/image';

import { blurDataUrl } from '@/lib/images';

type Props = Omit<ImageProps, 'placeholder' | 'blurDataURL' | 'alt'> & { alt: string };

export function BlurImage({ alt, ...props }: Props) {
  return <Image {...props} alt={alt} placeholder="blur" blurDataURL={blurDataUrl} />;
}
