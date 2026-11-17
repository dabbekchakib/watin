'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const frame = requestAnimationFrame(() => setMatches(media.matches));
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', onChange);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener('change', onChange);
    };
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsTouch() {
  return useMediaQuery('(max-width: 767px), (hover: none), (pointer: coarse)');
}
