import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useFormControl } from '../FormControl/FormControl';

export interface FormErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  FormErrorMessageProps
>(({ className, children, ...props }, ref) => {
  const { isInvalid } = useFormControl();

  if (!isInvalid) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn('flex items-center gap-1.5 text-sm text-error', className)}
      {...props}
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
});

FormErrorMessage.displayName = 'FormErrorMessage';
