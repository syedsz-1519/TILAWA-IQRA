import { pgTable, text, timestamp, boolean, integer, serial, json } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// Dashboard: track daily streaks and XP
export const streaks = pgTable('streaks', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  currentStreak: integer('currentStreak').notNull().default(0),
  totalXP: integer('totalXP').notNull().default(0),
  lastActivityDate: timestamp('lastActivityDate'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Nafs Tracker: daily habits and spiritual practices
export const nafsTracking = pgTable('nafsTracking', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  date: timestamp('date').notNull(),
  habits: json('habits').notNull().default({}), // { habitName: boolean }
  reflection: text('reflection'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// Mushaf Reader: user bookmarks and progress
export const mushafBookmarks = pgTable('mushafBookmarks', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  surahNumber: integer('surahNumber').notNull(),
  ayahNumber: integer('ayahNumber').notNull(),
  bookmarkedAt: timestamp('bookmarkedAt').notNull().defaultNow(),
})

export const readingProgress = pgTable('readingProgress', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  surahNumber: integer('surahNumber').notNull(),
  lastAyahRead: integer('lastAyahRead').notNull().default(0),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// Tajweed Quiz: track quiz attempts and scores
export const tajweedScores = pgTable('tajweedScores', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  quizNumber: integer('quizNumber').notNull(),
  score: integer('score').notNull(),
  totalQuestions: integer('totalQuestions').notNull(),
  attemptedAt: timestamp('attemptedAt').notNull().defaultNow(),
})

// Hadith & Dua: user collections and favorites
export const hadithFavorites = pgTable('hadithFavorites', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  hadithId: text('hadithId').notNull(),
  hadithText: text('hadithText').notNull(),
  hadithSource: text('hadithSource'),
  savedAt: timestamp('savedAt').notNull().defaultNow(),
})

export const duaFavorites = pgTable('duaFavorites', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  duaId: text('duaId').notNull(),
  duaText: text('duaText').notNull(),
  duaTranslation: text('duaTranslation'),
  benefit: text('benefit'),
  savedAt: timestamp('savedAt').notNull().defaultNow(),
})
