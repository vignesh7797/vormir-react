'use client';

import { forwardRef } from 'react';
import { Slot } from '../Slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        solid: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 text-xs',
        sm: 'h-8 text-xs',
        md: 'h-10',
        lg: 'h-11',
        xl: 'h-12 text-base',
      },
      colorScheme: {
        brand: '',
        success: '',
        error: '',
        warning: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        colorScheme: 'success',
        className: 'bg-success text-success-foreground hover:bg-success/90',
      },
      {
        variant: 'solid',
        colorScheme: 'error',
        className: 'bg-error text-error-foreground hover:bg-error/90',
      },
      {
        variant: 'solid',
        colorScheme: 'warning',
        className: 'bg-warning text-warning-foreground hover:bg-warning/90',
      },
      {
        variant: 'outline',
        colorScheme: 'success',
        className: 'border-success text-success hover:bg-success/10',
      },
      {
        variant: 'outline',
        colorScheme: 'error',
        className: 'border-error text-error hover:bg-error/10',
      },
      {
        variant: 'outline',
        colorScheme: 'warning',
        className: 'border-warning text-warning hover:bg-warning/10',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      colorScheme: 'brand',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a different component */
  asChild?: boolean;
  /** Show loading spinner */
  isLoading?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      colorScheme,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, colorScheme, className }))}
        style={{
          borderRadius: 'var(--button-radius)',
          padding: size === 'xs' || size === 'sm' ? 'var(--button-padding-sm)' : size === 'lg' || size === 'xl' ? 'var(--button-padding-lg)' : 'var(--button-padding-md)',
          transition: 'var(--transition-button)',
          boxShadow: variant === 'solid' ? 'var(--shadow-sm)' : undefined,
          ...(props.style || {}),
        }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="button-icon-left">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="button-icon-right">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
