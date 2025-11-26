import { useRef, useCallback } from 'react';

/**
 * Hook that throttles a function
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds (default: 500)
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay = 500
): T {
  const lastRan = useRef<number>(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}
