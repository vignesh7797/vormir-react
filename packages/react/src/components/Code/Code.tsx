import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Check, Copy } from 'lucide-react';

const codeVariants = cva(
  'relative block overflow-x-auto rounded-lg font-mono text-sm',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100',
        primary: 'bg-brand-50 dark:bg-brand-950 text-brand-900 dark:text-brand-100',
      },
      size: {
        sm: 'text-xs p-2',
        md: 'text-sm p-4',
        lg: 'text-base p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// ============================================
// Code Component
// ============================================

export interface CodeProps
  extends React.HTMLAttributes<HTMLPreElement>,
    VariantProps<typeof codeVariants> {
  children: React.ReactNode;
  /** Show copy button */
  showCopy?: boolean;
  /** Language label */
  language?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
}

export const Code = React.forwardRef<HTMLPreElement, CodeProps>(
  (
    {
      children,
      variant,
      size,
      showCopy = true,
      language,
      showLineNumbers,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      const code = typeof children === 'string' ? children : extractText(children);
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    // Extract text from children for copy functionality
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === 'string') return node;
      if (Array.isArray(node)) return node.map(extractText).join('');
      if (React.isValidElement(node) && node.props.children) {
        return extractText(node.props.children);
      }
      return '';
    };

    const lines = typeof children === 'string' ? children.split('\n') : [];

    return (
      <div className="relative group">
        {language && (
          <div className="absolute top-0 left-0 px-3 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-800 rounded-tl-lg rounded-br-lg">
            {language}
          </div>
        )}
        {showCopy && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-300 dark:hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
        <pre
          ref={ref}
          style={{
            borderRadius: 'var(--card-radius)',
            transition: 'var(--transition-base)',
          }}
          className={cn(codeVariants({ variant, size }), language && 'pt-8', className)}
          {...props}
        >
          {showLineNumbers && lines.length > 0 ? (
            <table className="w-full">
              <tbody>
                {lines.map((line, i) => (
                  <tr key={i}>
                    <td className="pr-4 text-right text-neutral-500 dark:text-neutral-500 select-none w-8">
                      {i + 1}
                    </td>
                    <td>
                      <code>{line}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <code>{children}</code>
          )}
        </pre>
      </div>
    );
  }
);

Code.displayName = 'Code';
