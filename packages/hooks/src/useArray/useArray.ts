import { useState, useCallback } from 'react';

export interface UseArrayReturn<T> {
  array: T[];
  set: (array: T[]) => void;
  push: (element: T) => void;
  filter: (callback: (item: T, index: number) => boolean) => void;
  update: (index: number, element: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

/**
 * Hook for managing array state with helpful methods
 * @param initialArray - Initial array value
 * @returns Object with array and manipulation methods
 */
export function useArray<T>(initialArray: T[] = []): UseArrayReturn<T> {
  const [array, setArray] = useState(initialArray);

  const push = useCallback((element: T) => {
    setArray((prev) => [...prev, element]);
  }, []);

  const filter = useCallback(
    (callback: (item: T, index: number) => boolean) => {
      setArray((prev) => prev.filter(callback));
    },
    []
  );

  const update = useCallback((index: number, element: T) => {
    setArray((prev) => {
      const newArray = [...prev];
      newArray[index] = element;
      return newArray;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const set = useCallback((newArray: T[]) => {
    setArray(newArray);
  }, []);

  return { array, set, push, filter, update, remove, clear };
}
