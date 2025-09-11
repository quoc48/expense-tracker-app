// Color system based on Figma design
export const colors = {
  // Background Colors
  background: '#F5F6F7',        // Light gray background
  white: '#FFFFFF',             // White cards/surfaces
  
  // Primary Colors
  accentGreen: '#6FCF97',       // Primary green accent
  primaryBlue: '#0E33F3',       // Primary blue for buttons
  
  // Text Colors
  textPrimary: '#242D35',       // Primary dark text
  textSecondary: '#8B95A2',     // Secondary gray text
  textTertiary: '#C1C7D0',      // Tertiary light gray text
  
  // Neutral Colors
  grayLight: '#EBEEF0',         // Light gray for borders
  grayMedium: '#9BA1A8',        // Medium gray
  grayBorder: '#B0B8BF',        // Border gray
  
  // Semantic Colors
  success: '#6FCF97',           // Green for success
  warning: '#F2C94C',           // Yellow for warnings
  error: '#EB5757',             // Red for errors
  info: '#2F80ED',              // Blue for information
  
  // Shadow Colors
  cardShadow: 'rgba(29,58,88,0.12)',       // Card shadow
  fabShadow: 'rgba(18,98,251,0.32)',       // FAB button shadow
  
  // Gradient Colors for monthly card
  monthlyGradient: {
    start: '#56CCF2',           // Light blue
    end: '#2F80ED'              // Dark blue
  }
} as const;

// Category Colors (14 predefined categories)
export const CategoryColors = {
  food: '#FF6B6B',              // Food & Dining - Red
  transport: '#4ECDC4',         // Transportation - Teal
  shopping: '#45B7D1',          // Shopping - Blue
  entertainment: '#FFA07A',     // Entertainment - Orange
  health: '#98D8C8',            // Healthcare - Mint
  education: '#F7DC6F',         // Education - Yellow
  travel: '#BB8FCE',            // Travel - Purple
  utilities: '#85C1E9',         // Utilities - Light Blue
  groceries: '#82E0AA',         // Groceries - Light Green
  fitness: '#F8C471',           // Fitness - Peach
  gifts: '#F1948A',             // Gifts - Pink
  business: '#AED6F1',          // Business - Sky Blue
  personal: '#D7BDE2',          // Personal Care - Lavender
  other: '#D5D8DC'              // Other - Gray
} as const;

// Export type for TypeScript support
export type ColorKey = keyof typeof colors;
export type CategoryColorKey = keyof typeof CategoryColors;