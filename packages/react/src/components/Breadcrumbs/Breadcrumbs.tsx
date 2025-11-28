import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronRight, Slash } from 'lucide-react';

// Breadcrumb Styles
const breadcrumbVariants = cva('flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400');

const breadcrumbItemVariants = cva('inline-flex items-center gap-2');

const breadcrumbLinkVariants = cva(
  'transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 rounded-sm',
  {
    variants: {
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
      active: {
        true: 'text-neutral-900 dark:text-neutral-100 font-medium',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
      active: false,
    },
  }
);

const breadcrumbSeparatorVariants = cva('text-neutral-400 dark:text-neutral-600');

// ============================================
// Breadcrumbs Root Component
// ============================================

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  separator?: React.ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      children,
      separator = <ChevronRight className="h-4 w-4" />,
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      className,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);
    const totalItems = childrenArray.length;

    // Collapse logic
    let displayedChildren = childrenArray;
    if (maxItems && totalItems > maxItems) {
      const beforeItems = childrenArray.slice(0, itemsBeforeCollapse);
      const afterItems = childrenArray.slice(totalItems - itemsAfterCollapse);
      const collapsedIndicator = (
        <BreadcrumbItem key="collapsed">
          <span className="px-2">...</span>
        </BreadcrumbItem>
      );
      displayedChildren = [...beforeItems, collapsedIndicator, ...afterItems];
    }

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn(breadcrumbVariants(), className)} {...props}>
        <ol className="flex items-center gap-2">
          {displayedChildren.map((child, index) => {
            const isLast = index === displayedChildren.length - 1;
            return (
              <React.Fragment key={index}>
                {child}
                {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

// ============================================
// BreadcrumbItem Component
// ============================================

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li ref={ref} className={cn(breadcrumbItemVariants(), className)} {...props}>
        {children}
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

// ============================================
// BreadcrumbLink Component
// ============================================

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof breadcrumbLinkVariants> {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  active?: boolean;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ children, href, disabled, active, className, ...props }, ref) => {
    // If no href or disabled, render as span
    if (!href || disabled) {
      return (
        <span
          className={cn(breadcrumbLinkVariants({ disabled: disabled || false, active: active || false }), className)}
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(breadcrumbLinkVariants({ disabled: false, active: active || false }), className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

// ============================================
// BreadcrumbSeparator Component
// ============================================

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ children = <Slash className="h-4 w-4" />, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(breadcrumbSeparatorVariants(), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ============================================
// BreadcrumbPage Component (Current page indicator)
// ============================================

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-current="page"
        className={cn('text-neutral-900 dark:text-neutral-100 font-medium', className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbPage.displayName = 'BreadcrumbPage';
