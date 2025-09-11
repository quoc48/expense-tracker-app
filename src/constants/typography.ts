import { TextStyle } from 'react-native';

// Typography system based on Figma design with Inter font family
export const typography = {
  // Font Family References  
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold'
  },
  
  // Heading Styles
  heading16: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
  } as TextStyle,
  
  heading20: {
    fontFamily: 'Inter-SemiBold', 
    fontSize: 20,
    lineHeight: 28,
  } as TextStyle,
  
  // Body Text
  body12: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  
  body14: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  
  // Special Typography for Money/Currency
  money24: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 20,
  } as TextStyle,
  
  money32: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    lineHeight: 40,
  } as TextStyle,
  
  // Labels and Small Text
  label12: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  
  caption10: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    lineHeight: 14,
  } as TextStyle,
  
  // Button Text
  button16: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  
  // Medium weight variants
  medium12: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,
  
  medium14: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  
  // SemiBold variants
  semiBold16: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  
  semiBold14: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  
} as const;

// Export type for TypeScript support
export type TypographyKey = keyof typeof typography;