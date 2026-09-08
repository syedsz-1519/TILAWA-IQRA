# TILAWA Authentication & User Management Tests

Comprehensive test suite for authentication, user accounts, and session management.

## Test Environment Setup

```bash
# Terminal 1: Backend
cd backend
.\start.ps1  # Windows or bash start.sh (Linux/Mac)

# Terminal 2: Frontend
cd frontend
pnpm dev

# Open browser
http://localhost:3000
```

### Prerequisites
- PostgreSQL database running
- Better Auth configured
- `DATABASE_URL` set in backend `.env`
- `BETTER_AUTH_SECRET` set in backend `.env`

---

## Feature 1: Sign-Up / Registration

### Test 1.1: Access Sign-Up Page
**Steps:**
1. Navigate to http://localhost:3000/sign-up
2. Wait for page to load

**Expected:**
- [ ] Sign-up form displays
- [ ] Form fields visible:
  - [ ] Email input field
  - [ ] Password input field
  - [ ] Confirm password input field (if applicable)
  - [ ] Name field (if applicable)
- [ ] "Sign Up" button visible
- [ ] "Already have account? Sign in" link present
- [ ] Page loads without errors
- [ ] No console errors

### Test 1.2: Redirect if Already Logged In
**Steps:**
1. Log in to an account first
2. Navigate to /sign-up

**Expected:**
- [ ] Redirects to home page (/)
- [ ] Does NOT show sign-up form
- [ ] Logged-in user stays logged in

### Test 1.3: Create New Account
**Steps:**
1. On sign-up page
2. Enter email: `testuser@example.com`
3. Enter password: `TestPassword123!`
4. Confirm password (if field exists)
5. Click "Sign Up"
6. Wait for processing

**Expected:**
- [ ] Account created successfully
- [ ] Redirects to home page or dashboard
- [ ] User is logged in (session created)
- [ ] No error messages
- [ ] User data saved in database

### Test 1.4: Duplicate Email Validation
**Steps:**
1. Create account with `newuser@example.com`
2. Try to sign up again with same email
3. Click "Sign Up"

**Expected:**
- [ ] Error message: "Email already exists" or similar
- [ ] Account NOT created
- [ ] Form remains on sign-up page
- [ ] User can correct and try again

### Test 1.5: Password Validation
**Steps:**
1. Try to sign up with weak password (e.g., "123")
2. Click "Sign Up"

**Expected:**
- [ ] Password validation error shown
- [ ] Error message: "Password too weak" or "Too short"
- [ ] Account NOT created
- [ ] Suggests stronger password (optional)

### Test 1.6: Email Validation
**Steps:**
1. Try to sign up with invalid email (e.g., "notanemail")
2. Click "Sign Up"

**Expected:**
- [ ] Email validation error shown
- [ ] Error message: "Invalid email"
- [ ] Account NOT created
- [ ] User can correct

### Test 1.7: Required Fields
**Steps:**
1. Leave email field empty
2. Enter password
3. Click "Sign Up"

**Expected:**
- [ ] Error message: "Email required"
- [ ] Account NOT created

**Steps:**
1. Enter email
2. Leave password empty
3. Click "Sign Up"

**Expected:**
- [ ] Error message: "Password required"
- [ ] Account NOT created

### Test 1.8: Form Submission Feedback
**Steps:**
1. Fill out sign-up form correctly
2. Click "Sign Up"
3. Wait for response

**Expected:**
- [ ] Button shows loading state (spinner/disabled)
- [ ] "Signing up..." or similar message
- [ ] After success: redirect happens
- [ ] User notified (implicit via redirect)

---

## Feature 2: Sign-In / Login

### Test 2.1: Access Sign-In Page
**Steps:**
1. Navigate to http://localhost:3000/sign-in
2. Wait for page to load

**Expected:**
- [ ] Sign-in form displays
- [ ] Form fields visible:
  - [ ] Email input field
  - [ ] Password input field
- [ ] "Sign In" button visible
- [ ] "Don't have account? Sign up" link present
- [ ] Page loads without errors

### Test 2.2: Successful Sign-In
**Steps:**
1. On sign-in page
2. Enter email: `testuser@example.com`
3. Enter password: `TestPassword123!`
4. Click "Sign In"
5. Wait for processing

