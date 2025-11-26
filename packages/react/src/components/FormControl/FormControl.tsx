import * as React from 'react';
import { createContext, useContext } from 'react';
import { cn } from '../../utils/cn';

interface FormControlContextValue {
  id?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
}

const FormControlContext = createContext<FormControlContextValue | undefined>(
  undefined
);

export const useFormControl = () => {
  const context = useContext(FormControlContext);
  return context || {};
};

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the form control is required */
  isRequired?: boolean;
  /** Whether the form control is disabled */
  isDisabled?: boolean;
  /** Whether the form control is invalid */
  isInvalid?: boolean;
  /** Whether the form control is read-only */
  isReadOnly?: boolean;
  /** ID to associate with form elements */
  id?: string;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      children,
      className,
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
      id,
      ...props
    },
    ref
  ) => {
    const contextValue: FormControlContextValue = {
      id,
      isRequired,
      isDisabled,
      isInvalid,
      isReadOnly,
    };

    return (
      <FormControlContext.Provider value={contextValue}>
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {children}
        </div>
      </FormControlContext.Provider>
    );
  }
);

FormControl.displayName = 'FormControl';
