import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing } from '../constants/spacing';

// Components
import CustomHeader from '../components/common/CustomHeader';
import StatsCard from '../components/common/StatsCard';
import CategoryItem from '../components/common/CategoryItem';
import FABButton from '../components/common/FABButton';

// Mock Data
import { mockExpenseData, MockExpenseData, MockCategory } from '../data/mockData';

const HomeScreen: React.FC = () => {
  const [expenseData, setExpenseData] = useState<MockExpenseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenseData();
  }, []);

  const loadExpenseData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setExpenseData(mockExpenseData);
    } catch (error) {
      console.error('Error loading expense data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousMonth = () => {
    console.log('Navigate to previous month');
    // TODO: Implement month navigation logic
  };

  const handleNextMonth = () => {
    console.log('Navigate to next month');
    // TODO: Implement month navigation logic
  };

  const handleStatsCardPress = (type: 'monthly' | 'daily') => {
    console.log(`${type} stats card pressed`);
    // TODO: Navigate to detailed stats screen
  };

  const handleCategoryPress = (category: MockCategory) => {
    console.log('Category pressed:', category.name);
    // TODO: Navigate to category detail screen
  };

  const handleFABPress = () => {
    console.log('FAB pressed - Add new expense');
    // TODO: Navigate to Add Expense screen
  };

  if (loading || !expenseData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Đang tải...</Text>
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
          currentMonth={expenseData.currentMonth}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <StatsCard
            type="monthly"
            title="Tổng chi tiêu"
            amount={expenseData.monthlyTotal}
            progress={expenseData.monthlyProgress}
            onPress={() => handleStatsCardPress('monthly')}
          />
          
          <StatsCard
            type="daily"
            title="Hôm nay"
            amount={expenseData.dailyTotal}
            onPress={() => handleStatsCardPress('daily')}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Top 3 danh mục</Text>
          
          {expenseData.topCategories.map((category, index) => (
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
});

export default HomeScreen;