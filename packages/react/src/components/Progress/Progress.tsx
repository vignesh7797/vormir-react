'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const progressVariants = cva('w-full overflow-hidden rounded-full bg-secondary', {
  variants: {
    size: {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Show percentage text */
  showValue?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size = 'md',
      variant = 'default',
      showValue = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variantClasses = {
      default: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
    };

    return (
      <div className={cn('relative', className)}>
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{
            borderRadius: 'var(--radius-full)',
            transition: 'var(--transition-base)',
            ...(props.style || {}),
          }}
          className={cn(progressVariants({ size }))}
          {...props}
        >
          <div
            style={{
              borderRadius: 'var(--radius-full)',
              transition: 'width var(--duration-300) var(--ease-in-out)',
              width: `${percentage}%`,
            }}
            className={cn(
              'h-full',
              variantClasses[variant]
            )}
          />
        </div>
        {showValue && (
          <div className="mt-1 text-xs text-muted-foreground text-right">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value?: number;
  /** Size of the circle */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Show percentage text */
  showValue?: boolean;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      className,
      value = 0,
      size = 120,
      strokeWidth = 8,
      variant = 'default',
      showValue = false,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = Math.min(Math.max(value, 0), 100);
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const variantColors = {
      default: 'stroke-primary',
      success: 'stroke-success',
      warning: 'stroke-warning',
      error: 'stroke-error',
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        {...props}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-secondary"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={cn('transition-all duration-300 ease-in-out', variantColors[variant])}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';
