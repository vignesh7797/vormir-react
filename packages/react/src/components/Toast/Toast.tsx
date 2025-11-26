'use client';

import * as React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/utils';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        info: 'border-info/20 bg-info/10 text-info',
        success: 'border-success/20 bg-success/10 text-success',
        warning: 'border-warning/20 bg-warning/10 text-warning',
        error: 'border-error/20 bg-error/10 text-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Position of toast container */
  position?: ToastPosition;
  /** Maximum number of toasts to show */
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'bottom-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { ...toast, id };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-maxToasts);
      });

      // Auto-dismiss if duration is set
      if (toast.duration !== Infinity && toast.duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration || 5000);
      }

      return id;
    },
    [maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const updateToast = useCallback((id: string, toast: Partial<Toast>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...toast } : t))
    );
  }, []);

  const positionClasses = {
    'top-left': 'top-0 left-0 flex-col',
    'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col',
    'top-right': 'top-0 right-0 flex-col',
    'bottom-left': 'bottom-0 left-0 flex-col-reverse',
    'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse',
    'bottom-right': 'bottom-0 right-0 flex-col-reverse',
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>
      {children}
      <div
        className={cn(
          'fixed z-[100] flex max-h-screen w-full gap-4 p-4 md:max-w-[420px]',
          positionClasses[position]
        )}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => {
              removeToast(toast.id);
              toast.onClose?.();
            }}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const variantIcons = {
  default: AlertCircle,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

function ToastItem({ toast, onClose }: ToastItemProps) {
  const Icon = toast.variant ? variantIcons[toast.variant] : variantIcons.default;

  return (
    <div
      className={cn(toastVariants({ variant: toast.variant }))}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="grid gap-1">
          {toast.title && (
            <div className="text-sm font-semibold">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Helper function for easy toast usage
export function toast(options: Omit<Toast, 'id'>) {
  // This will be called from useToast hook
  return options;
}

toast.success = (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'title' | 'description' | 'variant'>>) => ({
  ...options,
  title,
  description,
  variant: 'success' as ToastVariant,
});

toast.error = (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'title' | 'description' | 'variant'>>) => ({
  ...options,
  title,
  description,
  variant: 'error' as ToastVariant,
});

toast.warning = (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'title' | 'description' | 'variant'>>) => ({
  ...options,
  title,
  description,
  variant: 'warning' as ToastVariant,
});

toast.info = (title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'title' | 'description' | 'variant'>>) => ({
  ...options,
  title,
  description,
  variant: 'info' as ToastVariant,
});
