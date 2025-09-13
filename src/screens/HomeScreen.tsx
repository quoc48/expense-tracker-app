import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing } from '../constants/spacing';

// Components
import CustomHeader from '../components/common/CustomHeader';
import StatsCard from '../components/common/StatsCard';
import CategoryItem from '../components/common/CategoryItem';
import FABButton from '../components/common/FABButton';

// Real Data Integration
import { useExpenseData } from '../hooks/useExpenseData';
import type { CategoryWithAmount } from '../services/expenseService';

const HomeScreen: React.FC = () => {
  // Use enhanced expense data hook with built-in navigation
  const {
    data,
    loading,
    error,
    goToPreviousMonth,
    goToNextMonth,
    refreshData,
    getFormattedMonth,
    isCurrentMonth
  } = useExpenseData();

  const handlePreviousMonth = () => {
    console.log('Navigate to previous month');
    goToPreviousMonth();
  };

  const handleNextMonth = () => {
    console.log('Navigate to next month');
    goToNextMonth();
  };

  const handleStatsCardPress = (type: 'monthly' | 'daily') => {
    console.log(`${type} stats card pressed`);
    // TODO: Navigate to detailed stats screen
  };

  const handleCategoryPress = (category: CategoryWithAmount) => {
    console.log('Category pressed:', category.name);
    // TODO: Navigate to category detail screen
  };

  const handleFABPress = () => {
    console.log('FAB pressed - Add new expense');
    // TODO: Navigate to Add Expense screen
  };

  // Show loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🔄 Đang tải dữ liệu từ Supabase...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>❌ Lỗi</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshData}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Custom Header */}
        <CustomHeader
          currentMonth={getFormattedMonth()}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <StatsCard
            type="monthly"
            title="Tổng chi tiêu"
            amount={data.monthlyTotal}
            progress={data.monthlyProgress}
            onPress={() => handleStatsCardPress('monthly')}
          />

          {isCurrentMonth() && (
            <StatsCard
              type="daily"
              title="Hôm nay"
              amount={data.dailyTotal}
              onPress={() => handleStatsCardPress('daily')}
            />
          )}
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Top 3 danh mục</Text>

          {data.topCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </View>

        {/* Bottom padding for FAB */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <FABButton onPress={handleFABPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  } as ViewStyle,

  scrollView: {
    flex: 1,
  } as ViewStyle,

  scrollContent: {
    paddingBottom: spacing.bottomNavHeight + spacing.lg,
  } as ViewStyle,

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  loadingText: {
    ...typography.body14,
    color: colors.textSecondary,
  } as TextStyle,

  statsSection: {
    paddingTop: spacing.sm,
  } as ViewStyle,

  categoriesSection: {
    paddingTop: spacing.lg,
  } as ViewStyle,

  sectionTitle: {
    ...typography.heading16,
    color: colors.textPrimary,
    paddingHorizontal: spacing.screenHorizontal,
    marginBottom: spacing.md,
  } as TextStyle,

  bottomPadding: {
    height: spacing.fabSize,
  } as ViewStyle,

  // Error and loading states
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  } as ViewStyle,

  errorTitle: {
    ...typography.heading16,
    color: colors.error,
    marginBottom: spacing.sm,
    textAlign: 'center',
  } as TextStyle,

  errorText: {
    ...typography.body14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  } as TextStyle,

  retryButton: {
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  } as ViewStyle,

  retryText: {
    ...typography.body14,
    color: colors.white,
    fontWeight: '600',
  } as TextStyle,

});

export default HomeScreen;