**Expected:**
- [ ] Redirects to home page (/)
- [ ] User session created
- [ ] Logged-in user name/email visible (in header/profile)
- [ ] No error messages
- [ ] Session token stored (in cookies)

### Test 2.3: Redirect if Already Logged In
**Steps:**
1. Log in to an account
2. Navigate to /sign-in

**Expected:**
- [ ] Redirects to home page (/)
- [ ] Does NOT show sign-in form
- [ ] User stays logged in

### Test 2.4: Invalid Email
**Steps:**
1. Enter email: `nonexistent@example.com`
2. Enter password: `TestPassword123!`
3. Click "Sign In"

**Expected:**
- [ ] Error message: "Invalid credentials" or "User not found"
- [ ] User NOT logged in
- [ ] Form remains visible
- [ ] Password field cleared (for security)

### Test 2.5: Wrong Password
**Steps:**
1. Enter email: `testuser@example.com`
2. Enter password: `WrongPassword123!`
3. Click "Sign In"

**Expected:**
- [ ] Error message: "Invalid credentials"
- [ ] User NOT logged in
- [ ] Form remains visible
- [ ] Email field retains value

### Test 2.6: Case Sensitivity
**Steps:**
1. Enter email: `TestUser@example.com` (uppercase)
2. Password correct
3. Click "Sign In"

**Expected:**
- [ ] Sign-in succeeds (email should be case-insensitive)
- [ ] OR error if case-sensitive (system should document)

### Test 2.7: Empty Fields
**Steps:**
1. Leave email empty, enter password
2. Click "Sign In"

**Expected:**
- [ ] Error: "Email required"
- [ ] Form doesn't submit

**Steps:**
1. Enter email, leave password empty
2. Click "Sign In"

**Expected:**
- [ ] Error: "Password required"
- [ ] Form doesn't submit

### Test 2.8: Remember Me (if implemented)
**Steps:**
1. Check "Remember me" checkbox (if available)
2. Sign in
3. Close browser
4. Reopen browser
5. Visit http://localhost:3000

**Expected:**
- [ ] User still logged in (or long session)
- [ ] Session persists

---

## Feature 3: Session Management

### Test 3.1: Session Created After Login
**Steps:**
1. Sign in with valid credentials
2. Open DevTools: F12 → Application → Cookies

