'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** Change the default rendered element */
  as?: React.ElementType;
  /** Render as a Slot component */
  asChild?: boolean;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : Component;

    return <Comp ref={ref} className={cn(className)} {...props} />;
  }
);

Box.displayName = 'Box';
