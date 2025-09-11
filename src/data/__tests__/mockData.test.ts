import { mockExpenseData, allMockCategories, getMockExpenseData, getMockTopCategories } from '../mockData';

describe('Mock Data', () => {
  describe('mockExpenseData', () => {
    it('has correct structure and Vietnamese content', () => {
      expect(mockExpenseData).toHaveProperty('monthlyTotal', 16500000);
      expect(mockExpenseData).toHaveProperty('dailyTotal', 2344000);
      expect(mockExpenseData).toHaveProperty('monthlyProgress', 0.3);
      expect(mockExpenseData).toHaveProperty('currentMonth', 'Tháng 8, 2025');
      expect(mockExpenseData.topCategories).toHaveLength(3);
    });

    it('has top 3 categories with correct Vietnamese names', () => {
      const categories = mockExpenseData.topCategories;
      
      expect(categories[0]?.name).toBe('Thực phẩm');
      expect(categories[1]?.name).toBe('Thời trang');
      expect(categories[2]?.name).toBe('Tiền nhà');
      
      // Check amounts are in descending order (top spending first)
      expect(categories[0]?.amount).toBeGreaterThan(categories[1]?.amount || 0);
      expect(categories[1]?.amount).toBeGreaterThan(categories[2]?.amount || 0);
    });

    it('has valid category icons', () => {
      mockExpenseData.topCategories.forEach(category => {
        expect(category.iconName).toBeTruthy();
        expect(typeof category.iconName).toBe('string');
        expect(category.iconName.length).toBeGreaterThan(0);
      });
    });
  });

  describe('allMockCategories', () => {
    it('contains 14 categories as per requirements', () => {
      expect(allMockCategories).toHaveLength(14);
    });

    it('has unique IDs for all categories', () => {
      const ids = allMockCategories.map(cat => cat.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(allMockCategories.length);
    });

    it('has valid amounts for all categories', () => {
      allMockCategories.forEach(category => {
        expect(category.amount).toBeGreaterThan(0);
        expect(typeof category.amount).toBe('number');
      });
    });

    it('includes salary category with highest amount', () => {
      const salaryCategory = allMockCategories.find(cat => cat.iconName === 'salary');
      expect(salaryCategory).toBeTruthy();
      if (salaryCategory) {
        expect(salaryCategory.amount).toBe(25000000); // Highest income
      }
    });
  });

  describe('Mock API Functions', () => {
    it('getMockExpenseData returns promise with correct data', async () => {
      const data = await getMockExpenseData();
      expect(data).toEqual(mockExpenseData);
    });

    it('getMockTopCategories returns promise with top 3 categories', async () => {
      const categories = await getMockTopCategories();
      expect(categories).toHaveLength(3);
      expect(categories).toEqual(mockExpenseData.topCategories);
    });

    it('simulates network delay', async () => {
      const start = Date.now();
      await getMockExpenseData();
      const end = Date.now();
      
      // Should take at least 500ms due to setTimeout
      expect(end - start).toBeGreaterThanOrEqual(450); // Some margin for timing
    });
  });

  describe('Data Consistency', () => {
    it('top categories exist in all categories list', () => {
      const allIds = allMockCategories.map(cat => cat.id);
      
      mockExpenseData.topCategories.forEach(topCat => {
        expect(allIds).toContain(topCat.id);
      });
    });

    it('amounts are formatted as integers (VND)', () => {
      [...mockExpenseData.topCategories, ...allMockCategories].forEach(category => {
        expect(Number.isInteger(category.amount)).toBe(true);
        expect(category.amount % 1000).toBe(0); // Should be in thousands
      });
    });
  });
});