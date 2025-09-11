import { format, isSameDay, isSameMonth, startOfMonth, endOfMonth } from 'date-fns';

/**
 * Format date for display
 * @param date - Date to format
 * @param formatString - Format string (default: 'MMM d, yyyy')
 * @returns Formatted date string
 */
export const formatDate = (date: Date, formatString = 'MMM d, yyyy'): string => {
  return format(date, formatString);
};

/**
 * Get time-based greeting
 * @returns Appropriate greeting based on time of day
 */
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Check if date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Check if date is in current month
 * @param date - Date to check
 * @returns True if date is in current month
 */
export const isCurrentMonth = (date: Date): boolean => {
  return isSameMonth(date, new Date());
};

/**
 * Get month start and end dates
 * @param date - Date in the month
 * @returns Object with start and end dates
 */
export const getMonthRange = (date: Date) => {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date)
  };
};