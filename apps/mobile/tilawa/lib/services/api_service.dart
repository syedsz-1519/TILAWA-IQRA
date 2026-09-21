import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config/app_config.dart';

/// API Service for making HTTP requests
class ApiService {
  static final ApiService _instance = ApiService._internal();
  late Dio _dio;
  final _secureStorage = const FlutterSecureStorage();

  factory ApiService() {
    return _instance;
  }

  ApiService._internal() {
    _initializeDio();
  }

  /// Initialize Dio with interceptors
  void _initializeDio() {
    _dio = Dio(
      BaseOptions(
        baseUrl: AppConfig.apiBaseUrl,
        connectTimeout: Duration(seconds: int.parse(AppConfig.apiTimeout)),
        receiveTimeout: Duration(seconds: int.parse(AppConfig.apiTimeout)),
        sendTimeout: Duration(seconds: int.parse(AppConfig.apiTimeout)),
        contentType: Headers.jsonContentType,
        responseType: ResponseType.json,
      ),
    );

    // Add request interceptor for authentication
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await getToken();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (error, handler) async {
          if (error.response?.statusCode == 401) {
            // Handle token refresh or logout
            await clearToken();
          }
          return handler.next(error);
        },
      ),
    );

    // Add logging interceptor in development
    if (AppConfig.isDevelopment) {
      _dio.interceptors.add(LoggingInterceptor());
    }
  }

  /// GET request
  Future<Response<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final response = await _dio.get<T>(
        path,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// POST request
  Future<Response<T>> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final response = await _dio.post<T>(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// PUT request
  Future<Response<T>> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final response = await _dio.put<T>(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// PATCH request
  Future<Response<T>> patch<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
    ProgressCallback? onSendProgress,
    ProgressCallback? onReceiveProgress,
  }) async {
    try {
      final response = await _dio.patch<T>(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
        onSendProgress: onSendProgress,
        onReceiveProgress: onReceiveProgress,
      );
      return response;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// DELETE request
  Future<Response<T>> delete<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      final response = await _dio.delete<T>(
        path,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
      );
      return response;
    } on DioException catch (e) {
      throw _handleError(e);
    }
  }

  /// Save authentication token
  Future<void> saveToken(String token) async {
    await _secureStorage.write(key: 'auth_token', value: token);
  }

  /// Get authentication token
  Future<String?> getToken() async {
    return await _secureStorage.read(key: 'auth_token');
  }

  /// Clear authentication token
  Future<void> clearToken() async {
    await _secureStorage.delete(key: 'auth_token');
  }

  /// Handle API errors
  ApiException _handleError(DioException error) {
    switch (error.type) {
      case DioExceptionType.badResponse:
        return ApiException(
          message: error.response?.data['message'] ?? 'Server error',
          statusCode: error.response?.statusCode ?? 500,
          response: error.response?.data,
        );
      case DioExceptionType.connectionTimeout:
        return ApiException(
          message: 'Connection timeout',
          statusCode: -1,
        );
      case DioExceptionType.receiveTimeout:
        return ApiException(
          message: 'Receive timeout',
          statusCode: -1,
        );
      case DioExceptionType.sendTimeout:
        return ApiException(
          message: 'Send timeout',
          statusCode: -1,
        );
      case DioExceptionType.unknown:
        return ApiException(
          message: error.message ?? 'Unknown error',
          statusCode: -1,
        );
      default:
        return ApiException(
          message: 'An error occurred',
          statusCode: -1,
        );
    }
  }
}

/// Custom API Exception
class ApiException implements Exception {
  final String message;
  final int statusCode;
  final dynamic response;

  ApiException({
    required this.message,
    required this.statusCode,
    this.response,
  });

  @override
  String toString() => 'ApiException: $message (Status: $statusCode)';
}

/// Logging Interceptor for debugging
class LoggingInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    print('╔════════════════════════════════════╗');
    print('║          API REQUEST                ║');
    print('╠════════════════════════════════════╣');
    print('Method: ${options.method}');
    print('URL: ${options.uri}');
    print('Headers: ${options.headers}');
    if (options.data != null) {
      print('Data: ${options.data}');
    }
    print('╚════════════════════════════════════╝');
    handler.next(options);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    print('╔════════════════════════════════════╗');
    print('║          API RESPONSE               ║');
    print('╠════════════════════════════════════╣');
    print('Status Code: ${response.statusCode}');
    print('Response: ${response.data}');
    print('╚════════════════════════════════════╝');
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    print('╔════════════════════════════════════╗');
    print('║          API ERROR                  ║');
    print('╠════════════════════════════════════╣');
    print('Status Code: ${err.response?.statusCode}');
    print('Message: ${err.message}');
    print('Response: ${err.response?.data}');
    print('╚════════════════════════════════════╝');
    handler.next(err);
  }
}
