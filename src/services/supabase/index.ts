// Export all Supabase related functionality
export { supabase, testConnection } from './client';
export type { 
  Database, 
  Expense, 
  Category, 
  ExpenseType, 
  ExpenseWithDetails, 
  CategoryWithAmount,
  CreateExpenseInput, 
  UpdateExpenseInput 
} from './types';