import { useRef, useEffect } from 'react';

/**
 * Hook that returns the previous value of a state or prop
 * @param value - Value to track
 * @returns Previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