**Expected:**
- [ ] Session cookie exists (usually named `auth.session`)
- [ ] Cookie contains secure token
- [ ] Cookie is HttpOnly (can't be accessed from JS)
- [ ] Cookie has expiration date

### Test 3.2: Session Persists Across Pages
**Steps:**
1. Sign in
2. Navigate to /read
3. Navigate to /dashboard
4. Navigate to /settings

**Expected:**
- [ ] Logged-in on all pages
- [ ] User info visible (header shows name/email)
- [ ] Can access protected pages
- [ ] Session maintained

### Test 3.3: Session Expires
**Steps:**
1. Sign in
2. Wait (or simulate) session expiration (default: 7 days)
3. OR clear cookies manually
4. Try to access protected page

**Expected:**
- [ ] Redirects to sign-in page
- [ ] Message: "Session expired, please sign in again"
- [ ] Must log in again to access

### Test 3.4: Session Token in Headers
**Steps:**
1. Sign in
2. Open DevTools: F12 → Network
3. Make any request (navigate to a page)
4. Check request headers

**Expected:**
- [ ] Authorization header present
- [ ] Contains session token
- [ ] Token matches cookie value

---

## Feature 4: User Profile & Data

### Test 4.1: User Profile Visible
**Steps:**
1. Sign in
2. Look for profile indicator in header/nav

**Expected:**
- [ ] User's name or email displays
- [ ] Profile menu/dropdown available (if implemented)
- [ ] Avatar (if implemented)

### Test 4.2: Access Profile Settings
**Steps:**
1. Sign in
2. Click on profile or navigate to /settings
3. Wait for page to load

**Expected:**
- [ ] Settings page loads
- [ ] User information displayed:
  - [ ] Email
  - [ ] Name
  - [ ] Account creation date (optional)
- [ ] Can view profile data

### Test 4.3: Update User Profile (if implemented)
**Steps:**
1. On settings page
2. Change name field
3. Click "Save" or "Update"

**Expected:**
- [ ] Changes saved successfully
- [ ] Confirmation message
- [ ] Profile updated across app
- [ ] Data persists on reload

### Test 4.4: User Data Permissions
**Steps:**
1. Sign in as User A
2. Try to access User B's profile

**Expected:**
- [ ] Access denied (403 Forbidden)
- [ ] OR only own profile accessible
- [ ] Cannot modify other users' data

---

## Feature 5: Sign-Out / Logout

### Test 5.1: Sign-Out Button
**Steps:**
1. Sign in
2. Look for Sign Out button (in profile menu or header)

**Expected:**
- [ ] Sign Out button visible
- [ ] Button is clickable
- [ ] Located in logical place (top-right, profile menu, etc.)

### Test 5.2: Successful Sign-Out
**Steps:**
1. Sign in
2. Click "Sign Out"
3. Wait for processing

**Expected:**
- [ ] Redirects to home page (/)
- [ ] User logged out
- [ ] Session cookie deleted
- [ ] User name/profile removed from header
- [ ] No error messages

### Test 5.3: Redirect to Sign-In After Sign-Out
**Steps:**
1. Sign in
2. Sign out
3. Try to navigate to /dashboard (protected page)

**Expected:**
- [ ] Redirects to /sign-in
- [ ] Cannot access protected pages
- [ ] Must log in again

### Test 5.4: Cannot Use Session After Sign-Out
**Steps:**
1. Sign in, copy session token
2. Sign out
3. Try to use session token in API call

**Expected:**
- [ ] API returns 401 Unauthorized
- [ ] Session is invalid
- [ ] Must authenticate again

---

## Feature 6: Security Tests

### Test 6.1: Password Not Stored in Plain Text
**Steps:**
1. Sign in
2. Check browser's stored data (localStorage, sessionStorage)

**Expected:**
- [ ] Password NOT stored anywhere
- [ ] Only session token stored
- [ ] No sensitive data in browser storage

### Test 6.2: HTTPS in Production
**Steps:**
1. Visit production URL

**Expected:**
- [ ] Uses HTTPS (lock icon in address bar)
- [ ] No mixed content warnings
- [ ] All requests secure

### Test 6.3: Password Reset (if implemented)
**Steps:**
1. On sign-in page, click "Forgot Password"
2. Enter email
3. Check email for reset link

**Expected:**
- [ ] Reset email sent successfully
- [ ] Email contains reset link
- [ ] Link is time-limited
- [ ] Link is unique and non-guessable

### Test 6.4: CSRF Protection
**Steps:**
1. Sign in
2. Check for CSRF token in form (if using form-based auth)

**Expected:**
- [ ] CSRF token present in forms
- [ ] Token valid
- [ ] Changes require valid token

### Test 6.5: SQL Injection Prevention
**Steps:**
1. Try to sign in with SQL injection payload:
   `email: " OR "1"="1`
   `password: anything`

**Expected:**
- [ ] Treated as literal string
- [ ] Login fails (invalid credentials)
- [ ] No database errors exposed
- [ ] No data breach

### Test 6.6: XSS Prevention
**Steps:**
1. Try to sign up with name containing script:
   `<script>alert('xss')</script>`
2. Check if alert fires

**Expected:**
- [ ] No alert fires
- [ ] Script escaped or stripped
- [ ] Stored safely
- [ ] Not executed when displayed

---

## Feature 7: Database Integration

### Test 7.1: User Data Saved to Database
**Steps:**
1. Sign up with new account
2. Open database (connect to PostgreSQL)
3. Query `SELECT * FROM "user"`

**Expected:**
- [ ] New user record exists
- [ ] Email matches input
- [ ] User ID generated (UUID)
- [ ] Created timestamp recorded
- [ ] Password hashed (not plaintext)

### Test 7.2: Session Data Saved
**Steps:**
1. Sign in
2. Query database: `SELECT * FROM "session"`

**Expected:**
- [ ] Session record exists
- [ ] Links to user ID
- [ ] Token stored (hashed)
- [ ] Expiration time set
- [ ] IP address recorded (optional)
- [ ] User agent recorded (optional)

### Test 7.3: Database Timestamps
**Steps:**
1. Create account and note time
2. Check database timestamps

**Expected:**
- [ ] `createdAt` timestamp accurate
- [ ] `updatedAt` timestamp set
- [ ] Timestamps in UTC
- [ ] Format consistent

### Test 7.4: Multiple Sessions per User
**Steps:**
1. Sign in on Device A
2. Sign in on Device B (different browser/device)
3. Check database sessions

**Expected:**
- [ ] Two session records exist
- [ ] Both link to same user
- [ ] Both valid
- [ ] User can be logged in on both

### Test 7.5: Session Deletion on Logout
**Steps:**
1. Sign in
2. Get session token from database
3. Sign out
4. Query database for that session

**Expected:**
- [ ] Session record deleted OR marked inactive
- [ ] Token no longer valid
- [ ] Cannot reuse same session

---

## Feature 8: Protected Routes

### Test 8.1: Dashboard Protected
**Steps:**
1. Don't sign in
2. Navigate to http://localhost:3000/dashboard

**Expected:**
- [ ] Redirects to /sign-in
- [ ] Cannot access dashboard without auth

**Steps:**
1. Sign in
2. Navigate to /dashboard

**Expected:**
- [ ] Loads dashboard
- [ ] Can access

### Test 8.2: Settings Protected
**Steps:**
1. Try to access /settings without signing in

**Expected:**
- [ ] Redirects to /sign-in

**Steps:**
1. Sign in, then access /settings

**Expected:**
- [ ] Loads settings page

### Test 8.3: API Endpoints Protected
**Steps:**
1. Try to call: `GET /api/users/123/streaks` without auth header

**Expected:**
- [ ] Returns 401 Unauthorized
- [ ] No data returned

**Steps:**
1. Call with valid session token

**Expected:**
- [ ] Returns 200 OK
- [ ] Data returned

---

## Feature 9: Error Handling

### Test 9.1: Network Error During Sign-In
**Steps:**
1. Disable internet
2. Try to sign in

**Expected:**
- [ ] Error message: "Network error" or "No internet"
- [ ] Form remains visible
- [ ] Can retry when online

### Test 9.2: Server Error During Sign-Up
**Steps:**
1. Backend not running
2. Try to sign up

**Expected:**
- [ ] Error message: "Server error"
- [ ] User notified
- [ ] Form remains visible

### Test 9.3: Timeout
**Steps:**
1. Make request and simulate slow server (>30s)

**Expected:**
- [ ] Request times out
- [ ] Error message shown
- [ ] User can retry

---

## Feature 10: Rate Limiting (if implemented)

### Test 10.1: Brute Force Protection
**Steps:**
1. Try to sign in with wrong password 10+ times
2. Wait for rate limit

**Expected:**
- [ ] After X attempts, requests blocked
- [ ] Error: "Too many attempts, try again later"
- [ ] Must wait before retrying
- [ ] Protects against brute force

### Test 10.2: Signup Rate Limiting
**Steps:**
1. Try to create 10+ accounts rapidly from same IP

**Expected:**
- [ ] After limit, blocked
- [ ] Error message
- [ ] Protects against spam

---

## Test Summary

| Category | Tests | Status |
|----------|-------|--------|
| Sign-Up | 8 | ⏳ |
| Sign-In | 8 | ⏳ |
| Sessions | 4 | ⏳ |
| Profile | 4 | ⏳ |
| Sign-Out | 4 | ⏳ |
| Security | 6 | ⏳ |
| Database | 5 | ⏳ |
| Protected Routes | 3 | ⏳ |
| Error Handling | 3 | ⏳ |
| Rate Limiting | 2 | ⏳ |
| **TOTAL** | **47** | ⏳ |

---

## Marking Results

For each test:
- ✅ PASS
- ❌ FAIL
- ⚠️ PARTIAL
- ⏳ NOT TESTED

---

## Debugging Tips

**Check Network Requests:**
```
F12 → Network tab
Look for POST /auth/sign-in, POST /auth/sign-up
Check response status (200, 400, 500)
```

**Check Database:**
```bash
psql -U postgres -d tilawa_dev
SELECT * FROM "user";
SELECT * FROM "session";
```

**Check Logs:**
```
Backend terminal output
Frontend browser console (F12)
```

---

**Test Date:** ____________  
**Tester:** ________________  
**Overall Status:** ⏳ Pending
