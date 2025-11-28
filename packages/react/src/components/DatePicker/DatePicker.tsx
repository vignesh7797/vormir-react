import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const datepickerVariants = cva('inline-block rounded-lg border bg-white dark:bg-neutral-950', {
  variants: {
    variant: {
      outline: 'border-neutral-300 dark:border-neutral-700',
      filled: 'border-transparent bg-neutral-100 dark:bg-neutral-900',
    },
  },
  defaultVariants: {
    variant: 'outline',
  },
});

export interface DatePickerProps extends VariantProps<typeof datepickerVariants> {
  /** Selected date */
  value?: Date;
  /** Default date (uncontrolled) */
  defaultValue?: Date;
  /** Change handler */
  onChange?: (date: Date | null) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether the datepicker is disabled */
  disabled?: boolean;
  /** Range mode */
  mode?: 'single' | 'range';
  /** Selected range (for range mode) */
  rangeValue?: [Date | null, Date | null];
  /** Range change handler */
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  /** Additional CSS classes */
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  mode = 'single',
  rangeValue,
  onRangeChange,
  variant,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<Date | null>(
    defaultValue || null
  );
  const [internalRange, setInternalRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [currentMonth, setCurrentMonth] = useState(
    controlledValue || defaultValue || new Date()
  );

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const range = rangeValue !== undefined ? rangeValue : internalRange;

  const handleDateSelect = (date: Date) => {
    if (disabled) return;

    if (mode === 'single') {
      if (controlledValue === undefined) {
        setInternalValue(date);
      }
      onChange?.(date);
    } else {
      // Range mode
      const [start, end] = range;
      
      if (!start || (start && end)) {
        // Start new range
        const newRange: [Date | null, Date | null] = [date, null];
        if (rangeValue === undefined) {
          setInternalRange(newRange);
        }
        onRangeChange?.(newRange);
      } else {
        // Complete range
        const newRange: [Date | null, Date | null] =
          date < start ? [date, start] : [start, date];
        if (rangeValue === undefined) {
          setInternalRange(newRange);
        }
        onRangeChange?.(newRange);
      }
    }
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (mode === 'single') {
      return (
        value &&
        date.getDate() === value.getDate() &&
        date.getMonth() === value.getMonth() &&
        date.getFullYear() === value.getFullYear()
      );
    } else {
      const [start, end] = range;
      if (!start) return false;
      
      const isSameDay = (d1: Date, d2: Date) =>
        d1.getDate() === d2.getDate() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getFullYear() === d2.getFullYear();

      if (isSameDay(date, start)) return true;
      if (end && isSameDay(date, end)) return true;
      return false;
    }
  };

  const isDateInRange = (date: Date) => {
    if (mode !== 'range') return false;
    const [start, end] = range;
    if (!start || !end) return false;
    return date > start && date < end;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className={cn(
        datepickerVariants({ variant }),
        'p-4',
        disabled && 'opacity-50',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          disabled={disabled}
          className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-medium text-sm">{monthYear}</span>
        <button
          onClick={nextMonth}
          disabled={disabled}
          className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} />;
          }

          const isSelected = isDateSelected(day);
          const isDisabled = isDateDisabled(day);
          const isInRange = isDateInRange(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateSelect(day)}
              disabled={disabled || isDisabled}
              className={cn(
                'aspect-square rounded text-sm transition-colors',
                isDisabled && 'text-neutral-300 dark:text-neutral-700 cursor-not-allowed',
                !isDisabled && !isSelected && !isInRange && 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                isSelected && 'bg-blue-600 text-white hover:bg-blue-700',
                isInRange && !isSelected && 'bg-blue-100 dark:bg-blue-900',
                !isDisabled && !isSelected && !isInRange && 'text-neutral-900 dark:text-neutral-100'
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
