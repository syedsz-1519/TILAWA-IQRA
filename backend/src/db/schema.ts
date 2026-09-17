import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  json,
  index,
  unique,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ========================================
// Better Auth Tables
// ========================================

export const user = pgTable(
  'user',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('emailVerified').notNull().default(false),
    image: text('image'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index('idx_user_email').on(table.email),
  })
)

export const session = pgTable(
  'session',
  {
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
  },
  (table) => ({
    userIdIdx: index('idx_session_user').on(table.userId),
  })
)

export const account = pgTable(
  'account',
  {
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
  },
  (table) => ({
    userIdIdx: index('idx_account_user').on(table.userId),
  })
)

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// ========================================
// Application Tables
// ========================================

export const streaks = pgTable(
  'streaks',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    currentStreak: integer('currentStreak').notNull().default(0),
    totalXP: integer('totalXP').notNull().default(0),
    lastActivityDate: timestamp('lastActivityDate'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_streaks_user').on(table.userId),
  })
)

export const nafsTracking = pgTable(
  'nafsTracking',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    date: timestamp('date').notNull(),
    habits: json('habits').notNull().$type<Record<string, boolean>>().default({}),
    reflection: text('reflection'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_nafs_user').on(table.userId),
  })
)

export const mushafBookmarks = pgTable(
  'mushafBookmarks',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    surahNumber: integer('surahNumber').notNull(),
    ayahNumber: integer('ayahNumber').notNull(),
    bookmarkedAt: timestamp('bookmarkedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_bookmarks_user').on(table.userId),
    userSurahIdx: unique('uniq_user_surah_ayah').on(table.userId, table.surahNumber, table.ayahNumber),
  })
)

export const readingProgress = pgTable(
  'readingProgress',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    surahNumber: integer('surahNumber').notNull(),
    lastAyahRead: integer('lastAyahRead').notNull().default(0),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_progress_user').on(table.userId),
    userSurahIdx: unique('uniq_user_progress_surah').on(table.userId, table.surahNumber),
  })
)

export const tajweedScores = pgTable(
  'tajweedScores',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    quizNumber: integer('quizNumber').notNull(),
    score: integer('score').notNull(),
    totalQuestions: integer('totalQuestions').notNull(),
    attemptedAt: timestamp('attemptedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_tajweed_user').on(table.userId),
  })
)

export const hadithFavorites = pgTable(
  'hadithFavorites',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    hadithId: text('hadithId').notNull(),
    hadithText: text('hadithText').notNull(),
    hadithSource: text('hadithSource'),
    savedAt: timestamp('savedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_hadith_user').on(table.userId),
    userHadithIdx: unique('uniq_user_hadith').on(table.userId, table.hadithId),
  })
)

export const duaFavorites = pgTable(
  'duaFavorites',
  {
    id: serial('id').primaryKey(),
    userId: text('userId').notNull(),
    duaId: text('duaId').notNull(),
    duaText: text('duaText').notNull(),
    duaTranslation: text('duaTranslation'),
    benefit: text('benefit'),
    savedAt: timestamp('savedAt').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_dua_user').on(table.userId),
    userDuaIdx: unique('uniq_user_dua').on(table.userId, table.duaId),
  })
)

// ========================================
// Relations
// ========================================

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  streaks: many(streaks),
  nafsTracking: many(nafsTracking),
  mushafBookmarks: many(mushafBookmarks),
  readingProgress: many(readingProgress),
  tajweedScores: many(tajweedScores),
  hadithFavorites: many(hadithFavorites),
  duaFavorites: many(duaFavorites),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}))

export const streaksRelations = relations(streaks, ({ one }) => ({
  user: one(user, { fields: [streaks.userId], references: [user.id] }),
}))
