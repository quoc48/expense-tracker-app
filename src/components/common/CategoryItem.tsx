import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface CategoryItemProps {
  category: {
    id: string;
    name: string;
    amount: number;
    iconName: string;
  };
  onPress?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onPress }) => {
  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getCategoryIcon = (iconName: string): string => {
    const icons: Record<string, string> = {
      food: '🍽️',
      shopping: '🛍️',
      rent: '🏠',
      transport: '🚗',
      entertainment: '🎬',
      health: '💊',
      education: '📚',
      utilities: '💡',
      insurance: '🛡️',
      travel: '✈️',
      gifts: '🎁',
      others: '📦',
      investment: '📈',
      salary: '💰',
    };
    return icons[iconName] || '📦';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>
            {getCategoryIcon(category.iconName)}
          </Text>
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
      
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{formatAmount(category.amount)}</Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.screenHorizontal,
    minHeight: 64,
  } as ViewStyle,

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  } as ViewStyle,

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  } as ViewStyle,

  iconText: {
    fontSize: 20,
  } as TextStyle,

  categoryName: {
    ...typography.heading16,
    color: colors.textPrimary,
    flex: 1,
  } as TextStyle,

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  amount: {
    ...typography.heading16,
    color: colors.textPrimary,
    marginRight: spacing.sm,
  } as TextStyle,

  chevron: {
    ...typography.heading16,
    color: colors.textSecondary,
    fontSize: 18,
  } as TextStyle,
});

export default CategoryItem;