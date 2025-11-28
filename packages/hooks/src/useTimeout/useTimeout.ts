import { useEffect, useRef } from 'react';

/**
 * Hook that creates a declarative timeout
 * @param callback - Function to run after timeout
 * @param delay - Delay in milliseconds (null to pause)
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}
