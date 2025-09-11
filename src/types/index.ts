// Re-export types from services for easy importing throughout the app
export type { 
  Database,
  Expense, 
  Category, 
  ExpenseType, 
  ExpenseWithDetails, 
  CategoryWithAmount,
  CreateExpenseInput, 
  UpdateExpenseInput 
} from '../services/supabase/types';

// Navigation types
export type RootStackParamList = {
  TabNavigator: undefined;
  AddExpense: {
    editExpense?: string; // expense ID for editing
  };
  ExpenseDetail: {
    expenseId: string;
  };
};

export type TabParamList = {
  Home: undefined;
  History: undefined;
  Analytics: undefined;
  Settings: undefined;
};

// UI Component prop types
export interface StatsCardProps {
  title: string;
  amount: number;
  variant?: 'monthly' | 'daily';
  progressPercentage?: number;
}

export interface CategoryItemProps {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage?: number;
  onPress?: () => void;
}

// Utility types
export type Period = 'day' | 'week' | 'month' | 'year';
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

// Form data types for React Hook Form or similar
export interface ExpenseFormData {
  amount: string;
  categoryId: string;
  expenseTypeId: string;
  date: Date;
  notes: string;
}