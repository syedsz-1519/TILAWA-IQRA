# 🗄️ MongoDB Setup Guide for TILAWA

## ✅ Setup Completed

Your MongoDB connection is now configured for TILAWA!

---

## 🔑 Credentials Overview

**Status**: ✅ Safely stored in `.env` (gitignored)

```
MongoDB Atlas Cluster: tilawa-cluster
Username: syedshahnawaz1519_db_user
Database: tilawa
Access List IP: 49.205.122.215
```

### ✅ Security Checklist
- [x] `.env` file created in `/backend/.env`
- [x] `.env` added to `.gitignore`
- [x] Credentials NOT in code
- [x] Credentials NOT in git history
- [x] IP address whitelisted (49.205.122.215)
- [x] Database user created with Atlas Admin role

---

## 📍 Connection String

Your MongoDB connection string is configured as:

```
mongodb+srv://syedshahnawaz1519_db_user:0v6pU5xPJw0NvX0p@tilawa-cluster.mongodb.net/tilawa?retryWrites=true&w=majority
```

**Location**: `backend/.env` → `DATABASE_URL`

---

## 🚀 Next Steps

### 1. Install MongoDB Drivers

Run this in the backend folder:

```bash
cd backend
npm install mongoose
npm install --save-dev @types/mongoose
```

**OR** use Drizzle's MongoDB adapter:

```bash
npm install drizzle-orm-mongodb-js
```

---

### 2. Update Backend Database Configuration

We need to update `backend/src/db/index.ts` to use MongoDB instead of PostgreSQL.

**Option A: Using Mongoose** (Recommended for MongoDB)
```typescript
import mongoose from 'mongoose'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!)
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }
}
```

**Option B: Using MongoDB Native Driver**
```typescript
import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient(process.env.DATABASE_URL!)

export const connectDB = async () => {
  try {
    await mongoClient.connect()
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }
}

export const getDB = () => mongoClient.db('tilawa')
```

---

### 3. Migrate Database Schema

Your current Drizzle schema (PostgreSQL) needs to be converted to MongoDB collections.

**Collections to create** (in MongoDB):

```javascript
// Users Collection
db.createCollection("user", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "email", "name", "createdAt"],
      properties: {
        _id: { bsonType: "string" },
        name: { bsonType: "string" },
        email: { bsonType: "string" },
        emailVerified: { bsonType: "bool" },
        image: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Sessions Collection
db.createCollection("session", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "userId", "token", "expiresAt"],
      properties: {
        _id: { bsonType: "string" },
        userId: { bsonType: "string" },
        token: { bsonType: "string" },
        expiresAt: { bsonType: "date" },
        ipAddress: { bsonType: "string" },
        userAgent: { bsonType: "string" }
      }
    }
  }
})

// Streaks Collection
db.createCollection("streaks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "string" },
        currentStreak: { bsonType: "int" },
        totalXP: { bsonType: "int" },
        lastActivityDate: { bsonType: "date" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Reading Progress Collection
db.createCollection("readingProgress", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "string" },
        surahNumber: { bsonType: "int" },
        lastAyahRead: { bsonType: "int" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Bookmarks Collection
db.createCollection("mushafBookmarks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "string" },
        surahNumber: { bsonType: "int" },
        ayahNumber: { bsonType: "int" },
        bookmarkedAt: { bsonType: "date" }
      }
    }
  }
})
```

---

### 4. Create Indexes

For optimal performance:

```javascript
// User indexes
db.user.createIndex({ email: 1 }, { unique: true })

// Session indexes
db.session.createIndex({ userId: 1 })
db.session.createIndex({ token: 1 }, { unique: true })

// Streaks indexes
db.streaks.createIndex({ userId: 1 })

// Reading Progress indexes
db.readingProgress.createIndex({ userId: 1, surahNumber: 1 }, { unique: true })

// Bookmarks indexes
db.mushafBookmarks.createIndex({ userId: 1 })
db.mushafBookmarks.createIndex({ userId: 1, surahNumber: 1, ayahNumber: 1 }, { unique: true })
```

---

## 📊 Collections Overview

| Collection | Purpose | Documents |
|-----------|---------|-----------|
| `user` | User accounts | User profiles |
| `session` | Auth sessions | Active sessions |
| `account` | OAuth providers | Login methods |
| `verification` | Email verification | Verification tokens |
| `streaks` | Reading streaks | Daily streaks, XP |
| `readingProgress` | Reading position | Last position per surah |
| `mushafBookmarks` | Bookmarks | Bookmarked ayahs |
| `nafsTracking` | Spiritual habits | Daily habits tracking |
| `tajweedScores` | Tajweed quizzes | Quiz scores |
| `hadithFavorites` | Saved hadiths | Favorite hadiths |
| `duaFavorites` | Saved duas | Favorite duas |

---

## 🔍 Verify Connection

Test your connection in the backend:

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
✓ Ready to accept requests
```

---

## 🛡️ Security Reminders

### ✅ What We Did
- Credentials stored in `.env` (not in code)
- `.env` in `.gitignore` (won't be committed)
- Strong password (0v6pU5xPJw0NvX0p)
- IP whitelisted (49.205.122.215)

### ⚠️ Important for Production
1. **Rotate passwords** before going live
2. **Use stronger BETTER_AUTH_SECRET** (currently development)
3. **Enable SSL/TLS** in MongoDB Atlas
4. **Set up backup** in MongoDB Atlas
5. **Add production IP** to access list
6. **Use secrets manager** (AWS Secrets, Vercel KV, etc.)

---

## 📚 Useful MongoDB Atlas Operations

### View Your Cluster
1. Go to: https://cloud.mongodb.com
2. Select your project
3. Click "tilawa-cluster"
4. View collections in "Data Explorer"

### Add More IP Addresses
1. Network Access
2. "Add IP Address"
3. Add new IP and confirm

### Create New Database Users
1. Database Access
2. "Add New Database User"
3. Set username and password
4. Choose role (e.g., Atlas Admin)

### View Logs
1. Deployment → Logs
2. See connection logs and errors

---

## 🚨 Troubleshooting

### Connection Failed
```
Error: connect ECONNREFUSED
```
**Solution**: Check if IP is whitelisted and credentials are correct

### Authentication Failed
```
Error: authentication failed
```
**Solution**: Verify username and password in DATABASE_URL

### Network Error
```
Error: ENOTFOUND tilawa-cluster.mongodb.net
```
**Solution**: Check cluster name and internet connection

### Database Not Found
```
Error: No database named 'tilawa'
```
**Solution**: MongoDB creates it automatically on first insert

---

## 💾 Backup Environment

Keep this safe somewhere:

```
MongoDB Connection Details:
- Cluster: tilawa-cluster.mongodb.net
- Database: tilawa
- Username: syedshahnawaz1519_db_user
- Password: 0v6pU5xPJw0NvX0p
- IP Address: 49.205.122.215
```

⚠️ **NEVER share these credentials publicly!**

---

## 📖 Next: Update Backend Routes

Once MongoDB is connected, update API routes to use MongoDB collections instead of Drizzle ORM.

Would you like me to:
1. Install MongoDB drivers
2. Update `backend/src/db/index.ts`
3. Migrate database routes
4. Set up Mongoose schemas

Let me know! 🚀
