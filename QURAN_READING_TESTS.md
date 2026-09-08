# TILAWA Quran Reading Functionality Tests

Comprehensive test suite for core Quran reading features.

## Test Environment Setup

```bash
# Terminal 1: Start Backend
cd backend
.\start.ps1  # Windows or bash start.sh (Linux/Mac)

# Terminal 2: Start Frontend
cd frontend
pnpm dev

# Open browser
http://localhost:3000
```

---

## Feature 1: Surah Browser & Listing

### Test 1.1: Load Surah Listing Page ✓
**Steps:**
1. Navigate to http://localhost:3000/read
2. Wait for page to load

**Expected:**
- [ ] Page loads with all 114 surahs displayed
- [ ] Each surah shows:
  - [ ] Number (1-114) in circle
  - [ ] English name (e.g., "Al-Fatiha")
  - [ ] Arabic name (displayed RTL)
  - [ ] Ayah count
- [ ] Surahs organized in grid (1-3 columns)
- [ ] Smooth hover effects on surah cards

### Test 1.2: Search/Filter Functionality
**Steps:**
1. Look for search functionality (if implemented)
2. Try searching for "Al-Fatiha"

**Expected:**
- [ ] Search filters surahs correctly
- [ ] Results update instantly
- [ ] Case-insensitive search

### Test 1.3: Click Surah to Open
**Steps:**
1. Click on Surah 1 (Al-Fatiha)
2. Wait for page load

**Expected:**
- [ ] Page navigates to /read/1
- [ ] Surah content loads
- [ ] No console errors

---

## Feature 2: Quran Text Display

### Test 2.1: Arabic Text Display
**Steps:**
1. On /read/1 page
2. Verify Arabic text rendering

**Expected:**
- [ ] Arabic text displays clearly (Uthmani script)
- [ ] Text is readable (font size appropriate)
- [ ] Text is right-to-left (RTL)
- [ ] Font is consistent (Amiri font)
- [ ] No garbled or corrupted characters

### Test 2.2: Bismillah Display
**Steps:**
1. Open Surah 2 (Al-Baqarah) or higher
2. Look for Bismillah ("بسم الله الرحمن الرحيم")

**Expected:**
- [ ] Bismillah displays above surah text
- [ ] Bismillah is properly formatted
- [ ] Font size appropriate
- [ ] For Surah 1 & 9: Bismillah NOT shown (correct behavior)

### Test 2.3: Verse Numbers
**Steps:**
1. Look at verse endings
2. Check verse numbers display

**Expected:**
- [ ] Verse numbers display in circles
- [ ] Numbers in Arabic-Indic digits (e.g., ١ ٢ ٣)
- [ ] Positioned at verse end
- [ ] Properly styled

### Test 2.4: Text Loading Performance
**Steps:**
1. Switch between multiple surahs
2. Time how long each loads

**Expected:**
- [ ] Page loads in < 2 seconds
- [ ] Smooth transitions
- [ ] No blocking UI

---

## Feature 3: Reading Modes

### Test 3.1: Translation Mode
**Steps:**
1. On /read/1 page
2. Click "Translation" tab (should be default)
3. Observe page content

**Expected:**
- [ ] Translation mode is active
- [ ] Language dropdown visible
- [ ] English translation displays below Arabic
- [ ] Each verse has English translation

### Test 3.2: Arabic-Only Mode
**Steps:**
1. Click "Arabic only" tab
2. Observe page content

**Expected:**
- [ ] Only Arabic text displays
- [ ] Translation dropdown hidden
- [ ] Urdu audio toggle hidden
- [ ] Pure Mushaf view (no English)
- [ ] Mode persists on page reload

### Test 3.3: Mode Persistence
**Steps:**
1. Select "Arabic only" mode
2. Reload page (F5)
3. Go to different surah
4. Return to Surah 1

**Expected:**
- [ ] Mode remembered after reload ✓
- [ ] Mode remembered across surahs ✓

---

## Feature 4: Translation Languages

### Test 4.1: Language Dropdown Works
**Steps:**
1. On /read/1 in translation mode
2. Click language dropdown
3. Scroll through options

**Expected:**
- [ ] Dropdown opens
- [ ] All 18+ languages listed
- [ ] Languages include:
  - [ ] English ✓
  - [ ] Urdu (اردو)
  - [ ] Roman Urdu ✓
  - [ ] Hindi (हिन्दी) ✓
  - [ ] Bengali (বাংলা) ✓
  - [ ] Kanzul Imaan variants ✓
  - [ ] French, Spanish, Turkish, Russian, Chinese ✓

### Test 4.2: Language Labels Show Native Script
**Steps:**
1. Open language dropdown in translation mode
2. Look at each language option

**Expected:**
- [ ] Languages show both English and native script
- [ ] Format: "English — اردو"
- [ ] Native script displays correctly
- [ ] Non-Latin scripts render properly:
  - [ ] Arabic: اردو ✓
  - [ ] Devanagari: हिन्दी ✓
  - [ ] Bengali: বাংলা ✓

### Test 4.3: Select Different Translation
**Steps:**
1. Select "Urdu" from dropdown
2. Wait for content to load
3. Verify translation changed

