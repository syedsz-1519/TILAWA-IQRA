# 📁 How to Select Root Directory (./) in Vercel

## 🎯 Step-by-Step Guide

### **Step 1: On Vercel Import Page**

You should see a screen like this:

```
┌─────────────────────────────────────────────────┐
│  Configure Project                              │
├─────────────────────────────────────────────────┤
│                                                 │
│  Project Name: tilawa-iqra                      │
│                                                 │
│  ☐ Root Directory                               │
│    [Dropdown showing current selection]         │
│                                                 │
│  Install Command:                               │
│  npm install                                    │
│                                                 │
│  Build Command:                                 │
│  npm run build                                  │
│                                                 │
│  Output Directory:                              │
│  .next                                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### **Step 2: Click on Root Directory Dropdown**

Look for the field that says **"Root Directory"** with a dropdown arrow.

**Click on the dropdown arrow** ↓

---

### **Step 3: Select from Options**

After clicking, you'll see options:

```
[ ] Root Directory
  ↓ (dropdown opens)
  
  • ./
  • apps/web/frontend
  • apps/backend/server
  • apps/mobile/tilawa
```

**Select:** `./` (This is the root of your repository)

---

### **Step 4: Verify Settings**

After selecting `./`, your settings should look like:

```
Project Name: tilawa-iqra
Root Directory: ./
Install Command: npm install
Build Command: npm run build
Output Directory: .next
```

---

## 📸 **Visual Guide**

### **If you see this:**
```
Root Directory: [apps/web/frontend ▼]
```

**Click the dropdown ▼ and change to:**
```
Root Directory: [./ ▼]
```

---

## ✅ **Correct Values to Set:**

| Field | Value |
|-------|-------|
| **Project Name** | `tilawa-iqra` |
| **Root Directory** | `./` |
| **Install Command** | `npm install` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |

---

## 🎯 **After Setting Root Directory**

1. Make sure Root Directory is set to `./`
2. Click next/continue
3. Add all 6 environment variables
4. Click **Deploy**

---

## 🔍 **Why ./ (Current Root)?**

```
TILAWA-IQRA/              ← This is ./
├── package.json          ← Workspace file here
├── vercel.json           ← Vercel config here
├── frontend/             ← Symlink to apps/web/frontend
└── apps/
    ├── web/
    │   └── frontend/     ← Actual Next.js app
    ├── backend/
    └── mobile/
```

Setting `./` tells Vercel:
- Look at the root `package.json` ✅
- Use the root `vercel.json` ✅
- Build using workspace scripts ✅

---

## ⚠️ **Common Mistakes**

❌ **Don't select:**
- `apps/web/frontend` (this might not work with workspace setup)
- `frontend` (directory doesn't exist in root)
- `apps/backend` (this is the backend, not frontend)

✅ **Always select:**
- `./` (root directory)

---

## 📝 **If Root Directory is Grayed Out**

Sometimes Vercel auto-detects. If it shows:

```
Root Directory: [./] ← Auto-detected ✓
```

That's perfect! Leave it as is.

---

**Status:** Ready to Deploy ✅  
**Next:** Add environment variables and click Deploy!
