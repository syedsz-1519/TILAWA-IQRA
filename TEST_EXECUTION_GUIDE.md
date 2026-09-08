# TILAWA Test Execution Guide

Practical guide for running and validating tests for Tilawa features.

## Quick Test Run (10 minutes)

### Setup
```bash
# Terminal 1
cd backend
.\start.ps1

# Terminal 2
cd frontend
pnpm dev

# Open browser
http://localhost:3000
```

### Fast Testing
1. **Home Page (30 sec)**
   - Navigate to http://localhost:3000
   - Click a few navigation links
   - ✓ Verify no console errors

2. **Surah Browser (1 min)**
   - Click "Read" or go to /read
   - Scroll through list of 114 surahs
   - ✓ Verify all display correctly

3. **Arabic Text (1 min)**
   - Click Surah 1 (Al-Fatiha)
   - ✓ See Arabic text
   - ✓ See "Play & follow" button

4. **Language Dropdown (1 min)**
   - Dropdown visible
   - ✓ Select Urdu
   - ✓ See Urdu translation appears

5. **Reading Modes (1 min)**
   - Click "Arabic only" tab
   - ✓ Only Arabic displays
   - ✓ Click "Translation" tab
   - ✓ Arabic + English shows

6. **Audio (2 min)**
   - Click "Play & follow"
   - ✓ Audio plays (listen for first ayah)
   - ✓ Click "Stop"
   - ✓ Audio stops

7. **Navigation (1 min)**
   - Scroll to bottom
   - ✓ See Previous/Next surah links
   - ✓ Click Next
   - ✓ Goes to Surah 2

8. **Persistence (1 min)**
   - Select Urdu language
   - Reload page (F5)
   - ✓ Language still Urdu

**Total: ~10 minutes, 8 features tested**

---

## Detailed Testing Workflow

### 1. Testing Surah Browser

```bash
# Navigate to reading interface
http://localhost:3000/read
```

**Checklist:**
- [ ] Page loads quickly
- [ ] All 114 surahs visible
- [ ] Each shows: number, English name, Arabic name, ayah count
- [ ] Hover effects work (slight color change)
- [ ] Grid responsive on mobile (DevTools: F12 → Device toggle)
- [ ] Can click any surah to open

**Common Issues:**
- ❌ Surahs don't load → Check network tab (F12) for failed requests
- ❌ Arabic names garbled → Font loading issue (check console for font errors)
- ❌ Layout broken on mobile → CSS issue (check Tailwind compilation)

---

### 2. Testing Arabic Text Display

```bash
# Open specific surah
http://localhost:3000/read/2  # Al-Baqarah
```

**Checklist:**
- [ ] Arabic text displays clearly
- [ ] Text is right-to-left (reading from right to left)
- [ ] Verse numbers visible in circles at end of each verse
- [ ] Numbers are in Arabic-Indic digits (٧ ٨ ٩ not 7 8 9)
- [ ] For Surah 2: Bismillah visible at top
- [ ] For Surah 1 & 9: Bismillah NOT visible (correct)
- [ ] Line spacing comfortable for reading
- [ ] No character corruption or garbling

**Testing Script:**
```javascript
// Run in DevTools Console to check Arabic text
const arabicTexts = document.querySelectorAll('[lang="ar"]')
console.log(`Found ${arabicTexts.length} Arabic text elements`)
arabicTexts.forEach(el => console.log(el.textContent.substring(0, 50)))
```

---

### 3. Testing Language Selection

```bash
# On /read page in translation mode
http://localhost:3000/read/1
```

**Checklist:**
- [ ] Language dropdown visible
- [ ] Contains 18+ languages:
  - English, Urdu, Roman Urdu
  - Hindi, Bengali, Tamil, Telugu, etc.
  - French, Spanish, Turkish, Russian, Chinese
- [ ] Each language shows both English and native names:
  - "English — English"
  - "Urdu — اردو"
  - "Hindi — हिन्दी"
- [ ] Dropdown mobile-friendly (shows full text, not cut off)