**Expected:**
- [ ] Page reloads with Urdu translation
- [ ] All verses show Urdu text
- [ ] Translator credit shows: "Fateh Muhammad Jalandhri"
- [ ] Language change persists on reload
- [ ] No console errors

### Test 4.4: Test Each Language
**Steps:**
1. Cycle through each language
2. Verify content loads

**Expected:**
- [ ] Each language loads successfully
- [ ] No broken links to API
- [ ] Proper text direction (RTL for Arabic/Urdu/Hindi)
- [ ] All 18+ languages work

---

## Feature 5: Audio Playback

### Test 5.1: Play/Stop Button
**Steps:**
1. Click "Play & follow" button
2. Wait 2 seconds
3. Listen for audio
4. Click "Stop"

**Expected:**
- [ ] Play button changes to Stop
- [ ] Audio starts playing (if speakers on)
- [ ] Verse 1 ayah plays
- [ ] Stop button stops playback
- [ ] Button toggles correctly

### Test 5.2: Per-Ayah Selection
**Steps:**
1. In Arabic-only mode
2. Click on Ayah 3 in the text
3. Listen for audio

**Expected:**
- [ ] Clicking ayah plays that specific ayah
- [ ] Audio plays immediately
- [ ] Active ayah highlights
- [ ] Clicked ayah centers on screen

### Test 5.3: Continuous Playback
**Steps:**
1. Click "Play & follow"
2. Let it play through all verses

**Expected:**
- [ ] Plays all verses continuously
- [ ] Active ayah highlights each verse as it plays
- [ ] Screen auto-scrolls to current verse
- [ ] Playback stops at end of surah

### Test 5.4: Urdu Translation Audio
**Steps:**
1. Switch to Urdu translation
2. Enable "Urdu audio on" toggle
3. Click Play

**Expected:**
- [ ] For each ayah, plays:
  1. Arabic recitation first
  2. Then Urdu translation audio
  3. Then advances to next ayah
- [ ] Toggle works to disable Urdu audio
- [ ] Works on both Urdu and Roman Urdu

---

## Feature 6: Language Dropdown (Mobile Test)

### Test 6.1: Mobile Layout (DevTools)
**Steps:**
1. Open Chrome DevTools: F12
2. Click device toggle (mobile view)
3. Select iPhone 12 or similar
4. Go to /read/1

**Expected:**
- [ ] Page responsive on mobile
- [ ] Language dropdown visible in mobile header
- [ ] Shows native script labels (not just language code)
- [ ] Dropdown accessible on mobile

### Test 6.2: Touch Interactions
**Steps:**
1. Simulate touch on language dropdown
2. Try selecting language

**Expected:**
- [ ] Dropdown opens with touch
- [ ] Selection works with touch
- [ ] No hover effects breaking mobile
- [ ] Smooth experience

---

## Feature 7: Surah Navigation

