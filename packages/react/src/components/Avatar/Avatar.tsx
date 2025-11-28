import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Avatar Styles
const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800 shrink-0',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const avatarStatusVariants = cva(
  'absolute rounded-full border-2 border-white dark:border-neutral-950',
  {
    variants: {
      position: {
        'top-right': 'top-0 right-0',
        'bottom-right': 'bottom-0 right-0',
        'top-left': 'top-0 left-0',
        'bottom-left': 'bottom-0 left-0',
      },
      size: {
        xs: 'h-1.5 w-1.5',
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
        xl: 'h-3.5 w-3.5',
        '2xl': 'h-4 w-4',
      },
      status: {
        online: 'bg-success-500',
        offline: 'bg-neutral-400',
        away: 'bg-warning-500',
        busy: 'bg-error-500',
      },
    },
    defaultVariants: {
      position: 'bottom-right',
      size: 'md',
      status: 'online',
    },
  }
);

// ============================================
// Avatar Component
// ============================================

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (usually initials) */
  fallback?: string;
  /** Status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Status indicator position */
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = 'Avatar',
      fallback,
      status,
      statusPosition = 'bottom-right',
      size,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    // Generate initials from fallback text
    const initials = React.useMemo(() => {
      if (!fallback) return '?';
      return fallback
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }, [fallback]);

    const showImage = src && !imageError;

    return (
      <div
        ref={ref}
        style={{
          borderRadius: 'var(--avatar-radius)',
          transition: 'var(--transition-base)',
          ...(props.style || {}),
        }}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-medium text-neutral-600 dark:text-neutral-400">{initials}</span>
        )}

        {status && (
          <span
            className={cn(avatarStatusVariants({ position: statusPosition, size, status }))}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ============================================
// AvatarGroup Component
// ============================================

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Maximum number of avatars to show */
  max?: number;
  /** Size of avatars in the group */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 5, size = 'md', className, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)} {...props}>
        {visibleChildren.map((child, index) => (
          <div key={index} className="ring-2 ring-white dark:ring-neutral-950 rounded-full">
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, { size })
              : child}
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="ring-2 ring-white dark:ring-neutral-950 rounded-full">
            <Avatar size={size} fallback={`+${remainingCount}`} />
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
