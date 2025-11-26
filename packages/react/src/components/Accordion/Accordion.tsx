import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

// Accordion Context
interface AccordionContextValue {
  value: string[];
  onValueChange: (value: string[]) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion component');
  }
  return context;
};

// Accordion Styles
const accordionItemVariants = cva(
  'group border rounded-lg mb-2 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700 data-[state=open]:border-brand-500 dark:data-[state=open]:border-brand-500 data-[state=open]:shadow-sm'
);

const accordionTriggerVariants = cva(
  'flex w-full items-center justify-between px-4 py-4 font-medium text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 rounded-lg hover:text-brand-600 dark:hover:text-brand-400 data-[state=open]:text-brand-600 dark:data-[state=open]:text-brand-400'
);

const accordionContentVariants = cva(
  'overflow-hidden text-sm text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-in-out'
);

// ============================================
// Accordion Root Component
// ============================================

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Allow multiple items to be open simultaneously */
  type?: 'single' | 'multiple';
  /** Default opened item values */
  defaultValue?: string | string[];
  /** Controlled opened item values */
  value?: string | string[];
  /** Callback when value changes */
  onValueChange?: (value: string | string[]) => void;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      type = 'single',
      defaultValue,
      value: controlledValue,
      onValueChange,
      className,
      ...props
    },
    ref
  ) => {
    // Normalize default value to array
    const normalizedDefault = Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
      ? [defaultValue]
      : [];

    const [internalValue, setInternalValue] = useState<string[]>(normalizedDefault);

    // Normalize controlled value to array
    const normalizedControlled = Array.isArray(controlledValue)
      ? controlledValue
      : controlledValue
      ? [controlledValue]
      : [];

    const value = controlledValue !== undefined ? normalizedControlled : internalValue;

    const handleValueChange = (newValue: string[]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      // Return single value for 'single' type
      const returnValue = type === 'single' ? newValue[0] || '' : newValue;
      onValueChange?.(returnValue as any);
    };

    return (
      <AccordionContext.Provider value={{ value, onValueChange: handleValueChange, type }}>
        <div ref={ref} className={cn('space-y-0', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

// ============================================
// AccordionItem Component
// ============================================

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Unique value for this accordion item */
  value: string;
  /** Disable this item */
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, value, disabled, className, ...props }, ref) => {
    const { value: openValues } = useAccordionContext();
    const isOpen = openValues.includes(value);
    
    return (
      <div
        ref={ref}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled ? 'true' : undefined}
        className={cn(accordionItemVariants(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

// ============================================
// AccordionTrigger Component
// ============================================

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** Value of the parent AccordionItem */
  value: string;
  /** Custom icon (defaults to ChevronDown) */
  icon?: React.ReactNode;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, value, icon, className, ...props }, ref) => {
    const { value: openValues, onValueChange, type } = useAccordionContext();
    const isOpen = openValues.includes(value);

    const handleClick = () => {
      if (type === 'single') {
        onValueChange(isOpen ? [] : [value]);
      } else {
        onValueChange(
          isOpen ? openValues.filter((v) => v !== value) : [...openValues, value]
        );
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        data-state={isOpen ? 'open' : 'closed'}
        onClick={handleClick}
        className={cn(accordionTriggerVariants(), className)}
        {...props}
      >
        {children}
        <span className="ml-2">
          {icon || (
            <ChevronDown 
              className={cn(
                "h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400 transition-all duration-300 ease-in-out",
                isOpen && "rotate-180 text-brand-600 dark:text-brand-400"
              )}
            />
          )}
        </span>
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

// ============================================
// AccordionContent Component
// ============================================

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Value of the parent AccordionItem */
  value: string;
}

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, value, className, ...props }, ref) => {
    const { value: openValues } = useAccordionContext();
    const isOpen = openValues.includes(value);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

    useEffect(() => {
      if (!contentRef.current) return;

      if (isOpen) {
        const contentHeight = contentRef.current.scrollHeight;
        setHeight(contentHeight);
        
        // After animation completes, set to auto for dynamic content
        const timer = setTimeout(() => {
          setHeight(undefined);
        }, 300);
        
        return () => clearTimeout(timer);
      } else {
        // First set to actual height for smooth collapse
        setHeight(contentRef.current.scrollHeight);
        // Then immediately collapse to 0
        requestAnimationFrame(() => {
          setHeight(0);
        });
      }
      return undefined;
    }, [isOpen]);

    return (
      <div
        ref={ref}
        data-state={isOpen ? 'open' : 'closed'}
        style={{ height: height === undefined ? 'auto' : `${height}px` }}
        className={cn(
          accordionContentVariants(),
          className
        )}
        {...props}
      >
        <div ref={contentRef} className="px-4 pb-4 pt-0">
          {children}
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';
