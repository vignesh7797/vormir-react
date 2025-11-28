import { useState, useEffect, useCallback } from 'react';

export interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  initialData?: T;
}

export interface UseFetchReturn<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  refetch: () => Promise<void>;
}

/**
 * Hook for data fetching
 * @param url - URL to fetch from
 * @param options - Fetch options and callbacks
 * @returns Object with data, error, loading state, and refetch function
 */
export function useFetch<T = any>(
  url: string,
  options?: UseFetchOptions<T>
): UseFetchReturn<T> {
  const [data, setData] = useState<T | undefined>(options?.initialData);
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      
      if (options?.onError) {
        options.onError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}
