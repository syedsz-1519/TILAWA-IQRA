import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';

/// Theme Mode Provider
final themeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.system);

class AppTheme {
  // Colors
  static const Color primaryColor = Color(0xFF2D5016); // Islamic Green
  static const Color secondaryColor = Color(0xFF7CB342);
  static const Color accentColor = Color(0xFFFFB74D); // Gold
  static const Color errorColor = Color(0xFFE53935);
  static const Color successColor = Color(0xFF43A047);
  static const Color warningColor = Color(0xFFFB8C00);
  static const Color infoColor = Color(0xFF1E88E5);

  // Light Theme Colors
  static const Color lightBackground = Color(0xFFFAF9F6);
  static const Color lightSurface = Color(0xFFFFFFFF);
  static const Color lightOnBackground = Color(0xFF1B1B1B);
  static const Color lightOnSurface = Color(0xFF2B2B2B);
  static const Color lightBorder = Color(0xFFE0E0E0);

  // Dark Theme Colors
  static const Color darkBackground = Color(0xFF0A0F0D);
  static const Color darkSurface = Color(0xFF1A1F1C);
  static const Color darkOnBackground = Color(0xFFF5F5F5);
  static const Color darkOnSurface = Color(0xFFE0E0E0);
  static const Color darkBorder = Color(0xFF2A3028);

  // Light Theme
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.light(
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: accentColor,
        error: errorColor,
        surface: lightSurface,
        onSurface: lightOnSurface,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        outline: lightBorder,
      ),
      scaffoldBackgroundColor: lightBackground,
      appBarTheme: AppBarTheme(
        backgroundColor: lightSurface,
        foregroundColor: lightOnBackground,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.geist(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: lightOnBackground,
        ),
      ),
      textTheme: _buildTextTheme(isDark: false),
      inputDecorationTheme: _buildInputDecorationTheme(isDark: false),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.geist(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primaryColor,
          side: const BorderSide(color: primaryColor),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.geist(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      cardTheme: CardTheme(
        color: lightSurface,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  // Dark Theme
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.dark(
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: accentColor,
        error: errorColor,
        surface: darkSurface,
        onSurface: darkOnSurface,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        outline: darkBorder,
      ),
      scaffoldBackgroundColor: darkBackground,
      appBarTheme: AppBarTheme(
        backgroundColor: darkSurface,
        foregroundColor: darkOnBackground,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.geist(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: darkOnBackground,
        ),
      ),
      textTheme: _buildTextTheme(isDark: true),
      inputDecorationTheme: _buildInputDecorationTheme(isDark: true),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.geist(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primaryColor,
          side: const BorderSide(color: primaryColor),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.geist(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      cardTheme: CardTheme(
        color: darkSurface,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  // Text Theme
  static TextTheme _buildTextTheme({required bool isDark}) {
    final textColor = isDark ? darkOnBackground : lightOnBackground;

    return TextTheme(
      displayLarge: GoogleFonts.geist(
        fontSize: 32,
        fontWeight: FontWeight.bold,
        color: textColor,
      ),
      displayMedium: GoogleFonts.geist(
        fontSize: 28,
        fontWeight: FontWeight.bold,
        color: textColor,
      ),
      displaySmall: GoogleFonts.geist(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: textColor,
      ),
      headlineLarge: GoogleFonts.geist(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: textColor,
      ),
      headlineMedium: GoogleFonts.geist(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: textColor,
      ),
      headlineSmall: GoogleFonts.geist(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: textColor,
      ),
      bodyLarge: GoogleFonts.geist(
        fontSize: 16,
        fontWeight: FontWeight.normal,
        color: textColor,
      ),
      bodyMedium: GoogleFonts.geist(
        fontSize: 14,
        fontWeight: FontWeight.normal,
        color: textColor,
      ),
      bodySmall: GoogleFonts.geist(
        fontSize: 12,
        fontWeight: FontWeight.normal,
        color: textColor,
      ),
      labelLarge: GoogleFonts.geist(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: textColor,
      ),
      labelMedium: GoogleFonts.geist(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        color: textColor,
      ),
      labelSmall: GoogleFonts.geist(
        fontSize: 11,
        fontWeight: FontWeight.w500,
        color: textColor,
      ),
    );
  }

  // Input Decoration Theme
  static InputDecorationTheme _buildInputDecorationTheme({required bool isDark}) {
    final borderColor = isDark ? darkBorder : lightBorder;
    final hintColor = isDark ? darkOnSurface.withOpacity(0.6) : lightOnBackground.withOpacity(0.6);

    return InputDecorationTheme(
      filled: true,
      fillColor: isDark ? darkSurface : lightSurface,
      hintStyle: TextStyle(color: hintColor),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: borderColor),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: borderColor),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: primaryColor, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: errorColor),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    );
  }
}
