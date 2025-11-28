import { useState, useCallback } from 'react';

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

/**
 * Hook for managing counter state
 * @param initialValue - Initial counter value (default: 0)
 * @param min - Minimum value (optional)
 * @param max - Maximum value (optional)
 * @returns Object with count and control functions
 */
export function useCounter(
  initialValue = 0,
  min?: number,
  max?: number
): UseCounterReturn {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      if (max !== undefined && next > max) return prev;
      return next;
    });
  }, [max]);

  const decrement = useCallback(() => {
    setCount((prev) => {
      const next = prev - 1;
      if (min !== undefined && next < min) return prev;
      return next;
    });
  }, [min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = useCallback(
    (value: number) => {
      if (min !== undefined && value < min) return;
      if (max !== undefined && value > max) return;
      setCount(value);
    },
    [min, max]
  );

  return { count, increment, decrement, reset, set };
}
