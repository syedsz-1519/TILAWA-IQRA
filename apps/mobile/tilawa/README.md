# TILAWA Mobile App (Flutter)

Multilingual Islamic Quranic Learning Platform for iOS & Android

## 📋 Project Structure

```
tilawa/
├── lib/
│   ├── config/              # App configuration
│   │   ├── app_config.dart
│   │   ├── theme.dart
│   │   └── routes.dart
│   ├── models/              # Data models
│   ├── providers/           # State management (Riverpod)
│   ├── screens/             # UI screens
│   │   ├── auth/
│   │   ├── home_screen.dart
│   │   ├── quran_screen.dart
│   │   ├── hadith_screen.dart
│   │   ├── dua_screen.dart
│   │   └── ...
│   ├── services/            # Business logic
│   │   ├── api_service.dart
│   │   ├── local_storage_service.dart
│   │   └── audio_service.dart
│   ├── widgets/             # Reusable widgets
│   ├── utils/               # Utility functions
│   ├── resources/           # Constants & resources
│   └── main.dart
├── android/                 # Android-specific code
├── ios/                     # iOS-specific code
├── test/                    # Unit & widget tests
├── pubspec.yaml            # Dependencies
├── .env.example            # Environment variables example
└── README.md
```

## ✨ Features

### Core Features
- 📖 **Quran Reading** - Complete Quran with multiple translations
- 🎵 **Audio Recitation** - Multiple reciters with high-quality audio
- 📚 **Hadith Library** - Authentic hadith collections
- 🤲 **Duas** - Collection of Islamic prayers
- ✨ **Memorization (Hifz)** - Spaced repetition for memorization
- 🎯 **Progress Tracking** - Track your learning journey
- 🌍 **Multilingual** - Support for 15+ languages
- 🌙 **Dark Mode** - Built-in dark theme support

### Technical Features
- 🔐 **Secure Authentication** - Email/Google sign-in
- 📱 **Offline Support** - Download and read offline
- 🔔 **Push Notifications** - Daily reminders
- 📊 **Analytics** - Track usage patterns
- 🎨 **Material 3** - Modern UI design
- ⚡ **Performance** - Optimized for all devices

## 🚀 Getting Started

### Prerequisites
- Flutter SDK 3.13.0 or higher
- Dart 3.0.0 or higher
- Xcode 14+ (for iOS)
- Android Studio or Gradle (for Android)

### Installation

1. **Clone the repository**
```bash
cd apps/mobile/tilawa
```

2. **Get dependencies**
```bash
flutter pub get
```

3. **Generate code**
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

4. **Set up environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Run the app**

**For Android:**
```bash
flutter run -d android
```

**For iOS:**
```bash
flutter run -d ios
```

## 📦 Dependencies

### State Management
- **Flutter Riverpod** - Reactive state management

### Networking
- **Dio** - HTTP client
- **Retrofit** - REST API client generator

### Storage
- **Hive** - NoSQL local database
- **Shared Preferences** - Key-value storage
- **SQLite** - Structured data storage

### UI & Design
- **Google Fonts** - Typography
- **Flutter SVG** - Vector graphics
- **Cached Network Image** - Image caching
- **Lottie** - Animations

### Audio
- **Just Audio** - Audio playback
- **Audio Session** - Audio session management

### Localization
- **Easy Localization** - Multi-language support
- **Intl** - Internationalization

### Navigation
- **Go Router** - Advanced routing

## 🔧 Development

### Running Tests
```bash
flutter test
```

### Build Debug APK
```bash
flutter build apk --debug
```

### Build Release APK
```bash
flutter build apk --release
```

### Build iOS App
```bash
flutter build ios --release
```

### Code Generation
```bash
flutter pub run build_runner watch
```

## 📱 Platform-Specific Setup

### Android Setup
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

### iOS Setup
```bash
cd ios
pod deintegrate
pod install
cd ..
flutter clean
flutter pub get
```

## 🌐 Environment Configuration

Create a `.env` file in the project root:

```env
APP_ENV=development
API_URL_DEV=http://localhost:8000
API_URL_STAGING=https://api-staging.tilawa.app
API_URL_PROD=https://api.tilawa.app
```

## 📊 Project Statistics

- **Total Screens**: 15+
- **Supported Languages**: 15+
- **Target Devices**: iOS 12+, Android 6+
- **Min SDK**: Android 21, iOS 12.0

## 🎯 Development Roadmap

### Phase 1: Core Features ✅
- [x] Authentication
- [x] Quran reading interface
- [x] Basic audio playback
- [x] Navigation structure
- [x] Theme support

### Phase 2: Features
- [ ] Hadith library full implementation
- [ ] Audio reciter selection
- [ ] Dua collections
- [ ] Bookmark management
- [ ] Search functionality

### Phase 3: Advanced
- [ ] Hifz (memorization) system
- [ ] Offline support
- [ ] Push notifications
- [ ] Analytics integration
- [ ] Performance optimization

### Phase 4: Polish
- [ ] UI/UX refinement
- [ ] Beta testing
- [ ] App store optimization
- [ ] Release to stores

## 🧪 Testing

### Unit Tests
```bash
flutter test test/unit/
```

### Widget Tests
```bash
flutter test test/widget/
```

### Integration Tests
```bash
flutter test test/integration/
```

## 📝 API Integration

The app connects to the TILAWA backend API:

**Base URL**: `https://api.tilawa.app` (production)

**Endpoints**:
- `GET /api/quran/surahs` - Get all surahs
- `GET /api/quran/surah/:number` - Get specific surah
- `GET /api/hadith/collections` - Get hadith collections
- `GET /api/dua/categories` - Get dua categories
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

## 🔒 Security

- Secure token storage using `flutter_secure_storage`
- SSL certificate pinning
- Encrypted local database
- Input validation on all forms
- OAuth 2.0 authentication

## 🚢 Deployment

### Android
```bash
# Build signed APK
flutter build apk --release

# Build app bundle
flutter build appbundle --release
```

### iOS
```bash
# Build for App Store
flutter build ios --release

# Create IPA for TestFlight
flutter build ipa --release
```

## 📚 Documentation

- [Architecture](../../docs/architecture/MOBILE_ARCHITECTURE.md)
- [API Documentation](../../docs/api/API.md)
- [Deployment Guide](../../docs/deployment/MOBILE_DEPLOYMENT.md)

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📄 License

Copyright © 2024 TILAWA. All rights reserved.

## 🆘 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/tilawa/tilawa/issues)
- Email: support@tilawa.app

## 👥 Team

Built with ❤️ by the TILAWA team

---

**Last Updated**: September 2024
**Version**: 1.0.0
