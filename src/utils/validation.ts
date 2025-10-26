/**
 * Validation utilities for form inputs and data
 * 
 * Provides consistent validation functions and error messages
 * for form inputs throughout the application.
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
  email?: boolean;
  number?: boolean;
  range?: [number, number];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  firstError?: string;
}

/**
 * Validates a single value against validation rules
 */
export function validateValue(
  value: unknown,
  rules: ValidationRule,
  fieldName: string = 'Field'
): ValidationResult {
  const errors: string[] = [];

  // Required validation
  if (rules.required && (!value || value.toString().trim() === '')) {
    errors.push(`${fieldName} is required`);
  }

  // Skip other validations if value is empty and not required
  if (!value || value.toString().trim() === '') {
    return {
      isValid: errors.length === 0,
      errors,
      firstError: errors[0],
    };
  }

  const stringValue = value.toString();

  // Min length validation
  if (rules.minLength && stringValue.length < rules.minLength) {
    errors.push(`${fieldName} must be at least ${rules.minLength} characters long`);
  }

  // Max length validation
  if (rules.maxLength && stringValue.length > rules.maxLength) {
    errors.push(`${fieldName} must be no more than ${rules.maxLength} characters long`);
  }

  // Min value validation (for numbers)
  if (rules.min !== undefined && !isNaN(Number(value)) && Number(value) < rules.min) {
    errors.push(`${fieldName} must be at least ${rules.min}`);
  }

  // Max value validation (for numbers)
  if (rules.max !== undefined && !isNaN(Number(value)) && Number(value) > rules.max) {
    errors.push(`${fieldName} must be no more than ${rules.max}`);
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(stringValue)) {
    errors.push(`${fieldName} format is invalid`);
  }

  // Email validation
  if (rules.email && !validateEmail(stringValue)) {
    errors.push(`${fieldName} must be a valid email address`);
  }

  // Number validation
  if (rules.number && !validateNumber(value)) {
    errors.push(`${fieldName} must be a valid number`);
  }

  // Range validation
  if (rules.range && validateNumber(value)) {
    const [min, max] = rules.range;
    if (value < min || value > max) {
      errors.push(`${fieldName} must be between ${min} and ${max}`);
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    firstError: errors[0],
  };
}

/**
 * Validates multiple fields at once
 */
export function validateFields(
  data: Record<string, unknown>,
  rules: Record<string, ValidationRule>
): ValidationResult {
  const allErrors: string[] = [];
  let isValid = true;

  for (const [fieldName, fieldRules] of Object.entries(rules)) {
    const result = validateValue(data[fieldName], fieldRules, fieldName);
    if (!result.isValid) {
      isValid = false;
      allErrors.push(...result.errors);
    }
  }

  return {
    isValid,
    errors: allErrors,
    firstError: allErrors[0],
  };
}

/**
 * Common validation rules
 */
export const commonRules = {
  required: { required: true },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
  },
  url: {
    pattern: /^https?:\/\/.+/,
  },
  positiveNumber: {
    min: 0,
  },
  price: {
    min: 0,
    max: 999999.99,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s\-']+$/,
  },
  description: {
    maxLength: 500,
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
};

/**
 * Validation rules for PC parts
 */
export const itemValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  category: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  brand: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  price: {
    required: true,
    min: 0,
    max: 999999.99,
  },
  quantity: {
    required: true,
    min: 0,
    max: 9999,
  },
  rating: {
    min: 1,
    max: 5,
  },
  dateAdded: {
    required: true,
    pattern: /^\d{4}-\d{2}-\d{2}$/,
  },
};

/**
 * Sanitizes input by trimming whitespace and removing dangerous characters
 */
export function sanitizeInput(value: string): string {
  return value
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Formats validation errors for display
 */
export function formatValidationErrors(errors: string[]): string {
  if (errors.length === 0) return '';
  if (errors.length === 1) return errors[0];
  return errors.join(', ');
}

/**
 * Creates a debounced validation function
 */
export function createDebouncedValidator(
  validator: (value: unknown) => ValidationResult,
  delay: number = 300
) {
  let timeoutId: NodeJS.Timeout;

  return (value: unknown, callback: (result: ValidationResult) => void) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const result = validator(value);
      callback(result);
    }, delay);
  };
}

// ============================================================================
// BASIC VALIDATORS
// ============================================================================

/**
 * Validates if a value is required (not empty, null, or undefined)
 */
export function validateRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  return true;
}

