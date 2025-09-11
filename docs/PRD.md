# Personal Expense Tracker - Product Requirements Document

## 1. Executive Summary

### App Overview
A personal expense tracking iOS mobile application built with React Native, designed to help users monitor, categorize, and analyze their spending habits. The app provides an intuitive interface for logging expenses and gaining insights into financial patterns.

### Vision Statement
To create a simple, elegant, and powerful expense tracking tool that helps users make informed financial decisions through clear visualization of their spending patterns.

### Success Metrics (Personal Use Focus)
- **Consistency**: Daily expense logging habit formation within 2 weeks
- **Data Accuracy**: 95%+ expenses properly categorized
- **Speed**: Add expense in under 30 seconds
- **Insight Value**: Weekly review of spending patterns influences decisions

## 2. User Stories & Use Cases

### Primary User Persona
**Sarah, 28, Marketing Professional**
- Wants to track daily expenses on-the-go
- Needs to understand spending patterns by category
- Values quick, simple expense entry
- Wants monthly/weekly spending insights

### Core User Stories

#### Phase 1 - Essential Features
1. **As a user, I want to see my expense overview** so that I can quickly understand my current financial situation
   - View total spent today/this week/this month
   - See recent transactions
   - Quick access to add new expense

2. **As a user, I want to add expenses quickly** so that I can log them immediately when they occur
   - Simple amount entry
   - Category selection from predefined list
   - Optional notes/description
   - Date selection (defaults to today)

3. **As a user, I want to categorize my expenses** so that I can understand where my money goes
   - 14 predefined categories (Food, Transport, Entertainment, etc.)
   - 3 expense types (Essential, Non-essential, Investment)
   - Visual category indicators

#### Phase 2 - Enhanced Features
4. **As a user, I want to view my expense history** so that I can review past spending
   - Chronological list of all expenses
   - Filter by date range, category, or type
   - Search functionality

5. **As a user, I want to see spending analytics** so that I can make informed financial decisions
   - Category breakdown charts
   - Monthly spending trends
   - Comparison with previous periods

6. **As a user, I want to set spending goals** so that I can control my expenses
   - Monthly budget limits per category
   - Progress indicators
   - Notifications when approaching limits

#### Phase 3 - Advanced Features
7. **As a user, I want to export my data** so that I can use it in other tools
   - CSV export functionality
   - Date range selection for exports

8. **As a user, I want to customize categories** so that the app fits my specific needs
   - Add custom categories
   - Modify existing category names
   - Set category colors/icons

## 3. Design System & UI Specifications

### Figma Design Reference
- **Design Source**: Figma Community UI Kit - Expense Management App
- **Target Device**: iPhone (375px width baseline)
- **Design Philosophy**: Clean, minimal, gradient-based interface
- **Complete Design Documentation**: See `docs/design/DESIGN_SYSTEM.md` for detailed specifications

### Color Palette
- **Background**: #F5F6F7 (light gray)
- **Primary Accent**: #6FCF97 (green)
- **Text Primary**: #242D35 (dark)
- **Card Background**: White with shadow
- **Monthly Card**: Gradient background (blue tones)

### Typography
- **Primary Font**: Inter (Regular, Semi Bold, Bold)
- **Hierarchy**: 
  - Headings: 16px Semi Bold
  - Body: 12px Regular  
  - Money amounts: 24px Bold
  - Labels: 12px Regular

### Component Specifications
#### Home Screen Layout (from Figma)
See detailed specifications in `docs/design/HOME_SCREEN.md`

1. **Top Navigation (96px height)**
   - Status bar with time/battery
   - Month selector: "Tháng 8, 2025" with left/right chevrons
   - Background: White

2. **Stats Section (318px height)**
   - **Monthly Stats Card**: 
     - Gradient background, white text
     - Title: "Tổng chi tiêu" with wallet icon
     - Amount: Large text (24px)
     - Progress bar: 30% filled, green accent
   - **Daily Stats Card**:
     - White background, dark text
     - Title: "Hôm nay" with wallet icon  
     - Amount: Large text (24px)

