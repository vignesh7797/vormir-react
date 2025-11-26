'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const textVariants = cva('', {
  variants: {
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      success: 'text-success',
      error: 'text-error',
      warning: 'text-warning',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    color: 'default',
    truncate: false,
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  /** Change the default rendered element */
  as?: React.ElementType;
  /** Render as a Slot component */
  asChild?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = 'span',
      asChild = false,
      className,
      size,
      weight,
      align,
      color,
      truncate,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : Component;

    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ size, weight, align, color, truncate, className }))}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';
