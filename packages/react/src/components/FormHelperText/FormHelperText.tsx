import * as React from 'react';
import { cn } from '../../utils/cn';
import { useFormControl } from '../FormControl/FormControl';

export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormHelperText = React.forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps
>(({ className, children, ...props }, ref) => {
  const { isInvalid } = useFormControl();

  if (isInvalid) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
});

FormHelperText.displayName = 'FormHelperText';
