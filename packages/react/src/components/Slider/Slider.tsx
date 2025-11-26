import React, { useCallback, useRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const sliderVariants = cva(
  'relative flex items-center select-none touch-none',
  {
    variants: {
      orientation: {
        horizontal: 'w-full h-5',
        vertical: 'h-full w-5',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        size: 'sm',
        class: 'h-4',
      },
      {
        orientation: 'horizontal',
        size: 'md',
        class: 'h-5',
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        class: 'h-6',
      },
      {
        orientation: 'vertical',
        size: 'sm',
        class: 'w-4',
      },
      {
        orientation: 'vertical',
        size: 'md',
        class: 'w-5',
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: 'w-6',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

const trackVariants = cva(
  'relative rounded-full bg-neutral-200 dark:bg-neutral-800 grow',
  {
    variants: {
      orientation: {
        horizontal: 'h-2 w-full',
        vertical: 'w-2 h-full',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        size: 'sm',
        class: 'h-1',
      },
      {
        orientation: 'horizontal',
        size: 'md',
        class: 'h-2',
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        class: 'h-3',
      },
      {
        orientation: 'vertical',
        size: 'sm',
        class: 'w-1',
      },
      {
        orientation: 'vertical',
        size: 'md',
        class: 'w-2',
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: 'w-3',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

const rangeVariants = cva(
  'absolute rounded-full bg-brand-500',
  {
    variants: {
      orientation: {
        horizontal: 'h-full',
        vertical: 'w-full',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const thumbVariants = cva(
  'absolute block h-5 w-5 rounded-full border-2 border-brand-500 bg-white dark:bg-neutral-950 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50',
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

// ============================================
// Slider Component
// ============================================

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof sliderVariants> {
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Current value (controlled) */
  value?: number | [number, number];
  /** Default value (uncontrolled) */
  defaultValue?: number | [number, number];
  /** Callback when value changes */
  onChange?: (value: number | [number, number]) => void;
  /** Callback when dragging starts */
  onChangeStart?: (value: number | [number, number]) => void;
  /** Callback when dragging ends */
  onChangeEnd?: (value: number | [number, number]) => void;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Show marks at specific values */
  marks?: number[] | { value: number; label?: string }[];
  /** Show tooltip with current value */
  showTooltip?: boolean;
  /** Format function for tooltip/marks */
  formatValue?: (value: number) => string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue,
      onChange,
      onChangeStart,
      onChangeEnd,
      disabled = false,
      orientation = 'horizontal',
      size = 'md',
      marks,
      showTooltip = false,
      formatValue = (val) => val.toString(),
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    // Determine if range mode (dual thumbs)
    const isRange = Array.isArray(defaultValue) || Array.isArray(controlledValue);

    // Initialize state
    const [internalValue, setInternalValue] = useState<number | [number, number]>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return isRange ? [min, max] : min;
    });

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const [isDragging, setIsDragging] = useState<number | null>(null);
    const [showTooltipFor, setShowTooltipFor] = useState<number | null>(null);

    const trackRef = useRef<HTMLDivElement>(null);

    // Get percentage for a value
    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100;
    };

    // Get value from mouse position
    const getValueFromPosition = (clientX: number, clientY: number) => {
      if (!trackRef.current) return min;

      const rect = trackRef.current.getBoundingClientRect();
      let percentage: number;

      if (orientation === 'horizontal') {
        percentage = (clientX - rect.left) / rect.width;
      } else {
        percentage = 1 - (clientY - rect.top) / rect.height;
      }

      percentage = Math.max(0, Math.min(1, percentage));
      const rawValue = min + percentage * (max - min);
      return Math.round(rawValue / step) * step;
    };

    // Update value
    const updateValue = useCallback(
      (newValue: number, thumbIndex?: number) => {
        let updatedValue: number | [number, number];

        if (isRange && Array.isArray(value)) {
          if (thumbIndex === 0) {
            updatedValue = [Math.min(newValue, value[1]), value[1]];
          } else {
            updatedValue = [value[0], Math.max(newValue, value[0])];
          }
        } else {
          updatedValue = newValue;
        }

        if (controlledValue === undefined) {
          setInternalValue(updatedValue);
        }
        onChange?.(updatedValue);
      },
      [isRange, value, controlledValue, onChange]
    );

    // Handle mouse/touch events
    const handlePointerDown = (e: React.PointerEvent, thumbIndex: number) => {
      if (disabled) return;

      e.preventDefault();
      setIsDragging(thumbIndex);
      setShowTooltipFor(thumbIndex);

      if (value !== undefined) {
        onChangeStart?.(isRange ? value as [number, number] : value as number);
      }
    };

    const handlePointerMove = useCallback(
      (e: PointerEvent) => {
        if (isDragging === null || disabled) return;

        const newValue = getValueFromPosition(e.clientX, e.clientY);
        updateValue(newValue, isDragging);
      },
      [isDragging, disabled, updateValue]
    );

    const handlePointerUp = useCallback(() => {
      if (isDragging !== null) {
        setIsDragging(null);
        setTimeout(() => setShowTooltipFor(null), 100);
        onChangeEnd?.(value);
      }
    }, [isDragging, onChangeEnd, value]);

    // Handle track click
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isDragging !== null) return;

      const newValue = getValueFromPosition(e.clientX, e.clientY);

      if (isRange && Array.isArray(value)) {
        // Determine which thumb to move based on proximity
        const distToStart = Math.abs(value[0] - newValue);
        const distToEnd = Math.abs(value[1] - newValue);
        updateValue(newValue, distToStart <= distToEnd ? 0 : 1);
      } else {
        updateValue(newValue);
      }
    };

    // Keyboard handlers
    const handleKeyDown = (e: React.KeyboardEvent, thumbIndex: number) => {
      if (disabled || value === undefined) return;

      const currentValue = isRange && Array.isArray(value) ? value[thumbIndex] : (value as number);
      if (currentValue === undefined) return;
      
      let newValue = currentValue;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newValue = Math.min(max, currentValue + step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newValue = Math.max(min, currentValue - step);
          break;
        case 'Home':
          e.preventDefault();
          newValue = min;
          break;
        case 'End':
          e.preventDefault();
          newValue = max;
          break;
        case 'PageUp':
          e.preventDefault();
          newValue = Math.min(max, currentValue + step * 10);
          break;
        case 'PageDown':
          e.preventDefault();
          newValue = Math.max(min, currentValue - step * 10);
          break;
        default:
          return;
      }

      updateValue(newValue, thumbIndex);
    };

    // Effect for pointer events
    React.useEffect(() => {
      if (isDragging !== null) {
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
        return () => {
          document.removeEventListener('pointermove', handlePointerMove);
          document.removeEventListener('pointerup', handlePointerUp);
        };
      }
      return undefined;
    }, [isDragging, handlePointerMove, handlePointerUp]);

    // Calculate positions
    const values = isRange ? (value as [number, number]) : [value as number];
    const percentages = values.map(getPercentage);

    // Render thumb with tooltip
    const renderThumb = (thumbValue: number, thumbIndex: number) => {
      const percentage = getPercentage(thumbValue);
      const position = orientation === 'horizontal' 
        ? { left: `${percentage}%`, transform: 'translateX(-50%)' }
        : { bottom: `${percentage}%`, transform: 'translateY(50%)' };

      return (
        <span
          key={thumbIndex}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={thumbValue}
          aria-orientation={(orientation ?? 'horizontal') as 'horizontal' | 'vertical'}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          className={cn(thumbVariants({ size }), 'cursor-grab active:cursor-grabbing')}
          style={position}
          onPointerDown={(e) => handlePointerDown(e, thumbIndex)}
          onKeyDown={(e) => handleKeyDown(e, thumbIndex)}
          onMouseEnter={() => setShowTooltipFor(thumbIndex)}
          onMouseLeave={() => isDragging === null && setShowTooltipFor(null)}
        >
          {(showTooltip && (showTooltipFor === thumbIndex || isDragging === thumbIndex)) && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs rounded whitespace-nowrap">
              {formatValue(thumbValue)}
            </span>
          )}
        </span>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(sliderVariants({ orientation, size }), disabled && 'opacity-50 cursor-not-allowed', className)}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn(trackVariants({ orientation, size }), 'cursor-pointer')}
          onClick={handleTrackClick}
        >
          {/* Range fill */}
          <div
            className={rangeVariants({ orientation })}
            style={
              orientation === 'horizontal'
                ? {
                    left: `${isRange ? (percentages[0] ?? 0) : 0}%`,
                    right: `${100 - (isRange ? (percentages[1] ?? 100) : (percentages[0] ?? 100))}%`,
                  }
                : {
                    bottom: `${isRange ? (percentages[0] ?? 0) : 0}%`,
                    top: `${100 - (isRange ? (percentages[1] ?? 100) : (percentages[0] ?? 100))}%`,
                  }
            }
          />

          {/* Marks */}
          {marks && marks.map((mark) => {
            const markValue = typeof mark === 'number' ? mark : mark.value;
            const markLabel = typeof mark === 'object' ? mark.label : undefined;
            const markPercentage = getPercentage(markValue);

            return (
              <div
                key={markValue}
                className="absolute"
                style={
                  orientation === 'horizontal'
                    ? { left: `${markPercentage}%`, transform: 'translateX(-50%)' }
                    : { bottom: `${markPercentage}%`, transform: 'translateY(50%)' }
                }
              >
                <div className={cn(
                  'w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600',
                  orientation === 'horizontal' ? '-mt-0.5' : '-ml-0.5'
                )} />
                {markLabel && (
                  <div className={cn(
                    'absolute text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap',
                    orientation === 'horizontal' 
                      ? 'top-4 left-1/2 -translate-x-1/2'
                      : 'left-4 top-1/2 -translate-y-1/2'
                  )}>
                    {markLabel}
                  </div>
                )}
              </div>
            );
          })}

          {/* Thumbs */}
          {values.map((v, i) => renderThumb(v, i))}
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
