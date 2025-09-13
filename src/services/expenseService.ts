import { supabase } from './supabase/client';

export interface ExpenseData {
  id: string;
  expense_date: string;
  amount: number;
  description?: string;
  category_id: string;
  categories: {
    id: string;
    name: string;
    icon?: string;
  };
}

export interface CategoryWithAmount {
  id: string;
  name: string;
  amount: number;
  iconName?: string | null;
}

export interface MonthlyExpenseStats {
  monthlyTotal: number;
  dailyTotal: number;
  topCategories: CategoryWithAmount[];
  monthlyProgress: number;
  expenseCount: number;
  showDailyCard: boolean;
}

export class ExpenseService {
  /**
   * Get monthly expense statistics for a specific year and month
   */
  static async getMonthlyStats(year: number, month: number): Promise<MonthlyExpenseStats> {
    try {
      console.log(`📊 Fetching monthly stats for ${year}-${month.toString().padStart(2, '0')}`);

      // Calculate date range for the selected month
      const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
      const lastDay = new Date(year, month, 0).getDate(); // Get last day of month
      const endDate = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`;

      // Get expenses for the specific month with category data
      const { data: monthExpenses, error } = await supabase
        .from('expenses')
        .select(`
          *,
          categories!inner (
            id,
            name,
            icon
          )
        `)
        .gte('expense_date', startDate)
        .lte('expense_date', endDate);

      if (error) {
        console.error('❌ Error fetching monthly expenses:', error);
        throw error;
      }

      console.log(`✅ Found ${monthExpenses?.length || 0} expenses for ${year}-${month}`);

      const expenses = (monthExpenses as ExpenseData[]) || [];

      // Calculate monthly total
      const monthlyTotal = expenses.reduce((sum, expense) => {
        const amount = parseFloat(expense.amount.toString()) || 0;
        return sum + amount;
      }, 0);

      // Calculate today's total (only if viewing current month)
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const isCurrentMonth = (year === currentYear && month === currentMonth);

      let dailyTotal = 0;
      if (isCurrentMonth) {
        const today = new Date().toISOString().split('T')[0];
        const todayExpenses = expenses.filter(expense => expense.expense_date === today);
        dailyTotal = todayExpenses.reduce((sum, expense) => {
          const amount = parseFloat(expense.amount.toString()) || 0;
          return sum + amount;
        }, 0);
        console.log(`📅 Today's expenses: ${todayExpenses.length} records, ${dailyTotal.toLocaleString('vi-VN')} VND`);
      }

      // Calculate top categories
      const topCategories = this.calculateTopCategories(expenses);

      // Calculate progress (assuming 50M VND monthly budget)
      const monthlyBudget = 50000000; // 50M VND
      const monthlyProgress = monthlyBudget > 0 ? Math.min(monthlyTotal / monthlyBudget, 1) : 0;

      const stats: MonthlyExpenseStats = {
        monthlyTotal,
        dailyTotal,
        topCategories,
        monthlyProgress,
        expenseCount: expenses.length,
        showDailyCard: isCurrentMonth
      };

      console.log(`💰 Monthly stats calculated:`, {
        monthlyTotal: monthlyTotal.toLocaleString('vi-VN') + ' VND',
        dailyTotal: dailyTotal.toLocaleString('vi-VN') + ' VND',
        topCategories: topCategories.length,
        progress: Math.round(monthlyProgress * 100) + '%',
        showDailyCard: isCurrentMonth
      });

      return stats;

    } catch (error) {
      console.error('❌ Error in getMonthlyStats:', error);
      throw error;
    }
  }

  /**
   * Calculate top 3 categories from expenses
   */
  private static calculateTopCategories(expenses: ExpenseData[]): CategoryWithAmount[] {
    const categoryTotals = new Map<string, CategoryWithAmount>();

    expenses.forEach(expense => {
      const category = expense.categories;
      const amount = parseFloat(expense.amount.toString()) || 0;

      if (category && amount > 0) {
        const existing = categoryTotals.get(category.id);
        if (existing) {
          existing.amount += amount;
        } else {
          categoryTotals.set(category.id, {
            id: category.id,
            name: category.name,
            amount: amount,
            iconName: category.icon
          });
        }
      }
    });

    // Sort by amount and get top 3
    const sorted = Array.from(categoryTotals.values())
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    console.log('📊 Top categories:', sorted.map(c => `${c.name}: ${c.amount.toLocaleString('vi-VN')} VND`));

    return sorted;
  }

  /**
   * Test Supabase connection and database access
   */
  static async testConnection(): Promise<{ success: boolean; message: string; count?: number }> {
    try {
      console.log('🔄 Testing Supabase connection...');

      const { count, error } = await supabase
        .from('expenses')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('❌ Connection test failed:', error);
        return { success: false, message: error.message };
      }

      console.log(`✅ Connection successful! Found ${count} total expense records`);
      return {
        success: true,
        message: `Connected successfully. ${count || 0} expenses in database.`,
        count: count || 0
      };

    } catch (error) {
      console.error('❌ Connection test failed:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, message };
    }
  }

  /**
   * Get expense data for a date range (useful for debugging)
   */
  static async getExpensesInRange(startDate: string, endDate: string): Promise<ExpenseData[]> {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select(`
          *,
          categories (
            id,
            name,
            icon
          )
        `)
        .gte('expense_date', startDate)
        .lte('expense_date', endDate)
        .order('expense_date', { ascending: false });

      if (error) {
        console.error('❌ Error fetching expenses in range:', error);
        throw error;
      }

      return (data as ExpenseData[]) || [];

    } catch (error) {
      console.error('❌ Error in getExpensesInRange:', error);
      throw error;
    }
  }
}