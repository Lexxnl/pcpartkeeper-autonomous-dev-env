import React, { useState, useEffect } from 'react';
import { ValidationRule, sanitizeInput } from '../utils/validation';
import { useValidation } from '../hooks/useValidation';

export interface ValidatedFormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean, errors: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  validationRules?: ValidationRule;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  sanitize?: boolean;
  helperText?: string;
  className?: string;
}

/**
 * ValidatedFormInput - Enhanced form input with real-time validation
 *
 * Features:
 * - Real-time validation with customizable triggers
 * - Consistent error messaging
 * - Input sanitization
 * - Accessibility features
 * - Type safety
 */
export const ValidatedFormInput: React.FC<ValidatedFormInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onValidationChange,
  placeholder,
  disabled = false,
  required = false,
  validationRules,
  validateOnChange = true,
  validateOnBlur = true,
  sanitize = true,
  helperText,
  className = '',
}) => {
  // Use the new useValidation hook for cleaner validation logic
  const validation = useValidation({
    rules: validationRules,
    validateOnChange,
    validateOnBlur,
    debounceMs: 300,
    fieldName: label,
  });

  // Handle input change with sanitization
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const sanitizedValue = sanitize ? sanitizeInput(newValue) : newValue;
    
    onChange(sanitizedValue);
    validation.handleChange(sanitizedValue);
  };

  // Handle blur
  const handleBlur = () => {
    validation.handleBlur();
  };

  // Handle focus
  const handleFocus = () => {
    validation.handleFocus();
  };

  // Notify parent of validation changes
  useEffect(() => {
    onValidationChange?.(validation.isValid, validation.errors);
  }, [validation.isValid, validation.errors, onValidationChange]);

  const hasError = validation.errors.length > 0 && validation.touched;
  const showError = hasError && !validation.isValidating;

  const inputClasses = `
    w-full px-3 py-2 bg-surface-secondary border rounded-md
    text-text-primary placeholder-text-muted
    focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary
    disabled:bg-surface-tertiary disabled:text-text-muted disabled:cursor-not-allowed
    transition-colors duration-200
    ${showError ? 'border-action-danger' : 'border-border-default'}
    ${className}
  `.trim();

  return (
    <div className='space-y-1'>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-text-secondary'
      >
        {label}
        {required && <span className='text-action-danger ml-1'>*</span>}
      </label>

      <div className='relative'>
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          aria-describedby={
            showError ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          aria-invalid={showError ? 'true' : 'false'}
        />
        
        {validation.isValidating && (
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
            <div className='w-4 h-4 border-2 border-border-subtle border-t-accent-primary rounded-full animate-spin' />
          </div>
        )}
      </div>

      {showError && (
        <div id={`${id}-error`} className='space-y-1'>
          {validation.errors.map((error, index) => (
            <p key={index} className='text-sm text-action-danger'>
              {error}
            </p>
          ))}
        </div>
      )}

      {helperText && !showError && (
        <p id={`${id}-helper`} className='text-sm text-text-muted'>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ValidatedFormInput;