/**
 * Validates minimum length of a string
 */
export function validateMinLength(value: string, minLength: number): boolean {
  if (typeof value !== 'string') return false;
  return value.length >= minLength;
}

/**
 * Validates maximum length of a string
 */
export function validateMaxLength(value: string, maxLength: number): boolean {
  if (typeof value !== 'string') return false;
  return value.length <= maxLength;
}

/**
 * Validates a value against a regex pattern
 */
export function validatePattern(value: string, pattern: RegExp): boolean {
  if (typeof value !== 'string') return false;
  return pattern.test(value);
}

/**
 * Validates if a value is a number
 */
export function validateNumber(value: unknown): boolean {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Validates if a number is within a range
 */
export function validateRange(value: number, min: number, max: number): boolean {
  if (!validateNumber(value)) return false;
  return value >= min && value <= max;
}

/**
 * Validates if a string is a valid URL
 */
export function validateUrl(value: string): boolean {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates if a string is a valid email
 */
export function validateEmail(value: string): boolean {
  if (typeof value !== 'string') return false;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value) && !value.includes('..');
}

/**
 * Validates if a string is a valid date
 */
export function validateDate(value: string): boolean {
  if (typeof value !== 'string') return false;
  if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  const date = new Date(value);
  return !isNaN(date.getTime()) && date.toISOString().split('T')[0] === value;
}

/**
 * Validates if a string is a valid phone number
 */
export function validatePhone(value: string): boolean {
  if (typeof value !== 'string') return false;
  const cleaned = value.replace(/[\s\-\(\)\.]/g, '');
  const phonePattern = /^[\+]?[1-9][\d]{7,15}$/;
  return phonePattern.test(cleaned);
}

/**
 * Validates if a string is a valid password (strong password requirements)
 */
export function validatePassword(value: string): boolean {
  if (typeof value !== 'string') return false;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return passwordPattern.test(value);
}

/**
 * Validates if a string is a valid credit card number using Luhn algorithm
 */
export function validateCreditCard(value: string): boolean {
  if (typeof value !== 'string') return false;
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}

// ============================================================================
// COMPLEX VALIDATORS
// ============================================================================

/**
 * Validates a PC part item
 */
export function validateItem(item: unknown): boolean {
  if (!item || typeof item !== 'object') return false;
  
  // Required fields
  if (!validateRequired(item.name) || !validateRequired(item.category) || !validateRequired(item.brand)) {
    return false;
  }
  
  // Data types and ranges
  if (!validateNumber(item.price) || item.price < 0) return false;
  if (!validateNumber(item.quantity) || item.quantity < 0) return false;
  if (item.rating !== undefined && (!validateNumber(item.rating) || item.rating < 1 || item.rating > 5)) {
    return false;
  }
  
  return true;
}

/**
 * Validates a user object
 */
export function validateUser(user: unknown): boolean {
  if (!user || typeof user !== 'object') return false;
  
  // Required fields
  if (!validateRequired(user.name) || !validateRequired(user.email) || !validateRequired(user.role)) {
    return false;
  }
  
  // Email validation
  if (!validateEmail(user.email)) return false;
  
  return true;
}

/**
 * Validates form data against a schema
 */
export function validateForm(data: unknown, schema: Record<string, ValidationRule>): ValidationResult {
  const errors: Record<string, string> = {};
  let isValid = true;
  
  for (const [field, rules] of Object.entries(schema)) {
    const result = validateValue(data[field], rules, field);
    if (!result.isValid) {
      isValid = false;
      errors[field] = result.firstError || 'Invalid value';
    }
  }
  
  return {
    isValid,
    errors,
    firstError: Object.values(errors)[0],
  };
}

// ============================================================================
// ERROR CLASSES
// ============================================================================

/**
 * Custom error class for validation errors
 */
export class ValidationError extends Error {
  public field?: string;
  
  constructor(message: string, field?: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

/**
 * Enhanced validation result class
 */
export class ValidationResult {
  public isValid: boolean;
  public errors: Record<string, string>;
  
  constructor(isValid: boolean, errors: Record<string, string> = {}) {
    this.isValid = isValid;
    this.errors = errors;
  }
  
  addError(field: string, message: string): void {
    this.errors[field] = message;
    this.isValid = false;
  }
  
  getError(field: string): string | undefined {
    return this.errors[field];
  }
  
  hasError(field: string): boolean {
    return field in this.errors;
  }
}