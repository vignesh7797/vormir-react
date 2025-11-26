import * as React from 'react';
import { forwardRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const checkboxVariants = cva(
  'peer inline-flex shrink-0 items-center justify-center rounded border-2 border-input bg-background cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary',
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

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Size variant of the checkbox */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the checkbox is checked */
  checked?: boolean | 'indeterminate';
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      size = 'md',
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState<boolean | 'indeterminate'>(
      defaultChecked
    );
    
    const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;
    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;
    const isChecked = checked === true || checked === 'indeterminate';

    const handleClick = () => {
      if (disabled) return;

      let newChecked: boolean | 'indeterminate';
      
      if (checked === 'indeterminate') {
        newChecked = true;
      } else if (checked === true) {
        newChecked = false;
      } else {
        newChecked = true;
      }

      if (controlledChecked === undefined) {
        setInternalChecked(newChecked);
      }
      
      onCheckedChange?.(newChecked);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
        disabled={disabled}
        data-state={isChecked ? 'checked' : 'unchecked'}
        className={cn(
          checkboxVariants({ size }),
          isChecked && 'border-primary bg-primary text-primary-foreground',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {isChecked && (
          <span className="flex items-center justify-center">
            {checked === 'indeterminate' ? (
              <Minus size={iconSize} strokeWidth={3} />
            ) : (
              <Check size={iconSize} strokeWidth={3} />
            )}
          </span>
        )}
      </button>
    );
  }
);

Checkbox.displayName = 'Checkbox';
