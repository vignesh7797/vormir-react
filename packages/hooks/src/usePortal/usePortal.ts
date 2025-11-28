import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Hook that creates a portal for rendering content outside the parent component
 * @param id - ID of the portal container (optional)
 * @returns Function to create portal
 */
export function usePortal(id?: string): (children: React.ReactNode) => React.ReactPortal | null {
  const [mounted, setMounted] = useState(false);
  const portalRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const portalId = id || 'portal-root';
    let portalRoot = document.getElementById(portalId);

    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.id = portalId;
      document.body.appendChild(portalRoot);
    }

    portalRootRef.current = portalRoot;

    return () => {
      // Only remove if we created it and it has no children
      if (
        portalRoot &&
        !id &&
        portalRoot.childElementCount === 0 &&
        portalRoot.parentNode
      ) {
        portalRoot.parentNode.removeChild(portalRoot);
      }
    };
  }, [id]);

  return (children: React.ReactNode) => {
    if (!mounted || !portalRootRef.current) {
      return null;
    }
    return createPortal(children, portalRootRef.current);
  };
}
