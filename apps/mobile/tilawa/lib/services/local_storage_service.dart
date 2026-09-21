import 'package:hive_flutter/hive_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Service for managing local storage (Hive & SharedPreferences)
class LocalStorageService {
  static final LocalStorageService _instance = LocalStorageService._internal();

  factory LocalStorageService() {
    return _instance;
  }

  LocalStorageService._internal();

  late SharedPreferences _prefs;

  /// Initialize local storage
  Future<void> initialize() async {
    _prefs = await SharedPreferences.getInstance();
  }

  /// Save string value
  Future<bool> saveString(String key, String value) async {
    return await _prefs.setString(key, value);
  }

  /// Get string value
  String? getString(String key) {
    return _prefs.getString(key);
  }

  /// Save boolean value
  Future<bool> saveBool(String key, bool value) async {
    return await _prefs.setBool(key, value);
  }

  /// Get boolean value
  bool? getBool(String key) {
    return _prefs.getBool(key);
  }

  /// Save integer value
  Future<bool> saveInt(String key, int value) async {
    return await _prefs.setInt(key, value);
  }

  /// Get integer value
  int? getInt(String key) {
    return _prefs.getInt(key);
  }

  /// Remove value
  Future<bool> remove(String key) async {
    return await _prefs.remove(key);
  }

  /// Clear all data
  Future<bool> clear() async {
    return await _prefs.clear();
  }

  /// Check if key exists
  bool hasKey(String key) {
    return _prefs.containsKey(key);
  }
}
