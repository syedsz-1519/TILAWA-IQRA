# TILAWA Testing Guide - Phase 15

Complete end-to-end testing procedures for all TILAWA features

## Testing Environments

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Database: Supabase (local or dev)

### Staging
- Frontend: https://tilawa-staging.vercel.app
- Backend: https://tilawa-api-staging.railway.app
- Database: Supabase staging

### Production
- Frontend: https://tilawa.vercel.app
- Backend: https://tilawa-api.railway.app
- Database: Supabase production

---

## Phase 1: Authentication Testing

### Test Cases

#### 1.1 User Registration
- [ ] Sign up with email
- [ ] Verify email confirmation
- [ ] Create user profile
- [ ] Set language preference
- [ ] Redirect to home page

#### 1.2 User Login
- [ ] Login with email/password
- [ ] Maintain session
- [ ] Remember language preference
- [ ] Persist user data

#### 1.3 Logout
- [ ] Clear session
- [ ] Redirect to home
- [ ] Clear browser data

---

## Phase 2: Multilingual System Testing

### Test Cases

#### 2.1 Language Selection
- [ ] Switch between 15 languages
- [ ] UI updates in selected language
- [ ] Persist language preference
- [ ] RTL for Arabic/Urdu

#### 2.2 Indian Languages Support
- [ ] Hindi (हिंदी)
- [ ] Urdu (اردو)
- [ ] Bengali (বাংলা)
- [ ] Tamil (தமிழ்)
- [ ] Telugu (తెలుగు)
- [ ] Kannada (ಕನ್ನಡ)
- [ ] Malayalam (മലയാളം)
- [ ] Marathi (मराठी)
- [ ] Gujarati (ગુજરાતી)
- [ ] Punjabi (ਪੰਜਾਬੀ)

#### 2.3 Content Translation
- [ ] Quran translations load correctly
- [ ] Hadith translations available
- [ ] Dua translations in multiple languages
- [ ] UI labels translated

---

## Phase 3: Quran Library Testing

### Test Cases

#### 3.1 Surah Browsing
- [ ] View all 114 Surahs
- [ ] Search by name (English/Arabic)
- [ ] Filter by revelation (Meccan/Medinan)
- [ ] Sort by number or length
- [ ] Load surah details

#### 3.2 Ayah Viewing
- [ ] Display Arabic text (Rasm Uthmani)
- [ ] Show transliteration
- [ ] Display translation in selected language
- [ ] Toggle translation/transliteration
- [ ] Adjust font size

#### 3.3 Audio Playback
- [ ] Select reciter (Abdul Basit, Mishari, Yasser)
- [ ] Play audio for ayahs
- [ ] Pause/Resume functionality
- [ ] Progress bar working

#### 3.4 Bookmarks
- [ ] Add surah bookmark
- [ ] Remove bookmark
- [ ] View bookmarked surahs
- [ ] Navigate to bookmarked ayah

---

## Phase 4: IQRA Mode Testing

### Test Cases

#### 4.1 Tajweed Categories
- [ ] Display all 7 categories
- [ ] Category icons showing correctly
- [ ] Click to view rules in category

#### 4.2 Tajweed Rules
- [ ] View 8+ tajweed rules
- [ ] Filter by difficulty (Beginner/Intermediate/Advanced)
- [ ] Display rule details:
  - [ ] Arabic name and translation
  - [ ] Description in English
  - [ ] Key rules breakdown
  - [ ] Exceptions listed
  - [ ] Visual guides displayed
  - [ ] Mnemonic devices shown
  - [ ] Common mistakes highlighted

#### 4.3 Examples and Audio
- [ ] Display ayah examples
- [ ] Show transliteration
- [ ] Play audio examples
- [ ] Explain example application

---

## Phase 5: Hadith Library Testing

### Test Cases

#### 5.1 Collections
- [ ] View 6 collections (Bukhari, Muslim, Tirmidhi, Abu Dawood, Nasai, Ibn Majah)
- [ ] Collection metadata displays correctly
- [ ] Author information shown

