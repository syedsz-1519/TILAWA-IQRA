/// User Model
class User {
  final String id;
  final String email;
  final String name;
  final String? profileImage;
  final String preferredLanguage;
  final bool emailVerified;
  final DateTime createdAt;
  final DateTime updatedAt;

  User({
    required this.id,
    required this.email,
    required this.name,
    this.profileImage,
    this.preferredLanguage = 'en',
    this.emailVerified = false,
    required this.createdAt,
    required this.updatedAt,
  });

  /// Convert from JSON
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as String,
      email: json['email'] as String,
      name: json['name'] as String,
      profileImage: json['profileImage'] as String?,
      preferredLanguage: json['preferredLanguage'] as String? ?? 'en',
      emailVerified: json['emailVerified'] as bool? ?? false,
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(json['updatedAt'] as String),
    );
  }

  /// Convert to JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'profileImage': profileImage,
      'preferredLanguage': preferredLanguage,
      'emailVerified': emailVerified,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  /// Copy with updates
  User copyWith({
    String? id,
    String? email,
    String? name,
    String? profileImage,
    String? preferredLanguage,
    bool? emailVerified,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      name: name ?? this.name,
      profileImage: profileImage ?? this.profileImage,
      preferredLanguage: preferredLanguage ?? this.preferredLanguage,
      emailVerified: emailVerified ?? this.emailVerified,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  String toString() => 'User(id: $id, email: $email, name: $name)';
}

/// Auth Response Model
class AuthResponse {
  final String accessToken;
  final String refreshToken;
  final User user;

  AuthResponse({
    required this.accessToken,
    required this.refreshToken,
    required this.user,
  });

  factory AuthResponse.fromJson(Map<String, dynamic> json) {
    return AuthResponse(
      accessToken: json['accessToken'] as String,
      refreshToken: json['refreshToken'] as String,
      user: User.fromJson(json['user'] as Map<String, dynamic>),
    );
  }
}