3. **Categories Section**
   - Title: "Top 3 danh mục" (16px Semi Bold)
   - **Category Items**:
     - Icon container: 44px rounded, gray background
     - Category icons: Food, Shopping, Rent
     - Amount text: Right-aligned, Semi Bold
     - Layout: Icon + Title (left), Amount (right)

4. **Bottom Navigation (90px height)**
   - Left tab: Notes icon
   - Center: FAB button (64px) with plus icon, blue gradient
   - Right tab: Settings icon
   - Background: White with blur effect

## 4. Database Integration

### Supabase Schema (Already Migrated)
```sql
-- Expenses table (730 records migrated from Notion)
expenses (
  id UUID PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id),
  expense_type_id UUID REFERENCES expense_types(id),
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories table (14 predefined categories)
categories (
  id UUID PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  icon_name VARCHAR(30),
  color_hex VARCHAR(7)
);

-- Expense Types table (3 types)
expense_types (
  id UUID PRIMARY KEY,
  name VARCHAR(30) NOT NULL, -- Essential, Non-essential, Investment
  description TEXT
);
```

### Migration Success Status
- ✅ 730 expense records successfully migrated
- ✅ 14 categories with UUID relationships
- ✅ 3 expense types established  
- ✅ 100% data integrity maintained
- ✅ Foreign key constraints implemented

## 5. Feature Requirements

### Phase 1: Core Functionality (MVP) - 4-6 weeks

#### Home Screen Implementation
**Components to Build:**
1. `StatusBar` component (custom, matches iOS design)
2. `MonthSelector` component (with navigation logic)
3. `StatsCard` component (reusable for monthly/daily)
4. `CategoryItem` component (icon + title + amount)
5. `FABButton` component (floating action button)

**Data Integration:**
- Connect to Supabase expenses table (730 migrated records)
- Calculate totals: today, this month
- Get top 3 categories by spending amount
- Handle loading states and error scenarios

**Navigation Setup:**
- Bottom tab navigator structure
- Month navigation (previous/next month)
- FAB button → Add Expense screen navigation

#### Add Expense Screen Implementation  
**UI Components:**
1. `AmountInput` - Numeric keypad with currency formatting
2. `CategoryGrid` - 14 categories with custom icons
3. `ExpenseTypeSelector` - 3 types (Essential/Non-essential/Investment)
4. `DatePicker` - iOS native picker, defaults to today
5. `NotesInput` - Optional text field
6. `SaveButton` - Primary action, validates input

**Validation Rules:**
- Amount: Required, positive number, max 2 decimal places
- Category: Required selection from 14 predefined options
- Expense Type: Required selection from 3 options
- Date: Must be valid date, not future date
- Notes: Optional, max 200 characters

### Phase 2: Enhanced User Experience
**Target Timeline: 2-3 weeks after Phase 1**

#### Expense History Screen
- **Paginated List** of all expenses
- **Filter Options**: Date range, category, type
- **Search Functionality**
- **Edit/Delete Actions** for individual expenses

#### Analytics Screen
- **Category Breakdown**: Pie chart showing spending by category
- **Monthly Trends**: Line chart showing monthly totals
- **Period Comparison**: Compare current vs previous month/week

#### Enhanced Home Screen
- **Category Quick Stats**: Top 3 spending categories this month
- **Spending Trends**: Simple graph showing last 7 days

### Phase 3: Advanced Features
**Target Timeline: 2-3 weeks after Phase 2**

#### Budget Management
- **Budget Setting**: Monthly limits per category
- **Progress Tracking**: Visual indicators of budget usage
- **Notifications**: Alerts when approaching/exceeding limits

#### Data Management
- **Export Functionality**: CSV export with date range selection
- **Data Backup**: Manual backup/restore options
- **Settings Screen**: App preferences and data management

#### Customization
- **Custom Categories**: Add/edit/delete categories
- **Category Icons**: Select from predefined icon set
- **App Themes**: Light/dark mode support

