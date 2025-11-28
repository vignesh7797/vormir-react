import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Search, X } from 'lucide-react';

// CommandPalette Context
interface CommandPaletteContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | undefined>(undefined);

const useCommandPaletteContext = () => {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error('CommandPalette components must be used within a CommandPalette component');
  }
  return context;
};

// CommandPalette Styles
const commandPaletteVariants = cva(
  'fixed inset-0 z-50 flex items-start justify-center pt-[20vh] animate-in fade-in-0'
);

const commandPaletteContentVariants = cva(
  'relative w-full max-w-2xl max-h-[60vh] bg-white dark:bg-neutral-950 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-8'
);

const commandItemVariants = cva(
  'flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors relative',
  {
    variants: {
      selected: {
        true: 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400',
        false: 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

// ============================================
// CommandPalette Root Component
// ============================================

export interface CommandPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placeholder text for search input */
  placeholder?: string;
  /** Keyboard shortcut to open (e.g., "⌘K", "Ctrl+K") */
  shortcut?: string;
  /** Enable keyboard shortcut listener */
  enableShortcut?: boolean;
}

export const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      children,
      isOpen: controlledOpen,
      onOpenChange,
      placeholder = 'Type a command or search...',
      shortcut = '⌘K',
      enableShortcut = true,
      className,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const isOpen = controlledOpen ?? internalOpen;

    const setIsOpen = (open: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    };

    // Listen for keyboard shortcut (⌘K or Ctrl+K)
    useEffect(() => {
      if (!enableShortcut) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault();
          setIsOpen(!isOpen);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [enableShortcut, isOpen, setIsOpen]);

    // Close on ESC
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, setIsOpen]);

    // Lock body scroll when open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }
      return undefined;
    }, [isOpen]);

    // Focus input when opened
    useEffect(() => {
      if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 0);
        setSearch('');
        setSelectedIndex(0);
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <CommandPaletteContext.Provider
        value={{
          isOpen,
          setIsOpen,
          search,
          setSearch,
          selectedIndex,
          setSelectedIndex,
        }}
      >
        {/* Backdrop */}
        <div className={cn(commandPaletteVariants(), className)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Content */}
          <div ref={ref} className={cn(commandPaletteContentVariants())} {...props}>
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
              <Search className="h-5 w-5 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              {shortcut && !search && (
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-1.5 font-mono text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
                  {shortcut}
                </kbd>
              )}
            </div>

            {/* Command List */}
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </div>
      </CommandPaletteContext.Provider>
    );
  }
);

CommandPalette.displayName = 'CommandPalette';

// ============================================
// CommandGroup Component
// ============================================

export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  heading?: string;
}

export const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ children, heading, className, ...props }, ref) => {
    const { search } = useCommandPaletteContext();

    // Filter children based on search
    const filteredChildren = useMemo(() => {
      if (!search) return children;

      return React.Children.toArray(children).filter((child) => {
        if (React.isValidElement(child) && child.type === CommandItem) {
          const keywords = child.props.keywords || [];
          const value = child.props.value || '';
          const searchLower = search.toLowerCase();

          return (
            value.toLowerCase().includes(searchLower) ||
            keywords.some((keyword: string) => keyword.toLowerCase().includes(searchLower))
          );
        }
        return true;
      });
    }, [children, search]);

    if (React.Children.count(filteredChildren) === 0) return null;

    return (
      <div ref={ref} className={cn('py-2', className)} role="group" {...props}>
        {heading && (
          <div className="px-4 py-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">{heading}</div>
        )}
        <div>{filteredChildren}</div>
      </div>
    );
  }
);

CommandGroup.displayName = 'CommandGroup';

// ============================================
// CommandItem Component
// ============================================

export interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Value for filtering */
  value?: string;
  /** Keywords for search matching */
  keywords?: string[];
  /** Icon before text */
  icon?: React.ReactNode;
  /** Shortcut displayed on right */
  shortcut?: string;
  /** Callback when item is selected */
  onSelect?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, value, keywords, icon, shortcut, onSelect, disabled, className, ...props }, ref) => {
    const { selectedIndex, setSelectedIndex, setIsOpen } = useCommandPaletteContext();
    const itemRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState<number | null>(null);

    // Register item index
    useEffect(() => {
      if (itemRef.current && itemRef.current.parentElement) {
        const items = Array.from(itemRef.current.parentElement.querySelectorAll('[data-command-item]'));
        const itemIndex = items.indexOf(itemRef.current);
        setIndex(itemIndex);
      }
    }, []);

    const isSelected = index !== null && selectedIndex === index;

    // Scroll into view when selected
    useEffect(() => {
      if (isSelected && itemRef.current) {
        itemRef.current.scrollIntoView({ block: 'nearest' });
      }
    }, [isSelected]);

    const handleClick = () => {
      if (disabled) return;
      onSelect?.();
      setIsOpen(false);
    };

    const handleMouseEnter = () => {
      if (index !== null && !disabled) {
        setSelectedIndex(index);
      }
    };

    return (
      <div
        ref={(node) => {
          (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-command-item
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          commandItemVariants({ selected: isSelected }),
          disabled && 'pointer-events-none opacity-50',
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
        {shortcut && (
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-1.5 font-mono text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);

CommandItem.displayName = 'CommandItem';

// ============================================
// CommandSeparator Component
// ============================================

export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CommandSeparator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn('h-px my-2 bg-neutral-200 dark:bg-neutral-800', className)}
        {...props}
      />
    );
  }
);

CommandSeparator.displayName = 'CommandSeparator';

// ============================================
// CommandEmpty Component
// ============================================

export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ children = 'No results found.', className, ...props }, ref) => {
    const { search } = useCommandPaletteContext();

    if (!search) return null;

    return (
      <div
        ref={ref}
        className={cn('py-6 text-center text-sm text-neutral-500 dark:text-neutral-400', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandEmpty.displayName = 'CommandEmpty';

// ============================================
// CommandLoading Component
// ============================================

export interface CommandLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const CommandLoading = React.forwardRef<HTMLDivElement, CommandLoadingProps>(
  ({ children = 'Loading...', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('py-6 text-center text-sm text-neutral-500 dark:text-neutral-400', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandLoading.displayName = 'CommandLoading';

// ============================================
// useCommandPalette Hook
// ============================================

export const useCommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isOpen, setIsOpen };
};
