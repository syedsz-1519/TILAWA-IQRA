# MongoDB Integration Testing Guide

## Overview
This guide provides comprehensive testing steps for the MongoDB integration in the TILAWA backend. All routes have been updated to use actual MongoDB queries via Mongoose.

## Prerequisites
- MongoDB Atlas account with cluster running
- MONGODB_URI set in .env file
- Backend server running: `npm run dev`
- API testing tool: Postman, curl, or Thunder Client

## Server Status
Before testing endpoints, verify the server is running and connected to MongoDB:

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "ok",
  "environment": "development",
  "database": "connected",
  "timestamp": "2026-09-21T..."
}
```

---

## Product Endpoints Testing

### 1. Create Product
**Endpoint:** `POST /api/products`

```bash
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Quran with Translations",
    "description": "Complete Quran with English and Urdu translations",
    "price": 29.99,
    "category": "quran",
    "image": "https://example.com/quran.jpg"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Quran with Translations",
    "description": "Complete Quran with English and Urdu translations",
    "price": 29.99,
    "category": "quran",
    "image": "https://example.com/quran.jpg",
    "isActive": true,
    "createdAt": "2026-09-21T...",
    "updatedAt": "2026-09-21T..."
  }
}
```

### 2. Get All Products
**Endpoint:** `GET /api/products`

```bash
curl http://localhost:8000/api/products
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Quran with Translations",
      "price": 29.99,
      "category": "quran",
      "isActive": true,
      ...
    }
  ],
  "count": 1
}
```

### 3. Get Product by ID
**Endpoint:** `GET /api/products/:id`

```bash
curl http://localhost:8000/api/products/507f1f77bcf86cd799439011
```

### 4. Update Product
**Endpoint:** `PUT /api/products/:id`

```bash
curl -X PUT http://localhost:8000/api/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 39.99,
    "name": "Updated Quran Name"
  }'
```

### 5. Delete Product
**Endpoint:** `DELETE /api/products/:id`

```bash
curl -X DELETE http://localhost:8000/api/products/507f1f77bcf86cd799439011
```

### 6. Search Products
**Endpoint:** `GET /api/products/search?q=quran&category=quran`

```bash
curl "http://localhost:8000/api/products/search?q=quran"
```

---

## Bookmarks Endpoints Testing

### 1. Add Quran Bookmark
**Endpoint:** `POST /bookmarks/quran`

```bash
curl -X POST http://localhost:8000/bookmarks/quran \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "surahNumber": 1,
    "ayahNumber": 5
  }'
```

### 2. Get Quran Bookmarks
**Endpoint:** `GET /bookmarks/quran/:userId`

```bash
curl http://localhost:8000/bookmarks/quran/user123
```

### 3. Delete Quran Bookmark
**Endpoint:** `DELETE /bookmarks/quran/:userId/:surahNumber/:ayahNumber`

```bash
curl -X DELETE http://localhost:8000/bookmarks/quran/user123/1/5
```

### 4. Add Hadith Favorite
**Endpoint:** `POST /bookmarks/hadith`

```bash
curl -X POST http://localhost:8000/bookmarks/hadith \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "hadithId": "h-bukhari-001",
    "hadithText": "Faith cannot be complete...",
    "hadithSource": "Sahih Al-Bukhari"
  }'
```

### 5. Get Hadith Favorites
**Endpoint:** `GET /bookmarks/hadith/:userId`

```bash
curl http://localhost:8000/bookmarks/hadith/user123
```

### 6. Add Dua Favorite
**Endpoint:** `POST /bookmarks/dua`

```bash
curl -X POST http://localhost:8000/bookmarks/dua \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "duaId": "dua-001",
    "duaText": "Rabbana atina...",
    "duaTranslation": "Our Lord, give us...",
    "benefit": "For provision"
  }'
```

### 7. Add Story Bookmark
**Endpoint:** `POST /bookmarks/stories`

```bash
curl -X POST http://localhost:8000/bookmarks/stories \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "storyId": "story-prophet-001"
  }'
```

---

## Languages Endpoints Testing

### 1. Get All Supported Languages
**Endpoint:** `GET /api/languages`

```bash
curl http://localhost:8000/api/languages
```

### 2. Get User Language Settings
**Endpoint:** `GET /api/languages/:userId`

```bash
curl http://localhost:8000/api/languages/user123
```

### 3. Update User Language Settings
**Endpoint:** `POST /api/languages/:userId`

```bash
curl -X POST http://localhost:8000/api/languages/user123 \
  -H "Content-Type: application/json" \
  -d '{
    "preferredLanguage": "ur",
    "learningLanguages": ["ur", "en", "hi"],
    "transliterationStyle": "roman"
  }'
```

### 4. Get Language Progress
**Endpoint:** `GET /api/languages/:userId/progress/:language`

```bash
curl http://localhost:8000/api/languages/user123/progress/ur
```

---

## Reading Progress Endpoints Testing

The reading-progress module exports functions for use by other services:

```typescript
import { 
  getSurahProgress,
  getUserReadingProgress,
  updateReadingProgress,
  getSurahCompletionPercentage 
} from '../routes/reading-progress'

