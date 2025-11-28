import { useState, useCallback } from 'react';

export interface UseAsyncReturn<T, E = string> {
  execute: (...args: any[]) => Promise<T | undefined>;
  value: T | undefined;
  error: E | undefined;
  loading: boolean;
}

/**
 * Hook for managing async operations
 * @param asyncFunction - Async function to execute
 * @returns Object with execute function, value, error, and loading state
 */
export function useAsync<T, E = string>(
  asyncFunction: (...args: any[]) => Promise<T>
): UseAsyncReturn<T, E> {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState<E | undefined>(undefined);

  const execute = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setValue(undefined);
      setError(undefined);

      try {
        const response = await asyncFunction(...args);
        setValue(response);
        return response;
      } catch (err) {
        setError(err as E);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { execute, value, error, loading };
}
