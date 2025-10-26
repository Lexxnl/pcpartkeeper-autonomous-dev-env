import { useState, useCallback, useEffect, useMemo } from 'react';
import { validateValue, ValidationRule, ValidationResult } from '../utils/validation';

export interface UseValidationOptions {
  rules?: ValidationRule;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
  fieldName?: string;
}

export interface UseValidationReturn {
  errors: string[];
  isValid: boolean;
  touched: boolean;
  isValidating: boolean;
  validate: (value: any) => ValidationResult;
  handleChange: (value: any) => void;
  handleBlur: () => void;
  handleFocus: () => void;
  clearErrors: () => void;
  setTouched: (touched: boolean) => void;
}

/**
 * Custom hook for form validation logic
 * 
 * ARCHITECTURAL BENEFITS:
 * - Centralizes all validation logic in one reusable hook
 * - Eliminates duplicate validation patterns across components
 * - Provides consistent validation behavior and error handling
 * - Supports debounced validation for better UX
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Debounced validation to prevent excessive re-renders
 * - Memoized validation results
 * - Optimized event handlers with useCallback
 * - Efficient error state management
 * 
 * USAGE EXAMPLES:
 * ```tsx
 * const validation = useValidation({
 *   rules: { required: true, minLength: 3 },
 *   validateOnChange: true,
 *   debounceMs: 300
 * });
 * 
 * <input
 *   value={value}
 *   onChange={(e) => validation.handleChange(e.target.value)}
 *   onBlur={validation.handleBlur}
 * />
 * ```
 */
export function useValidation({
  rules,
  validateOnChange = true,
  validateOnBlur = true,
  debounceMs = 300,
  fieldName = 'Field',
}: UseValidationOptions = {}): UseValidationReturn {
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [currentValue, setCurrentValue] = useState<any>('');

  // Memoized validation function
  const validate = useCallback(
    (value: any): ValidationResult => {
      if (!rules) {
        return { isValid: true, errors: [], firstError: undefined };
      }

      const result = validateValue(value, rules, fieldName);
      setErrors(result.errors);
      setIsValidating(false);
      return result;
    },
    [rules, fieldName]
  );

  // Debounced validation effect
  useEffect(() => {
    if (!validateOnChange || !rules || !currentValue) return;

    setIsValidating(true);
    const timeoutId = setTimeout(() => {
      validate(currentValue);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [currentValue, validateOnChange, rules, debounceMs, validate]);

  // Handle value change
  const handleChange = useCallback(
    (value: any) => {
      setCurrentValue(value);
      
      if (validateOnChange && rules) {
        setIsValidating(true);
        // Debounced validation is handled in useEffect
      }
    },
    [validateOnChange, rules]
  );

  // Handle blur event
  const handleBlur = useCallback(() => {
    setTouched(true);
    if (validateOnBlur && rules) {
      validate(currentValue);
    }
  }, [validateOnBlur, rules, currentValue, validate]);

  // Handle focus event
  const handleFocus = useCallback(() => {
    if (!touched) {
      setTouched(true);
    }
  }, [touched]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors([]);
    setIsValidating(false);
  }, []);

  // Set touched state
  const setTouchedState = useCallback((touched: boolean) => {
    setTouched(touched);
  }, []);

  // Memoized validation state
  const isValid = useMemo(() => {
    return errors.length === 0 && !isValidating;
  }, [errors.length, isValidating]);

  return {
    errors,
    isValid,
    touched,
    isValidating,
    validate,
    handleChange,
    handleBlur,
    handleFocus,
    clearErrors,
    setTouched: setTouchedState,
  };
}

export default useValidation;
