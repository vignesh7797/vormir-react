import * as React from 'react';
import { forwardRef, createContext, useContext, useState } from 'react';
import { Circle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const radioGroupVariants = cva('grid gap-2', {
  variants: {
    orientation: {
      vertical: 'grid-flow-row',
      horizontal: 'grid-flow-col auto-cols-max',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

const radioVariants = cva(
  'aspect-square inline-flex items-center justify-center rounded-full border-2 border-primary text-primary cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined
);

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioGroupVariants> {
  /** The controlled value of the radio group */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Disable all radio buttons */
  disabled?: boolean;
  /** Name for all radio inputs */
  name?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      orientation = 'vertical',
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled,
      name,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{ value, onValueChange: handleValueChange, disabled, name }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn(radioGroupVariants({ orientation, className }))}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** The value of the radio button */
  value: string;
  /** Size of the radio button */
  size?: 'sm' | 'md' | 'lg';
}

export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, size = 'md', value, disabled: itemDisabled, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    const disabled = itemDisabled || context?.disabled;
    const checked = context?.value === value;
    const indicatorSize = size === 'sm' ? 8 : size === 'lg' ? 12 : 10;

    const handleClick = () => {
      if (disabled) return;
      context?.onValueChange?.(value);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        data-state={checked ? 'checked' : 'unchecked'}
        className={cn(radioVariants({ size, className }))}
        onClick={handleClick}
        {...props}
      >
        {checked && (
          <Circle
            size={indicatorSize}
            className="fill-current text-current"
            strokeWidth={0}
          />
        )}
      </button>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';
