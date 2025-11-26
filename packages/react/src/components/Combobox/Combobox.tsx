import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronDown, Check } from 'lucide-react';

const comboboxVariants = cva(
  'relative w-full rounded-lg border bg-white dark:bg-neutral-950 transition-colors',
  {
    variants: {
      variant: {
        outline: 'border-neutral-300 dark:border-neutral-700',
        filled: 'border-transparent bg-neutral-100 dark:bg-neutral-900',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      error: {
        true: 'border-red-500 dark:border-red-500',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  }
);

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends VariantProps<typeof comboboxVariants> {
  /** Options to display */
  options: ComboboxOption[];
  /** Selected value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Whether the combobox has an error */
  error?: boolean;
  /** Allow custom values */
  allowCustom?: boolean;
  /** Filter function */
  filterFn?: (option: ComboboxOption, search: string) => boolean;
  /** Additional CSS classes */
  className?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'Select...',
  disabled = false,
  error = false,
  variant,
  size = 'md',
  allowCustom = false,
  filterFn,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || value || '';

  const defaultFilter = (option: ComboboxOption, searchValue: string) => {
    return option.label.toLowerCase().includes(searchValue.toLowerCase());
  };

  const filteredOptions = search
    ? options.filter((opt) => (filterFn || defaultFilter)(opt, search))
    : options;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setSearch('');
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setIsOpen(true);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          const option = filteredOptions[focusedIndex];
          if (option && !option.disabled) {
            handleValueChange(option.value);
          }
        } else if (allowCustom && search) {
          handleValueChange(search);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex((prev) => {
          const next = prev + 1;
          return next >= filteredOptions.length ? 0 : next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? filteredOptions.length - 1 : next;
        });
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearch('');
        inputRef.current?.blur();
        break;
    }
  };

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const inputSizeClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-5 py-3',
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div
        className={cn(
          comboboxVariants({ variant, size, error }),
          'flex items-center gap-2',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? search : displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'flex-1 bg-transparent outline-none',
            inputSizeClasses[size || 'md']
          )}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="combobox-list"
        />
        <ChevronDown
          className={cn(
            'w-4 h-4 mr-2 text-neutral-500 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </div>

      {isOpen && (
        <div
          ref={listRef}
          id="combobox-list"
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg"
          role="listbox"
        >
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
              {allowCustom && search
                ? `Press Enter to add "${search}"`
                : 'No options found'}
            </div>
          ) : (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 cursor-pointer text-sm transition-colors',
                  option.disabled &&
                    'opacity-50 cursor-not-allowed',
                  !option.disabled &&
                    (index === focusedIndex
                      ? 'bg-neutral-100 dark:bg-neutral-800'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-900'),
                  option.value === value && 'font-medium'
                )}
                onClick={() => {
                  if (!option.disabled) {
                    handleValueChange(option.value);
                  }
                }}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <span className="flex-1">{option.label}</span>
                {option.value === value && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

Combobox.displayName = 'Combobox';
