import * as React from 'react';
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
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

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Size variant of the switch */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
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
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const translateX = {
      sm: checked ? 'translate-x-4' : 'translate-x-0',
      md: checked ? 'translate-x-5' : 'translate-x-0',
      lg: checked ? 'translate-x-7' : 'translate-x-0',
    };

    const handleClick = () => {
      if (disabled) return;

      const newChecked = !checked;
      
      if (controlledChecked === undefined) {
        setInternalChecked(newChecked);
      }
      
      onCheckedChange?.(newChecked);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        data-state={checked ? 'checked' : 'unchecked'}
        style={{
          borderRadius: 'var(--radius-full)',
          transition: 'var(--transition-base)',
          ...(props.style || {}),
        }}
        className={cn(
          switchVariants({ size }),
          checked ? 'bg-primary' : 'bg-input',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span
          style={{
            borderRadius: 'var(--radius-full)',
            transition: 'var(--transition-base)',
          }}
          className={cn(
            switchThumbVariants({ size }),
            translateX[size || 'md']
          )}
        />
      </button>
    );
  }
);

Switch.displayName = 'Switch';
