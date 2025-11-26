import { useEffect, useRef } from 'react';

/**
 * Hook that manages event listeners with automatic cleanup
 * @param eventName - Name of the event to listen to
 * @param handler - Event handler function
 * @param element - Element to attach listener to (defaults to window)
 * @param options - Event listener options
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: HTMLElement | Window | null,
  options?: boolean | AddEventListenerOptions
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element ?? window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const eventListener: typeof handler = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, eventListener as EventListener, options);

    return () => {
      targetElement.removeEventListener(
        eventName,
        eventListener as EventListener,
        options
      );
    };
  }, [eventName, element, options]);
}
