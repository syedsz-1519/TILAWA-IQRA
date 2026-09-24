# Environment Variables - Quick Reference Card

## 🚀 Copy-Paste Ready Values

### **Vercel Frontend - Add These 5**

```
Key: NEXT_PUBLIC_QURAN_API
Value: https://api.quran.com/api/v4
Environments: ✓ Production ✓ Preview ✓ Development
```

```
Key: NEXTAUTH_SECRET
Value: [GENERATE USING COMMAND BELOW]
Environments: ✓ Production ✓ Preview ✓ Development
```

```
Key: NEXTAUTH_URL
Value: https://tilawa-iqra.vercel.app
Environments: ✓ Production ✓ Preview ✓ Development
```

```
Key: NEXT_PUBLIC_API_URL
Value: https://tilawa-backend-prod-xyz.up.railway.app
[REPLACE xyz WITH YOUR RAILWAY URL]
Environments: ✓ Production ✓ Preview ✓ Development
```

```
Key: NEXT_PUBLIC_BETTER_AUTH_URL
Value: https://tilawa-iqra.vercel.app
Environments: ✓ Production ✓ Preview ✓ Development
```

---

### **Railway Backend - Add These 6**

```
Key: MONGODB_URI
Value: mongodb+srv://syedshahnawaz_db:wzf1BGHGqvI4PrYR@cluster0.wxno2ll.mongodb.net/tilawa?retryWrites=true&w=majority
```

```
Key: BETTER_AUTH_SECRET
Value: [SAME AS VERCEL NEXTAUTH_SECRET]
```

```
Key: NODE_ENV
Value: production
```

```
Key: PORT
Value: 8000
```

```
Key: FRONTEND_URL
Value: https://tilawa-iqra.vercel.app
```

```
Key: LOG_LEVEL
Value: info
```

---

## 🔐 Generate NEXTAUTH_SECRET

**Windows PowerShell:**
```powershell
$bytes = [byte[]]::new(32)
[Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes($bytes)
[Convert]::ToHexString($bytes).ToLower()
```

**Mac/Linux:**
```bash
openssl rand -hex 32
```

**Online:**
https://generate-secret.vercel.app/32

---

## ✅ Checklist

**Vercel Frontend:**
- [ ] NEXT_PUBLIC_QURAN_API = https://api.quran.com/api/v4
- [ ] NEXTAUTH_SECRET = [generated]
- [ ] NEXTAUTH_URL = https://tilawa-iqra.vercel.app
- [ ] NEXT_PUBLIC_API_URL = [railway-url]
- [ ] NEXT_PUBLIC_BETTER_AUTH_URL = https://tilawa-iqra.vercel.app

**Railway Backend:**
- [ ] MONGODB_URI = [connection string]
- [ ] BETTER_AUTH_SECRET = [SAME as frontend]
- [ ] NODE_ENV = production
- [ ] PORT = 8000
- [ ] FRONTEND_URL = https://tilawa-iqra.vercel.app
- [ ] LOG_LEVEL = info

---

## 🔗 Links

- **Vercel:** https://vercel.com/dashboard
- **Railway:** https://railway.app
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Full Guide:** See `ENVIRONMENT_VARIABLES_GUIDE.md`

---

**CRITICAL:** BETTER_AUTH_SECRET must be IDENTICAL on frontend and backend!