**Testing Each Language:**

```bash
# Test Urdu
# 1. Click dropdown, select "Urdu"
# 2. Wait for content to load
# 3. Check translation appears
# 4. Verify it's not English

# Test Hindi
# Same process
# Verify uses Devanagari script

# Test Kanzul Imaan (Urdu)
# Same process
# Note: Should show different translation than standard Urdu
```

---

### 4. Testing Reading Modes

**Translation Mode (Default):**
```bash
http://localhost:3000/read/1
# Click "Translation" tab
```

- [ ] Arabic text on top
- [ ] English translation below each ayah
- [ ] Language dropdown active
- [ ] Urdu audio toggle visible (if Urdu selected)

**Arabic-Only Mode:**
```bash
# Same page, click "Arabic only" tab
```

- [ ] Only Arabic text displays
- [ ] Pure mushaf style (traditional Quran look)
- [ ] Language dropdown hidden (not needed)
- [ ] Urdu audio toggle hidden
- [ ] Verse numbers still visible

**Mode Persistence:**
```bash
# Select "Arabic only"
# Go to /read/2 (different surah)
# Go back to /read/1
# Check: Still in Arabic-only mode? YES ✓
```

---

### 5. Testing Audio Playback

**Setup:**
```bash
# Ensure speakers are ON (muted is ok for testing)
http://localhost:3000/read/1
```

**Play Button Test:**
```
1. Click "Play & follow" button
2. Button text changes to "Stop"
3. Listen (or watch network tab for audio requests)
4. First ayah plays
5. Verse 1 highlights
6. Page auto-scrolls to verse 1
7. After 1st ayah ends, 2nd ayah plays automatically
8. Continue for all 7 verses
9. Click "Stop"
10. Audio stops immediately
```

**Network Check (in DevTools):**
```
F12 → Network tab
Look for: everyayah.com/data/Yasser_Ad-Dussary_128kbps/00101.mp3, 001002.mp3, etc.
Expected: Audio files downloading, status 200 (success)
```

**Urdu Audio Test (if on Urdu translation):**
```
1. Ensure "Urdu audio on" toggle visible and ON
2. Click Play
3. For each ayah:
   - Arabic plays first
   - Then Urdu translation audio
   - Then advances to next
4. Toggle Urdu audio off
5. Re-click Play
6. Only Arabic plays (no Urdu)
7. Verify works for both Urdu and Roman Urdu
```

---

### 6. Testing Navigation

**Previous/Next at Bottom:**
```bash
http://localhost:3000/read/5  # Al-Ma'idah
```

**Checklist:**
- [ ] Previous button shows "Al-Nisa" (Surah 4)
- [ ] Next button shows "Al-An'am" (Surah 6)
- [ ] Click Previous → navigates to /read/4
- [ ] Click Next → navigates to /read/6
- [ ] Page smooth transition

**Boundary Testing:**
```bash
# On Surah 1 (Al-Fatiha)
http://localhost:3000/read/1
# Previous button: Should NOT be clickable or visible

# On Surah 114 (An-Nas)
http://localhost:3000/read/114
# Next button: Should NOT be clickable or visible
```

---

### 7. Testing Mobile Responsiveness

**Using Chrome DevTools:**
```
1. Open DevTools: F12
2. Click device toggle (top-left icon that looks like phone/tablet)
3. Select "iPhone 12" or "iPad"
```

**Mobile Checklist:**
- [ ] Page responsive on mobile width
- [ ] Language dropdown fits on screen
- [ ] Text readable without horizontal scroll
- [ ] Play button accessible
- [ ] Arabic text wraps correctly
- [ ] Verse numbers visible
- [ ] Dropdown shows full language names (not truncated)

**Touch Testing:**
```
1. On mobile device or emulator
2. Tap language dropdown
3. Select language with touch
4. Tap Play button
5. All touch interactions smooth
```

---

### 8. Testing Data Persistence

