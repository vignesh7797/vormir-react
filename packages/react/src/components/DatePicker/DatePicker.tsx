import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const datepickerVariants = cva('inline-block rounded-xl bg-white dark:bg-neutral-950 shadow-sm', {
  variants: {
    variant: {
      outline: 'border border-neutral-200 dark:border-neutral-800',
      filled: 'border border-transparent bg-neutral-50 dark:bg-neutral-900',
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
  /** Show month/year dropdowns */
  showMonthYearPicker?: boolean;
  /** Show preset options for range mode */
  showPresets?: boolean;
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
  showMonthYearPicker = false,
  showPresets = false,
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
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

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

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setShowYearPicker(false);
  };

  const handlePresetSelect = (preset: string) => {
    const today = new Date();
    let start: Date, end: Date;

    switch (preset) {
      case 'today':
        start = end = today;
        break;
      case 'last7':
        start = new Date(today.setDate(today.getDate() - 7));
        end = new Date();
        break;
      case 'last14':
        start = new Date(today.setDate(today.getDate() - 14));
        end = new Date();
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        return;
    }

    const newRange: [Date | null, Date | null] = [start, end];
    if (rangeValue === undefined) {
      setInternalRange(newRange);
    }
    onRangeChange?.(newRange);
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long' });
  const year = currentMonth.getFullYear();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <div className="flex gap-4">
      {/* Presets Sidebar for Range Mode */}
      {mode === 'range' && showPresets && (
        <div className="flex flex-col gap-2 p-4 border-r border-neutral-200 dark:border-neutral-800">
          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            SELECT BY
          </div>
          {[
            { label: 'Today', value: 'today' },
            { label: 'Last 7 days', value: 'last7' },
            { label: 'Last 14 days', value: 'last14' },
            { label: 'This month', value: 'thisMonth' },
            { label: 'Last month', value: 'lastMonth' },
            { label: 'Custom', value: 'custom' },
          ].map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetSelect(preset.value)}
              disabled={disabled}
              className={cn(
                'px-4 py-2 text-sm text-left rounded-lg transition-colors',
                'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                'text-neutral-700 dark:text-neutral-300',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* Main Calendar */}
      <div
        className={cn(
          datepickerVariants({ variant }),
          'p-6',
          disabled && 'opacity-50',
          className
        )}
      >
        {/* Header with Month/Year Selectors */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            disabled={disabled}
            className={cn(
              'p-2 rounded-lg transition-colors',
              'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {showMonthYearPicker ? (
              <>
                {/* Month Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    disabled={disabled}
                    className={cn(
                      'px-4 py-2 rounded-lg border font-medium text-sm transition-colors',
                      'border-blue-200 dark:border-blue-800',
                      'text-neutral-900 dark:text-neutral-100',
                      'hover:bg-blue-50 dark:hover:bg-blue-950',
                      disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {monthName} <ChevronLeft className="w-4 h-4 inline-block ml-1 -rotate-90" />
                  </button>
                  {showMonthPicker && (
                    <div className="absolute top-full mt-2 z-10 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg p-2 grid grid-cols-3 gap-1">
                      {months.map((month, index) => (
                        <button
                          key={month}
                          onClick={() => handleMonthSelect(index)}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm transition-colors',
                            index === currentMonth.getMonth()
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          )}
                        >
                          {month.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Year Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowYearPicker(!showYearPicker)}
                    disabled={disabled}
                    className={cn(
                      'px-4 py-2 rounded-lg border font-medium text-sm transition-colors',
                      'border-blue-200 dark:border-blue-800',
                      'text-neutral-900 dark:text-neutral-100',
                      'hover:bg-blue-50 dark:hover:bg-blue-950',
                      disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {year} <ChevronLeft className="w-4 h-4 inline-block ml-1 -rotate-90" />
                  </button>
                  {showYearPicker && (
                    <div className="absolute top-full mt-2 z-10 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg p-2 grid grid-cols-3 gap-1 max-h-64 overflow-y-auto">
                      {generateYears().map((y) => (
                        <button
                          key={y}
                          onClick={() => handleYearSelect(y)}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm transition-colors',
                            y === year
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          )}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                {monthYear}
              </span>
            )}
          </div>

          <button
            onClick={nextMonth}
            disabled={disabled}
            className={cn(
              'p-2 rounded-lg transition-colors',
              'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (!day) {
              return <div key={`empty-${index}`} />;
            }

            const isSelected = isDateSelected(day);
            const isDisabled = isDateDisabled(day);
            const isInRange = isDateInRange(day);
            const isToday =
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth() &&
              day.getFullYear() === new Date().getFullYear();

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateSelect(day)}
                disabled={disabled || isDisabled}
                className={cn(
                  'relative aspect-square rounded-lg text-sm font-medium transition-all',
                  'hover:scale-105',
                  isDisabled &&
                    'text-neutral-300 dark:text-neutral-700 cursor-not-allowed hover:scale-100',
                  !isDisabled &&
                    !isSelected &&
                    !isInRange &&
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  isSelected &&
                    'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
                  isInRange &&
                    !isSelected &&
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100',
                  !isDisabled &&
                    !isSelected &&
                    !isInRange &&
                    'text-neutral-900 dark:text-neutral-100',
                  isToday &&
                    !isSelected &&
                    'border-2 border-blue-600 dark:border-blue-400'
                )}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        {mode === 'range' && (
          <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => {
                if (rangeValue === undefined) {
                  setInternalRange([null, null]);
                }
                onRangeChange?.([null, null]);
              }}
              disabled={disabled}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                'text-neutral-700 dark:text-neutral-300',
                'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              Cancel
            </button>
            <button
              disabled={disabled || !range[0] || !range[1]}
              className={cn(
                'px-6 py-2 rounded-lg text-sm font-medium transition-colors',
                'bg-blue-600 text-white',
                'hover:bg-blue-700 shadow-sm',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
