// Spacing system based on Figma design
export const spacing = {
  // Base spacing units (8pt grid system)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Screen padding
  screenHorizontal: 24,   // Main screen horizontal padding
  
  // Card padding
  cardSmall: 16,          // Small card internal padding
  cardLarge: 20,          // Large card internal padding (stats cards)
  
  // Component-specific spacing
  itemSpacing: 12,        // Space between list items
  sectionSpacing: 24,     // Space between major sections
  
  // Layout dimensions from Figma design
  headerHeight: 96,       // Top navigation height
  bottomNavHeight: 90,    // Bottom navigation height
  fabSize: 64,            // FAB button size
  categoryIconSize: 44,   // Category icon container size
  statsCardHeight: 144,   // Stats card height
  categoryItemHeight: 56, // Category item height
  
  // Touch targets (iOS Human Interface Guidelines)
  minTouchTarget: 44,     // Minimum touch target size
  buttonHeight: 48,       // Standard button height
  
  // Border radius
  radiusSmall: 8,         // Small radius
  radiusMedium: 12,       // Medium radius for buttons/cards
  radiusLarge: 16,        // Large radius for stats cards
  
  // Icon sizes
  iconSmall: 16,          // Small icons
  iconMedium: 20,         // Medium icons (navigation)
  iconLarge: 24,          // Large icons (categories, FAB)
  
} as const;

// Export type for TypeScript support
export type SpacingKey = keyof typeof spacing;