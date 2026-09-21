# TILAWA Architecture

## System Overview

TILAWA is a full-stack, multilingual Islamic learning platform built with modern technologies. This document describes the high-level architecture, design patterns, and technology choices.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Presentation Layer                    │
├──────────────────────┬──────────────────┬──────────────────┤
│   Web (Next.js)      │  Mobile (Flutter)│  Desktop (TBD)   │
│   - React 19         │  - Flutter 3.13  │                  │
│   - TypeScript       │  - Dart 3.0      │                  │
│   - Tailwind CSS     │  - Riverpod      │                  │
└──────────┬───────────┴────────┬─────────┴──────────────────┘
           │                    │
           └────────┬───────────┘
                    │
        ┌───────────▼────────────┐
        │  API Gateway / Load    │
        │  Balancer              │
        │  (Cloudflare)          │
        └───────────┬────────────┘
                    │
    ┌───────────────┴───────────────┐
    │    Application Layer          │
    │   (Express.js / Node.js)      │
    │                               │
    │  ├─ Auth Service             │
    │  ├─ Quran Service            │
    │  ├─ Hadith Service           │
    │  ├─ Dua Service              │
    │  ├─ User Service             │
    │  └─ Analytics Service        │
    └───────────────┬───────────────┘
                    │
        ┌───────────▼────────────┐
        │   Data Access Layer    │
        │   (Drizzle ORM)        │
        └───────────┬────────────┘
                    │
    ┌───────────────┴───────────────────┐
    │      Data Layer                   │
    │                                   │
    ├─ MongoDB (Primary)               │
    ├─ Redis (Cache)                   │
    ├─ Elasticsearch (Search)          │
    └─ S3 (Audio/Media Storage)        │
```

## Layered Architecture

### 1. Presentation Layer

#### Web Frontend (Next.js)
- **Framework**: Next.js 16.2.6 with React 19
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + Context API
- **Build**: Turbopack
- **Features**: SSR, ISR, API routes

#### Mobile Frontend (Flutter)
- **Framework**: Flutter 3.13.0+
- **Language**: Dart 3.0+
- **State Management**: Riverpod
- **Navigation**: Go Router
- **UI**: Material Design 3
- **Storage**: Hive + SQLite

### 2. API Gateway

- **Load Balancer**: Cloudflare
- **Features**:
  - Rate limiting
  - DDoS protection
  - Caching
  - SSL/TLS termination
  - Geographic routing

### 3. Application Layer

Built with **Express.js** on **Node.js 18+**

#### Services

```
┌────────────────────────────────┐
│    Business Logic Layer        │
├────────────────────────────────┤
│ AuthService                    │
│ ├─ register()                  │
│ ├─ login()                     │
│ ├─ refreshToken()              │
│ └─ logout()                    │
├────────────────────────────────┤
│ QuranService                   │
│ ├─ getSurahs()                 │
│ ├─ getSurah()                  │
│ ├─ searchAyahs()               │
│ └─ getTranslations()           │
├────────────────────────────────┤
│ HadithService                  │
│ ├─ getCollections()            │
│ ├─ getHadiths()                │
│ └─ search()                    │
├────────────────────────────────┤
│ UserService                    │
│ ├─ getProfile()                │
│ ├─ updateProfile()             │
│ └─ getProgress()               │
└────────────────────────────────┘
```

#### Middleware Stack

1. **Error Handler** - Centralized error handling
2. **Logger** - Request/response logging
3. **CORS** - Cross-origin resource sharing
4. **Rate Limiter** - DDoS protection
5. **Authentication** - JWT validation
6. **Validation** - Input validation
7. **Cache** - Response caching

### 4. Data Access Layer

**Drizzle ORM** for type-safe database operations

```typescript
// Example: Type-safe queries
const users = await db
  .select()
  .from(usersTable)
  .where(eq(usersTable.email, email));
```

### 5. Data Layer

#### Primary Database: MongoDB Atlas
- **Connection**: Connection pooling
- **Collections**:
  - `users` - User profiles & settings
  - `surahs` - Quranic data
  - `ayahs` - Verses with translations
  - `hadith_collections` - Hadith sources
  - `hadiths` - Individual hadith records
  - `duas` - Islamic prayers
  - `user_progress` - Learning progress
  - `bookmarks` - User bookmarks

#### Caching: Redis
- **Purpose**: Session storage, caching, rate limiting
- **TTL**: 24 hours for sessions
- **Pattern**: Cache-aside

#### Search: Elasticsearch
- **Purpose**: Full-text search across Quran, Hadith, Duas
- **Indexing**: Real-time
- **Features**: Fuzzy matching, stemming

#### File Storage: AWS S3
- **Purpose**: Audio files, images
- **Organization**:
  - `/quran/audio/{reciter_id}/{surah_number}/`
  - `/hadith/images/`
  - `/user/avatars/`

## Design Patterns

### 1. Repository Pattern
- Abstracts data access logic
- Enables dependency injection
- Facilitates testing

```dart
class QuranRepository {
  final ApiService apiService;
  
