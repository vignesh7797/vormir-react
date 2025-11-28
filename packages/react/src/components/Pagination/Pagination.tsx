import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';

// Pagination Styles
const paginationVariants = cva('flex items-center gap-1');

const paginationButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        outline: 'border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800',
      },
      size: {
        sm: 'h-8 min-w-8 px-2 text-xs',
        md: 'h-9 min-w-9 px-3 text-sm',
        lg: 'h-10 min-w-10 px-4 text-base',
      },
      active: {
        true: 'bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      active: false,
    },
  }
);

// ============================================
// Pagination Root Component
// ============================================

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Total number of items */
  total: number;
  /** Number of items per page */
  pageSize?: number;
  /** Current page (1-indexed) */
  page?: number;
  /** Default page (1-indexed) */
  defaultPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Visual variant */
  variant?: 'default' | 'outline';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Number of siblings around current page */
  siblings?: number;
  /** Show first/last page buttons */
  showFirstLast?: boolean;
  /** Show previous/next page buttons */
  showPrevNext?: boolean;
  /** Show page numbers */
  showPageNumbers?: boolean;
  /** Custom previous button content */
  previousLabel?: React.ReactNode;
  /** Custom next button content */
  nextLabel?: React.ReactNode;
  /** Custom first button content */
  firstLabel?: React.ReactNode;
  /** Custom last button content */
  lastLabel?: React.ReactNode;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      total,
      pageSize = 10,
      page: controlledPage,
      defaultPage = 1,
      onPageChange,
      variant = 'default',
      size = 'md',
      siblings = 1,
      showFirstLast = true,
      showPrevNext = true,
      showPageNumbers = true,
      previousLabel = <ChevronLeft className="h-4 w-4" />,
      nextLabel = <ChevronRight className="h-4 w-4" />,
      firstLabel = <ChevronsLeft className="h-4 w-4" />,
      lastLabel = <ChevronsRight className="h-4 w-4" />,
      className,
      ...props
    },
    ref
  ) => {
    const [internalPage, setInternalPage] = useState(defaultPage);

    const currentPage = controlledPage ?? internalPage;
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;

      if (controlledPage === undefined) {
        setInternalPage(newPage);
      }
      onPageChange?.(newPage);
    };

    // Generate page numbers array with ellipsis
    const getPageNumbers = () => {
      const pages: (number | 'ellipsis')[] = [];

      // Always show first page
      pages.push(1);

      // Calculate range around current page
      const startPage = Math.max(2, currentPage - siblings);
      const endPage = Math.min(totalPages - 1, currentPage + siblings);

      // Add ellipsis before range if needed
      if (startPage > 2) {
        pages.push('ellipsis');
      }

      // Add pages in range
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis after range if needed
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }

      // Always show last page if more than 1 page
      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    };

    const pageNumbers = showPageNumbers ? getPageNumbers() : [];

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn(paginationVariants(), className)}
        {...props}
      >
        {/* First Page Button */}
        {showFirstLast && (
          <button
            type="button"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            aria-label="Go to first page"
            style={{
              borderRadius: 'var(--button-radius)',
              transition: 'var(--transition-button)',
            }}
            className={cn(paginationButtonVariants({ variant, size, active: false }))}
          >
            {firstLabel}
          </button>
        )}

        {/* Previous Page Button */}
        {showPrevNext && (
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            style={{
              borderRadius: 'var(--button-radius)',
              transition: 'var(--transition-button)',
            }}
            className={cn(paginationButtonVariants({ variant, size, active: false }))}
          >
            {previousLabel}
          </button>
        )}

        {/* Page Numbers */}
        {showPageNumbers &&
          pageNumbers.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className={cn(paginationButtonVariants({ variant, size, active: false }), 'pointer-events-none')}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  borderRadius: 'var(--button-radius)',
                  transition: 'var(--transition-button)',
                }}
                className={cn(paginationButtonVariants({ variant, size, active: isActive }))}
              >
                {page}
              </button>
            );
          })}

        {/* Next Page Button */}
        {showPrevNext && (
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            style={{
              borderRadius: 'var(--button-radius)',
              transition: 'var(--transition-button)',
            }}
            className={cn(paginationButtonVariants({ variant, size, active: false }))}
          >
            {nextLabel}
          </button>
        )}

        {/* Last Page Button */}
        {showFirstLast && (
          <button
            type="button"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            style={{
              borderRadius: 'var(--button-radius)',
              transition: 'var(--transition-button)',
            }}
            aria-label="Go to last page"
            className={cn(paginationButtonVariants({ variant, size, active: false }))}
          >
            {lastLabel}
          </button>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

// ============================================
// PaginationInfo Component (Show "X-Y of Z items")
// ============================================

export interface PaginationInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total number of items */
  total: number;
  /** Number of items per page */
  pageSize: number;
  /** Current page (1-indexed) */
  page: number;
  /** Custom label template (e.g., "{start}-{end} of {total} items") */
  label?: string;
}

export const PaginationInfo = React.forwardRef<HTMLDivElement, PaginationInfoProps>(
  ({ total, pageSize, page, label, className, ...props }, ref) => {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);

    const displayLabel = label
      ?.replace('{start}', start.toString())
      .replace('{end}', end.toString())
      .replace('{total}', total.toString()) || `${start}-${end} of ${total} items`;

    return (
      <div
        ref={ref}
        className={cn('text-sm text-neutral-600 dark:text-neutral-400', className)}
        {...props}
      >
        {displayLabel}
      </div>
    );
  }
);

PaginationInfo.displayName = 'PaginationInfo';

// ============================================
// PaginationSizeSelector Component
// ============================================

export interface PaginationSizeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Available page sizes */
  pageSizes?: number[];
  /** Current page size */
  pageSize: number;
  /** Callback when page size changes */
  onPageSizeChange: (size: number) => void;
  /** Label before selector */
  label?: string;
}

export const PaginationSizeSelector = React.forwardRef<HTMLDivElement, PaginationSizeSelectorProps>(
  ({ pageSizes = [10, 20, 50, 100], pageSize, onPageSizeChange, label = 'Show', className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">{label}</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm transition-colors hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">per page</span>
      </div>
    );
  }
);

PaginationSizeSelector.displayName = 'PaginationSizeSelector';
