-- Supabase RLS Policies for Expense Tracker App
-- Run these commands in Supabase Dashboard > SQL Editor

-- ============================================================================
-- OPTION 1: Create READ-ONLY policies for public access (RECOMMENDED)
-- ============================================================================

-- 1. Allow public read access to expenses table
CREATE POLICY "Allow public read access to expenses"
ON expenses
FOR SELECT
USING (true);

-- 2. Allow public read access to categories table
CREATE POLICY "Allow public read access to categories"
ON categories
FOR SELECT
USING (true);

-- 3. Allow public read access to expense_types table
CREATE POLICY "Allow public read access to expense_types"
ON expense_types
FOR SELECT
USING (true);

-- ============================================================================
-- OPTION 2: Temporarily disable RLS (FOR TESTING ONLY - NOT RECOMMENDED)
-- ============================================================================

-- ONLY run these if Option 1 doesn't work:
-- ALTER TABLE expenses DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE expense_types DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Test 1: Check if expenses table is accessible
SELECT COUNT(*) as total_expenses FROM expenses;

-- Test 2: Check current month expenses
SELECT COUNT(*) as current_month_expenses
FROM expenses
WHERE date >= date_trunc('month', CURRENT_DATE)
AND date < date_trunc('month', CURRENT_DATE) + interval '1 month';

-- Test 3: Check categories with expense relationships
SELECT
    c.name,
    COUNT(e.id) as expense_count,
    SUM(e.amount) as total_amount
FROM categories c
LEFT JOIN expenses e ON c.id = e.category_id
GROUP BY c.id, c.name
ORDER BY total_amount DESC
LIMIT 5;

-- Test 4: Check today's expenses
SELECT COUNT(*) as today_expenses
FROM expenses
WHERE date = CURRENT_DATE;

-- ============================================================================
-- ROLLBACK COMMANDS (if needed)
-- ============================================================================

-- To remove policies if something goes wrong:
-- DROP POLICY "Allow public read access to expenses" ON expenses;
-- DROP POLICY "Allow public read access to categories" ON categories;
-- DROP POLICY "Allow public read access to expense_types" ON expense_types;