import 'dart:io';
import 'package:flutter_dotenv/flutter_dotenv.dart';

enum AppEnvironment { development, staging, production }

class AppConfig {
  static late AppEnvironment environment;
  static late String apiBaseUrl;
  static late String apiTimeout;
  static late String appVersion;
  static late bool enableAnalytics;
  static late bool enableCrashlytics;

  static Future<void> initialize() async {
    // Load environment variables
    await dotenv.load(fileName: '.env');

    // Determine environment
    final envString = dotenv.env['APP_ENV'] ?? 'development';
    environment = AppEnvironment.values.firstWhere(
      (e) => e.name == envString,
      orElse: () => AppEnvironment.development,
    );

    // Set configuration based on environment
    switch (environment) {
      case AppEnvironment.development:
        apiBaseUrl = dotenv.env['API_URL_DEV'] ?? 'http://localhost:8000';
        apiTimeout = '30';
        enableAnalytics = false;
        enableCrashlytics = false;
        break;
      case AppEnvironment.staging:
        apiBaseUrl = dotenv.env['API_URL_STAGING'] ?? 'https://api-staging.tilawa.app';
        apiTimeout = '30';
        enableAnalytics = true;
        enableCrashlytics = true;
        break;
      case AppEnvironment.production:
        apiBaseUrl = dotenv.env['API_URL_PROD'] ?? 'https://api.tilawa.app';
        apiTimeout = '30';
        enableAnalytics = true;
        enableCrashlytics = true;
        break;
    }

    appVersion = dotenv.env['APP_VERSION'] ?? '1.0.0';
  }

  static bool get isDevelopment => environment == AppEnvironment.development;
  static bool get isStaging => environment == AppEnvironment.staging;
  static bool get isProduction => environment == AppEnvironment.production;
  static bool get isMobile => true;
  static bool get isWeb => false;

  static String get platformName => Platform.isAndroid ? 'Android' : 'iOS';
}
