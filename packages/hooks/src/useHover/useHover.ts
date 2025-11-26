import { useState, useEffect, RefObject } from 'react';

/**
 * Hook that tracks hover state of an element
 * @param elementRef - Ref to the element to track
 * @returns boolean indicating if element is hovered
 */
export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
): boolean {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef]);

  return isHovered;
}
