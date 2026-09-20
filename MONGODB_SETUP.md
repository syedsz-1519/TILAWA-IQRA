# MongoDB Atlas Setup for TILAWA

## Connection Details

### Cluster Information
- **Cluster Name**: tilawa-cluster
- **Database Name**: tilawa_dev
- **Database User**: syedshahnawaz1519_db_user
- **IP Whitelist**: 49.205.120.169 (added to Network Access)
- **User Role**: Atlas Admin

## Connection String Format

```
mongodb+srv://username:password@tilawa-cluster.mongodb.net/tilawa_dev?retryWrites=true&w=majority
```

## Security Notes

⚠️ **IMPORTANT**: The database credentials are stored in `.env` which is gitignored and should never be committed.

### IP Whitelist
Your current IP address (49.205.120.169) has been added to the Network Access list.

To add more IPs later:
1. Go to MongoDB Atlas Dashboard
2. Navigate to Network Access (Security section)
3. Add IP addresses as needed

### User Management
The database user `syedshahnawaz1519_db_user` was created with Atlas Admin role.

To manage users later:
1. Go to MongoDB Atlas Dashboard
2. Navigate to Database Access (Security section)
3. Add/modify users as needed

## Database Schema

TILAWA uses the following MongoDB collections:

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  organization: ObjectId,
  preferredLanguage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Reading Progress Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  surahNumber: Number,
  lastAyahRead: Number,
  readingTime: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Hifz Progress Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  cardId: String,
  deckId: String,
  status: String, // 'new', 'learning', 'review', 'mastered'
  attempts: Number,
  correctAttempts: Number,
  interval: Number,
  easeFactor: Number,
  nextReviewDate: Date,
  lastReviewed: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookmarks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  surahNumber: Number,
  ayahNumber: Number,
  type: String, // 'quran', 'hadith', 'dua', 'story'
  createdAt: Date,
  updatedAt: Date
}
```

### Streaks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  currentStreak: Number,
  longestStreak: Number,
  totalXP: Number,
  level: Number,
  lastActivityDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Backup Strategy

### Automated Backups
MongoDB Atlas provides automated backups:
- Daily snapshots (available for 30 days)
- Continuous backups available in paid tiers

### Manual Backups
To manually backup:
```bash
mongodump --uri "mongodb+srv://username:password@tilawa-cluster.mongodb.net/tilawa_dev" --out ./backup
```

### Restore from Backup
```bash
mongorestore --uri "mongodb+srv://username:password@tilawa-cluster.mongodb.net/tilawa_dev" ./backup
```

## Database Administration

### Connect via MongoDB Shell
```bash
mongosh "mongodb+srv://syedshahnawaz1519_db_user:PASSWORD@tilawa-cluster.mongodb.net/tilawa_dev"
```

### Common Operations

#### Check Database Stats
```javascript
db.stats()
```

#### List Collections
```javascript
db.getCollectionNames()
```

#### View Collection Stats
```javascript
db.collection_name.stats()
```

#### Create Index
```javascript
db.collection_name.createIndex({ "field": 1 })
```

## Monitoring

### Performance Metrics
Monitor in MongoDB Atlas Dashboard:
- Query Performance
- Connection Count
- Storage Usage
- Operation Latency

### Alerts
Set up alerts for:
- High CPU usage
- High memory usage
- Slow queries
- Disk space warnings

## Troubleshooting

### Connection Issues
1. Verify IP is whitelisted in Network Access
2. Check credentials in .env file
3. Ensure `retryWrites=true` is in connection string
4. Try connecting with mongosh first

### Performance Issues
1. Check Slow Query Log in Atlas
2. Add indexes to frequently queried fields
3. Monitor storage usage
4. Review query patterns

### Data Issues
1. Enable Data Validation
2. Use Schema Validation in MongoDB
3. Regular backups before major changes
4. Test queries in Atlas Query editor first

## Next Steps

1. ✅ Connection string configured
2. ✅ IP whitelisted
3. ✅ Database user created
4. Next: Initialize collections and indexes
5. Next: Configure backend to use MongoDB
6. Next: Add data validation and indexing

## Useful Links

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Driver for Node.js](https://www.mongodb.com/docs/drivers/node/)
- [MongoDB Query Language](https://docs.mongodb.com/manual/reference/operator/aggregation/)
- [Best Practices](https://docs.mongodb.com/manual/administration/best-practices/)

---

**Configured Date**: 2024-09-20  
**Organization ID**: 69ef787a0289ded543af1abd  
**Status**: ✅ Ready for Integration
