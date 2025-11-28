import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronDown, X, Check } from 'lucide-react';

const multiselectVariants = cva(
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

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps extends VariantProps<typeof multiselectVariants> {
  /** Options to display */
  options: MultiSelectOption[];
  /** Selected values */
  value?: string[];
  /** Default values (uncontrolled) */
  defaultValue?: string[];
  /** Change handler */
  onChange?: (value: string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the multiselect is disabled */
  disabled?: boolean;
  /** Whether the multiselect has an error */
  error?: boolean;
  /** Maximum number of selections */
  max?: number;
  /** Show search input */
  searchable?: boolean;
  /** Show selected count badge */
  showCount?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'Select...',
  disabled = false,
  error = false,
  variant,
  size = 'md',
  max,
  searchable = true,
  showCount = true,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (newValue: string[]) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const toggleOption = (optionValue: string) => {
    const isSelected = value.includes(optionValue);
    
    if (isSelected) {
      handleValueChange(value.filter((v) => v !== optionValue));
    } else {
      if (max !== undefined && value.length >= max) return;
      handleValueChange([...value, optionValue]);
    }
  };

  const removeValue = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleValueChange(value.filter((v) => v !== optionValue));
  };

  const filteredOptions = searchable && search
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

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
    sm: 'px-3 py-1.5 gap-1',
    md: 'px-4 py-2 gap-2',
    lg: 'px-5 py-3 gap-2',
  };

  const badgeSizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-2.5 py-1',
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div
        className={cn(
          multiselectVariants({ variant, size, error }),
          'flex items-center flex-wrap cursor-pointer',
          inputSizeClasses[size || 'md'],
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={() => !disabled && setIsOpen(true)}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-neutral-400 dark:text-neutral-500 flex-1">
            {placeholder}
          </span>
        ) : (
          <div className="flex-1 flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <span
                key={option.value}
                className={cn(
                  'inline-flex items-center gap-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100',
                  badgeSizeClasses[size || 'md']
                )}
              >
                {option.label}
                {!disabled && (
                  <button
                    onClick={(e) => removeValue(option.value, e)}
                    className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
            {showCount && selectedOptions.length > 0 && (
              <span className={cn(
                'inline-flex items-center rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
                badgeSizeClasses[size || 'md']
              )}>
                {selectedOptions.length}
                {max && ` / ${max}`}
              </span>
            )}
          </div>
        )}
        <ChevronDown
          className={cn(
            'w-4 h-4 text-neutral-500 transition-transform shrink-0',
            isOpen && 'rotate-180'
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg">
          {searchable && (
            <div className="p-2 border-b border-neutral-200 dark:border-neutral-800">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-900 rounded outline-none"
                autoFocus
              />
            </div>
          )}
          <div className="max-h-60 overflow-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                const isMaxReached = max !== undefined && value.length >= max && !isSelected;
                const isDisabled = option.disabled || isMaxReached;

                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 cursor-pointer text-sm transition-colors',
                      isDisabled && 'opacity-50 cursor-not-allowed',
                      !isDisabled && 'hover:bg-neutral-50 dark:hover:bg-neutral-900'
                    )}
                    onClick={() => {
                      if (!isDisabled) {
                        toggleOption(option.value);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                        isSelected
                          ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500'
                          : 'border-neutral-300 dark:border-neutral-700'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="flex-1">{option.label}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

MultiSelect.displayName = 'MultiSelect';
