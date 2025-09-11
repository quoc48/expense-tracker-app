# Home Screen Design Specification

## Overview
Detailed design specification for the Home Screen based on Figma design, including layout, components, data binding, and interaction patterns.

## 1. Screen Layout Structure

### Overall Dimensions
- **Screen Height**: 812pt (iPhone 12/13/14 baseline)
- **Content Area**: 716pt (excluding status bar and safe area)
- **Horizontal Padding**: 16pt on each side

### Layout Breakdown
```
┌─────────────────────────────────────────┐  ─ 0pt
│  Status Bar (44pt)                      │  │ System
├─────────────────────────────────────────┤  ┼ 44pt
│  Top Navigation (96pt)                  │  │
│  ┌─ Month Selector                      │  │ Navigation
│  └─ Date Display                        │  │
├─────────────────────────────────────────┤  ┼ 140pt
│  Stats Section (318pt)                  │  │
│  ┌─ Monthly Stats Card (144pt)          │  │
│  ├─ Spacing (16pt)                      │  │ Stats
│  ├─ Daily Stats Card (144pt)            │  │
│  └─ Bottom Margin (14pt)                │  │
├─────────────────────────────────────────┤  ┼ 458pt
│  Categories Section (164pt)             │  │
│  ┌─ Section Header (24pt)               │  │ Categories
│  ├─ Category Items (3 × 44pt + gaps)    │  │
│  └─ Bottom Margin (16pt)                │  │
├─────────────────────────────────────────┤  ┼ 622pt
│  FAB Button (64pt + margins)            │  │ FAB
├─────────────────────────────────────────┤  ┼ 722pt
│  Bottom Navigation (90pt)               │  │ Navigation
└─────────────────────────────────────────┘  ─ 812pt
```

## 2. Top Navigation Component

### Design Specifications
```typescript
// components/screens/TopNavigation.tsx
interface TopNavigationProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const TopNavigationSpec = {
  container: {
    height: 96,
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: 'space-between'
  },
  
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 8
  },
  
  monthText: {
    ...Typography.h2,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center'
  },
  
  chevronButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  dateDisplay: {
    ...Typography.body2,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4
  }
};
```

### Data Binding
```typescript
// Month selector logic
const formatMonthDisplay = (date: Date) => {
  return format(date, 'MMMM yyyy', { locale: vi }); // "Tháng 8, 2025"
};

const getCurrentDateDisplay = () => {
  return format(new Date(), 'EEEE, dd/MM/yyyy'); // "Thứ hai, 11/09/2024"
};
```

### Interactions
- **Previous Month**: Left chevron button navigates to previous month
- **Next Month**: Right chevron button navigates to next month
- **Month Display**: Shows current selected month and year
- **Date Display**: Shows current date below month selector

## 3. Stats Section

### Monthly Stats Card
```typescript
interface MonthlyStatsCardProps {
  totalAmount: number;
  budgetAmount?: number;
  progressPercentage: number;
}

const MonthlyStatsCardSpec = {
  container: {
    height: 144,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    // Gradient background implementation
    backgroundColor: 'transparent'
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: Colors.textOnPrimary
  },
  
  title: {
    ...Typography.body1,
    color: Colors.textOnPrimary,
    fontWeight: '500'
  },
  
  amount: {
    ...Typography.currencyLarge,
    color: Colors.textOnPrimary,
    marginBottom: 16
  },
  
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden'
  },
  
  progressBar: {
    height: '100%',
    backgroundColor: Colors.textOnPrimary,
    borderRadius: 4
  },
  
  progressText: {
    ...Typography.caption,
    color: Colors.textOnPrimary,
    textAlign: 'right',
    marginTop: 4
  }
};
```

### Daily Stats Card
```typescript
interface DailyStatsCardProps {
  todayAmount: number;
  yesterdayAmount?: number;
  changePercentage?: number;
}

const DailyStatsCardSpec = {
  container: {
    height: 144,
    marginHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    ...Shadows.card
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: Colors.primary
  },
  
  title: {
    ...Typography.body1,
    color: Colors.textPrimary,
    fontWeight: '500'
  },
  
  amount: {
    ...Typography.currencyLarge,
    color: Colors.textPrimary,
    marginBottom: 8
  },
  
  comparison: {
    ...Typography.body2,
    color: Colors.textSecondary
  }
};
```

### Data Calculations
```typescript
// services/calculations.ts
export const calculateMonthlyStats = (expenses: Expense[], month: Date) => {
  const monthExpenses = expenses.filter(expense => 
    isSameMonth(parseISO(expense.date), month)
  );
  
  const totalAmount = monthExpenses.reduce((sum, expense) => 
    sum + expense.amount, 0
  );
  
  // If budget is set, calculate progress
  const progressPercentage = budget ? (totalAmount / budget) * 100 : 30;
  
  return {
    totalAmount,
    progressPercentage: Math.min(progressPercentage, 100)
  };
};

export const calculateDailyStats = (expenses: Expense[]) => {
  const today = new Date();
  const yesterday = subDays(today, 1);
  
  const todayExpenses = expenses.filter(expense => 
    isSameDay(parseISO(expense.date), today)
  );
  
  const yesterdayExpenses = expenses.filter(expense => 
    isSameDay(parseISO(expense.date), yesterday)
  );
  
  const todayAmount = todayExpenses.reduce((sum, expense) => 
    sum + expense.amount, 0
  );
  
  const yesterdayAmount = yesterdayExpenses.reduce((sum, expense) => 
    sum + expense.amount, 0
  );
  
  return {
    todayAmount,
    yesterdayAmount,
    changePercentage: yesterdayAmount > 0 ? 
      ((todayAmount - yesterdayAmount) / yesterdayAmount) * 100 : 0
  };
};
```

