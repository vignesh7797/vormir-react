import { useState, useCallback } from 'react';

export interface UseClipboardReturn {
  value: string;
  copied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

/**
 * Hook for copying text to clipboard
 * @param timeout - Time in ms before resetting copied state (default: 2000)
 * @returns Object with clipboard value, copied state, and control functions
 */
export function useClipboard(timeout = 2000): UseClipboardReturn {
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        setValue(text);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, timeout);
      } catch (error) {
        console.error('Failed to copy text:', error);
        setCopied(false);
      }
    },
    [timeout]
  );

  const reset = useCallback(() => {
    setValue('');
    setCopied(false);
  }, []);

  return { value, copied, copy, reset };
}
