'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Show required indicator */
  isRequired?: boolean;
  /** Disabled state */
  isDisabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, isRequired, isDisabled, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          isDisabled && 'cursor-not-allowed opacity-70',
          className
        )}
        {...props}
      >
        {children}
        {isRequired && (
          <span className="ml-1 text-error" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';
