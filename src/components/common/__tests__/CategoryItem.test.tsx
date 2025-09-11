import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryItem from '../CategoryItem';

describe('CategoryItem', () => {
  const mockCategory = {
    id: '1',
    name: 'Thực phẩm',
    amount: 12857000,
    iconName: 'food',
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders category information correctly', () => {
    const { getByText } = render(
      <CategoryItem category={mockCategory} onPress={mockOnPress} />
    );
    
    expect(getByText('Thực phẩm')).toBeTruthy();
    expect(getByText('12.857.000 ₫')).toBeTruthy();
    expect(getByText('🍽️')).toBeTruthy(); // food icon
  });

  it('handles press events', () => {
    const { getByText } = render(
      <CategoryItem category={mockCategory} onPress={mockOnPress} />
    );
    
    const categoryButton = getByText('Thực phẩm').parent;
    if (categoryButton) {
      fireEvent.press(categoryButton);
    }
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('displays correct icons for different categories', () => {
    const categories = [
      { ...mockCategory, iconName: 'food', expectedIcon: '🍽️' },
      { ...mockCategory, iconName: 'shopping', expectedIcon: '🛍️' },
      { ...mockCategory, iconName: 'rent', expectedIcon: '🏠' },
      { ...mockCategory, iconName: 'transport', expectedIcon: '🚗' },
      { ...mockCategory, iconName: 'unknown', expectedIcon: '📦' },
    ];

    categories.forEach(({ iconName, expectedIcon }) => {
      const { getByText } = render(
        <CategoryItem 
          category={{ ...mockCategory, iconName }} 
          onPress={mockOnPress} 
        />
      );
      expect(getByText(expectedIcon)).toBeTruthy();
    });
  });

  it('formats amounts correctly', () => {
    const testAmounts = [
      { amount: 1500000, expected: '1.500.000 ₫' },
      { amount: 12857000, expected: '12.857.000 ₫' },
      { amount: 500000, expected: '500.000 ₫' },
    ];

    testAmounts.forEach(({ amount, expected }) => {
      const { getByText } = render(
        <CategoryItem 
          category={{ ...mockCategory, amount }} 
          onPress={mockOnPress} 
        />
      );
      expect(getByText(expected)).toBeTruthy();
    });
  });

  it('renders without onPress handler', () => {
    expect(() => {
      render(<CategoryItem category={mockCategory} />);
    }).not.toThrow();
  });
});