import * as React from 'react';
import { forwardRef, useState, useRef, useEffect, createContext, useContext } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const selectTriggerVariants = cva(
  'flex w-full items-center justify-between rounded-md border font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer [&>span]:line-clamp-1',
  {
    variants: {
      variant: {
        default: 'border-input bg-background hover:bg-accent',
        filled: 'border-0 bg-muted hover:bg-accent',
        flushed:
          'border-0 border-b-2 border-input bg-transparent rounded-none hover:border-primary',
      },
      size: {
        sm: 'h-9 px-3 py-2 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-11 px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined);

export interface SelectProps {
  /** Controlled value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Disable the select */
  disabled?: boolean;
  /** Children (SelectTrigger and SelectContent) */
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

export interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectTriggerVariants> {
  children: React.ReactNode;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const context = useContext(SelectContext);

    const handleClick = () => {
      context?.setOpen(!context.open);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={context?.open}
        className={cn(selectTriggerVariants({ variant, size, className }))}
        onClick={handleClick}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50 ml-2 shrink-0" />
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

export interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const context = useContext(SelectContext);

  // This is a simple implementation - in production you'd want to track the label
  return <span>{context?.value || placeholder}</span>;
};

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, _ref) => {
    const context = useContext(SelectContext);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          context?.setOpen(false);
        }
      };

      if (context?.open) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [context?.open]);

    if (!context?.open) return null;

    return (
      <div
        ref={contentRef}
        className={cn(
          'absolute z-50 mt-1 max-h-96 w-full overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
          className
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </div>
    );
  }
);

SelectContent.displayName = 'SelectContent';

export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export const SelectItem = forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(SelectContext);
    const selected = context?.value === value;

    const handleClick = () => {
      context?.onValueChange?.(value);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={selected}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
          selected && 'bg-accent',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {selected && <Check className="h-4 w-4" />}
        </span>
        {children}
      </button>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('p-1', className)} {...props}>
      {children}
    </div>
  );
};

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SelectLabel: React.FC<SelectLabelProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} {...props}>
      {children}
    </div>
  );
};

export const SelectSeparator: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
};

// For backward compatibility
export const SelectScrollUpButton: React.FC = () => null;
export const SelectScrollDownButton: React.FC = () => null;
