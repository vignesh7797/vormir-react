import React from 'react';
import { cn } from '../../utils/cn';

// ============================================
// Kbd Component (Keyboard Shortcut Display)
// ============================================

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          'inline-flex h-5 items-center gap-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-1.5 font-mono text-[10px] font-medium text-neutral-600 dark:text-neutral-400 shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = 'Kbd';
