
// Enhanced mock data that simulates real Supabase data structure
// Based on your actual database with 730+ expense records

export interface MockCategory {
  id: string;
  name: string;
  amount: number;
  iconName: string;
}

export interface MockExpense {
  date: string;
  amount: number;
  category: string;
  note: string;
}

export interface MockExpenseData {
  monthlyTotal: number;
  dailyTotal: number;
  monthlyProgress: number;
  currentMonth: string;
  topCategories: MockCategory[];
  recentExpenses?: MockExpense[];
  databaseStats?: {
    totalRecords: number;
    currentMonthRecords: number;
    todayRecords: number;
    categoriesCount: number;
    avgDailySpending: number;
    connectionStatus: string;
  };
}

// Realistic Vietnamese expense data (simulating your 730+ Supabase records)
export const mockExpenseData: MockExpenseData = {
  "monthlyTotal": 16850000,
  "dailyTotal": 2344000,
  "monthlyProgress": 0.31,
  "currentMonth": "Tháng 9, 2024",
  "topCategories": [
    {
      "id": "1",
      "name": "Thực phẩm",
      "amount": 5250000,
      "iconName": "food"
    },
    {
      "id": "2",
      "name": "Di chuyển",
      "amount": 3180000,
      "iconName": "transport"
    },
    {
      "id": "3",
      "name": "Nhà ở",
      "amount": 2890000,
      "iconName": "home"
    }
  ],
  "recentExpenses": [
    {
      "date": "2024-09-13",
      "amount": 85000,
      "category": "Thực phẩm",
      "note": "Cơm trưa"
    },
    {
      "date": "2024-09-13",
      "amount": 45000,
      "category": "Di chuyển",
      "note": "Grab"
    },
    {
      "date": "2024-09-12",
      "amount": 350000,
      "category": "Thực phẩm",
      "note": "Mua đồ ăn tuần"
    },
    {
      "date": "2024-09-12",
      "amount": 150000,
      "category": "Giải trí",
      "note": "Xem phim"
    },
    {
      "date": "2024-09-11",
      "amount": 25000,
      "category": "Di chuyển",
      "note": "Xe bus"
    }
  ],
  "databaseStats": {
    "totalRecords": 730,
    "currentMonthRecords": 87,
    "todayRecords": 5,
    "categoriesCount": 14,
    "avgDailySpending": 562000,
    "connectionStatus": "connected"
  }
};

// Export individual pieces for easy testing
export const { monthlyTotal, dailyTotal, topCategories, recentExpenses, databaseStats } = mockExpenseData;
