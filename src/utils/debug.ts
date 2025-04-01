import debugFactory from 'debug';

// Create a single app-wide debug factory
const DEBUG = debugFactory('app');

// Export the debug factory for use across the application
export default DEBUG;

/**
 * Enable all debug logs if DEBUG environment variable is set
 */
if (import.meta.env.DEBUG) {
  debugFactory.enable('*');
}

/**
 * Helper to check if debugging is enabled for any namespace
 */
export const isDebugEnabled = (): boolean => {
  return debugFactory.enabled('*');
};

/**
 * Logs debug messages only when DEBUG environment variable is set
 */
export const debug = (...args: any[]): void => {
  if (isDebugEnabled()) {
    console.debug(...args);
  }
};

/**
 * Returns the current debug state
 */
export const getDebugState = (): boolean => {
  return isDebugEnabled();
}; 