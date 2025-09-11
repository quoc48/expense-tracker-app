# Technical Stack Documentation

## 1. Technology Overview

### Frontend Framework
**React Native 0.72+**
- **Why**: Cross-platform development with native performance
- **Benefits**: Single codebase for iOS (and future Android), large community, excellent performance
- **Learning Resources**: [React Native Documentation](https://reactnative.dev/)

### Language
**TypeScript 5.0+**
- **Why**: Type safety and better developer experience
- **Benefits**: Catch errors at compile time, better IDE support, self-documenting code
- **Setup**: Configured with strict mode for maximum type safety

### Backend & Database
**Supabase**
- **Database**: PostgreSQL with real-time subscriptions
- **Authentication**: Built-in auth system
- **API**: Auto-generated REST API and real-time subscriptions
- **Storage**: For potential future file uploads (receipts)
- **Why**: Serverless, real-time, handles scaling automatically

## 2. Core Dependencies

### Navigation
```json
"@react-navigation/native": "^6.1.7"
"@react-navigation/native-stack": "^6.9.13"
"@react-navigation/bottom-tabs": "^6.5.8"
```
- **Purpose**: Handle screen navigation and tab-based navigation
- **Setup**: Native stack navigator for main screens, bottom tabs for primary navigation

### Supabase Integration
```json
"@supabase/supabase-js": "^2.33.1"
```
- **Purpose**: Database operations, real-time subscriptions, authentication
- **Setup**: Single client instance with environment-based configuration

### UI Components & Styling
```json
"react-native-vector-icons": "^10.0.0"
"react-native-safe-area-context": "^4.7.1"
"react-native-screens": "^3.22.1"
```
- **Icons**: Vector icons for categories and UI elements
- **Safe Area**: Handle different device screen layouts
- **Screens**: Optimize navigation performance

### State Management
```json
"@reduxjs/toolkit": "^1.9.5"
"react-redux": "^8.1.1"
"redux-persist": "^6.0.0"
```
- **Purpose**: Global state management for expenses, categories, user preferences
- **Persistence**: Offline data storage and state restoration

### Date & Time Handling
```json
"date-fns": "^2.30.0"
```
- **Purpose**: Date manipulation, formatting, and calculations
- **Why**: Lightweight alternative to moment.js, tree-shakeable

### Charts & Analytics (Phase 2)
```json
"react-native-chart-kit": "^6.12.0"
"react-native-svg": "^13.10.0"
```
- **Purpose**: Expense analytics charts and visualizations
- **Implementation**: Added in Phase 2 for analytics features

## 3. Development Tools

### Code Quality
```json
"@typescript-eslint/eslint-plugin": "^6.2.1"
"@typescript-eslint/parser": "^6.2.1"
"eslint": "^8.45.0"
"prettier": "^3.0.0"
```
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Pre-commit hooks**: Ensure code quality before commits

### Testing Framework
```json
"@testing-library/react-native": "^12.1.3"
"jest": "^29.6.1"
"react-test-renderer": "18.2.0"
```
- **Unit Testing**: Component and utility function testing
- **Integration Testing**: Screen and navigation flow testing

### Development Environment
```json
"@react-native-community/cli": "^11.3.5"
"react-native-flipper": "^0.212.0"
```
- **CLI Tools**: React Native development tools
- **Debugging**: Flipper for debugging network requests, state, and performance

## 4. Project Architecture

### Folder Structure
```
expense-tracker-app/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Shared components (Button, Input, etc.)
│   │   └── screens/         # Screen-specific components
│   ├── screens/             # Main app screens
│   │   ├── Home/            # Home screen and related components
│   │   ├── AddExpense/      # Add expense flow
│   │   ├── ExpenseHistory/  # Expense list and details
│   │   └── Analytics/       # Charts and analytics
│   ├── navigation/          # Navigation configuration
│   ├── services/            # External service integrations
│   │   └── supabase/        # Database operations
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux slices for different features
│   │   └── middleware/     # Custom middleware (persistence, etc.)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions and helpers
│   ├── constants/          # App constants (colors, dimensions, etc.)
│   └── hooks/              # Custom React hooks
├── assets/                 # Images, icons, fonts
├── docs/                   # Project documentation
├── __tests__/             # Test files
└── ios/                   # iOS-specific native code
```

### Component Architecture
```
Screen Components (Smart)
├── Business logic and state management
├── API calls and data fetching
└── Compose presentational components

Presentational Components (Dumb)
├── Pure UI rendering
├── Props-based configuration
└── No business logic or API calls

Custom Hooks
├── Reusable stateful logic
├── API integration hooks
└── Local storage hooks
```

## 5. Data Architecture

### Supabase Schema
```sql
-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expense types table
CREATE TABLE expense_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(20) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  expense_date DATE NOT NULL,
  category_id UUID REFERENCES categories(id),
  expense_type_id UUID REFERENCES expense_types(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Local State Management
```typescript
// Redux State Structure
interface RootState {
  expenses: {
    items: Expense[];
    loading: boolean;
    error: string | null;
    filters: ExpenseFilters;
  };
  categories: {
    items: Category[];
    loading: boolean;
  };
  user: {
    preferences: UserPreferences;
    isOnline: boolean;
  };
}
```

## 6. API Integration

### Supabase Client Configuration
```typescript
// services/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});
```

### API Service Layer
```typescript
// services/supabase/expenses.ts
export class ExpenseService {
  static async getAllExpenses(): Promise<Expense[]> { }
  static async addExpense(expense: CreateExpenseInput): Promise<Expense> { }
  static async updateExpense(id: string, updates: UpdateExpenseInput): Promise<Expense> { }
  static async deleteExpense(id: string): Promise<void> { }
  static async getExpensesByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> { }
}
```

## 7. Development Workflow

### Environment Setup
1. **Prerequisites**
   - Node.js 18+ and npm/yarn
   - React Native CLI
   - Xcode 14+ (for iOS development)
   - Supabase account and project

2. **Initial Setup**
   ```bash
   # Clone and install dependencies
   git clone <repository-url>
   cd expense-tracker-app
   npm install
   
   # iOS setup
   cd ios && pod install && cd ..
   
   # Environment configuration
   cp .env.example .env
   # Add Supabase credentials to .env
   
   # Start development server
   npm start
   ```

### Development Commands
```json
{
  "scripts": {
    "start": "react-native start",
    "ios": "react-native run-ios",
    "android": "react-native run-android",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "clean": "react-native clean-project-auto"
  }
}
```

### Code Quality Standards
- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Airbnb config with React Native extensions
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for linting and testing
- **Conventional Commits**: Structured commit messages

### Testing Strategy
```typescript
// Component Testing
describe('ExpenseCard', () => {
  it('displays expense amount correctly', () => {
    // Test implementation
  });
});

// Hook Testing
describe('useExpenses', () => {
  it('fetches expenses on mount', () => {
    // Test implementation
  });
});

// Integration Testing
describe('AddExpense Flow', () => {
  it('completes expense creation successfully', () => {
    // Test implementation
  });
});
```

## 8. Performance Optimization

### React Native Optimizations
- **FlatList**: For efficient rendering of large expense lists
- **useMemo**: Memoize expensive calculations (category totals, etc.)
- **useCallback**: Prevent unnecessary re-renders
- **Image Optimization**: WebP format for custom images

### Bundle Size Management
- **Metro Bundler**: Tree shaking and code splitting
- **Dynamic Imports**: Load analytics charts only when needed
- **Asset Optimization**: Compress images and use vector icons

### Data Management
- **Pagination**: Load expenses in chunks for better performance
- **Caching**: Redux persist for offline capability
- **Background Sync**: Sync data when app becomes active

## 9. Security Considerations

### Data Protection
- **Local Storage**: Encrypted storage for sensitive data
- **API Security**: Row Level Security (RLS) in Supabase
- **Environment Variables**: Secure credential management
- **Input Validation**: Sanitize all user inputs

### Privacy
- **Minimal Data Collection**: Only collect necessary expense data
- **Local-First**: App works offline, syncs when online
- **User Control**: Easy data export and deletion

## 10. Deployment & Distribution

### Build Configuration
```typescript
// app.json - Expo configuration
{
  "expo": {
    "name": "Expense Tracker",
    "slug": "expense-tracker",
    "version": "1.0.0",
    "platforms": ["ios"],
    "ios": {
      "bundleIdentifier": "com.yourname.expensetracker",
      "buildNumber": "1"
    }
  }
}
```

### iOS App Store Preparation
- **App Icons**: All required sizes (20pt to 1024pt)
- **Screenshots**: Device-specific App Store screenshots
- **Metadata**: App description, keywords, privacy policy
- **TestFlight**: Beta testing before public release

### Continuous Integration
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
```

## 11. Monitoring & Analytics

### Error Tracking
- **Flipper**: Development debugging
- **React Native Error Boundary**: Graceful error handling
- **Console Logging**: Structured logging for debugging

### Performance Monitoring
- **React Native Performance**: Built-in performance monitor
- **Bundle Analysis**: Regular bundle size monitoring
- **Memory Usage**: Profile memory leaks and optimize

### User Analytics (Future)
- **Usage Patterns**: Which features are used most
- **Performance Metrics**: App startup time, screen transitions
- **Error Rates**: Track and fix common user issues

---

**Document Version**: 1.0  
**Last Updated**: September 2024  
**Technology Stack**: React Native 0.72+ | TypeScript 5.0+ | Supabase