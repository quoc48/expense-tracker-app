# Design System Documentation

## Overview
Complete design system based on Figma Community UI Kit - Expense Management App, optimized for iOS implementation with React Native.

## 1. Color Palette

### Primary Colors
```typescript
// constants/colors.ts
export const Colors = {
  // Background Colors
  background: '#F5F6F7',        // Light gray background
  surface: '#FFFFFF',           // White cards/surfaces
  surfaceSecondary: '#F9F9FB',  // Slightly tinted surfaces
  
  // Accent Colors
  primary: '#6FCF97',           // Primary green accent
  primaryLight: '#9DE2B7',      // Lighter green for hover states
  primaryDark: '#4AAE73',       // Darker green for pressed states
  
  // Text Colors
  textPrimary: '#242D35',       // Primary dark text
  textSecondary: '#8B95A2',     // Secondary gray text
  textTertiary: '#C1C7D0',      // Tertiary light gray text
  textOnPrimary: '#FFFFFF',     // White text on colored backgrounds
  
  // Status Colors
  success: '#6FCF97',           // Green for positive actions
  warning: '#F2C94C',           // Yellow for warnings
  error: '#EB5757',             // Red for errors
  info: '#2F80ED',              // Blue for information
  
  // Gradient Colors
  gradientStart: '#6FCF97',     // Gradient start (primary green)
  gradientEnd: '#4AAE73',       // Gradient end (darker green)
  monthlyCardGradient: {
    start: '#56CCF2',           // Light blue
    end: '#2F80ED'              // Dark blue
  },
  
  // Border & Divider Colors
  border: '#E8EAED',            // Light border color
  divider: '#F0F2F5',           // Divider color
  
  // Interactive States
  pressedOverlay: 'rgba(0, 0, 0, 0.1)',    // Overlay for pressed states
  hoverOverlay: 'rgba(0, 0, 0, 0.05)',     // Overlay for hover states
  
  // Shadow Colors
  shadowColor: 'rgba(36, 45, 53, 0.08)',   // Consistent shadow color
};
```

### Category Colors
```typescript
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
};
```

## 2. Typography System

### Font Configuration
```typescript
// constants/typography.ts
export const Typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold'
  },
  
  // Heading Styles
  h1: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: Colors.textPrimary
  },
  
  h2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.3,
    color: Colors.textPrimary
  },
  
  h3: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: Colors.textPrimary
  },
  
  // Body Text
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    color: Colors.textPrimary
  },
  
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 0,
    color: Colors.textSecondary
  },
  
  // Special Text Styles
  currency: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.5,
    color: Colors.textPrimary
  },
  
  currencyLarge: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -1,
    color: Colors.textPrimary
  },
  
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    color: Colors.textSecondary,
    textTransform: 'uppercase'
  },
  
  button: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    color: Colors.textOnPrimary
  },
  
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.3,
    color: Colors.textTertiary
  }
};
```

## 3. Spacing System

### Spacing Scale
```typescript
// constants/spacing.ts
export const Spacing = {
  // Base spacing units (8pt grid system)
  xs: 4,    // 0.25rem - 4pt
  sm: 8,    // 0.5rem  - 8pt
  md: 16,   // 1rem    - 16pt
  lg: 24,   // 1.5rem  - 24pt
  xl: 32,   // 2rem    - 32pt
  xxl: 48,  // 3rem    - 48pt
  
  // Component-specific spacing
  containerPadding: 16,     // Standard container padding
  cardPadding: 16,          // Standard card internal padding
  sectionSpacing: 24,       // Space between major sections
  itemSpacing: 12,          // Space between list items
  
  // Layout dimensions
  headerHeight: 96,         // Top navigation height
  bottomNavHeight: 90,      // Bottom navigation height
  fabSize: 64,              // FAB button size
  categoryIconSize: 44,     // Category icon container size
  
  // Touch targets
  minTouchTarget: 44,       // Minimum touch target size
  buttonHeight: 48,         // Standard button height
  inputHeight: 48           // Standard input height
};
```

