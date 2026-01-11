/**
 * Utility functions for temperature formatting
 */

/**
 * Formats a temperature value, checking if it's a valid number
 * @param temp Temperature value (number or undefined/null)
 * @returns Formatted temperature string with degree symbol, or '--' if invalid
 */
export function formatTemperature(temp: number | undefined | null): string {
  if (typeof temp === 'number') {
    return `${Math.round(temp)}°`;
  }
  return '--';
}
