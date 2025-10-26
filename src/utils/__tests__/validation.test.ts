/**
 * @file Validation Tests
 * @description Comprehensive unit tests for validation utilities
 * @version 2.0
 * @author PCPartKeeper Team
 */

import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validatePattern,
  validateNumber,
  validateRange,
  validateUrl,
  validateDate,
  validatePhone,
  validateCreditCard,
  validateItem,
  validateUser,
  validateForm,
  ValidationError,
  ValidationResult,
  ValidationRule,
  ValidationSchema
} from '../validation';

describe('Validation Utilities', () => {
  describe('Basic Validators', () => {
    describe('validateEmail', () => {
      it('validates correct email addresses', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
        expect(validateEmail('user123@test-domain.com')).toBe(true);
      });

      it('rejects invalid email addresses', () => {
        expect(validateEmail('invalid-email')).toBe(false);
        expect(validateEmail('@example.com')).toBe(false);
        expect(validateEmail('test@')).toBe(false);
        expect(validateEmail('test..test@example.com')).toBe(false);
        expect(validateEmail('')).toBe(false);
      });
    });

    describe('validatePassword', () => {
      it('validates strong passwords', () => {
        expect(validatePassword('Password123!')).toBe(true);
        expect(validatePassword('MyStr0ng#Pass')).toBe(true);
        expect(validatePassword('ComplexP@ssw0rd')).toBe(true);
      });

      it('rejects weak passwords', () => {
        expect(validatePassword('password')).toBe(false);
        expect(validatePassword('12345678')).toBe(false);
        expect(validatePassword('Password')).toBe(false);
        expect(validatePassword('P@ss')).toBe(false);
        expect(validatePassword('')).toBe(false);
      });
    });

    describe('validateRequired', () => {
      it('validates required fields', () => {
        expect(validateRequired('value')).toBe(true);
        expect(validateRequired(0)).toBe(true);
        expect(validateRequired(false)).toBe(true);
      });

      it('rejects empty values', () => {
        expect(validateRequired('')).toBe(false);
        expect(validateRequired(null)).toBe(false);
        expect(validateRequired(undefined)).toBe(false);
      });
    });

    describe('validateMinLength', () => {
      it('validates minimum length', () => {
        expect(validateMinLength('hello', 3)).toBe(true);
        expect(validateMinLength('test', 4)).toBe(true);
      });

      it('rejects strings below minimum length', () => {
        expect(validateMinLength('hi', 3)).toBe(false);
        expect(validateMinLength('', 1)).toBe(false);
      });
    });

    describe('validateMaxLength', () => {
      it('validates maximum length', () => {
        expect(validateMaxLength('hello', 10)).toBe(true);
        expect(validateMaxLength('test', 4)).toBe(true);
      });

      it('rejects strings above maximum length', () => {
        expect(validateMaxLength('hello world', 5)).toBe(false);
        expect(validateMaxLength('test', 3)).toBe(false);
      });
    });

    describe('validatePattern', () => {
      it('validates regex patterns', () => {
        expect(validatePattern('123', /^\d+$/)).toBe(true);
        expect(validatePattern('ABC', /^[A-Z]+$/)).toBe(true);
        expect(validatePattern('test@example.com', /^[^\s@]+@[^\s@]+\.[^\s@]+$/)).toBe(true);
      });

      it('rejects non-matching patterns', () => {
        expect(validatePattern('abc', /^\d+$/)).toBe(false);
        expect(validatePattern('123', /^[A-Z]+$/)).toBe(false);
        expect(validatePattern('invalid-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/)).toBe(false);
      });
    });

    describe('validateNumber', () => {
      it('validates numbers', () => {
        expect(validateNumber(123)).toBe(true);
        expect(validateNumber(0)).toBe(true);
        expect(validateNumber(-456)).toBe(true);
        expect(validateNumber(3.14)).toBe(true);
      });

      it('rejects non-numbers', () => {
        expect(validateNumber('123')).toBe(false);
        expect(validateNumber(null)).toBe(false);
        expect(validateNumber(undefined)).toBe(false);
        expect(validateNumber(NaN)).toBe(false);
      });
    });

    describe('validateRange', () => {
      it('validates numbers within range', () => {
        expect(validateRange(5, 1, 10)).toBe(true);
        expect(validateRange(1, 1, 10)).toBe(true);
        expect(validateRange(10, 1, 10)).toBe(true);
      });

      it('rejects numbers outside range', () => {
        expect(validateRange(0, 1, 10)).toBe(false);
        expect(validateRange(11, 1, 10)).toBe(false);
        expect(validateRange(-5, 1, 10)).toBe(false);
      });
    });

    describe('validateUrl', () => {
      it('validates correct URLs', () => {
        expect(validateUrl('https://example.com')).toBe(true);
        expect(validateUrl('http://test.org')).toBe(true);
        expect(validateUrl('https://sub.domain.com/path?query=value')).toBe(true);
      });

      it('rejects invalid URLs', () => {
        expect(validateUrl('not-a-url')).toBe(false);
        expect(validateUrl('ftp://example.com')).toBe(false);
        expect(validateUrl('')).toBe(false);
      });
    });

    describe('validateDate', () => {
      it('validates correct dates', () => {
        expect(validateDate('2024-01-01')).toBe(true);
        expect(validateDate('2024-12-31')).toBe(true);
        expect(validateDate('2024-02-29')).toBe(true); // Leap year
      });

      it('rejects invalid dates', () => {
        expect(validateDate('2024-13-01')).toBe(false);
        expect(validateDate('2024-02-30')).toBe(false);
        expect(validateDate('invalid-date')).toBe(false);
        expect(validateDate('')).toBe(false);
      });
    });

    describe('validatePhone', () => {
      it('validates phone numbers', () => {
        expect(validatePhone('+1234567890')).toBe(true);
        expect(validatePhone('(123) 456-7890')).toBe(true);
        expect(validatePhone('123-456-7890')).toBe(true);
        expect(validatePhone('123.456.7890')).toBe(true);
      });

      it('rejects invalid phone numbers', () => {
        expect(validatePhone('123')).toBe(false);
        expect(validatePhone('abc-def-ghij')).toBe(false);
        expect(validatePhone('')).toBe(false);
      });
    });

    describe('validateCreditCard', () => {
      it('validates credit card numbers', () => {
        expect(validateCreditCard('4111111111111111')).toBe(true); // Visa
        expect(validateCreditCard('5555555555554444')).toBe(true); // Mastercard
        expect(validateCreditCard('378282246310005')).toBe(true); // American Express
      });

      it('rejects invalid credit card numbers', () => {
        expect(validateCreditCard('1234567890123456')).toBe(false);
        expect(validateCreditCard('4111111111111112')).toBe(false);
        expect(validateCreditCard('')).toBe(false);
      });
    });
  });

  describe('Complex Validators', () => {
    describe('validateItem', () => {
      const validItem = {
        id: 1,
        name: 'Test Item',
        category: 'CPU',
        brand: 'Intel',
        price: 299.99,
        quantity: 1,
        rating: 4.5,
        dateAdded: '2024-01-01',
        inStock: true,
      };

      it('validates correct item', () => {
        expect(validateItem(validItem)).toBe(true);
      });

      it('rejects item with missing required fields', () => {
        expect(validateItem({ ...validItem, name: '' })).toBe(false);
        expect(validateItem({ ...validItem, category: '' })).toBe(false);
        expect(validateItem({ ...validItem, brand: '' })).toBe(false);
      });

      it('rejects item with invalid data types', () => {
        expect(validateItem({ ...validItem, price: 'invalid' })).toBe(false);
        expect(validateItem({ ...validItem, quantity: 'invalid' })).toBe(false);
        expect(validateItem({ ...validItem, rating: 'invalid' })).toBe(false);
      });

      it('rejects item with invalid ranges', () => {
        expect(validateItem({ ...validItem, price: -100 })).toBe(false);
        expect(validateItem({ ...validItem, quantity: -1 })).toBe(false);
        expect(validateItem({ ...validItem, rating: 6 })).toBe(false);
      });
    });

    describe('validateUser', () => {
      const validUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        avatar: 'https://example.com/avatar.jpg',
        role: 'user',
        preferences: {
          theme: 'light',
          language: 'en',
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          currency: 'USD',
          notifications: { email: true, push: true, sms: false },
        },
        profile: {
          bio: 'Test bio',
          location: 'Test City',
          website: 'https://example.com',
          socialLinks: {},
        },
        settings: {
          privacy: { profileVisible: true, emailVisible: false, locationVisible: true },
          security: { twoFactorEnabled: false, emailVerified: true, phoneVerified: false },
        },
        lastLogin: '2024-01-01T00:00:00Z',
        loginCount: 1,
        sessionTimeout: 30,
        rememberMe: true,
        autoLogout: false,
        passwordChanged: '2024-01-01T00:00:00Z',
        accountStatus: 'active',
        subscription: { plan: 'free', status: 'active', expiresAt: '2024-12-31T23:59:59Z' },
        permissions: [],
        groups: [],
        tags: [],
        notes: '',
        metadata: {},
      };

      it('validates correct user', () => {
        expect(validateUser(validUser)).toBe(true);
      });

      it('rejects user with invalid email', () => {
        expect(validateUser({ ...validUser, email: 'invalid-email' })).toBe(false);
      });

      it('rejects user with missing required fields', () => {
        expect(validateUser({ ...validUser, name: '' })).toBe(false);
        expect(validateUser({ ...validUser, role: '' })).toBe(false);
      });
    });

    describe('validateForm', () => {
      const schema: ValidationSchema = {
        name: { required: true, minLength: 2, maxLength: 50 },
        email: { required: true, email: true },
        age: { required: true, number: true, range: [18, 100] },
        password: { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/ },
      };

      it('validates correct form data', () => {
        const formData = {
          name: 'John Doe',
          email: 'john@example.com',
          age: 25,
          password: 'Password123!',
        };

        const result = validateForm(formData, schema);
        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
      });

      it('rejects form with validation errors', () => {
        const formData = {
          name: 'J',
          email: 'invalid-email',
          age: 15,
          password: 'weak',
        };

        const result = validateForm(formData, schema);
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveProperty('name');
        expect(result.errors).toHaveProperty('email');
        expect(result.errors).toHaveProperty('age');
        expect(result.errors).toHaveProperty('password');
      });

      it('handles partial validation errors', () => {
        const formData = {
          name: 'John Doe',
          email: 'invalid-email',
          age: 25,
          password: 'Password123!',
        };

        const result = validateForm(formData, schema);
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveProperty('email');
        expect(result.errors).not.toHaveProperty('name');
        expect(result.errors).not.toHaveProperty('age');
        expect(result.errors).not.toHaveProperty('password');
      });
    });
  });

  describe('ValidationError', () => {
    it('creates validation error with message', () => {
      const error = new ValidationError('Invalid input');
      expect(error.message).toBe('Invalid input');
      expect(error.name).toBe('ValidationError');
    });

    it('creates validation error with field and message', () => {
      const error = new ValidationError('Invalid email', 'email');
      expect(error.message).toBe('Invalid email');
      expect(error.field).toBe('email');
    });
  });

  describe('ValidationResult', () => {
    it('creates valid result', () => {
      const result = new ValidationResult(true);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('creates invalid result with errors', () => {
      const errors = { name: 'Required', email: 'Invalid email' };
      const result = new ValidationResult(false, errors);
      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual(errors);
    });

    it('adds error to result', () => {
      const result = new ValidationResult(true);
      result.addError('name', 'Required');
      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual({ name: 'Required' });
    });

    it('gets error for field', () => {
      const errors = { name: 'Required', email: 'Invalid email' };
      const result = new ValidationResult(false, errors);
      expect(result.getError('name')).toBe('Required');
      expect(result.getError('email')).toBe('Invalid email');
      expect(result.getError('password')).toBeUndefined();
    });

    it('checks if field has error', () => {
      const errors = { name: 'Required', email: 'Invalid email' };
      const result = new ValidationResult(false, errors);
      expect(result.hasError('name')).toBe(true);
      expect(result.hasError('email')).toBe(true);
      expect(result.hasError('password')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('handles null and undefined values', () => {
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
    });

    it('handles empty strings', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });

    it('handles whitespace-only strings', () => {
      expect(validateRequired('   ')).toBe(false);
      expect(validateEmail('   ')).toBe(false);
    });

    it('handles very long strings', () => {
      const longString = 'a'.repeat(10000);
      expect(validateMaxLength(longString, 100)).toBe(false);
      expect(validateMinLength(longString, 100)).toBe(true);
    });

    it('handles special characters', () => {
      expect(validateEmail('test+tag@example.com')).toBe(true);
      expect(validateEmail('test.name@example.com')).toBe(true);
      expect(validateUrl('https://example.com/path?query=value&other=param')).toBe(true);
    });

    it('handles unicode characters', () => {
      expect(validateEmail('tëst@ëxämple.com')).toBe(true);
      expect(validateRequired('测试')).toBe(true);
    });
  });

  describe('Performance', () => {
    it('handles large datasets efficiently', () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        email: `user${i + 1}@example.com`,
        age: 20 + (i % 50),
      }));

      const startTime = performance.now();
      
      largeData.forEach(item => {
        validateEmail(item.email);
        validateRequired(item.name);
        validateNumber(item.age);
      });
      
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it('handles complex validation schemas efficiently', () => {
      const schema: ValidationSchema = {
        name: { required: true, minLength: 2, maxLength: 50 },
        email: { required: true, email: true },
        age: { required: true, number: true, range: [18, 100] },
        password: { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/ },
        phone: { required: false, pattern: /^\+?[\d\s\-\(\)]+$/ },
        website: { required: false, url: true },
      };

      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25,
        password: 'Password123!',
        phone: '+1234567890',
        website: 'https://example.com',
      };

      const startTime = performance.now();
      
      for (let i = 0; i < 100; i++) {
        validateForm(formData, schema);
      }
      
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
    });
  });
});