#### 5.2 Hadith Browsing
- [ ] Filter by collection
- [ ] Filter by grade (Sahih/Hasan/Daif)
- [ ] Filter by topic
- [ ] Search functionality
- [ ] Display hadith count per collection

#### 5.3 Hadith Details
- [ ] Arabic text displays
- [ ] Narrator information shown
- [ ] Grade/authenticity indicated
- [ ] Translation in selected language
- [ ] Commentary provided
- [ ] Keywords displayed

#### 5.4 Bookmarks
- [ ] Add hadith to favorites
- [ ] Remove from favorites
- [ ] View favorite hadiths

---

## Phase 6: Dua Library Testing

### Test Cases

#### 6.1 Categories
- [ ] View 14 dua categories
- [ ] Browse by category
- [ ] Display featured duas
- [ ] Category descriptions shown

#### 6.2 Dua Viewing
- [ ] Display Arabic dua text
- [ ] Show transliteration
- [ ] Provide meaning/translation
- [ ] List benefits
- [ ] Show timing recommendation
- [ ] Display frequency
- [ ] Cite source (Quran/Hadith)

#### 6.3 Dua Features
- [ ] Copy dua to clipboard
- [ ] Audio playback (when available)
- [ ] Bookmark duas
- [ ] Share dua link

---

## Phase 7: Hifz Card Studio Testing

### Test Cases

#### 7.1 Deck Selection
- [ ] View 8 memorization decks
- [ ] Filter by difficulty
- [ ] Display deck statistics
- [ ] Start study session

#### 7.2 Study Session
- [ ] Flashcard displays correctly
- [ ] Arabic text shows
- [ ] Click to reveal translation
- [ ] Response buttons (Hard/Okay/Easy)
- [ ] Progress bar updates
- [ ] Accuracy tracking

#### 7.3 SM-2 Algorithm
- [ ] Calculate next review date
- [ ] Update ease factor correctly
- [ ] Store progress in database
- [ ] Retrieve progress for next session

#### 7.4 Session Statistics
- [ ] Display session summary
- [ ] Show accuracy percentage
- [ ] Count correct/incorrect
- [ ] Calculate completion time

---

## Phase 8: Advanced Features Testing

### Test Cases

#### 8.1 Ayah to Life Counselor
- [ ] Load counselor page
- [ ] Quick mood selection works
- [ ] Input message and send
- [ ] Receive Quranic guidance
- [ ] Display related ayahs

#### 8.2 Stories of Quran
- [ ] Display 8+ stories
- [ ] Filter by category (Prophet/Companion/Miracle)
- [ ] Show story details
- [ ] Display lessons learned

#### 8.3 Sunnate-E-Rasool (4 Khaliphs)
- [ ] Display 4 khaliphs
- [ ] Show achievements
- [ ] List challenges faced
- [ ] Historical accuracy

#### 8.4 The Ahle Bait (5 Imams)
- [ ] Display 5 imams in order
- [ ] Show timeline
- [ ] Display contributions
- [ ] Spiritual significance explained

#### 8.5 Ways of Islam (5 Madhabs)
- [ ] Display 5 schools
- [ ] Show founder and year
- [ ] List core principles
- [ ] Follower statistics

---

## Phase 9: Database Testing

### Test Cases

#### 9.1 User Data
- [ ] Create user record
- [ ] Store preferences
- [ ] Update user data
- [ ] Retrieve user data
- [ ] Delete user account

#### 9.2 Progress Tracking
- [ ] Store reading progress
- [ ] Store hifz progress
- [ ] Store study sessions
- [ ] Retrieve progress history

#### 9.3 Bookmarks
- [ ] Store Quran bookmarks
- [ ] Store hadith favorites
- [ ] Store dua favorites
- [ ] Store story bookmarks
- [ ] Retrieve all bookmarks

#### 9.4 Language Preferences
- [ ] Store primary language
- [ ] Store secondary languages
- [ ] Update preferences
- [ ] Retrieve preferences

