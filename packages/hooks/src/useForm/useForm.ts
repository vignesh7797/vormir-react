import { useState, useCallback } from 'react';

export type FormValues = Record<string, any>;
export type FormErrors = Record<string, string>;
export type FormTouched = Record<string, boolean>;

export interface UseFormReturn<T extends FormValues> {
  values: T;
  errors: FormErrors;
  touched: FormTouched;
  isValid: boolean;
  handleChange: (name: keyof T, value: any) => void;
  handleBlur: (name: keyof T) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e?: React.FormEvent) => void;
  reset: () => void;
  setFieldValue: (name: keyof T, value: any) => void;
  setFieldError: (name: keyof T, error: string) => void;
}

/**
 * Hook for managing form state
 * @param initialValues - Initial form values
 * @param validate - Validation function
 * @returns Object with form state and handlers
 */
export function useForm<T extends FormValues>(
  initialValues: T,
  validate?: (values: T) => FormErrors
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const isValid = Object.keys(errors).length === 0;

  const validateForm = useCallback(
    (formValues: T): FormErrors => {
      if (validate) {
        return validate(formValues);
      }
      return {};
    },
    [validate]
  );

  const handleChange = useCallback(
    (name: keyof T, value: any) => {
      const newValues = { ...values, [name]: value };
      setValues(newValues);
      
      if (touched[name as string]) {
        const newErrors = validateForm(newValues);
        setErrors(newErrors);
      }
    },
    [values, touched, validateForm]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const newErrors = validateForm(values);
      setErrors(newErrors);
    },
    [values, validateForm]
  );

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);

      const newErrors = validateForm(values);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        onSubmit(values);
      }
    },
    [values, validateForm]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  };
}
