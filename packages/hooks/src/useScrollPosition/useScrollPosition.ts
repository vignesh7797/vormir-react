import { useState, useEffect } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Hook that tracks the scroll position of the window or an element
 * @param element - Optional element to track (defaults to window)
 * @returns Object with x and y scroll positions
 */
export function useScrollPosition(
  element?: HTMLElement | null
): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const target = element || window;
    
    const handleScroll = () => {
      if (element) {
        setPosition({
          x: element.scrollLeft,
          y: element.scrollTop,
        });
      } else {
        setPosition({
          x: window.pageXOffset || window.scrollX,
          y: window.pageYOffset || window.scrollY,
        });
      }
    };

    // Set initial position
    handleScroll();

    target.addEventListener('scroll', handleScroll as EventListener);

    return () => {
      target.removeEventListener('scroll', handleScroll as EventListener);
    };
  }, [element]);

  return position;
}