**Test 1: Language Preference**
```javascript
// Check localStorage
window.localStorage.getItem('tilawa-quran-lang')
// Should return: "en", "ur", "hi", etc.

// Test:
// 1. Select Urdu
// 2. Check localStorage shows "ur"
// 3. Reload page (F5)
// 4. Should still show Urdu
// 5. Go to /read/10
// 6. Should still show Urdu
```

**Test 2: Reading Mode**
```javascript
// Check localStorage
window.localStorage.getItem('tilawa-quran-mode')
// Should return: "translation" or "arabic"

// Test:
// 1. Select "Arabic only"
// 2. Check localStorage shows "arabic"
// 3. Reload page
// 4. Should still be "arabic"
// 5. Go to different surah
// 6. Should still be "arabic"
```

---

## Performance Testing

### Load Time Test

**Using Chrome DevTools:**
```
1. Open DevTools: F12
2. Go to Network tab
3. Hard reload: Ctrl+Shift+R
4. Check load time
```

**Expected:**
- Initial page load: < 3 seconds
- Surah content load: < 1 second
- Language switch: < 500ms

**Optimizations if slow:**
- Check for failed API requests (404/500 in Network tab)
- Verify CDN is responsive
- Check internet speed

### Memory Test

```
1. DevTools: F12 → Memory tab
2. Take heap snapshot (capture)
3. Go through 10 surahs
4. Take another snapshot
5. Compare: Should not significantly increase
```

---

## API Validation

### Check Arabic Text API

```bash
# In browser console:
fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmanihaf/1.json')
  .then(r => r.json())
  .then(d => console.log(d))

# Expected:
# {
#   "chapter": [
#     { "chapter": 1, "verse": 1, "text": "بسم الله..." },
#     ...
#   ]
# }
```

### Check Translation API (fawazahmed)

```bash
fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdullahyusufal/1.json')
  .then(r => r.json())
  .then(d => console.log(d))

# Expected: Same format as above
```

### Check Translation API (alquran.cloud)

```bash
fetch('https://api.alquran.cloud/v1/surah/1/ur.kanzuliman')
  .then(r => r.json())
  .then(d => console.log(d))

# Expected:
# {
#   "data": {
#     "number": 1,
#     "ayahs": [
#       { "numberInSurah": 1, "text": "بسم الله..." },
#       ...
#     ]
#   }
# }
```

### Check Audio URLs

```bash
# Test if audio URL is valid:
fetch('https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/001001.mp3')
  .then(r => console.log(r.status === 200 ? 'Audio exists' : 'Audio not found'))
```

---

## Test Failure Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Surahs don't load | API call failed | Check Network tab, verify CDN URL |
| Arabic text garbled | Font loading failed | Check console for font errors |
| Audio doesn't play | Audio URL wrong | Verify everyayah.com is accessible |
| Language won't change | API error | Check Network tab, see response errors |
| Dropdown cut off on mobile | CSS issue | Check Tailwind compilation |
| Mode doesn't persist | localStorage issue | Check if localStorage is enabled |
| Slow loading | Network latency | Check internet speed, API response times |

---

## Automated Testing (Future)

For automated testing (beyond manual), consider:

```bash
# E2E Testing with Playwright
npm install --save-dev @playwright/test

# Create test file: tests/quran-reading.spec.ts
# Test surah loading, language switching, audio, etc.
```

---

## Test Report Template

```markdown
# Test Execution Report

**Date:** _______________
**Tester:** _____________
**Browser:** ____________
**Device:** _____________

## Results Summary
- Total Tests: 43
- Passed: __
- Failed: __
- Partial: __

## Passed Tests
- [x] Feature 1
- [x] Feature 2

## Failed Tests
- [ ] Feature X (describe issue)

## Notes
_________________

## Screenshots
(Attach if documenting issues)
```

---

## Next Steps After Testing

1. ✅ Document any bugs found
2. ✅ Check console for errors
3. ✅ Test on multiple browsers
4. ✅ Test on mobile device
5. ✅ Report blocking issues
6. ✅ Mark tests as PASS/FAIL

---

**Happy testing!** 🧪
