'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const inputVariants = cva(
  'flex w-full rounded-md border bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input',
        filled: 'border-transparent bg-muted',
        flushed: 'rounded-none border-x-0 border-t-0 border-b-2 px-0',
      },
      size: {
        sm: 'h-8 px-3 py-1',
        md: 'h-10 px-3 py-2',
        lg: 'h-12 px-4 py-3',
      },
      state: {
        default: '',
        error: 'border-error focus-visible:ring-error',
        success: 'border-success focus-visible:ring-success',
        warning: 'border-warning focus-visible:ring-warning',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Error state */
  isInvalid?: boolean;
  /** Required field */
  isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      size,
      state,
      isInvalid,
      isRequired,
      ...props
    },
    ref
  ) => {
    const computedState = isInvalid ? 'error' : state;

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, size, state: computedState, className }))}
        style={{
          borderRadius: 'var(--input-radius)',
          padding: 'var(--input-padding)',
          transition: 'var(--transition-base)',
          ...(props.style || {}),
        }}
        ref={ref}
        required={isRequired}
        aria-invalid={isInvalid}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
