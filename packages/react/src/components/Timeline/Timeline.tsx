import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Circle } from 'lucide-react';

const timelineItemVariants = cva('relative flex gap-4 pb-8 last:pb-0', {
  variants: {
    variant: {
      default: '',
      solid: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const timelineDotVariants = cva(
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 z-10',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-neutral-950 border-brand-500',
        solid: 'bg-brand-500 border-brand-500 text-white',
      },
      color: {
        brand: 'border-brand-500 bg-brand-500',
        success: 'border-success-500 bg-success-500',
        error: 'border-error-500 bg-error-500',
        warning: 'border-warning-500 bg-warning-500',
        info: 'border-info-500 bg-info-500',
        neutral: 'border-neutral-500 bg-neutral-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================
// Timeline Component
// ============================================

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {/* Vertical line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-0">{children}</div>
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';

// ============================================
// TimelineItem Component
// ============================================

export interface TimelineItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof timelineItemVariants>,
    VariantProps<typeof timelineDotVariants> {
  children: React.ReactNode;
  /** Title for this timeline event */
  title: string;
  /** Optional timestamp or date */
  time?: string;
  /** Optional description */
  description?: string;
  /** Custom icon (defaults to Circle) */
  icon?: React.ReactNode;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      children,
      title,
      time,
      description,
      icon,
      variant,
      color,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(timelineItemVariants({ variant }), className)} {...props}>
        {/* Dot */}
        <div className={cn(timelineDotVariants({ variant, color: color as any }))}>
          {icon || <Circle className="h-3 w-3 fill-current" />}
        </div>

        {/* Content */}
        <div className="flex-1 pt-0.5">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h4>
            {time && (
              <time className="text-sm text-neutral-500 dark:text-neutral-500">
                {time}
              </time>
            )}
          </div>

          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';
