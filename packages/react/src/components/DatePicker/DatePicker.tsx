import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './DatePicker.css';

const datepickerVariants = cva('datepicker', {
  variants: {
    variant: {
      outline: 'datepicker--outline',
      filled: 'datepicker--filled',
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
    <div className="datepicker-wrapper">
      {/* Presets Sidebar for Range Mode */}
      {mode === 'range' && showPresets && (
        <div className="datepicker__presets">
          <div className="datepicker__presets-title">
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
              className="datepicker__preset-button"
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
          disabled && 'datepicker--disabled',
          className
        )}
      >
        {/* Header with Month/Year Selectors */}
        <div className="datepicker__header">
          <button
            onClick={previousMonth}
            disabled={disabled}
            className="datepicker__nav-button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="datepicker__header-content">
            {showMonthYearPicker ? (
              <>
                {/* Month Dropdown */}
                <div className="datepicker__picker-dropdown">
                  <button
                    onClick={() => setShowMonthPicker(!showMonthPicker)}
                    disabled={disabled}
                    className="datepicker__picker-button"
                  >
                    {monthName} <ChevronLeft className="w-4 h-4 inline-block ml-1 -rotate-90" />
                  </button>
                  {showMonthPicker && (
                    <div className="datepicker__picker-menu">
                      {months.map((month, index) => (
                        <button
                          key={month}
                          onClick={() => handleMonthSelect(index)}
                          className={cn(
                            'datepicker__picker-option',
                            index === currentMonth.getMonth() && 'datepicker__picker-option--selected'
                          )}
                        >
                          {month.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Year Dropdown */}
                <div className="datepicker__picker-dropdown">
                  <button
                    onClick={() => setShowYearPicker(!showYearPicker)}
                    disabled={disabled}
                    className="datepicker__picker-button"
                  >
                    {year} <ChevronLeft className="w-4 h-4 inline-block ml-1 -rotate-90" />
                  </button>
                  {showYearPicker && (
                    <div className="datepicker__picker-menu datepicker__picker-menu--year">
                      {generateYears().map((y) => (
                        <button
                          key={y}
                          onClick={() => handleYearSelect(y)}
                          className={cn(
                            'datepicker__picker-option',
                            y === year && 'datepicker__picker-option--selected'
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
              <span className="datepicker__month-year-display">
                {monthYear}
              </span>
            )}
          </div>

          <button
            onClick={nextMonth}
            disabled={disabled}
            className="datepicker__nav-button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="datepicker__weekdays">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
            <div
              key={day}
              className="datepicker__weekday"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="datepicker__calendar">
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
                  'datepicker__day',
                  isDisabled && 'datepicker__day--disabled',
                  isSelected && 'datepicker__day--selected',
                  isInRange && !isSelected && 'datepicker__day--in-range',
                  isToday && 'datepicker__day--today'
                )}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        {mode === 'range' && (
          <div className="datepicker__actions">
            <button
              onClick={() => {
                if (rangeValue === undefined) {
                  setInternalRange([null, null]);
                }
                onRangeChange?.([null, null]);
              }}
              disabled={disabled}
              className="datepicker__action-button datepicker__action-button--cancel"
            >
              Cancel
            </button>
            <button
              disabled={disabled || !range[0] || !range[1]}
              className="datepicker__action-button datepicker__action-button--apply"
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
