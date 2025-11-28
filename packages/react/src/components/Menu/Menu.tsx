import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronRight, Check } from 'lucide-react';

// Menu Context
interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu component');
  }
  return context;
};

// Menu Trigger Styles
const menuTriggerVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500',
        outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800',
        ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Menu Content Styles
const menuContentVariants = cva(
  'absolute z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-lg dark:bg-neutral-900 dark:border-neutral-800 animate-in fade-in-0 zoom-in-95',
  {
    variants: {
      position: {
        'bottom-start': 'top-full left-0 mt-2',
        'bottom-end': 'top-full right-0 mt-2',
        'top-start': 'bottom-full left-0 mb-2',
        'top-end': 'bottom-full right-0 mb-2',
        'right-start': 'left-full top-0 ml-2',
        'left-start': 'right-full top-0 mr-2',
      },
    },
    defaultVariants: {
      position: 'bottom-start',
    },
  }
);

// Menu Item Styles
const menuItemVariants = cva(
  'relative flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors select-none',
  {
    variants: {
      variant: {
        default: 'hover:bg-neutral-100 focus:bg-neutral-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800',
        destructive: 'text-error-600 hover:bg-error-50 focus:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/20 dark:focus:bg-error-900/20',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
    },
  }
);

// ============================================
// Menu Root Component
// ============================================

export interface MenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Menu = ({ children, open: controlledOpen, onOpenChange, value, onValueChange }: MenuProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, setOpen]);

  // Close on ESC key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  return (
    <MenuContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        contentRef,
        selectedValue: value,
        onSelect: onValueChange,
      }}
    >
      <div className="relative inline-block">{children}</div>
    </MenuContext.Provider>
  );
};

// ============================================
// Menu Trigger Component
// ============================================

export interface MenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menuTriggerVariants> {
  children: React.ReactNode;
  asChild?: boolean;
}

export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ children, variant, size, className, asChild, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useMenuContext();

    const handleClick = () => {
      setOpen(!open);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(!open);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setOpen(true);
      }
    };

    return (
      <button
        ref={(node) => {
          (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(menuTriggerVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MenuTrigger.displayName = 'MenuTrigger';

// ============================================
// Menu Content Component
// ============================================

export interface MenuContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuContentVariants> {
  children: React.ReactNode;
}

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, position, className, ...props }, ref) => {
    const { open, contentRef } = useMenuContext();
    const [activeIndex, setActiveIndex] = useState(-1);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
      if (open) {
        setActiveIndex(-1);
        // Focus first item on open
        setTimeout(() => {
          itemRefs.current[0]?.focus();
        }, 0);
      }
    }, [open]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const items = itemRefs.current.filter(Boolean);

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
        setActiveIndex(nextIndex);
        items[nextIndex]?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prevIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
        setActiveIndex(prevIndex);
        items[prevIndex]?.focus();
      } else if (event.key === 'Home') {
        event.preventDefault();
        setActiveIndex(0);
        items[0]?.focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        const lastIndex = items.length - 1;
        setActiveIndex(lastIndex);
        items[lastIndex]?.focus();
      }
    };

    if (!open) return null;

    return (
      <div
        ref={(node) => {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="menu"
        onKeyDown={handleKeyDown}
        style={{
          borderRadius: 'var(--card-radius)',
          boxShadow: 'var(--shadow-md)',
          transition: 'var(--transition-base)',
        }}
        className={cn(menuContentVariants({ position }), className)}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === MenuItem) {
            return React.cloneElement(child as React.ReactElement<any>, {
              ref: (el: HTMLDivElement) => {
                itemRefs.current[index] = el;
              },
            });
          }
          return child;
        })}
      </div>
    );
  }
);

MenuContent.displayName = 'MenuContent';

// ============================================
// Menu Item Component
// ============================================

export interface MenuItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuItemVariants> {
  children: React.ReactNode;
  value?: string;
  onSelect?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  shortcut?: string;
}

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, value, onSelect, disabled, icon, shortcut, variant, className, ...props }, ref) => {
    const { setOpen, selectedValue, onSelect: contextOnSelect } = useMenuContext();

    const handleClick = () => {
      if (disabled) return;

      if (value && contextOnSelect) {
        contextOnSelect(value);
      }

      if (onSelect) {
        onSelect();
      }

      setOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    };

    const isSelected = value && selectedValue === value;

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        className={cn(menuItemVariants({ variant, disabled: disabled || false }), className)}
        {...props}
      >
        {isSelected && <Check className="h-4 w-4 shrink-0" />}
        {!isSelected && icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
        {!isSelected && !icon && <span className="h-4 w-4 shrink-0" />}
        <span className="flex-1">{children}</span>
        {shortcut && (
          <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">{shortcut}</span>
        )}
      </div>
    );
  }
);

MenuItem.displayName = 'MenuItem';

// ============================================
// Menu Separator Component
// ============================================

export interface MenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn('-mx-1 my-1 h-px bg-neutral-200 dark:bg-neutral-800', className)}
        {...props}
      />
    );
  }
);

MenuSeparator.displayName = 'MenuSeparator';

// ============================================
// Menu Label Component
// ============================================

export interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MenuLabel = React.forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MenuLabel.displayName = 'MenuLabel';

// ============================================
// Menu Group Component
// ============================================

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  label?: string;
}

export const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ children, label, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('py-1', className)} role="group" {...props}>
        {label && <MenuLabel>{label}</MenuLabel>}
        {children}
      </div>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';

// ============================================
// Menu Sub (Submenu) Component
// ============================================

export interface MenuSubProps {
  children: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
}

export const MenuSub = ({ children, label, icon }: MenuSubProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<'right' | 'left'>('right');
  const subTriggerRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);

  // Determine if submenu should open left or right
  useEffect(() => {
    if (!open || !subTriggerRef.current) return;

    const rect = subTriggerRef.current.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;

    setPosition(spaceRight > 200 ? 'right' : spaceLeft > 200 ? 'left' : 'right');
  }, [open]);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        ref={subTriggerRef}
        role="menuitem"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          menuItemVariants({ variant: 'default' }),
          'justify-between'
        )}
      >
        {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
        {!icon && <span className="h-4 w-4 shrink-0" />}
        <span className="flex-1">{label}</span>
        <ChevronRight className="h-4 w-4 shrink-0" />
      </div>

      {open && (
        <div
          ref={subContentRef}
          role="menu"
          className={cn(
            'absolute z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-lg dark:bg-neutral-900 dark:border-neutral-800 animate-in fade-in-0 zoom-in-95',
            position === 'right' ? 'left-full top-0 ml-1' : 'right-full top-0 mr-1'
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

MenuSub.displayName = 'MenuSub';