## 4. Technical Specifications

### Platform Requirements
- **Primary Platform**: iOS (iPhone)
- **Minimum iOS Version**: iOS 13.0+
- **Screen Sizes**: iPhone SE to iPhone 15 Pro Max
- **Orientation**: Portrait only

### Performance Requirements
- **App Launch**: <2 seconds cold start
- **Screen Transitions**: <1 second
- **Data Sync**: <3 seconds for normal operations
- **Offline Support**: Full functionality without internet
- **Memory Usage**: <100MB typical, <200MB peak

### Data Requirements
- **Local Storage**: 500MB capacity (approximately 50,000 expenses)
- **Cloud Sync**: Real-time synchronization when online
- **Data Retention**: Unlimited expense history
- **Backup**: Automatic cloud backup every 24 hours

### Security Requirements
- **Data Encryption**: Local data encrypted at rest
- **Authentication**: Supabase secure authentication
- **Privacy**: No personal data collection beyond expenses
- **Compliance**: Follow iOS data protection guidelines

## 5. User Experience Requirements

### Design Principles
- **Simplicity**: Minimal steps to complete any action
- **Clarity**: Clear visual hierarchy and readable typography
- **Consistency**: Uniform design patterns throughout
- **Accessibility**: Support for VoiceOver and Dynamic Type

### Interaction Guidelines
- **Touch Targets**: Minimum 44pt touch areas
- **Feedback**: Immediate visual feedback for all actions
- **Error Handling**: Clear, actionable error messages
- **Loading States**: Progress indicators for async operations

### Visual Design
- **Color Scheme**: Modern, clean palette with category-specific colors
- **Typography**: SF Pro (iOS system font) for consistency
- **Icons**: SF Symbols where possible, custom icons for categories
- **Spacing**: 8pt grid system for consistent layouts

## 6. Success Criteria & KPIs

### Personal Use Success Metrics
- **Consistency**: Log expenses daily for 30+ consecutive days
- **Data Accuracy**: 95%+ expenses properly categorized
- **Speed**: Add expense in under 30 seconds
- **Insight Value**: Weekly review of spending patterns

### Technical Performance Goals
- **App Launch**: <2 seconds from tap to usable
- **Data Entry**: <1 second lag for any input
- **Offline Reliability**: 100% functionality without internet
- **Data Integrity**: Zero data loss, 100% sync accuracy

### User Experience Goals
- **Ease of Use**: Can add expense without looking at labels
- **Visual Clarity**: Understand spending at a glance
- **Habit Formation**: App becomes daily routine within 2 weeks
- **Decision Support**: Monthly insights influence spending behavior

## 7. Assumptions & Constraints

### Assumptions
- Users will primarily use the app on their personal devices
- Internet connectivity available for initial setup and periodic sync
- Users are motivated to track expenses consistently
- iOS ecosystem provides stable development environment

### Technical Constraints
- React Native framework limitations
- Supabase service availability and limits
- iOS App Store review guidelines
- Device storage and performance limitations

### Business Constraints
- Single developer project (learning curve considerations)
- No marketing budget (organic growth only)
- Personal use focus (no multi-user features initially)

## 8. Future Considerations

### Potential Phase 4+ Features
- **Multi-device Support**: iPad app with enhanced analytics
- **Shared Expenses**: Family/household expense tracking
- **Receipt Scanning**: OCR for automatic expense entry
- **Banking Integration**: Automatic transaction import
- **Advanced Analytics**: Machine learning spending insights
- **Cross-platform**: Android version

### Scalability Considerations (Future)
- **Personal Data Growth**: Handle 5,000+ personal expenses efficiently
- **Feature Expansion**: Modular architecture for easy feature addition
- **Performance**: Maintain responsiveness as feature set grows
- **Learning Outcomes**: Document lessons learned for potential multi-user version

---

**Document Version**: 1.0  
**Last Updated**: September 2024  
**Next Review**: After Phase 1 completion