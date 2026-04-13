/**
 * Environment utility functions
 * 
 * Provides environment detection that can be mocked in tests
 */

/**
 * Check if the application is running in production mode
 * @returns true if in production, false otherwise
 */
export const isProduction = (): boolean => {
  try {
    return import.meta.env.PROD;
  } catch {
    // Fallback for test environments that don't support import.meta
    return process.env.NODE_ENV === 'production';
  }
};

/**
 * Check if the application is running in development mode
 * @returns true if in development, false otherwise
 */
export const isDevelopment = (): boolean => {
  return !isProduction();
};
