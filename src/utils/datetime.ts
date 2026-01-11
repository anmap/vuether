/**
 * Utility functions for datetime operations and formatting
 */

/**
 * Converts a Unix timestamp (in seconds) to a Date object with local timezone offset
 * @param timestamp Unix timestamp in seconds
 * @param timezoneOffset Optional timezone offset in seconds (from OpenWeatherMap API)
 * @returns Date object adjusted for local timezone
 */
export function timestampToDate(timestamp: number, timezoneOffset?: number): Date {
  const localOffset = new Date().getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const utc = timestamp * 1000 + localOffset;
  
  if (timezoneOffset !== undefined) {
    return new Date(utc + timezoneOffset * 1000);
  }
  
  return new Date(utc);
}

/**
 * Formats a date to a full date string with weekday, day, and month
 * @param date Date object or timestamp in milliseconds
 * @param locale Locale string (default: "en-US")
 * @returns Formatted date string (e.g., "Monday, January 15")
 */
export function formatFullDate(date: Date | number, locale: string = "en-US"): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

/**
 * Formats a date to a short time string
 * @param date Date object or timestamp in milliseconds
 * @param locale Locale string (default: "en-US")
 * @returns Formatted time string (e.g., "3:45 PM")
 */
export function formatShortTime(date: Date | number, locale: string = "en-US"): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  return dateObj.toLocaleTimeString(locale, {
    timeStyle: "short",
  });
}

/**
 * Formats a date to show only the hour
 * @param date Date object or timestamp in milliseconds
 * @param locale Locale string (default: "en-US")
 * @returns Formatted hour string (e.g., "3 PM")
 */
export function formatHour(date: Date | number, locale: string = "en-US"): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  return dateObj.toLocaleTimeString(locale, {
    hour: "numeric"
  });
}

/**
 * Formats a date to a full date and time string
 * @param date Date object or timestamp in milliseconds
 * @param locale Locale string (default: "en-US")
 * @returns Formatted date and time string
 */
export function formatFullDateTime(date: Date | number, locale: string = "en-US"): string {
  const dateObj = typeof date === 'number' ? new Date(date) : date;
  return dateObj.toLocaleString(locale);
}