  Future<List<Surah>> getAllSurahs() async {
    // Data access logic
  }
}
```

### 2. Provider Pattern (Riverpod)
- Reactive state management
- Type-safe dependency injection
- Automatic caching

```dart
final surahProvider = FutureProvider.family<Surah, int>(
  (ref, surahNumber) async {
    final repo = ref.watch(quranRepositoryProvider);
    return repo.getSurah(surahNumber);
  },
);
```

### 3. Service Locator Pattern
- Single point of service instantiation
- Loose coupling between components

### 4. Middleware Pattern
- Express.js middleware stack
- Concerns separation

### 5. Adapter Pattern
- Adapts API responses to internal models
- Enables API versioning

## Authentication Flow

```
┌─────────┐
│  Client │
└────┬────┘
     │ 1. POST /auth/login
     │    { email, password }
     ▼
┌─────────────────────┐
│  Auth Middleware    │
│ - Validate input    │
│ - Hash password     │
└────┬────────────────┘
     │ 2. Query user
     ▼
┌──────────────┐
│   MongoDB    │
└────┬─────────┘
     │ 3. User found
     ▼
┌──────────────────────┐
│ Generate JWT Token   │
│ - Access Token (15m) │
│ - Refresh Token (7d) │
└────┬─────────────────┘
     │ 4. Return tokens
     ▼
┌──────────┐
│  Client  │ Stores token in secure storage
└──────────┘
```

## Caching Strategy

### Cache Layers

1. **HTTP Caching** (Browser/CDN)
   - Static assets: 1 year
   - API responses: 5 minutes

2. **Redis Cache** (Application)
   - User sessions: 24 hours
   - Surah data: 30 days
   - User progress: Real-time

3. **Local Storage** (Mobile)
   - Downloaded Surahs: Indefinite
   - User settings: Indefinite
   - Bookmarks: Indefinite

### Cache Invalidation

```
Event          → Invalidate             → Recompute
User updates   → user:* + user_progress → GET /user
Surah updates  → surah:* + search       → GET /quran
Bookmark added → bookmarks:{user_id}    → GET /bookmarks
```

## Security Architecture

### 1. Authentication
- **JWT** with RS256 algorithm
- **Refresh tokens** stored in HttpOnly cookies
- **Password**: Bcrypt hashing (12 rounds)

### 2. Authorization
- Role-based access control (RBAC)
- Resource-level permissions
- Scope validation

### 3. Data Protection
- **TLS 1.3** for all communications
- **AES-256** for sensitive data
- **HTTPS** enforced

### 4. API Security
- Rate limiting: 100 req/min per IP
- CORS: Whitelist allowed origins
- CSRF protection: SameSite cookies
- Input validation: JSON schema
- Output encoding: HTML escaping

## Scalability

### Horizontal Scaling
```
┌──────────┐
│ Load     │
│ Balancer │
└────┬─────┘
     ├─ Instance 1
     ├─ Instance 2
     ├─ Instance 3
     └─ Instance N
     
All share:
- MongoDB (managed)
- Redis (managed)
- S3 (managed)
```

### Performance Optimization
- **Database**: Connection pooling, query optimization
- **Caching**: Multi-layer caching strategy
- **CDN**: Cloudflare for static assets
- **Compression**: gzip for responses
- **Image optimization**: Webp format, lazy loading

## Deployment Architecture

### Development
```
localhost:3000 (Web)
localhost:8000 (API)
localhost:5432 (Database)
```

### Staging
```
Vercel (Preview)
Railway (API)
MongoDB Atlas (Staging DB)
```

### Production
```
Vercel (Web)
Railway (API)
MongoDB Atlas (Production DB)
CloudFlare (CDN)
```

## Monitoring & Logging

### Application Monitoring
- **Performance**: New Relic / Datadog
- **Errors**: Sentry
- **Uptime**: UptimeRobot

### Logging
- **Level**: DEBUG, INFO, WARN, ERROR
- **Format**: JSON for structured logging
- **Storage**: CloudWatch / ELK Stack
- **Retention**: 30 days

### Metrics
- Request latency (p50, p95, p99)
- Error rate (%)
- Database query time
- Cache hit ratio

## Future Improvements

1. **API Versioning**: v1, v2 support
2. **GraphQL**: GraphQL API alongside REST
3. **WebSockets**: Real-time features
4. **Microservices**: Service separation
5. **Event Streaming**: Kafka/RabbitMQ
6. **Machine Learning**: Recommendations
7. **Progressive Web App**: Offline support

---

**Last Updated**: September 2024
**Version**: 1.0.0
