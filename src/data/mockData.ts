// Mock data for Home screen development
// This data structure matches our Supabase schema and Figma design

export interface MockCategory {
  id: string;
  name: string;
  amount: number;
  iconName: string;
}

export interface MockExpenseData {
  monthlyTotal: number;
  dailyTotal: number;
  monthlyProgress: number; // 0-1 (0% to 100%)
  currentMonth: string;
  topCategories: MockCategory[];
}

export const mockExpenseData: MockExpenseData = {
  monthlyTotal: 16500000, // 16,500,000 VND
  dailyTotal: 2344000,    // 2,344,000 VND
  monthlyProgress: 0.3,   // 30% of monthly budget
  currentMonth: 'Tháng 8, 2025',
  topCategories: [
    {
      id: '1',
      name: 'Thực phẩm',
      amount: 12857000,
      iconName: 'food',
    },
    {
      id: '2',
      name: 'Thời trang',
      amount: 7342000,
      iconName: 'shopping',
    },
    {
      id: '3',
      name: 'Tiền nhà',
      amount: 5155000,
      iconName: 'rent',
    },
  ],
};

// Additional mock categories for future use
export const allMockCategories: MockCategory[] = [
  { id: '1', name: 'Thực phẩm', amount: 12857000, iconName: 'food' },
  { id: '2', name: 'Thời trang', amount: 7342000, iconName: 'shopping' },
  { id: '3', name: 'Tiền nhà', amount: 5155000, iconName: 'rent' },
  { id: '4', name: 'Giao thông', amount: 2100000, iconName: 'transport' },
  { id: '5', name: 'Giải trí', amount: 1800000, iconName: 'entertainment' },
  { id: '6', name: 'Y tế', amount: 1500000, iconName: 'health' },
  { id: '7', name: 'Giáo dục', amount: 1200000, iconName: 'education' },
  { id: '8', name: 'Tiện ích', amount: 900000, iconName: 'utilities' },
  { id: '9', name: 'Bảo hiểm', amount: 800000, iconName: 'insurance' },
  { id: '10', name: 'Du lịch', amount: 600000, iconName: 'travel' },
  { id: '11', name: 'Quà tặng', amount: 400000, iconName: 'gifts' },
  { id: '12', name: 'Khác', amount: 300000, iconName: 'others' },
  { id: '13', name: 'Đầu tư', amount: 200000, iconName: 'investment' },
  { id: '14', name: 'Lương', amount: 25000000, iconName: 'salary' },
];

// Mock functions to simulate API calls
export const getMockExpenseData = (): Promise<MockExpenseData> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockExpenseData);
    }, 500); // Simulate network delay
  });
};

export const getMockTopCategories = (): Promise<MockCategory[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockExpenseData.topCategories);
    }, 300);
  });
};