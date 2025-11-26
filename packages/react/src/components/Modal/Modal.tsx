'use client';

import * as React from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  open?: boolean;
  /** Callback when modal should close */
  onClose?: () => void;
  /** Whether clicking overlay closes modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing ESC closes modal */
  closeOnEscape?: boolean;
  /** Size of the modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether to show close button */
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      children,
      open = false,
      onClose,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      size = 'md',
      showCloseButton = true,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const finalRef = (ref as React.RefObject<HTMLDivElement>) || modalRef;

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
      if (!open) return;
      
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [open]);

    // Focus trap
    useEffect(() => {
      if (!open || !finalRef.current) return;

      const focusableElements = finalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      firstElement?.focus();
      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }, [open, finalRef]);

    if (!open) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose?.();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in" />
        
        {/* Modal Content */}
        <div
          ref={finalRef}
          className={cn(
            'relative z-50 w-full rounded-lg border bg-background p-6 shadow-lg animate-in fade-in zoom-in-95',
            sizeClasses[size],
            className
          )}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
        {...props}
      />
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
      />
    );
  }
);

ModalTitle.displayName = 'ModalTitle';

export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      />
    );
  }
);

ModalDescription.displayName = 'ModalDescription';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
        {...props}
      />
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
