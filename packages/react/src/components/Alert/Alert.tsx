'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../utils';

const alertVariants = cva(
  'relative w-full border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        info: 'bg-info/10 text-info border-info/20 [&>svg]:text-info',
        success: 'bg-success/10 text-success border-success/20 [&>svg]:text-success',
        warning: 'bg-warning/10 text-warning border-warning/20 [&>svg]:text-warning',
        error: 'bg-error/10 text-error border-error/20 [&>svg]:text-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Show close button */
  closable?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Custom icon to override default */
  icon?: React.ReactNode;
  /** Hide the default icon */
  hideIcon?: boolean;
}

const variantIcons = {
  default: AlertCircle,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'default',
      closable = false,
      onClose,
      icon,
      hideIcon = false,
      children,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);
    const Icon = variant ? variantIcons[variant] : variantIcons.default;

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    if (!visible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        style={{
          borderRadius: 'var(--card-radius)',
          transition: 'var(--transition-base)',
          ...(props.style || {}),
        }}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {!hideIcon && (icon || <Icon className="h-4 w-4" />)}
        <div className="flex-1">{children}</div>
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn('mb-1 font-medium leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h5>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm [&_p]:leading-relaxed', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';
