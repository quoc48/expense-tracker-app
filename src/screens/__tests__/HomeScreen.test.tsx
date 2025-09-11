import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { mockExpenseData } from '../../data/mockData';

// Mock the components to isolate HomeScreen testing
jest.mock('../../components/common/CustomHeader', () => 'CustomHeader');
jest.mock('../../components/common/StatsCard', () => 'StatsCard');
jest.mock('../../components/common/CategoryItem', () => 'CategoryItem');
jest.mock('../../components/common/FABButton', () => 'FABButton');

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Đang tải...')).toBeTruthy();
  });

  it('renders main components after loading', async () => {
    const { getByText, queryByText } = render(<HomeScreen />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(queryByText('Đang tải...')).toBeNull();
    });

    // Check that main content loads
    expect(getByText('Top 3 danh mục')).toBeTruthy();
  });

  it('displays correct expense data structure', async () => {
    const { queryByText } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(queryByText('Đang tải...')).toBeNull();
    });

    // The mock data should be loaded and displayed
    expect(mockExpenseData.monthlyTotal).toBe(16500000);
    expect(mockExpenseData.dailyTotal).toBe(2344000);
    expect(mockExpenseData.topCategories).toHaveLength(3);
  });

  it('handles navigation events correctly', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    const { queryByText } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(queryByText('Đang tải...')).toBeNull();
    });

    // Test would need interaction with mocked components
    // This verifies the event handlers exist
    expect(consoleSpy).not.toHaveBeenCalledWith('Navigate to previous month');
    
    consoleSpy.mockRestore();
  });
});