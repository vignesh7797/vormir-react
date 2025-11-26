import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface PopoverProps {
  /** Trigger element */
  trigger: React.ReactElement;
  /** Popover content */
  children: React.ReactNode;
  /** Position relative to trigger */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Alignment */
  align?: 'start' | 'center' | 'end';
  /** Whether to show arrow */
  showArrow?: boolean;
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Close on outside click */
  closeOnOutsideClick?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  position = 'bottom',
  align = 'center',
  showArrow = true,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnOutsideClick = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // Handle outside click
  useEffect(() => {
    if (!open || !closeOnOutsideClick) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, closeOnOutsideClick]);

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  const alignClasses = {
    start: position === 'top' || position === 'bottom' ? 'left-0' : 'top-0',
    center: position === 'top' || position === 'bottom' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
    end: position === 'top' || position === 'bottom' ? 'right-0' : 'bottom-0',
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => handleOpenChange(!open)}
      >
        {trigger}
      </div>

      {open && (
        <div
          ref={contentRef}
          className={cn(
            'absolute z-50 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg p-4',
            positionClasses[position],
            alignClasses[align]
          )}
        >
          {showArrow && (
            <div
              className={cn(
                'absolute w-2 h-2 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rotate-45',
                position === 'top' && 'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0',
                position === 'bottom' && 'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0',
                position === 'left' && 'right-[-5px] top-1/2 -translate-y-1/2 border-t-0 border-r-0',
                position === 'right' && 'left-[-5px] top-1/2 -translate-y-1/2 border-b-0 border-l-0'
              )}
            />
          )}
          {children}
        </div>
      )}
    </div>
  );
};

Popover.displayName = 'Popover';
