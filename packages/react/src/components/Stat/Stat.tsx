import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const statVariants = cva(
  'flex flex-col gap-1 p-4 rounded-lg border transition-colors',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950',
        bordered: 'border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950',
        filled: 'border-transparent bg-neutral-100 dark:bg-neutral-900',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// Stat Component
// ============================================

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {
  children?: React.ReactNode;
  /** Main label for the statistic */
  label: string;
  /** The numeric or text value */
  value: string | number;
  /** Optional helper text or description */
  helpText?: string;
  /** Trend indicator */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend value (e.g., "+12%", "-5%") */
  trendValue?: string;
  /** Icon to display next to label */
  icon?: React.ReactNode;
}

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    {
      children,
      label,
      value,
      helpText,
      trend,
      trendValue,
      icon,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const trendColor = trend === 'up'
      ? 'text-success-600 dark:text-success-400'
      : trend === 'down'
      ? 'text-error-600 dark:text-error-400'
      : 'text-neutral-600 dark:text-neutral-400';

    const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;

    return (
      <div ref={ref} className={cn(statVariants({ variant }), className)} {...props}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {label}
          </span>
          {icon && <span className="text-neutral-500 dark:text-neutral-500">{icon}</span>}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {value}
          </span>
          {trend && (
            <span className={cn('flex items-center gap-1 text-sm font-medium', trendColor)}>
              <TrendIcon className="h-4 w-4" />
              {trendValue}
            </span>
          )}
        </div>

        {helpText && (
          <p className="text-sm text-neutral-500 dark:text-neutral-500">{helpText}</p>
        )}

        {children}
      </div>
    );
  }
);

Stat.displayName = 'Stat';

// ============================================
// StatGroup Component
// ============================================

export interface StatGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4;
}

export const StatGroup = React.forwardRef<HTMLDivElement, StatGroupProps>(
  ({ children, columns = 3, className, ...props }, ref) => {
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[columns];

    return (
      <div
        ref={ref}
        className={cn('grid gap-4', gridCols, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StatGroup.displayName = 'StatGroup';
