import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  shortcut?: string;
  items?: ContextMenuItem[];
}

export interface ContextMenuProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Menu items */
  items: ContextMenuItem[];
  /** Additional CSS classes */
  className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    if (!item.items) {
      item.onClick?.();
      handleClose();
    }
  };

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const renderMenuItem = (item: ContextMenuItem, index: number, depth = 0) => {
    if (item.separator) {
      return (
        <div
          key={`separator-${index}`}
          className="my-1 h-px bg-neutral-200 dark:bg-neutral-800"
        />
      );
    }

    const hasSubmenu = item.items && item.items.length > 0;
    const isSubmenuActive = activeSubmenu === index;

    return (
      <div key={index} className="relative">
        <button
          className={cn(
            'w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors',
            item.disabled
              ? 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
              : 'text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800',
            depth > 0 && 'pl-6'
          )}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => hasSubmenu && setActiveSubmenu(index)}
          onMouseLeave={() => hasSubmenu && setActiveSubmenu(null)}
          disabled={item.disabled}
        >
          {item.icon && <span className="w-4 h-4">{item.icon}</span>}
          <span className="flex-1">{item.label}</span>
          {item.shortcut && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {item.shortcut}
            </span>
          )}
          {hasSubmenu && (
            <svg
              className="w-4 h-4 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {hasSubmenu && isSubmenuActive && (
          <div
            className={cn(
              'absolute left-full top-0 ml-1 min-w-[180px] rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg py-1 z-50'
            )}
          >
            {item.items!.map((subItem, subIndex) =>
              renderMenuItem(subItem, subIndex, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div ref={triggerRef} onContextMenu={handleContextMenu}>
        {children}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'fixed min-w-[200px] rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg py-1 z-50',
            className
          )}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          role="menu"
        >
          {items.map((item, index) => renderMenuItem(item, index))}
        </div>
      )}
    </>
  );
};

ContextMenu.displayName = 'ContextMenu';
