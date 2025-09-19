import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import { spacing } from '../../constants/spacing';

interface CustomHeaderProps {
  currentMonth: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  loading?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  loading = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.chevronButton, loading && styles.disabledButton]}
        onPress={loading ? undefined : onPreviousMonth}
        disabled={loading}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Previous month"
        accessibilityHint="Go to previous month's expenses"
        accessibilityState={{ disabled: loading }}
      >
        <Text style={[styles.chevronText, loading && styles.disabledText]}>‹</Text>
      </TouchableOpacity>

      <View
        style={styles.monthContainer}
        accessibilityRole="header"
        accessibilityLabel={loading ? "Loading month data" : `Current month: ${currentMonth}`}
      >
        {loading ? (
          <View
            style={styles.loadingContainer}
            accessibilityRole="progressbar"
            accessibilityLabel="Loading expense data"
          >
            <ActivityIndicator size="small" color={colors.primaryBlue} />
            <Text style={styles.loadingText}>Đang tải...</Text>
          </View>
        ) : (
          <Text
            style={styles.monthText}
            accessibilityRole="header"
          >
            {currentMonth}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.chevronButton, loading && styles.disabledButton]}
        onPress={loading ? undefined : onNextMonth}
        disabled={loading}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Next month"
        accessibilityHint="Go to next month's expenses"
        accessibilityState={{ disabled: loading }}
      >
        <Text style={[styles.chevronText, loading && styles.disabledText]}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    height: 52,
  } as ViewStyle,

  chevronButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  } as ViewStyle,

  disabledButton: {
    opacity: 0.5,
    backgroundColor: colors.grayLight,
  } as ViewStyle,

  chevronText: {
    ...typography.heading16,
    color: colors.textSecondary,
    fontSize: 18,
  } as TextStyle,

  disabledText: {
    color: colors.grayMedium,
  } as TextStyle,

  monthContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  monthText: {
    ...typography.heading16,
    color: colors.textPrimary,
  } as TextStyle,

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  loadingText: {
    ...typography.body14,
    color: colors.textSecondary,
    marginLeft: 8,
  } as TextStyle,
});

export default CustomHeader;