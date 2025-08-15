import { useCallback } from 'react';

export default function useSmoothScroll() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { scrollToTop };
}
