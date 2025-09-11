// Supabase database types based on our migrated schema

export interface Database {
  public: {
    Tables: {
      expenses: {
        Row: {
          id: string;
          amount: number;
          category_id: string;
          expense_type_id: string;
          date: string; // ISO date string
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          amount: number;
          category_id: string;
          expense_type_id: string;
          date: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          amount?: number;
          category_id?: string;
          expense_type_id?: string;
          date?: string;
          notes?: string | null;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon_name: string | null;
          color_hex: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          icon_name?: string | null;
          color_hex?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon_name?: string | null;
          color_hex?: string | null;
        };
      };
      expense_types: {
        Row: {
          id: string;
          name: string; // 'Essential' | 'Non-essential' | 'Investment'
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
        };
      };
    };
  };
}

// Convenience type exports
export type Expense = Database['public']['Tables']['expenses']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type ExpenseType = Database['public']['Tables']['expense_types']['Row'];

// Extended types with joined data
export interface ExpenseWithDetails extends Expense {
  category: Category;
  expense_type: ExpenseType;
}

export interface CategoryWithAmount {
  category: Category;
  amount: number;
  percentage: number;
}

// Form types
export interface CreateExpenseInput {
  amount: number;
  category_id: string;
  expense_type_id: string;
  date: string;
  notes?: string;
}

export interface UpdateExpenseInput {
  amount?: number;
  category_id?: string;
  expense_type_id?: string;
  date?: string;
  notes?: string;
}