### Test 7.1: Previous/Next Buttons
**Steps:**
1. On /read/5 (Al-Ma'idah)
2. Look for Previous/Next buttons at bottom
3. Click Previous (should go to 4)
4. Click Next (should go to 6)

**Expected:**
- [ ] Previous button shows "Al-Nisa" (Surah 4)
- [ ] Next button shows "Al-An'am" (Surah 6)
- [ ] Clicking navigates smoothly
- [ ] Navigation buttons at bottom of page

### Test 7.2: Boundary Cases
**Steps:**
1. Go to /read/1 (Al-Fatiha)
2. Look for Previous button

**Expected:**
- [ ] Previous button absent or disabled (no surah 0)
- [ ] Next button present (Surah 2)

**Steps:**
1. Go to /read/114 (An-Nas)
2. Look for Next button

**Expected:**
- [ ] Next button absent or disabled (no surah 115)
- [ ] Previous button present (Surah 113)

---

## Feature 8: Data Persistence

### Test 8.1: Language Preference Saved
**Steps:**
1. Select Urdu translation
2. Go to /read/2
3. Then /read/5
4. Reload entire page

**Expected:**
- [ ] Language remains Urdu
- [ ] Preference persisted in localStorage
- [ ] Works across all surahs

### Test 8.2: Reading Mode Saved
**Steps:**
1. Select "Arabic only" mode
2. Reload page
3. Go to different surah
4. Reload again

**Expected:**
- [ ] Mode remains "Arabic only"
- [ ] Preference persisted in localStorage

---

## Performance Tests

### Test 9.1: Page Load Time
**Steps:**
1. Open DevTools: F12 → Network
2. Navigate to /read/1
3. Check total load time

**Expected:**
- [ ] Initial page load: < 2 seconds
- [ ] Surah content loads: < 1 second
- [ ] Language switch: < 500ms
- [ ] No unnecessary re-renders

### Test 9.2: Memory Usage
**Steps:**
1. Open DevTools: F12 → Memory
2. Take heap snapshot
3. Switch between 10 surahs
4. Take another snapshot

**Expected:**
- [ ] No significant memory increase
- [ ] No memory leaks
- [ ] Smooth experience

### Test 9.3: API Response Times
**Steps:**
1. Open DevTools: F12 → Network
2. Switch to Urdu translation
3. Check response time for CDN

**Expected:**
- [ ] API responses < 500ms
- [ ] CDN caching working
- [ ] No failed requests (404/500)

---

## API Integration Tests

### Test 10.1: Arabic Text CDN
**Steps:**
1. Open DevTools: F12 → Network
2. Reload /read/1
3. Look for requests to cdn.jsdelivr.net

**Expected:**
- [ ] Request to: `cdn.jsdelivr.net/.../ara-quranuthmanihaf/1.json`
- [ ] Response status: 200
- [ ] Response time < 500ms

### Test 10.2: Translation API (fawazahmed)
**Steps:**
1. Load /read/1 with English translation
2. Check Network tab

**Expected:**
- [ ] Request to: `cdn.jsdelivr.net/.../eng-abdullahyusufal/1.json`
- [ ] Response includes 7 verses
- [ ] Each verse has chapter, verse, text fields

### Test 10.3: Translation API (alquran.cloud)
**Steps:**
1. Load /read/1 with Kanzul Imaan (Urdu)
2. Check Network tab

**Expected:**
- [ ] Request to: `api.alquran.cloud/v1/surah/1/ur.kanzuliman`
- [ ] Response in alquran format (data.ayahs array)
- [ ] Properly normalized to our format

### Test 10.4: Audio CDN
**Steps:**
1. Click Play on any surah
2. Check Network tab for audio files

**Expected:**
- [ ] Requests to: `everyayah.com/.../001001.mp3`, `001002.mp3`, etc.
- [ ] Audio plays without stuttering
- [ ] Files cache properly

---

## Error Handling Tests

### Test 11.1: Invalid Surah Number
**Steps:**
1. Try to navigate to /read/999
2. Or /read/0

**Expected:**
- [ ] Graceful error or fallback
- [ ] Page doesn't crash
- [ ] Clear error message (optional)

### Test 11.2: Failed API Request
**Steps:**
1. Disconnect internet
2. Try to load translation
3. Reconnect

**Expected:**
- [ ] Loading state shows
- [ ] Error message displayed (optional)
- [ ] Retry available
- [ ] App doesn't crash

### Test 11.3: Missing Language
**Steps:**
1. Manually set localStorage to invalid language
2. Reload page

**Expected:**
- [ ] Falls back to English (DEFAULT_LANGUAGE)
- [ ] No console errors
- [ ] Page functional

---

## Browser Compatibility

### Test 12.1: Chrome/Chromium
- [ ] All features work
- [ ] Audio plays
- [ ] Arabic text renders
- [ ] No console errors

### Test 12.2: Firefox
- [ ] All features work
- [ ] Audio plays
- [ ] Arabic text renders
- [ ] No console errors

### Test 12.3: Safari
- [ ] All features work
- [ ] Audio plays
- [ ] Arabic text renders
- [ ] No console errors

---

## Accessibility Tests

### Test 13.1: Keyboard Navigation
**Steps:**
1. Press Tab to navigate
2. Try Tab through all controls

**Expected:**
- [ ] All buttons tab-able
- [ ] Dropdown navigable with arrow keys
- [ ] No keyboard traps
- [ ] Focus visible

### Test 13.2: Screen Reader
**Steps:**
1. Use screen reader (NVDA/JAWS on Windows)
2. Navigate page

**Expected:**
- [ ] Page structure readable
- [ ] Controls labeled properly
- [ ] Arabic text announced (not skipped)
- [ ] Language options announced

### Test 13.3: Text Scaling
**Steps:**
1. Zoom page to 150% (Ctrl++/Cmd++)
2. Verify readability

**Expected:**
- [ ] Text scales smoothly
- [ ] No layout breaks
- [ ] All content visible

---

## Test Summary

| Category | Tests | Status | Notes |
|----------|-------|--------|-------|
| Surah Browser | 3 | ⏳ | |
| Text Display | 4 | ⏳ | |
| Reading Modes | 3 | ⏳ | |
| Languages | 4 | ⏳ | |
| Audio | 4 | ⏳ | |
| Mobile | 2 | ⏳ | |
| Navigation | 2 | ⏳ | |
| Persistence | 2 | ⏳ | |
| Performance | 3 | ⏳ | |
| API Integration | 4 | ⏳ | |
| Error Handling | 3 | ⏳ | |
| Compatibility | 3 | ⏳ | |
| Accessibility | 3 | ⏳ | |
| **TOTAL** | **43** | ⏳ | |

---

## How to Document Results

For each test, mark as:
- ✅ PASS: Works as expected
- ❌ FAIL: Doesn't work, broken
- ⚠️ PARTIAL: Works but has issues
- ⏳ NOT TESTED: Not yet tested

---

## Reporting Issues

If you find bugs:
1. Note the test number and name
2. Describe what happened
3. List steps to reproduce
4. Include screenshots if helpful
5. Check browser console for errors

---

**Test Date:** ____________  
**Tester:** ________________  
**Browser:** _______________  
**Overall Status:** ⏳ Pending
