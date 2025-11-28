import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

// Badge Styles
const badgeVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border',
        outline: 'border-2',
        solid: 'border-0',
        subtle: 'border-0',
      },
      colorScheme: {
        brand: '',
        success: '',
        error: '',
        warning: '',
        info: '',
        neutral: '',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
    },
    compoundVariants: [
      // Default variant
      { variant: 'default', colorScheme: 'brand', className: 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-900/20 dark:text-brand-400 dark:border-brand-800' },
      { variant: 'default', colorScheme: 'success', className: 'bg-success-50 text-success-700 border-success-200 dark:bg-success-900/20 dark:text-success-400 dark:border-success-800' },
      { variant: 'default', colorScheme: 'error', className: 'bg-error-50 text-error-700 border-error-200 dark:bg-error-900/20 dark:text-error-400 dark:border-error-800' },
      { variant: 'default', colorScheme: 'warning', className: 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-900/20 dark:text-warning-400 dark:border-warning-800' },
      { variant: 'default', colorScheme: 'info', className: 'bg-info-50 text-info-700 border-info-200 dark:bg-info-900/20 dark:text-info-400 dark:border-info-800' },
      { variant: 'default', colorScheme: 'neutral', className: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700' },
      
      // Outline variant
      { variant: 'outline', colorScheme: 'brand', className: 'bg-transparent text-brand-600 border-brand-500 dark:text-brand-400 dark:border-brand-600' },
      { variant: 'outline', colorScheme: 'success', className: 'bg-transparent text-success-600 border-success-500 dark:text-success-400 dark:border-success-600' },
      { variant: 'outline', colorScheme: 'error', className: 'bg-transparent text-error-600 border-error-500 dark:text-error-400 dark:border-error-600' },
      { variant: 'outline', colorScheme: 'warning', className: 'bg-transparent text-warning-600 border-warning-500 dark:text-warning-400 dark:border-warning-600' },
      { variant: 'outline', colorScheme: 'info', className: 'bg-transparent text-info-600 border-info-500 dark:text-info-400 dark:border-info-600' },
      { variant: 'outline', colorScheme: 'neutral', className: 'bg-transparent text-neutral-600 border-neutral-400 dark:text-neutral-400 dark:border-neutral-600' },
      
      // Solid variant
      { variant: 'solid', colorScheme: 'brand', className: 'bg-brand-600 text-white dark:bg-brand-500' },
      { variant: 'solid', colorScheme: 'success', className: 'bg-success-600 text-white dark:bg-success-500' },
      { variant: 'solid', colorScheme: 'error', className: 'bg-error-600 text-white dark:bg-error-500' },
      { variant: 'solid', colorScheme: 'warning', className: 'bg-warning-600 text-white dark:bg-warning-500' },
      { variant: 'solid', colorScheme: 'info', className: 'bg-info-600 text-white dark:bg-info-500' },
      { variant: 'solid', colorScheme: 'neutral', className: 'bg-neutral-600 text-white dark:bg-neutral-500' },
      
      // Subtle variant
      { variant: 'subtle', colorScheme: 'brand', className: 'bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300' },
      { variant: 'subtle', colorScheme: 'success', className: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300' },
      { variant: 'subtle', colorScheme: 'error', className: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300' },
      { variant: 'subtle', colorScheme: 'warning', className: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300' },
      { variant: 'subtle', colorScheme: 'info', className: 'bg-info-100 text-info-800 dark:bg-info-900/30 dark:text-info-300' },
      { variant: 'subtle', colorScheme: 'neutral', className: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200' },
    ],
    defaultVariants: {
      variant: 'default',
      colorScheme: 'neutral',
      size: 'md',
    },
  }
);

// ============================================
// Badge Component
// ============================================

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  /** Icon before text */
  icon?: React.ReactNode;
  /** Make badge removable with close button */
  removable?: boolean;
  /** Callback when close button is clicked */
  onRemove?: () => void;
  /** Show dot indicator */
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant,
      colorScheme,
      size,
      icon,
      removable,
      onRemove,
      dot,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, colorScheme, size }), className)}
        style={{
          borderRadius: 'var(--badge-radius)',
          transition: 'var(--transition-base)',
          ...(props.style || {}),
        }}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              colorScheme === 'brand' && 'bg-brand-500',
              colorScheme === 'success' && 'bg-success-500',
              colorScheme === 'error' && 'bg-error-500',
              colorScheme === 'warning' && 'bg-warning-500',
              colorScheme === 'info' && 'bg-info-500',
              colorScheme === 'neutral' && 'bg-neutral-500'
            )}
          />
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Remove badge"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// ============================================
// BadgeGroup Component
// ============================================

export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Maximum number of badges to show before truncating */
  max?: number;
}

export const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ children, max, className, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const hiddenCount = max ? childArray.length - max : 0;

    return (
      <div ref={ref} className={cn('flex flex-wrap items-center gap-2', className)} {...props}>
        {visibleChildren}
        {hiddenCount > 0 && (
          <Badge variant="subtle" colorScheme="neutral" size="sm">
            +{hiddenCount}
          </Badge>
        )}
      </div>
    );
  }
);

BadgeGroup.displayName = 'BadgeGroup';
