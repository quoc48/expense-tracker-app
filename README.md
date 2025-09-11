# Expense Tracker App

A personal expense tracking iOS mobile application built with React Native and Supabase, designed to help track spending habits with an intuitive and elegant interface.

## 📱 Project Overview

This is a personal finance app focused on simplicity and habit formation. The app helps track daily expenses, categorize spending, and provides insights through clean visualizations based on a modern Figma design system.

### Key Features (Phase 1)
- **Home Dashboard**: Monthly/daily spending overview with progress tracking
- **Quick Expense Entry**: Fast expense logging with 14 predefined categories
- **Category Insights**: Top spending categories with visual breakdown
- **Offline Support**: Full functionality without internet connection
- **Real-time Sync**: Supabase integration for data persistence

## 🎨 Design System

The app follows a modern design system based on Figma Community UI Kit:
- **Colors**: Clean palette with #6FCF97 primary accent
- **Typography**: Inter font family with clear hierarchy
- **Layout**: 8pt grid system with consistent spacing
- **Components**: Reusable UI components following iOS guidelines

See `docs/design/` for complete design specifications.

## 📊 Database

Built on Supabase with PostgreSQL backend:
- ✅ **730 expenses** already migrated from Notion
- ✅ **14 categories** with proper UUID relationships
- ✅ **3 expense types**: Essential, Non-essential, Investment
- ✅ **100% data integrity** with foreign key constraints

## 🛠 Technology Stack

- **Framework**: React Native 0.72+ with TypeScript
- **Backend**: Supabase (PostgreSQL + Real-time subscriptions)
- **State Management**: Redux Toolkit with persistence
- **Navigation**: React Navigation v6
- **UI Components**: Custom components based on design system
- **Testing**: Jest + React Native Testing Library

## 📁 Project Structure

```
expense-tracker-app/
├── docs/                    # Complete project documentation
│   ├── PRD.md              # Product Requirements Document  
│   ├── TECH_STACK.md       # Technical specifications
│   ├── TASKS.md            # Detailed development tasks
│   └── design/             # Modular design documentation
│       ├── DESIGN_SYSTEM.md
│       └── HOME_SCREEN.md
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── screens/           # App screens (Home, AddExpense, etc.)
│   ├── navigation/        # Navigation configuration
│   ├── services/          # Supabase API integration
│   ├── store/             # Redux state management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── constants/         # Design tokens and constants
│   └── hooks/             # Custom React hooks
└── __tests__/             # Test files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- React Native CLI
- Xcode 14+ (for iOS development)
- Supabase account

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd expense-tracker-app
   npm install
   ```

2. **iOS setup**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   # Add your Supabase credentials to .env
   ```

4. **Start development**
   ```bash
   npm start
   npm run ios
   ```

### Environment Variables
```bash
# .env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[PRD.md](docs/PRD.md)** - Complete product requirements with updated design specs
- **[TECH_STACK.md](docs/TECH_STACK.md)** - Technical architecture and dependencies  
- **[TASKS.md](docs/TASKS.md)** - Detailed development roadmap (10-12 weeks)
- **[DESIGN_SYSTEM.md](docs/design/DESIGN_SYSTEM.md)** - Complete design tokens and components
- **[HOME_SCREEN.md](docs/design/HOME_SCREEN.md)** - Detailed Home screen specifications

## 🎯 Development Phases

### Phase 1: Core Functionality (4-6 weeks)
- [ ] Home screen with stats and category insights
- [ ] Add expense screen with form validation
- [ ] Navigation structure and bottom tabs
- [ ] Supabase integration and offline support

### Phase 2: Enhanced Features (2-3 weeks)
- [ ] Expense history with filtering
- [ ] Basic analytics and charts
- [ ] Enhanced home screen features

### Phase 3: Advanced Features (2-3 weeks)
- [ ] Budget management and tracking
- [ ] Data export and settings
- [ ] Customization options

## 🧪 Development Commands

```bash
# Development
npm start                 # Start Metro bundler
npm run ios              # Run on iOS simulator
npm run android          # Run on Android emulator

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # TypeScript type checking

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode testing
```

## 📏 Code Quality Standards

- **TypeScript**: Strict mode with comprehensive type definitions
- **ESLint**: Airbnb config with React Native extensions
- **Prettier**: Automatic code formatting
- **Testing**: Unit and integration tests required
- **Architecture**: Modular, scalable component structure

## 🎨 Design Philosophy

**Personal Use Focus**: Built for individual expense tracking with emphasis on:
- **Speed**: Add expense in under 30 seconds
- **Habit Formation**: Daily logging becomes routine within 2 weeks
- **Visual Clarity**: Understand spending patterns at a glance
- **Offline First**: Full functionality without internet

## 📈 Success Metrics

- **Consistency**: Daily expense logging for 30+ consecutive days
- **Accuracy**: 95%+ expenses properly categorized
- **Performance**: <2 second app launch, <1 second interactions
- **Reliability**: 100% offline functionality, zero data loss

## 🔮 Future Enhancements

- Multi-device sync (iPad app)
- Receipt scanning with OCR
- Advanced analytics with ML insights
- Banking integration for automatic imports
- Cross-platform Android version

## 📄 License

MIT License - This is a personal project for learning and development.

---

**Version**: 1.0.0  
**Last Updated**: September 2024  
**Development Status**: Project Setup Complete ✅