import { useEffect } from 'react';

/**
 * Hook that locks body scroll when active
 * @param enabled - Whether to lock body scroll
 */
export function useLockBodyScroll(enabled = true): void {
  useEffect(() => {
    if (!enabled) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;

    // Get the scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Lock the scroll
    document.body.style.overflow = 'hidden';
    
    // Prevent layout shift by adding padding
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [enabled]);
}
