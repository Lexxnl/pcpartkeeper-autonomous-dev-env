/**
 * Centralized logger utility with environment-aware logging
 * 
 * Features:
 * - Only logs in development mode (except errors)
 * - Errors always logged (for production error tracking)
 * - Ready for integration with error reporting services (Sentry, etc.)
 * 
 * @example
 * ```typescript
 * logger.log('User action', data);
 * logger.error('API error', error);
 * logger.warn('Deprecated feature used');
 * ```
 */
export const logger = {
  /**
   * Log informational messages (development only)
   * 
   * @param args - Arguments to log
   */
  log: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.log(...args);
    }
  },
  
  /**
   * Log error messages (always logged, even in production)
   * 
   * @param args - Error details to log
   */
  error: (...args: unknown[]) => {
    // Always log errors, even in production
    console.error(...args);
    // TODO: Integrate with error reporting service (Sentry, etc.) in production
  },
  
  /**
   * Log warning messages (development only)
   * 
   * @param args - Warning details to log
   */
  warn: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },
  
  /**
   * Log informational messages (development only)
   * 
   * @param args - Info details to log
   */
  info: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.info(...args);
    }
  },
};
