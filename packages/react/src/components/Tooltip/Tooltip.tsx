'use client';

import * as React from 'react';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from '@/utils';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Content to show in tooltip */
  content: React.ReactNode;
  /** Position of tooltip */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  delayShow?: number;
  /** Delay before hiding (ms) */
  delayHide?: number;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      position = 'top',
      delayShow = 200,
      delayHide = 0,
      className,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const showTimeoutRef = useRef<NodeJS.Timeout>();
    const hideTimeoutRef = useRef<NodeJS.Timeout>();

    const handleMouseEnter = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      showTimeoutRef.current = setTimeout(() => {
        setShow(true);
      }, delayShow);
    };

    const handleMouseLeave = () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setShow(false);
      }, delayHide);
    };

    useEffect(() => {
      return () => {
        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      };
    }, []);

    const positionClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
      <div
        ref={ref}
        className="relative inline-flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        {...props}
      >
        {children}
        {show && (
          <div
            role="tooltip"
            className={cn(
              'absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
              positionClasses[position],
              className
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
