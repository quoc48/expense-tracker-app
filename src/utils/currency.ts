// Currency formatting utilities

/**
 * Format number as currency
 * @param amount - The amount to format
 * @param currency - Currency symbol (default: $)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency = '$'): string => {
  return `${currency}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Format currency for screen reader accessibility
 * @param amount - The amount to format
 * @returns Screen reader friendly currency string
 */
export const formatCurrencyForScreenReader = (amount: number): string => {
  return `${amount.toFixed(2)} dollars`;
};

/**
 * Parse currency string to number
 * @param currencyString - Currency string to parse
 * @returns Parsed number
 */
export const parseCurrency = (currencyString: string): number => {
  const cleanString = currencyString.replace(/[$,]/g, '');
  return parseFloat(cleanString) || 0;
};