import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Card Styles
const cardVariants = cva(
  'rounded-lg transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800',
        elevated: 'bg-white dark:bg-neutral-950 shadow-md hover:shadow-lg',
        outlined: 'border-2 border-neutral-300 dark:border-neutral-700',
        ghost: 'hover:bg-neutral-50 dark:hover:bg-neutral-900',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg transition-shadow',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
);

// ============================================
// Card Root Component
// ============================================

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  /** Make card interactive (hover effects, cursor pointer) */
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant, interactive, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, interactive: interactive || false }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================
// CardHeader Component
// ============================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ============================================
// CardTitle Component
// ============================================

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, as: Component = 'h3', className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn('text-xl font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ============================================
// CardDescription Component
// ============================================

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-neutral-600 dark:text-neutral-400', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

// ============================================
// CardContent Component
// ============================================

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// ============================================
// CardFooter Component
// ============================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ============================================
// CardImage Component
// ============================================

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ src, alt, aspectRatio, className, ...props }, ref) => {
    const aspectClasses = {
      video: 'aspect-video',
      square: 'aspect-square',
      portrait: 'aspect-[3/4]',
    };

    return (
      <div className={cn('overflow-hidden rounded-t-lg', aspectRatio && aspectClasses[aspectRatio])}>
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn('h-full w-full object-cover', className)}
          {...props}
        />
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';
