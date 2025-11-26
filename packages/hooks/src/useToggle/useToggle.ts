import { useState, useCallback } from 'react';

/**
 * Hook for toggling a boolean value
 * @param initialValue - Initial boolean value (default: false)
 * @returns Tuple of [value, toggle, setValue]
 */
export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}
