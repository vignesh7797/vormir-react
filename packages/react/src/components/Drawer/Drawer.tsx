import React, { useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

const drawerVariants = cva(
  'fixed z-50 bg-white dark:bg-neutral-950 shadow-xl transition-transform duration-300 ease-in-out',
  {
    variants: {
      position: {
        left: 'top-0 left-0 h-full',
        right: 'top-0 right-0 h-full',
        top: 'top-0 left-0 w-full',
        bottom: 'bottom-0 left-0 w-full',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        full: '',
      },
    },
    compoundVariants: [
      { position: 'left', size: 'sm', class: 'w-64' },
      { position: 'left', size: 'md', class: 'w-80' },
      { position: 'left', size: 'lg', class: 'w-96' },
      { position: 'left', size: 'full', class: 'w-full' },
      { position: 'right', size: 'sm', class: 'w-64' },
      { position: 'right', size: 'md', class: 'w-80' },
      { position: 'right', size: 'lg', class: 'w-96' },
      { position: 'right', size: 'full', class: 'w-full' },
      { position: 'top', size: 'sm', class: 'h-48' },
      { position: 'top', size: 'md', class: 'h-64' },
      { position: 'top', size: 'lg', class: 'h-96' },
      { position: 'top', size: 'full', class: 'h-full' },
      { position: 'bottom', size: 'sm', class: 'h-48' },
      { position: 'bottom', size: 'md', class: 'h-64' },
      { position: 'bottom', size: 'lg', class: 'h-96' },
      { position: 'bottom', size: 'full', class: 'h-full' },
    ],
    defaultVariants: {
      position: 'right',
      size: 'md',
    },
  }
);

const overlayVariants = cva(
  'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
  {
    variants: {
      open: {
        true: 'opacity-100',
        false: 'opacity-0 pointer-events-none',
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

// ============================================
// Drawer Component
// ============================================

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof drawerVariants> {
  /** Whether drawer is open */
  open: boolean;
  /** Callback when drawer close is requested */
  onClose: () => void;
  /** Drawer title */
  title?: React.ReactNode;
  /** Drawer description */
  description?: string;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on Escape key */
  closeOnEscape?: boolean;
  /** Disable body scroll when open */
  disableBodyScroll?: boolean;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      disableBodyScroll = true,
      position = 'right',
      size = 'md',
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Handle escape key
    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape' && open) {
          onClose();
        }
      },
      [closeOnEscape, open, onClose]
    );

    // Handle body scroll
    useEffect(() => {
      if (!open || !disableBodyScroll) return;

      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, [open, disableBodyScroll]);

    // Handle escape key
    useEffect(() => {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [handleEscape]);

    if (!open) return null;

    // Determine slide direction
    const getTransform = () => {
      if (!open) {
        switch (position) {
          case 'left':
            return '-translate-x-full';
          case 'right':
            return 'translate-x-full';
          case 'top':
            return '-translate-y-full';
          case 'bottom':
            return 'translate-y-full';
          default:
            return '';
        }
      }
      return 'translate-x-0 translate-y-0';
    };

    return (
      <>
        {/* Overlay */}
        <div
          className={overlayVariants({ open })}
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
          aria-describedby={description ? 'drawer-description' : undefined}
          className={cn(drawerVariants({ position, size }), getTransform(), className)}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex-1">
                {title && (
                  <h2
                    id="drawer-title"
                    className="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="drawer-description"
                    className="mt-1 text-sm text-neutral-600 dark:text-neutral-400"
                  >
                    {description}
                  </p>
                )}
              </div>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500"
                  aria-label="Close drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </>
    );
  }
);

Drawer.displayName = 'Drawer';
