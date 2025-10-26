export const logger = {
  log: (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(...args as any[]);
    }
  },
  error: (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(...args as any[]);
    }
  },
  warn: (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(...args as any[]);
    }
  },
};
