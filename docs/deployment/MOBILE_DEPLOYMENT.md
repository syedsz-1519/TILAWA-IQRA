# Mobile App Deployment Guide

Complete guide for deploying TILAWA mobile app to iOS App Store and Google Play Store.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [iOS Deployment](#ios-deployment)
3. [Android Deployment](#android-deployment)
4. [Version Management](#version-management)
5. [Testing](#testing)

## Prerequisites

### General
- Flutter SDK 3.13.0+
- Git
- TILAWA codebase cloned locally

### iOS
- macOS 12+
- Xcode 14+
- Apple Developer Account ($99/year)
- iPhone/iPad for testing

### Android
- Android Studio 4.1+
- JDK 8+
- Google Play Developer Account ($25 one-time)
- Android device or emulator

## iOS Deployment

### Step 1: Prepare iOS Project

```bash
cd apps/mobile/tilawa

# Clean previous builds
flutter clean

# Get dependencies
flutter pub get

# Update iOS pods
cd ios
pod deintegrate
pod install
cd ..
```

### Step 2: Configure Signing

```bash
# Open Xcode
open ios/Runner.xcworkspace

# Select Runner project
# Target: Runner
# Signing & Capabilities tab
# Team: [Your Apple Developer Team]
# Bundle Identifier: com.tilawa.app
```

### Step 3: Set Version

**In Xcode**:
1. Select Runner target
2. Build Settings
3. Set: `MARKETING_VERSION = 1.0.0`
4. Set: `CURRENT_PROJECT_VERSION = 1`

**Or via pubspec.yaml**:
```yaml
version: 1.0.0+1
```

### Step 4: Build for Release

```bash
flutter build ios --release

# Output: build/ios/iphoneos/Runner.app
```

### Step 5: Create Archive

```bash
# In Xcode
Product → Scheme → Select "Runner"
Product → Build For → Profiling
Product → Archive

# Xcode window shows archive progress
# Wait for "Archive successful"
```

### Step 6: Submit to App Store Connect

```bash
# In Xcode
Window → Organizer
Select archive
"Distribute App"
Select "App Store Connect"
Select "Upload"

# Enter sign-in credentials
# Select team
# Upload to App Store
```

### Step 7: Configure App Store Listing

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Select TILAWA app
3. Configure:

**Metadata**:
```
App Name: TILAWA
Subtitle: Quranic Learning Platform
Description: Master the Quran with AI-powered guidance...
Keywords: quran, islamic, learning, tajweed
Category: Education
Content Rating: 4+
Privacy Policy: https://tilawa.app/privacy
```

**Pricing**:
- Free with optional in-app purchases

**Screenshots**:
- 6-7 screenshots for each device
- Size: 1170x2532 pixels
- Show key features

**Release Notes**:
```
Version 1.0.0

- Initial launch
- Complete Quran with 15+ translations
- Multiple high-quality reciters
- Tajweed rules & explanations
- Hadith library
- Islamic Duas
- Memorization system
- Progress tracking
- Offline support
- Dark mode
- 15+ language support
```

### Step 8: Submit for Review

1. App Store Connect → TILAWA → Prepare for Submission
2. Build: Select the uploaded build
3. App Review Information:
   - Demo account: demo@tilawa.app / password
   - Contact info: support@tilawa.app
   - Notes: "App is for Islamic learning..."
4. Version Release: Manual Release
5. Submit for Review

### Step 9: Monitor Review

- Apple reviews within 24-48 hours
- Check for rejections: [Common Rejections](https://developer.apple.com/app-store/review/guidelines/)
- Fix and resubmit if needed

---

## Android Deployment

### Step 1: Prepare Android Project

```bash
cd apps/mobile/tilawa

# Clean previous builds
flutter clean

# Get dependencies
flutter pub get
```

### Step 2: Create Keystore

```bash
# Generate keystore (one-time)
keytool -genkey -v -keystore ~/tilawa_keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias tilawa_key \
  -keypass tilawa@123 \
  -storepass tilawa@123

# Output: ~/tilawa_keystore.jks
```

### Step 3: Configure Signing

**File: android/local.properties**:
```properties
flutter.sdk=/path/to/flutter
flutter.versionName=1.0.0
flutter.versionCode=1
storeFile=/Users/username/tilawa_keystore.jks
storePassword=tilawa@123
keyAlias=tilawa_key
keyPassword=tilawa@123
```

**File: android/app/build.gradle**:
```gradle
android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### Step 4: Set Version

**File: android/app/build.gradle**:
```gradle
android {
    defaultConfig {
        versionCode 1
        versionName "1.0.0"
    }
}
```

### Step 5: Build App Bundle (AAB)

```bash
flutter build appbundle --release

# Output: build/app/outputs/bundle/release/app-release.aab
# Size: ~40-50 MB
```

### Step 6: Create Play Console Account

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. App name: TILAWA
4. Category: Education
5. Accept content rating

### Step 7: Configure Store Listing

**App Details**:
```
App name: TILAWA
Short description: Master the Quran with AI guidance
Full description: Complete multilingual Islamic learning platform
  - Complete Quran with 15+ translations
  - Multiple high-quality audio reciters
  - Authentic hadith collections
  - Islamic Duas library
  - Spaced-repetition memorization system
  - Detailed progress tracking
  - Works offline
  - Dark mode
  - 15+ language support

Ratings: Suitable for all ages
```

**Graphics Assets**:
- App icon (512x512)
- Screenshots (4-8 minimum):
  - 1080x1920 pixels
  - Show: Quran reading, Audio, Hadith, Progress
- Feature graphic (1024x500)
- Video preview (optional)

**Store Listing**:
- Homepage image
- Category: Education
- Content rating: PEGI 3

### Step 8: Set Up Pricing

- Select free distribution
- Optional: In-app purchases for premium features

### Step 9: Upload Build

1. Go to Release → Production
2. Click "Create new release"
3. Upload AAB file
4. Release notes:
   ```
   Version 1.0.0 - Initial Release
   
   - Complete Quran with translations
   - High-quality audio recitation
   - Hadith library
   - Islamic Duas
   - Memorization system
   - Progress tracking
   - Offline support
   - 15+ languages
   ```
5. Review and publish

### Step 10: Submit for Review

1. Content Rating: Complete questionnaire
2. Target Content: Select appropriate ages
3. Permissions: Review requested permissions
4. Policy: Accept store policies
5. Submit for Review

### Step 11: Monitor Review

- Google typically reviews within 2-4 hours
- Check app dashboard for approval/rejection
- Fix issues if rejected, resubmit

---

## Version Management

### Versioning Scheme

```
Version: MAJOR.MINOR.PATCH+BUILD
Example: 1.0.0+1

MAJOR: Major features, breaking changes
MINOR: New features, backward compatible
PATCH: Bug fixes, patches
BUILD: Build number (increments with each release)
```

### Release Process

**Step 1**: Update version in `pubspec.yaml`
```yaml
version: 1.1.0+2
```

**Step 2**: Update in code
```bash
# iOS: flutter build ios --release
# Android: flutter build appbundle --release
```

**Step 3**: Tag git commit
```bash
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
```

**Step 4**: Create GitHub Release
```bash
# GitHub → Releases → New Release
# Tag: v1.1.0
# Title: TILAWA 1.1.0
# Description: [Release notes]
# Attach: app-release.aab, app.ipa
```

---

## Testing

### Pre-Release Testing

```bash
# 1. Unit tests
flutter test

# 2. Widget tests
flutter test test/widget/

# 3. Integration tests
flutter drive --target=test_driver/app.dart

# 4. Manual testing
# - All screens
# - Audio playback
# - Offline mode
# - Dark mode
# - All 15 languages
# - Different device sizes
```

### Beta Testing

**iOS TestFlight**:
```bash
# 1. Upload build to TestFlight
# 2. Add beta testers: test@example.com
# 3. Send invite link
# 4. Collect feedback
# 5. Fix issues
# 6. Promote to production
```

**Android Play Testing**:
```bash
# 1. Create internal test track
# 2. Upload AAB
# 3. Add testers
# 4. Share test link
# 5. Collect feedback
# 6. Promote to production
```

### Performance Testing

```bash
# Profile app
flutter run --profile

# Check metrics:
# - Frame rate (60 FPS target)
# - Memory usage
# - CPU usage
# - Battery drain
```

---

## Troubleshooting

### iOS Issues

**Code Signing Error**:
```bash
# Update pods
cd ios
pod deintegrate
pod install
cd ..

# Clear build cache
flutter clean
```

**Build Failed**:
```bash
# Check Xcode logs
# Open ios/Runner.xcworkspace in Xcode
# Fix any compilation errors
```

### Android Issues

**Keystore Issues**:
```bash
# List keystore contents
keytool -list -v -keystore ~/tilawa_keystore.jks

# Reset keystore password
keytool -storepasswd -new newpassword \
  -keystore ~/tilawa_keystore.jks
```

**Build Failed**:
```bash
# Clean gradle cache
./gradlew clean

# Try build again
flutter build appbundle --release
```

---

## Post-Release

### Monitor App Performance

- **Crashes**: Monitor crash reports
- **Reviews**: Respond to user reviews
- **Analytics**: Track DAU, retention, engagement
- **Feedback**: Collect user suggestions

### Update Strategy

- Maintenance releases: Monthly
- Feature releases: Quarterly
- Major releases: Annually

---

**Last Updated**: September 2024
**Version**: 1.0.0
