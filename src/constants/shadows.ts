import { ViewStyle } from 'react-native';

// Shadow system for consistent depth and elevation
export const shadows = {
  // Card shadows (based on Figma design)
  card: {
    shadowColor: 'rgba(29,58,88,0.12)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3, // Android elevation
  } as ViewStyle,
  
  // Button shadows
  button: {
    shadowColor: 'rgba(29,58,88,0.12)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,
  
  // FAB shadow (more prominent)
  fab: {
    shadowColor: 'rgba(18,98,251,0.32)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,
  
  // Modal and overlay shadows
  modal: {
    shadowColor: 'rgba(29,58,88,0.12)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  } as ViewStyle,
  
  // Navigation bar shadow
  navigationBar: {
    shadowColor: 'rgba(29,58,88,0.12)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  } as ViewStyle,
  
  // No shadow (for removing shadows)
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,
  
} as const;

// Export type for TypeScript support
export type ShadowKey = keyof typeof shadows;