// Example usage in another route
const progress = await updateReadingProgress('user123', 1, 50, 286)
const completion = await getSurahCompletionPercentage('user123', 1, 286)
```

---

## Streaks & XP Endpoints Testing

The streaks module exports functions for integration:

```typescript
import { 
  getUserStreaks,
  updateUserXP,
  getAllStreaks 
} from '../routes/streaks'

// Example: Update user XP
const updated = await updateUserXP('user123', 100) // Add 100 XP

// Get user's streak info
const streakInfo = await getUserStreaks('user123')
```

---

## Nafs Tracking Endpoints Testing

```typescript
import { 
  getTodayNafsRecord,
  updateNafsRecord,
  getNafsHistory 
} from '../routes/nafs'

// Example: Update daily nafs tracking
await updateNafsRecord('user123', {
  fasting: true,
  prayer: true,
  quran: true,
  dua: false
}, 'Good day overall')

// Get today's record
const today = await getTodayNafsRecord('user123')

// Get last 30 days
const history = await getNafsHistory('user123', 30)
```

---

## Testing Checklist

### Product Management
- [ ] Create product successfully
- [ ] Retrieve all products (sorted by newest)
- [ ] Get specific product by ID
- [ ] Update product details
- [ ] Delete product
- [ ] Search products by name/category
- [ ] Verify category filtering works
- [ ] Verify inactive products not returned in list

### Bookmarks & Favorites
- [ ] Add Quran bookmark for specific surah/ayah
- [ ] Retrieve Quran bookmarks for user
- [ ] Prevent duplicate Quran bookmarks
- [ ] Delete Quran bookmark
- [ ] Add hadith favorite with text
- [ ] Retrieve hadith favorites
- [ ] Add dua favorite with translation
- [ ] Add story bookmark
- [ ] Verify each bookmark type is stored correctly

### Languages
- [ ] Get list of all supported languages
- [ ] Retrieve user's language preferences
- [ ] Update user language settings
- [ ] Get progress for specific language
- [ ] Verify language code validation

### Data Persistence
- [ ] Verify data persists after server restart
- [ ] Check that MongoDB indexes are working
- [ ] Verify unique constraints (no duplicate bookmarks)
- [ ] Check timestamp fields (createdAt, updatedAt)

---

## MongoDB Collections

The following collections will be created automatically:

```
Database: tilawa
├── users                  # User profiles and language preferences
├── products               # Quran, Hadith, Dua, Story products
├── bookmarks              # All types of bookmarks (quran, hadith, dua, story)
├── reading_progress       # Surah reading progress with completion %
├── streaks                # Daily streaks and XP tracking
├── nafs_tracking          # Daily habits and reflection
├── hifz_progress          # Spaced repetition progress (SM-2 algorithm)
├── languages              # Language-specific progress tracking
```

---

## Troubleshooting

### Connection Issues
If endpoints return "Failed to..." errors:

1. Check server is running:
   ```bash
   npm run dev
   ```

2. Verify MongoDB connection:
   ```bash
   curl http://localhost:8000/health
   ```

3. Check .env file has MONGODB_URI
4. Verify IP whitelist in MongoDB Atlas

### Validation Errors
If you get 400 status codes:

1. Check required fields are provided
2. Verify data types (price must be number, arrays must be arrays)
3. Check enum values for category field

### Duplicate Entry Errors
If getting "unique" constraint errors:

1. Bookmark unique constraint: userId + itemId
2. User email: must be unique
3. Streak: one per user (userId unique)
4. Language: one per user per language

---

## Example Complete Flow

```bash
# 1. Create user
# (User would normally be created via auth system)

# 2. Add a product
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Quran","description":"Test","price":29.99,"category":"quran"}'

# 3. Add bookmark
curl -X POST http://localhost:8000/bookmarks/quran \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","surahNumber":1,"ayahNumber":5}'

# 4. Get bookmarks
curl http://localhost:8000/bookmarks/quran/user123

# 5. Update reading progress
curl http://localhost:8000/api/languages/user123/progress/ur

# 6. Add hadith favorite
curl -X POST http://localhost:8000/bookmarks/hadith \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","hadithId":"h1","hadithText":"text","hadithSource":"source"}'
```

---

## Performance Monitoring

Monitor query performance using MongoDB Atlas:

1. Go to MongoDB Atlas dashboard
2. Navigate to Monitoring → Query Profiler
3. Check slow queries
4. Monitor collection sizes
5. Review index usage

Recommended indexes are already created in schemas.

---

## Next Steps

1. ✅ Models created and tested
2. ✅ Routes updated with actual MongoDB queries
3. ⏳ Create API documentation
4. ⏳ Add authentication middleware
5. ⏳ Add request validation middleware
6. ⏳ Add error handling middleware
7. ⏳ Set up logging
8. ⏳ Add rate limiting
9. ⏳ Deploy to production

---

**Last Updated:** September 21, 2026  
**MongoDB Version:** Latest (Mongoose 9.10.1)  
**Status:** ✅ Integration Complete
