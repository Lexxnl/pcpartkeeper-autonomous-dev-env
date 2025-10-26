import React from 'react';

export interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

/**
 * FormInput - A reusable form input component with consistent styling
 *
 * Features:
 * - Consistent dark theme styling
 * - Error state handling
 * - Helper text support
 * - Accessibility features
 * - Type safety
 */
export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  helperText,
  className = '',
}) => {
  const inputClasses = `
    w-full px-3 py-2 bg-surface-secondary border rounded-md
    text-text-primary placeholder-text-muted
    focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary
    disabled:bg-surface-tertiary disabled:text-text-muted disabled:cursor-not-allowed
    transition-colors duration-200
    ${error ? 'border-action-danger' : 'border-border-default'}
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

      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        aria-invalid={error ? 'true' : 'false'}
      />

      {error && (
        <p id={`${id}-error`} className='text-sm text-action-danger'>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${id}-helper`} className='text-sm text-text-muted'>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormInput;
