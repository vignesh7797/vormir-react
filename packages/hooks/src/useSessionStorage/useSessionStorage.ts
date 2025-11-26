import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = (value: T | ((val: T) => T)) => void;

/**
 * Hook for syncing state with sessionStorage
 * @param key - sessionStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns Tuple of [value, setValue, removeValue]
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, () => void] {
  // Get initial value from sessionStorage or use initialValue
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Set value to sessionStorage
  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting sessionStorage key "${key}" even though environment is not a client`
        );
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.sessionStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
        window.dispatchEvent(new Event('session-storage'));
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from sessionStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') {
      console.warn(
        `Tried removing sessionStorage key "${key}" even though environment is not a client`
      );
    }

    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
      window.dispatchEvent(new Event('session-storage'));
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | Event) => {
      if ('key' in e && e.key && e.key !== key) {
        return;
      }
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('session-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('session-storage', handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}
