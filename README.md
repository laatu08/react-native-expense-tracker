# React Native Expense Tracker 💰

A modern, feature-rich expense tracking mobile application built with React Native and Expo. This application helps users manage their personal finances by tracking income and expenses, categorizing transactions, and providing insightful analytics to maintain financial health.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Features in Detail](#-features-in-detail)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality
- **Transaction Management**: Add, edit, and delete income and expense transactions
- **Category Organization**: Organize transactions by customizable categories
- **Real-time Balance Tracking**: View current balance with income and expense breakdowns
- **Transaction History**: Browse complete transaction history with filtering options
- **Data Persistence**: All data stored locally on device for offline access
- **Intuitive UI**: Clean, modern interface built with React Native components

### User Experience
- **File-based Routing**: Seamless navigation powered by Expo Router
- **Responsive Design**: Optimized for various screen sizes and devices
- **Dark/Light Theme Support**: Adapts to system preferences
- **Smooth Animations**: Polished transitions and interactions
- **Cross-platform**: Works on both iOS and Android devices

### Analytics & Insights
- **Expense Categorization**: Visual breakdown of spending by category
- **Budget Tracking**: Monitor spending patterns over time
- **Financial Overview**: Quick summary of financial status
- **Transaction Search**: Find specific transactions quickly

---

## 🛠 Technology Stack

### Core Technologies
- **React Native**: Cross-platform mobile development framework
- **Expo**: Development platform for universal React applications
- **TypeScript**: Type-safe JavaScript for better development experience
- **Expo Router**: File-based routing for React Native applications

### Development Tools
- **ESLint**: Code linting and style enforcement
- **Node.js**: JavaScript runtime environment
- **npm**: Package management

### Key Dependencies
- Expo SDK (Latest version)
- React Navigation ecosystem
- Expo constants and utilities
- Custom hooks for state management

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**
- **Git** for version control
- **Expo CLI** (optional but recommended)

For mobile testing:
- **Expo Go app** (iOS/Android) for quick testing
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - macOS only)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/laatu08/react-native-expense-tracker.git
cd react-native-expense-tracker
```

### 2. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

This will install all required packages including:
- React Native core libraries
- Expo SDK packages
- TypeScript definitions
- Development dependencies

---

## 🏃 Running the Application

### Start the Development Server

```bash
npx expo start
```

Or use the npm script:

```bash
npm start
```

### Running on Different Platforms

Once the development server is running, you'll see a QR code and several options:

#### **Option 1: Using Expo Go (Quickest)**
1. Install Expo Go app on your mobile device
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code with your camera (iOS) or Expo Go app (Android)
3. The app will load on your device

#### **Option 2: iOS Simulator** (macOS only)
```bash
# Press 'i' in terminal after starting the dev server
# Or run directly:
npx expo start --ios
```

#### **Option 3: Android Emulator**
```bash
# Press 'a' in terminal after starting the dev server
# Or run directly:
npx expo start --android
```

#### **Option 4: Web Browser**
```bash
# Press 'w' in terminal after starting the dev server
# Or run directly:
npx expo start --web
```

---

## 📁 Project Structure

```
react-native-expense-tracker/
│
├── app/                          # Main application screens (Expo Router)
│   ├── (tabs)/                   # Tab-based navigation screens
│   ├── _layout.tsx               # Root layout configuration
│   ├── +not-found.tsx            # 404 error screen
│   └── index.tsx                 # Home/entry screen
│
├── assets/                       # Static assets
│   └── images/                   # Image files and icons
│
├── components/                   # Reusable React components
│   ├── ui/                       # UI component library
│   ├── TransactionItem.tsx       # Transaction list item
│   ├── CategoryPicker.tsx        # Category selection component
│   ├── AddTransaction.tsx        # Transaction input form
│   └── BalanceCard.tsx           # Balance display component
│
├── constants/                    # Application constants
│   ├── Colors.ts                 # Color scheme definitions
│   ├── Categories.ts             # Expense categories
│   └── Config.ts                 # App configuration
│
├── hooks/                        # Custom React hooks
│   ├── useStorageState.tsx       # Local storage management
│   ├── useTransactions.tsx       # Transaction data hook
│   └── useColorScheme.tsx        # Theme detection hook
│
├── scripts/                      # Build and utility scripts
│   └── reset-project.js          # Project reset utility
│
├── .vscode/                      # VS Code workspace settings
│
├── .gitignore                    # Git ignore rules
├── app.json                      # Expo app configuration
├── eas.json                      # EAS Build configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

### Directory Details

#### `/app` - Application Screens
Contains all screen components using Expo Router's file-based routing system. Each file represents a route in the application.

#### `/components` - Reusable Components
Modular, reusable UI components used throughout the application. Organized by functionality and reusability.

#### `/constants` - Configuration
Static configuration values, color schemes, category definitions, and other constants used across the app.

#### `/hooks` - Custom Hooks
Custom React hooks for state management, data fetching, and shared logic across components.

#### `/assets` - Media Assets
Images, icons, fonts, and other static resources required by the application.

---

## 🎯 Features in Detail

### 1. Transaction Management

**Add New Transactions**
- Input amount, description, and category
- Select transaction type (income/expense)
- Add date and optional notes
- Validation for required fields

