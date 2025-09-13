import { useState, useEffect, useCallback } from 'react';
import { ExpenseService, type MonthlyExpenseStats } from '../services/expenseService';

interface UseExpenseDataState {
  data: MonthlyExpenseStats;
  loading: boolean;
  error: string | null;
  selectedYear: number;
  selectedMonth: number;
}

interface UseExpenseDataReturn extends UseExpenseDataState {
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  refreshData: () => Promise<void>;
  getFormattedMonth: () => string;
  isCurrentMonth: () => boolean;
}

const DEFAULT_DATA: MonthlyExpenseStats = {
  monthlyTotal: 0,
  dailyTotal: 0,
  topCategories: [],
  monthlyProgress: 0,
  expenseCount: 0,
  showDailyCard: false
};

/**
 * Enhanced hook for managing expense data with month navigation
 * Handles loading states, error handling, and month-based navigation
 */
export const useExpenseData = (): UseExpenseDataReturn => {
  // Initialize with current month/year
  const [state, setState] = useState<UseExpenseDataState>(() => {
    const now = new Date();
    return {
      data: DEFAULT_DATA,
      loading: true,
      error: null,
      selectedYear: now.getFullYear(),
      selectedMonth: now.getMonth() + 1 // JavaScript months are 0-indexed
    };
  });

  // Format month for display
  const getFormattedMonth = useCallback((): string => {
    const monthNames = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    return `${monthNames[state.selectedMonth - 1]}, ${state.selectedYear}`;
  }, [state.selectedMonth, state.selectedYear]);

  // Check if viewing current month
  const isCurrentMonth = useCallback((): boolean => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    return state.selectedYear === currentYear && state.selectedMonth === currentMonth;
  }, [state.selectedMonth, state.selectedYear]);

  // Fetch data for selected month
  const fetchData = useCallback(async () => {
    try {
      console.log(`🔄 useExpenseData: Fetching data for ${state.selectedYear}-${state.selectedMonth}`);

      setState(prev => ({ ...prev, loading: true, error: null }));

      const data = await ExpenseService.getMonthlyStats(state.selectedYear, state.selectedMonth);

      setState(prev => ({
        ...prev,
        data,
        loading: false,
        error: null
      }));

      console.log(`✅ useExpenseData: Data loaded successfully for ${getFormattedMonth()}`);

    } catch (error) {
      console.error('❌ useExpenseData: Error fetching data:', error);

      const errorMessage = error instanceof Error ? error.message : 'Failed to load expense data';

      setState(prev => ({
        ...prev,
        data: DEFAULT_DATA,
        loading: false,
        error: errorMessage
      }));
    }
  }, [state.selectedYear, state.selectedMonth, getFormattedMonth]);

  // Navigate to previous month
  const goToPreviousMonth = useCallback(() => {
    setState(prev => {
      if (prev.loading) {
        console.log('⏳ useExpenseData: Already loading, skipping navigation');
        return prev;
      }

      const newState = { ...prev };

      if (prev.selectedMonth === 1) {
        newState.selectedMonth = 12;
        newState.selectedYear = prev.selectedYear - 1;
      } else {
        newState.selectedMonth = prev.selectedMonth - 1;
      }

      console.log(`⬅️ useExpenseData: Navigate to ${newState.selectedYear}-${newState.selectedMonth}`);
      return newState;
    });
  }, []);

  // Navigate to next month
  const goToNextMonth = useCallback(() => {
    setState(prev => {
      if (prev.loading) {
        console.log('⏳ useExpenseData: Already loading, skipping navigation');
        return prev;
      }

      const newState = { ...prev };

      if (prev.selectedMonth === 12) {
        newState.selectedMonth = 1;
        newState.selectedYear = prev.selectedYear + 1;
      } else {
        newState.selectedMonth = prev.selectedMonth + 1;
      }

      console.log(`➡️ useExpenseData: Navigate to ${newState.selectedYear}-${newState.selectedMonth}`);
      return newState;
    });
  }, []);

  // Manually refresh data
  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Effect: Fetch data when month/year changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    goToPreviousMonth,
    goToNextMonth,
    refreshData,
    getFormattedMonth,
    isCurrentMonth
  };
};

/**
 * Hook for testing Supabase connection independently
 * Useful for debugging and initial setup
 */
export const useSupabaseConnection = () => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'connected' | 'failed'>('idle');
  const [recordCount, setRecordCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runTest = useCallback(async () => {
    setStatus('testing');
    setError(null);

    try {
      const result = await ExpenseService.testConnection();

      if (result.success) {
        setStatus('connected');
        setRecordCount(result.count || 0);
        console.log('✅ Connection test passed');
      } else {
        setStatus('failed');
        setError(result.message);
        console.error('❌ Connection test failed');
      }
    } catch (err) {
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('❌ Connection test error:', err);
    }
  }, []);

  return {
    status,
    recordCount,
    error,
    testConnection: runTest
  };
};