---

## Phase 10: API Testing

### Test Cases

#### 10.1 Hifz API
- [ ] GET /api/hifz/progress/:userId
- [ ] GET /api/hifz/card-progress/:userId/:cardId
- [ ] POST /api/hifz/update-progress
- [ ] POST /api/hifz/session
- [ ] POST /api/hifz/session/:sessionId/end
- [ ] GET /api/hifz/stats/:userId

#### 10.2 Bookmarks API
- [ ] GET /api/bookmarks/quran/:userId
- [ ] POST /api/bookmarks/quran
- [ ] DELETE /api/bookmarks/quran/:userId/:surahNumber/:ayahNumber
- [ ] GET /api/bookmarks/hadith/:userId
- [ ] POST /api/bookmarks/hadith
- [ ] GET /api/bookmarks/dua/:userId
- [ ] POST /api/bookmarks/dua
- [ ] GET /api/bookmarks/stories/:userId
- [ ] POST /api/bookmarks/stories

#### 10.3 Language API
- [ ] GET /api/languages
- [ ] GET /api/languages/:userId
- [ ] POST /api/languages/:userId

---

## Phase 11: Performance Testing

### Test Cases

#### 11.1 Load Times
- [ ] Home page loads in < 2 seconds
- [ ] Quran library loads in < 1 second
- [ ] Surah reader loads in < 1 second
- [ ] Hadith search results in < 2 seconds

#### 11.2 Responsiveness
- [ ] Mobile view (320px - 480px)
- [ ] Tablet view (481px - 768px)
- [ ] Desktop view (769px+)
- [ ] Landscape/Portrait orientation

#### 11.3 Database Performance
- [ ] Query response < 200ms
- [ ] Bulk inserts efficient
- [ ] Indexes working correctly
- [ ] No N+1 queries

---

## Phase 12: Security Testing

### Test Cases

#### 12.1 Authentication
- [ ] User cannot access other users' data
- [ ] Session tokens valid
- [ ] Password stored securely
- [ ] No sensitive data in localStorage

#### 12.2 API Security
- [ ] Rate limiting on endpoints
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] XSS prevention

#### 12.3 Data Privacy
- [ ] GDPR compliance
- [ ] Data deletion works
- [ ] No data leaks

---

## Test Execution Checklist

### Before Testing
- [ ] Fresh database state
- [ ] Clear browser cache
- [ ] Reset user data
- [ ] Verify all dependencies installed

### During Testing
- [ ] Document all issues
- [ ] Screenshot bugs
- [ ] Note error messages
- [ ] Test on multiple devices

### After Testing
- [ ] Compile bug report
- [ ] Prioritize issues
- [ ] Create fixes
- [ ] Re-test after fixes

---

## Bug Report Template

```
Title: [Feature] Issue Description
Severity: Critical/High/Medium/Low
Steps to Reproduce:
1. ...
2. ...
3. ...

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Environment:
- Browser: Chrome/Firefox/Safari/Edge
- OS: Windows/Mac/Linux
- Device: Desktop/Tablet/Mobile
- Screen Resolution: [dimensions]

Screenshots:
[Attach screenshot]

Console Errors:
[Paste console error]
```

---

## Performance Metrics

### Target Metrics
- Page Load Time: < 2 seconds
- Time to Interactive: < 3 seconds
- Largest Contentful Paint: < 2.5 seconds
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1

### Monitoring
- Use Google Lighthouse
- Monitor with New Relic
- Test with WebPageTest
- Use Chrome DevTools

---

## Regression Testing

### Before Each Release
- [ ] Run all manual tests
- [ ] Execute automated tests
- [ ] Check API endpoints
- [ ] Verify database integrity
- [ ] Test authentication flow
- [ ] Test all features on mobile

### After Each Release
- [ ] Monitor error rates
- [ ] Check user feedback
- [ ] Monitor performance metrics
- [ ] Review security logs