### Layout Margins
```typescript
export const Layout = {
  screen: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  card: {
    margin: 8,
    padding: 16,
    borderRadius: 12
  },
  section: {
    marginBottom: 24,
    marginTop: 16
  }
};
```

## 4. Shadow System

### Shadow Definitions
```typescript
// constants/shadows.ts
export const Shadows = {
  // Card shadows
  card: {
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3
  },
  
  // Button shadows
  button: {
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2
  },
  
  // FAB shadow
  fab: {
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6
  },
  
  // Modal shadow
  modal: {
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8
  }
};
```

## 5. Component Tokens

### Button Styles
```typescript
export const ButtonStyles = {
  primary: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: Spacing.buttonHeight,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.button
  },
  
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    height: Spacing.buttonHeight,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  fab: {
    width: Spacing.fabSize,
    height: Spacing.fabSize,
    borderRadius: Spacing.fabSize / 2,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    ...Shadows.fab
  }
};
```

### Card Styles
```typescript
export const CardStyles = {
  default: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.card.borderRadius,
    padding: Layout.card.padding,
    margin: Layout.card.margin,
    ...Shadows.card
  },
  
  stats: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    margin: 8,
    ...Shadows.card
  },
  
  gradient: {
    borderRadius: 16,
    padding: 20,
    margin: 8,
    ...Shadows.card
  }
};
```

### Input Styles
```typescript
export const InputStyles = {
  default: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    height: Spacing.inputHeight,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.body1.fontSize,
    color: Colors.textPrimary
  },
  
  focused: {
    borderColor: Colors.primary,
    borderWidth: 2
  },
  
  error: {
    borderColor: Colors.error,
    borderWidth: 2
  }
};
```

## 6. Icon System

### Icon Specifications
```typescript
export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  category: 24,      // Category icons in grids
  navigation: 20,    // Bottom navigation icons
  fab: 24           // FAB button icon
};

export const CategoryIcons = {
  food: 'restaurant',
  transport: 'directions-car',
  shopping: 'shopping-bag',
  entertainment: 'movie',
  health: 'local-hospital',
  education: 'school',
  travel: 'flight',
  utilities: 'home',
  groceries: 'local-grocery-store',
  fitness: 'fitness-center',
  gifts: 'card-giftcard',
  business: 'business',
  personal: 'person',
  other: 'more-horiz'
};
```

## 7. Animation System

### Transition Timings
```typescript
export const Animations = {
  timing: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
  },
  
  spring: {
    tension: 100,
    friction: 8
  }
};
```

## 8. Responsive Breakpoints

### Device Categories
```typescript
export const Breakpoints = {
  small: 375,    // iPhone SE, iPhone 12 mini
  medium: 390,   // iPhone 12, iPhone 13, iPhone 14
  large: 428     // iPhone 12 Pro Max, iPhone 13 Pro Max, iPhone 14 Plus
};

export const getResponsiveValue = (small: number, medium: number, large: number) => {
  const { width } = Dimensions.get('window');
  
  if (width <= Breakpoints.small) return small;
  if (width <= Breakpoints.medium) return medium;
  return large;
};
```

## 9. Usage Examples

### Implementing a Card Component
```typescript
// components/common/Card.tsx
import { Colors, CardStyles, Typography } from '../../constants';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'stats' | 'gradient';
}

export function Card({ title, children, variant = 'default' }: CardProps) {
  return (
    <View style={CardStyles[variant]}>
      {title && (
        <Text style={Typography.h3}>{title}</Text>
      )}
      {children}
    </View>
  );
}
```

### Implementing Typography
```typescript
// components/common/Text.tsx
import { Typography } from '../../constants';

interface TextProps extends TextProps {
  variant?: keyof typeof Typography;
  children: React.ReactNode;
}

export function AppText({ variant = 'body1', children, style, ...props }: TextProps) {
  return (
    <Text style={[Typography[variant], style]} {...props}>
      {children}
    </Text>
  );
}
```

---

**Document Version**: 1.0  
**Last Updated**: September 2024  
**Design Source**: Figma Community - Expense Management App  
**Target Platform**: iOS (React Native)