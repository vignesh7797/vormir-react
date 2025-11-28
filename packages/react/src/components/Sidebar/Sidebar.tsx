import React, { createContext, useContext, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { X, Menu as MenuIcon } from 'lucide-react';

// Sidebar Context
interface SidebarContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  variant: 'default' | 'overlay';
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar component');
  }
  return context;
};

// Sidebar Styles
const sidebarVariants = cva(
  'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800',
  {
    variants: {
      variant: {
        default: '',
        overlay: 'shadow-lg',
      },
      isCollapsed: {
        true: 'w-16',
        false: 'w-64',
      },
      isOpen: {
        true: 'translate-x-0',
        false: '-translate-x-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      isCollapsed: false,
      isOpen: true,
    },
  }
);

// ============================================
// Sidebar Root Component
// ============================================

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Sidebar variant (default stays visible, overlay slides over content) */
  variant?: 'default' | 'overlay';
  /** Initial open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Initial collapsed state */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  isCollapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Collapse on mobile by default */
  collapsible?: boolean;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      variant = 'default',
      defaultOpen = true,
      isOpen: controlledOpen,
      onOpenChange,
      defaultCollapsed = false,
      isCollapsed: controlledCollapsed,
      onCollapsedChange,
      collapsible = true,
      className,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

    const isOpen = controlledOpen ?? internalOpen;
    const isCollapsed = controlledCollapsed ?? internalCollapsed;

    const setIsOpen = (open: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    };

    const setIsCollapsed = (collapsed: boolean) => {
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(collapsed);
      }
      onCollapsedChange?.(collapsed);
    };

    // Handle mobile responsive behavior
    useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile && variant === 'default') {
          setIsOpen(false);
        } else if (!isMobile && variant === 'default') {
          setIsOpen(true);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [variant, setIsOpen]);

    // Lock body scroll when overlay is open on mobile
    useEffect(() => {
      if (variant === 'overlay' && isOpen) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }
      return undefined;
    }, [variant, isOpen]);

    return (
      <SidebarContext.Provider value={{ isOpen, setIsOpen, isCollapsed, setIsCollapsed, variant }}>
        {/* Overlay backdrop */}
        {variant === 'overlay' && isOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          ref={ref}
          className={cn(
            sidebarVariants({ variant, isCollapsed: collapsible ? isCollapsed : false, isOpen }),
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = 'Sidebar';

// ============================================
// SidebarHeader Component
// ============================================

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between h-16 px-4 border-b border-neutral-200 dark:border-neutral-800', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';

// ============================================
// SidebarContent Component
// ============================================

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex-1 overflow-y-auto py-4', className)} {...props}>
        {children}
      </div>
    );
  }
);

SidebarContent.displayName = 'SidebarContent';

// ============================================
// SidebarFooter Component
// ============================================

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center h-16 px-4 border-t border-neutral-200 dark:border-neutral-800', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = 'SidebarFooter';

// ============================================
// SidebarNav Component
// ============================================

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <nav ref={ref} className={cn('space-y-1 px-2', className)} {...props}>
        {children}
      </nav>
    );
  }
);

SidebarNav.displayName = 'SidebarNav';

// ============================================
// SidebarNavItem Component
// ============================================

const sidebarNavItemVariants = cva(
  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500',
  {
    variants: {
      active: {
        true: 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400',
        false: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

export interface SidebarNavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarNavItemVariants> {
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ children, href, active, disabled, icon, className, ...props }, ref) => {
    const { isCollapsed } = useSidebarContext();

    const content = (
      <>
        {icon && <span className="shrink-0">{icon}</span>}
        {!isCollapsed && <span>{children}</span>}
      </>
    );

    if (!href || disabled) {
      return (
        <div
          className={cn(
            sidebarNavItemVariants({ active: active || false, disabled: disabled || false }),
            isCollapsed && 'justify-center',
            className
          )}
        >
          {content}
        </div>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          sidebarNavItemVariants({ active: active || false, disabled: false }),
          isCollapsed && 'justify-center',
          className
        )}
        {...props}
      >
        {content}
      </a>
    );
  }
);

SidebarNavItem.displayName = 'SidebarNavItem';

// ============================================
// SidebarToggle Component
// ============================================

export interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Custom icon for toggle button */
  icon?: React.ReactNode;
}

export const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ icon, className, ...props }, ref) => {
    const { isOpen, setIsOpen } = useSidebarContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
          className
        )}
        {...props}
      >
        {icon || (isOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />)}
      </button>
    );
  }
);

SidebarToggle.displayName = 'SidebarToggle';

// ============================================
// SidebarCollapse Component
// ============================================

export interface SidebarCollapseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Custom icon for collapse button */
  icon?: React.ReactNode;
}

export const SidebarCollapse = React.forwardRef<HTMLButtonElement, SidebarCollapseProps>(
  ({ icon, className, ...props }, ref) => {
    const { isCollapsed, setIsCollapsed } = useSidebarContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100',
          className
        )}
        {...props}
      >
        {icon || <MenuIcon className="h-5 w-5" />}
      </button>
    );
  }
);

SidebarCollapse.displayName = 'SidebarCollapse';
