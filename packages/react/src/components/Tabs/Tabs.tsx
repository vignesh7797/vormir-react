import React, { createContext, useContext, useState, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Tabs Context
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'default' | 'pills' | 'enclosed';
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component');
  }
  return context;
};

// Tabs Root Styles
const tabsRootVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'flex flex-col',
      vertical: 'flex flex-row',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

// Tabs List Styles
const tabsListVariants = cva(
  'inline-flex items-center gap-1',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row border-b border-neutral-200 dark:border-neutral-800',
        vertical: 'flex-col border-r border-neutral-200 dark:border-neutral-800',
      },
      variant: {
        default: '',
        pills: 'bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg',
        enclosed: 'border-b-0',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
    },
  }
);

// Tabs Trigger Styles
const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'w-full justify-start',
      },
      variant: {
        default: '',
        pills: 'rounded-md',
        enclosed: 'rounded-t-md border border-b-0 border-transparent',
      },
      active: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Default variant
      {
        variant: 'default',
        active: true,
        className: 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400',
      },
      {
        variant: 'default',
        active: false,
        className: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border-b-2 border-transparent',
      },
      // Pills variant
      {
        variant: 'pills',
        active: true,
        className: 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm',
      },
      {
        variant: 'pills',
        active: false,
        className: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
      },
      // Enclosed variant
      {
        variant: 'enclosed',
        active: true,
        className: 'border-neutral-200 dark:border-neutral-800 border-b-white dark:border-b-neutral-950 bg-white dark:bg-neutral-950',
      },
      {
        variant: 'enclosed',
        active: false,
        className: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
      active: false,
    },
  }
);

// Tabs Content Styles
const tabsContentVariants = cva(
  'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500',
  {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'ml-4',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

// ============================================
// Tabs Root Component
// ============================================

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'enclosed';
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      value: controlledValue,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    const value = controlledValue ?? internalValue;
    const handleValueChange = (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, orientation, variant }}>
        <div ref={ref} className={cn(tabsRootVariants({ orientation }), className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

// ============================================
// Tabs List Component
// ============================================

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, ...props }, ref) => {
    const { orientation, variant } = useTabsContext();
    const listRef = useRef<HTMLDivElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(0);

    // Get all trigger elements
    const getTriggers = () => {
      if (!listRef.current) return [];
      return Array.from(listRef.current.querySelectorAll('[role="tab"]')) as HTMLElement[];
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const triggers = getTriggers();
      if (triggers.length === 0) return;

      const isHorizontal = orientation === 'horizontal';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

      if (event.key === nextKey) {
        event.preventDefault();
        const nextIndex = (focusedIndex + 1) % triggers.length;
        setFocusedIndex(nextIndex);
        triggers[nextIndex]?.focus();
        triggers[nextIndex]?.click();
      } else if (event.key === prevKey) {
        event.preventDefault();
        const prevIndex = focusedIndex === 0 ? triggers.length - 1 : focusedIndex - 1;
        setFocusedIndex(prevIndex);
        triggers[prevIndex]?.focus();
        triggers[prevIndex]?.click();
      } else if (event.key === 'Home') {
        event.preventDefault();
        setFocusedIndex(0);
        triggers[0]?.focus();
        triggers[0]?.click();
      } else if (event.key === 'End') {
        event.preventDefault();
        const lastIndex = triggers.length - 1;
        setFocusedIndex(lastIndex);
        triggers[lastIndex]?.focus();
        triggers[lastIndex]?.click();
      }
    };

    return (
      <div
        ref={(node) => {
          (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        style={{
          borderRadius: 'var(--radius-md)',
          transition: 'var(--transition-base)',
        }}
        className={cn(tabsListVariants({ orientation, variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

// ============================================
// Tabs Trigger Component
// ============================================

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  value: string;
  icon?: React.ReactNode;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, value: triggerValue, icon, className, ...props }, ref) => {
    const { value, onValueChange, orientation, variant } = useTabsContext();

    const isActive = value === triggerValue;

    const handleClick = () => {
      onValueChange(triggerValue);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`panel-${triggerValue}`}
        tabIndex={isActive ? 0 : -1}
        onClick={handleClick}
        className={cn(tabsTriggerVariants({ orientation, variant, active: isActive }), className)}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

// ============================================
// Tabs Content Component
// ============================================

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  value: string;
  forceMount?: boolean;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, value: contentValue, forceMount, className, ...props }, ref) => {
    const { value, orientation } = useTabsContext();

    const isActive = value === contentValue;

    if (!isActive && !forceMount) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${contentValue}`}
        aria-labelledby={`trigger-${contentValue}`}
        hidden={!isActive}
        tabIndex={0}
        className={cn(tabsContentVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';
