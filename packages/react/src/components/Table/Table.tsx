import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

const tableVariants = cva('w-full caption-bottom text-sm border-collapse', {
  variants: {
    variant: {
      default: '',
      striped: '[&_tbody_tr:nth-child(even)]:bg-neutral-50 dark:[&_tbody_tr:nth-child(even)]:bg-neutral-900/50',
      bordered: 'border border-neutral-200 dark:border-neutral-800',
    },
    size: {
      sm: '[&_th]:p-2 [&_td]:p-2',
      md: '[&_th]:p-3 [&_td]:p-3',
      lg: '[&_th]:p-4 [&_td]:p-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// ============================================
// Table Component
// ============================================

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, variant, size, className, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <table
          ref={ref}
          className={cn(tableVariants({ variant, size }), className)}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

// ============================================
// TableHeader Component
// ============================================

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900',
          className
        )}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = 'TableHeader';

// ============================================
// TableBody Component
// ============================================

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

// ============================================
// TableFooter Component
// ============================================

export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn(
          'border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 font-medium',
          className
        )}
        {...props}
      >
        {children}
      </tfoot>
    );
  }
);

TableFooter.displayName = 'TableFooter';

// ============================================
// TableRow Component
// ============================================

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  /** Make row selectable with hover effect */
  selectable?: boolean;
  /** Selected state */
  selected?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, selectable, selected, className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        data-state={selected ? 'selected' : undefined}
        className={cn(
          'border-b border-neutral-200 dark:border-neutral-800 transition-colors',
          selectable &&
            'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800/50',
          selected && 'bg-brand-50 dark:bg-brand-950',
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

// ============================================
// TableHead Component
// ============================================

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  /** Enable sorting */
  sortable?: boolean;
  /** Current sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** Callback when sort is clicked */
  onSort?: () => void;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ children, sortable, sortDirection, onSort, className, ...props }, ref) => {
    const content = (
      <>
        {children}
        {sortable && (
          <span className="ml-2 inline-flex">
            {sortDirection === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : sortDirection === 'desc' ? (
              <ArrowDown className="h-4 w-4" />
            ) : (
              <ArrowUpDown className="h-4 w-4 opacity-50" />
            )}
          </span>
        )}
      </>
    );

    return (
      <th
        ref={ref}
        className={cn(
          'text-left align-middle font-semibold text-neutral-700 dark:text-neutral-300',
          sortable && 'cursor-pointer select-none hover:text-neutral-900 dark:hover:text-neutral-100',
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        {sortable ? (
          <div className="flex items-center">{content}</div>
        ) : (
          content
        )}
      </th>
    );
  }
);

TableHead.displayName = 'TableHead';

// ============================================
// TableCell Component
// ============================================

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn('align-middle text-neutral-900 dark:text-neutral-100', className)}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';

// ============================================
// TableCaption Component
// ============================================

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
}

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn('mt-4 text-sm text-neutral-500 dark:text-neutral-500', className)}
        {...props}
      >
        {children}
      </caption>
    );
  }
);

TableCaption.displayName = 'TableCaption';
