// Icon mapping for categories and UI elements
export const CategoryIcons = {
  // Main categories (14 predefined)
  food: 'restaurant',                    // Food & Dining
  transport: 'directions-car',           // Transportation  
  shopping: 'shopping-bag',              // Shopping
  entertainment: 'movie',                // Entertainment
  health: 'local-hospital',              // Healthcare
  education: 'school',                   // Education
  travel: 'flight',                      // Travel
  utilities: 'home',                     // Utilities
  groceries: 'local-grocery-store',      // Groceries
  fitness: 'fitness-center',             // Fitness
  gifts: 'card-giftcard',               // Gifts
  business: 'business',                  // Business
  personal: 'person',                    // Personal Care
  other: 'more-horiz'                   // Other
} as const;

// UI Navigation Icons
export const NavigationIcons = {
  home: 'home',
  history: 'history',
  analytics: 'analytics', 
  settings: 'settings',
  add: 'add',
  close: 'close',
  back: 'arrow-back',
  forward: 'arrow-forward',
  chevronLeft: 'chevron-left',
  chevronRight: 'chevron-right',
  chevronUp: 'expand-less',
  chevronDown: 'expand-more'
} as const;

// Action Icons
export const ActionIcons = {
  edit: 'edit',
  delete: 'delete',
  save: 'save',
  cancel: 'cancel',
  search: 'search',
  filter: 'filter-list',
  sort: 'sort',
  export: 'file-download',
  import: 'file-upload',
  refresh: 'refresh',
  share: 'share'
} as const;

// Status and Feedback Icons
export const StatusIcons = {
  success: 'check-circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
  loading: 'hourglass-empty',
  placeholder: 'image',
  noData: 'inbox'
} as const;

// Expense Type Icons
export const ExpenseTypeIcons = {
  essential: 'priority-high',        // Essential expenses
  'non-essential': 'shopping-cart',  // Non-essential expenses  
  investment: 'trending-up'          // Investment expenses
} as const;

// Stats and Analytics Icons
export const StatsIcons = {
  wallet: 'account-balance-wallet',
  trendingUp: 'trending-up',
  trendingDown: 'trending-down',
  chart: 'bar-chart',
  pieChart: 'pie-chart',
  calendar: 'calendar-today',
  clock: 'access-time',
  money: 'attach-money'
} as const;

// Form and Input Icons
export const FormIcons = {
  calendar: 'calendar-today',
  time: 'access-time',
  amount: 'attach-money',
  notes: 'note',
  category: 'category',
  type: 'label',
  date: 'event'
} as const;

// All icons combined for easy access
export const Icons = {
  ...CategoryIcons,
  ...NavigationIcons,
  ...ActionIcons,
  ...StatusIcons,
  ...ExpenseTypeIcons,
  ...StatsIcons,
  ...FormIcons
} as const;

// Icon size constants
export const IconSizes = {
  xs: 12,
  sm: 16, 
  md: 20,
  lg: 24,
  xl: 32,
  category: 24,      // Category icons in grids
  navigation: 20,    // Bottom navigation icons
  fab: 24,          // FAB button icon
  stats: 24         // Stats card icons
} as const;

// Helper function to get category icon
export const getCategoryIcon = (categoryName: string): string => {
  const normalizedName = categoryName.toLowerCase().replace(/\s+/g, '');
  return CategoryIcons[normalizedName as keyof typeof CategoryIcons] || CategoryIcons.other;
};

// Helper function to get expense type icon  
export const getExpenseTypeIcon = (typeName: string): string => {
  const normalizedName = typeName.toLowerCase().replace(/\s+/g, '-');
  return ExpenseTypeIcons[normalizedName as keyof typeof ExpenseTypeIcons] || ExpenseTypeIcons.essential;
};

// Icon color mapping for different states
export const IconColors = {
  primary: '#6FCF97',
  secondary: '#8B95A2', 
  tertiary: '#C1C7D0',
  success: '#6FCF97',
  warning: '#F2C94C',
  error: '#EB5757',
  info: '#2F80ED',
  white: '#FFFFFF',
  dark: '#242D35'
} as const;

// Export types for TypeScript support
export type CategoryIconKey = keyof typeof CategoryIcons;
export type NavigationIconKey = keyof typeof NavigationIcons;
export type ActionIconKey = keyof typeof ActionIcons;
export type StatusIconKey = keyof typeof StatusIcons;
export type ExpenseTypeIconKey = keyof typeof ExpenseTypeIcons;
export type StatsIconKey = keyof typeof StatsIcons;
export type FormIconKey = keyof typeof FormIcons;
export type IconKey = keyof typeof Icons;
export type IconSizeKey = keyof typeof IconSizes;
export type IconColorKey = keyof typeof IconColors;