## 4. Categories Section

### Section Header
```typescript
const CategorySectionHeaderSpec = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16
  },
  
  title: {
    ...Typography.h3,
    color: Colors.textPrimary
  },
  
  viewAllButton: {
    ...Typography.body2,
    color: Colors.primary,
    fontWeight: '500'
  }
};
```

### Category Item Component
```typescript
interface CategoryItemProps {
  category: Category;
  amount: number;
  percentage?: number;
}

const CategoryItemSpec = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56
  },
  
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  
  icon: {
    width: 24,
    height: 24,
    tintColor: Colors.textSecondary
  },
  
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  
  categoryName: {
    ...Typography.body1,
    color: Colors.textPrimary,
    marginBottom: 2
  },
  
  categoryPercentage: {
    ...Typography.caption,
    color: Colors.textSecondary
  },
  
  amount: {
    ...Typography.body1,
    color: Colors.textPrimary,
    fontWeight: '600'
  }
};
```

### Top Categories Calculation
```typescript
export const calculateTopCategories = (expenses: Expense[], limit = 3) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    const categoryId = expense.category_id;
    acc[categoryId] = (acc[categoryId] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
  
  const totalSpent = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
  
  return sortedCategories.map(([categoryId, amount]) => ({
    categoryId,
    amount,
    percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0
  }));
};
```

## 5. FAB (Floating Action Button)

### Design Specification
```typescript
const FABSpec = {
  container: {
    position: 'absolute',
    bottom: 100, // Above bottom navigation
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.fab
  },
  
  gradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  icon: {
    width: 24,
    height: 24,
    tintColor: Colors.textOnPrimary
  },
  
  // Press animation
  pressed: {
    transform: [{ scale: 0.95 }]
  }
};
```

### Interaction
```typescript
const handleFABPress = () => {
  // Haptic feedback
  HapticFeedback.impactAsync(HapticFeedback.ImpactFeedbackStyle.Medium);
  
  // Navigate to Add Expense screen
  navigation.navigate('AddExpense');
};
```

## 6. Bottom Navigation

### Design Specification
```typescript
const BottomNavigationSpec = {
  container: {
    height: 90,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20, // Safe area padding
    borderTopWidth: 1,
    borderTopColor: Colors.border
  },
  
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 50
  },
  
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4
  },
  
  tabLabel: {
    ...Typography.caption,
    fontSize: 10
  },
  
  activeTab: {
    tintColor: Colors.primary,
    color: Colors.primary
  },
  
  inactiveTab: {
    tintColor: Colors.textSecondary,
    color: Colors.textSecondary
  },
  
  // Center space for FAB
  centerSpace: {
    width: 80,
    height: 50
  }
};
```

## 7. Loading States

### Skeleton Loading
```typescript
const SkeletonLoading = {
  statsCard: {
    height: 144,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 16,
    margin: 16
  },
  
  categoryItem: {
    height: 56,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 4
  },
  
  shimmerColors: [
    Colors.surfaceSecondary,
    Colors.surface,
    Colors.surfaceSecondary
  ]
};
```

## 8. Error States

### No Data State
```typescript
const EmptyState = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32
  },
  
  icon: {
    width: 64,
    height: 64,
    tintColor: Colors.textTertiary,
    marginBottom: 16
  },
  
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8
  },
  
  message: {
    ...Typography.body2,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24
  }
};
```

## 9. Responsive Behavior

### iPhone SE (375pt width)
- Stats cards: Reduce padding to 16pt
- Category icons: Size 40pt instead of 44pt
- Font sizes: Reduce by 1-2pt for currency amounts

### iPhone Pro Max (428pt width)
- Stats cards: Increase padding to 24pt
- Category list: Show 4 items instead of 3
- Font sizes: Increase currency amounts by 2pt

### Landscape Mode
- Stats cards: Side-by-side layout
- Categories: Horizontal scroll
- FAB: Move to bottom-right corner

## 10. Accessibility

### Screen Reader Support
```typescript
const AccessibilityProps = {
  monthSelector: {
    accessible: true,
    accessibilityRole: 'button',
    accessibilityLabel: `Current month: ${formatMonthDisplay(currentMonth)}`,
    accessibilityHint: 'Tap to change month'
  },
  
  statsCard: {
    accessible: true,
    accessibilityRole: 'text',
    accessibilityLabel: `Monthly spending: ${formatCurrency(totalAmount)}`
  },
  
  categoryItem: {
    accessible: true,
    accessibilityRole: 'button',
    accessibilityLabel: `${category.name}: ${formatCurrency(amount)}`,
    accessibilityHint: 'Tap to view category details'
  },
  
  fab: {
    accessible: true,
    accessibilityRole: 'button',
    accessibilityLabel: 'Add new expense',
    accessibilityHint: 'Opens add expense screen'
  }
};
```

---

**Document Version**: 1.0  
**Last Updated**: September 2024  
**Design Source**: Figma Community - Expense Management App  
**Screen**: Home Screen (Main Dashboard)