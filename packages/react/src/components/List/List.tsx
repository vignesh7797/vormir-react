import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const listVariants = cva('space-y-2', {
  variants: {
    variant: {
      unordered: 'list-disc',
      ordered: 'list-decimal',
      none: 'list-none',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'unordered',
    size: 'md',
  },
});

const listItemVariants = cva('', {
  variants: {
    variant: {
      default: '',
      hover: 'hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition-colors',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ============================================
// List Component
// ============================================

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  children: React.ReactNode;
  /** Custom spacing between items */
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ children, variant = 'unordered', size, spacing, className, ...props }, ref) => {
    const Component = variant === 'ordered' ? 'ol' : 'ul';

    const spacingClass = spacing
      ? {
          xs: 'space-y-1',
          sm: 'space-y-2',
          md: 'space-y-3',
          lg: 'space-y-4',
          xl: 'space-y-6',
        }[spacing]
      : undefined;

    return (
      <Component
        ref={ref as any}
        className={cn(
          listVariants({ variant, size }),
          variant !== 'none' && 'pl-5',
          spacingClass,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

List.displayName = 'List';

// ============================================
// ListItem Component
// ============================================

export interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof listItemVariants> {
  children: React.ReactNode;
  /** Leading icon */
  icon?: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, variant, icon, className, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(listItemVariants({ variant }), icon && 'flex items-start gap-2', className)} {...props}>
        {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
        <span>{children}</span>
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';