**Edit Existing Transactions**
- Modify any transaction details
- Update categories or amounts
- Change transaction dates
- Preserve transaction history

**Delete Transactions**
- Remove unwanted transactions
- Confirmation prompts for safety
- Immediate balance updates

### 2. Categories

**Predefined Categories**
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Personal Care
- Travel
- Others

**Category Management**
- Color-coded categories for easy identification
- Icon representation for visual clarity
- Category-wise expense summaries

### 3. Balance Overview

**Financial Dashboard**
- Current total balance
- Total income
- Total expenses
- Net savings/deficit

**Visual Indicators**
- Color-coded balance (green for positive, red for negative)
- Percentage breakdowns
- Monthly/weekly summaries

### 4. Transaction History

**Comprehensive Listing**
- Chronological transaction display
- Filter by date range
- Search by description
- Sort by amount or date
- Category-based filtering

### 5. Data Storage

**Local Persistence**
- AsyncStorage for data persistence
- Automatic data backup
- Fast local data access
- No internet required

---

## 💻 Development

### Development Mode

The app uses Expo's development build with hot reloading:

```bash
npm start
```

### Reset Project

To start fresh with a clean slate:

```bash
npm run reset-project
```

This command:
- Moves starter code to `app-example/` directory
- Creates a blank `app/` directory
- Allows you to start development from scratch

### Code Quality

**Linting**
```bash
npm run lint
```

**Type Checking**
```bash
npx tsc --noEmit
```

### Best Practices

1. **Component Structure**: Keep components small and focused
2. **TypeScript**: Use proper typing for all props and state
3. **Hooks**: Utilize custom hooks for reusable logic
4. **Styling**: Follow the established color scheme from constants
5. **File Organization**: Place files in appropriate directories

---

## 📱 Building for Production

### Using EAS Build

Expo Application Services (EAS) provides cloud-based build services.

#### Prerequisites
```bash
npm install -g eas-cli
eas login
```

#### Configure Build
The project includes `eas.json` with build configurations.

#### Build for Android
```bash
eas build --platform android
```

#### Build for iOS
```bash
eas build --platform ios
```

#### Build for Both Platforms
```bash
eas build --platform all
```

### Local Builds

#### Android APK
```bash
# Development build
npx expo build:android -t apk

# Production build
npx expo build:android -t app-bundle
```

#### iOS IPA (macOS only)
```bash
npx expo build:ios
```

---

## 🐛 Troubleshooting

### Common Issues

#### **Metro Bundler Won't Start**
```bash
# Clear cache and restart
npx expo start -c
```

#### **Dependencies Issues**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

#### **iOS Build Fails**
```bash
# Clear iOS build cache
cd ios
pod deintegrate
pod install
cd ..
```

#### **Android Build Issues**
```bash
# Clear Android cache
cd android
./gradlew clean
cd ..
```

#### **TypeScript Errors**
```bash
# Regenerate TypeScript types
npx expo customize tsconfig.json
```

### Debug Mode

Enable debug mode for detailed logs:
```bash
npx expo start --dev-client
```

### Performance Issues

If the app feels slow:
1. Enable Hermes JavaScript engine (enabled by default in Expo)
2. Optimize images (use WebP format)
3. Implement pagination for large lists
4. Use React.memo for expensive components

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Create a new issue with detailed description
3. Include steps to reproduce
4. Add screenshots if applicable
5. Specify device and OS version

### Suggesting Features

1. Open an issue with the "enhancement" label
2. Describe the feature and its benefits
3. Provide mockups or examples if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Ensure all tests pass
- Use TypeScript for type safety

---

## 📚 Learn More

### Expo Documentation
- [Expo Docs](https://docs.expo.dev/): Learn fundamentals and advanced topics
- [Expo Router](https://docs.expo.dev/router/introduction/): File-based routing
- [Expo SDK](https://docs.expo.dev/versions/latest/): API reference

### React Native Resources
- [React Native Docs](https://reactnative.dev/): Official documentation
- [React Docs](https://react.dev/): React fundamentals

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/): TypeScript guide
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/): React + TypeScript patterns

---

## 🌟 Features Roadmap

### Upcoming Features
- [ ] Budget setting and alerts
- [ ] Expense charts and analytics
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Cloud backup and sync
- [ ] Export to CSV/PDF
- [ ] Biometric authentication
- [ ] Widget support
- [ ] Notification reminders
- [ ] Split transactions

---

## 👥 Community

### Get Help
- Open an issue on GitHub
- Check existing discussions
- Review closed issues for solutions

### Stay Updated
- Star the repository for updates
- Watch for new releases
- Follow the contributor guidelines

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Powered by [React Native](https://reactnative.dev/)
- Inspired by the open-source community

---

## 📧 Contact

**Project Owner**: laatu08

**Project Link**: [https://github.com/laatu08/react-native-expense-tracker](https://github.com/laatu08/react-native-expense-tracker)

---

## ⚡ Quick Start Commands

```bash
# Clone the repository
git clone https://github.com/laatu08/react-native-expense-tracker.git

# Navigate to project directory
cd react-native-expense-tracker

# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android

# Run on Web
npx expo start --web
```

---

**Happy Expense Tracking! 💰📊**

Made with ❤️ using React Native and Expo
