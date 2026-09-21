# MongoDB Setup Guide for TILAWA Backend

## Installation

Mongoose has been installed with the following command:
```bash
npm install mongoose --legacy-peer-deps
```

The `--legacy-peer-deps` flag is used due to peer dependency conflicts with `better-auth` and `drizzle-kit`.

## Configuration

### Environment Variables

The `.env` file contains the MongoDB connection string:

```
MONGODB_URI=mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority
DATABASE_URL=mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority
```

**Note:** This file is in `.gitignore` and should NOT be committed to version control.

## Connection Implementation

### Database Connection File

The MongoDB connection is handled in two places:

1. **`src/db/index.ts`** - TypeScript version (primary)
   - ES module format
   - Includes connection pooling
   - Provides helper functions: `connectToDatabase()`, `disconnectDatabase()`, `isDbConnected()`

2. **`src/database/connect.js`** - ES module version (alternative)
   - Can be used if needed, but `src/db/index.ts` is recommended

### Connection Flow

```
src/index.ts (main server file)
  ↓
imports connectToDatabase from src/db/index.ts
  ↓
startServer() function calls connectToDatabase()
  ↓
Mongoose connects to MongoDB Atlas
```

## Starting the Server

### Development Mode
```bash
npm run dev
```

This uses `tsx` to run TypeScript directly with hot-reload support.

### Production Mode
```bash
npm run build
npm start
```

## Database Connection Troubleshooting

### Issue: Connection Timeout

**Symptoms:**
- Server hangs on "Connecting to MongoDB..."
- Connection times out after 5 seconds

**Solutions:**

1. **Check MongoDB IP Whitelist**
   - Go to MongoDB Atlas dashboard
   - Network Access → IP Whitelist
   - Add your current IP address
   - Or add `0.0.0.0/0` (NOT recommended for production)

2. **Check Firewall**
   - Ensure firewall allows outbound connections on port 27017
   - Test with: `ping cluster0.wxno2ll.mongodb.net`

3. **Verify Credentials**
   - Double-check username and password in MONGODB_URI
   - Ensure special characters are URL-encoded in the connection string

4. **Check Database Name**
   - Verify the database name is correct in the connection string
   - Should be: `tilawa`

### Issue: Authentication Failed

**Symptoms:**
- Error: "SASL authentication mechanism mismatch"
- Error: "Authentication failed"

**Solutions:**

1. **Reset MongoDB User Credentials**
   - Go to MongoDB Atlas → Database Access
   - Edit the user and reset password
   - Copy new connection string

2. **Check Username/Password**
   - Ensure no typos in MONGODB_URI
   - Verify password matches what's set in MongoDB Atlas

### Issue: Database Not Found

**Symptoms:**
- Error: "Database does not exist"
- Connection succeeds but operations fail

**Solutions:**

1. **Create the Database**
   - MongoDB auto-creates databases on first write
   - Insert a test document to trigger creation

2. **Verify Database Name**
   - In MONGODB_URI: `mongodb+srv://...@cluster.../tilawa?...`
   - The `tilawa` part is the database name

## Testing Connection

You can test the MongoDB connection by starting the server and checking the logs:

```
🔄 Initializing database connection...
🔄 Connecting to MongoDB...
✅ Successfully connected to MongoDB
📊 Database: tilawa
🔗 Host: cluster0.wxno2ll.mongodb.net
📊 Database: Connected
✅ Backend server running on port 8000
```

## Health Check Endpoint

Once the server is running, you can check the health and connection status:

```bash
curl http://localhost:8000/health
```

Response:
```json
{
  "status": "ok",
  "environment": "development",
  "database": "connected",
  "timestamp": "2026-09-21T11:00:00.000Z"
}
```

## Mongoose Features Enabled

- **Connection Pooling:** Automatic connection reuse
- **Retry Strategy:** Automatic reconnection on failure
- **Timeout Settings:**
  - Server Selection Timeout: 5 seconds
  - Socket Timeout: 45 seconds

## Next Steps

1. **Create Mongoose Schemas**
   - Define schemas in `src/models/` directory
   - Example: `src/models/User.ts`, `src/models/Product.ts`

2. **Integrate with Routes**
   - Replace mock implementations in route files
   - Use actual MongoDB queries

3. **Add Database Migrations**
   - Set up initial data seeding if needed
   - Create indexes for better query performance

## References

- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Connection Guide](https://docs.atlas.mongodb.com/driver-connection/)
- [MongoDB SASL Authentication](https://docs.mongodb.com/manual/core/security-sasl/)
