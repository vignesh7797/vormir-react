import { useEffect, useState, RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Hook that tracks if an element is visible in the viewport
 * @param elementRef - Ref to the element to observe
 * @param options - IntersectionObserver options
 * @returns Object with isIntersecting and entry
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: UseIntersectionObserverOptions = {}
): {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
} {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry || null),
      observerParams
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return {
    isIntersecting: !!entry?.isIntersecting,
    entry,
  };
}
