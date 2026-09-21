import { Router } from 'express'
import { db } from '../db'
import { mushafBookmarks, hadithFavorites, duaFavorites, storyBookmarks } from '../db/schema'
import { eq, and } from 'drizzle-orm'

const router = Router()

// ============ MUSHAF (QURAN) BOOKMARKS ============

// Get user's Quran bookmarks
router.get('/quran/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const bookmarks = await db
      .select()
      .from(mushafBookmarks)
      .where(eq(mushafBookmarks.userId, userId))

    res.json({ success: true, bookmarks })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Quran bookmarks' })
  }
})

// Add Quran bookmark
router.post('/quran', async (req, res) => {
  try {
    const { userId, surahNumber, ayahNumber } = req.body

    const existing = await db
      .select()
      .from(mushafBookmarks)
      .where(
        and(
          eq(mushafBookmarks.userId, userId),
          eq(mushafBookmarks.surahNumber, surahNumber),
          eq(mushafBookmarks.ayahNumber, ayahNumber)
        )
      )

    if (existing.length > 0) {
      return res.json({ success: true, message: 'Already bookmarked' })
    }

    const bookmark = await db
      .insert(mushafBookmarks)
      .values({
        userId,
        surahNumber,
        ayahNumber,
      })
      .returning()

    res.json({ success: true, bookmark: bookmark[0] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create bookmark' })
  }
})

// Remove Quran bookmark
router.delete('/quran/:userId/:surahNumber/:ayahNumber', async (req, res) => {
  try {
    const { userId, surahNumber, ayahNumber } = req.params

    await db
      .delete(mushafBookmarks)
      .where(
        and(
          eq(mushafBookmarks.userId, userId),
          eq(mushafBookmarks.surahNumber, parseInt(surahNumber)),
          eq(mushafBookmarks.ayahNumber, parseInt(ayahNumber))
        )
      )

    res.json({ success: true, message: 'Bookmark removed' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove bookmark' })
  }
})

// ============ HADITH FAVORITES ============

// Get user's Hadith favorites
router.get('/hadith/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const favorites = await db
      .select()
      .from(hadithFavorites)
      .where(eq(hadithFavorites.userId, userId))

    res.json({ success: true, favorites })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hadith favorites' })
  }
})

// Add hadith favorite
router.post('/hadith', async (req, res) => {
  try {
    const { userId, hadithId, hadithText, hadithSource } = req.body

    const existing = await db
      .select()
      .from(hadithFavorites)
      .where(and(eq(hadithFavorites.userId, userId), eq(hadithFavorites.hadithId, hadithId)))

    if (existing.length > 0) {
      return res.json({ success: true, message: 'Already favorited' })
    }

    const favorite = await db
      .insert(hadithFavorites)
      .values({
        userId,
        hadithId,
        hadithText,
        hadithSource,
      })
      .returning()

    res.json({ success: true, favorite: favorite[0] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add hadith favorite' })
  }
})

// Remove hadith favorite
router.delete('/hadith/:userId/:hadithId', async (req, res) => {
  try {
    const { userId, hadithId } = req.params

    await db
      .delete(hadithFavorites)
      .where(and(eq(hadithFavorites.userId, userId), eq(hadithFavorites.hadithId, hadithId)))

    res.json({ success: true, message: 'Favorite removed' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' })
  }
})

// ============ DUA FAVORITES ============

// Get user's Dua favorites
router.get('/dua/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const favorites = await db
      .select()
      .from(duaFavorites)
      .where(eq(duaFavorites.userId, userId))

    res.json({ success: true, favorites })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dua favorites' })
  }
})

// Add dua favorite
router.post('/dua', async (req, res) => {
  try {
    const { userId, duaId, duaText, duaTranslation, benefit } = req.body

    const existing = await db
      .select()
      .from(duaFavorites)
      .where(and(eq(duaFavorites.userId, userId), eq(duaFavorites.duaId, duaId)))

    if (existing.length > 0) {
      return res.json({ success: true, message: 'Already favorited' })
    }

    const favorite = await db
      .insert(duaFavorites)
      .values({
        userId,
        duaId,
        duaText,
        duaTranslation,
        benefit,
      })
      .returning()

    res.json({ success: true, favorite: favorite[0] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add dua favorite' })
  }
})

// Remove dua favorite
router.delete('/dua/:userId/:duaId', async (req, res) => {
  try {
    const { userId, duaId } = req.params

    await db
      .delete(duaFavorites)
      .where(and(eq(duaFavorites.userId, userId), eq(duaFavorites.duaId, duaId)))

    res.json({ success: true, message: 'Favorite removed' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' })
  }
})

// ============ STORY BOOKMARKS ============

// Get user's story bookmarks
router.get('/stories/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const bookmarks = await db
      .select()
      .from(storyBookmarks)
      .where(eq(storyBookmarks.userId, userId))

    res.json({ success: true, bookmarks })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch story bookmarks' })
  }
})

// Add story bookmark
router.post('/stories', async (req, res) => {
  try {
    const { userId, storyId } = req.body

    const existing = await db
      .select()
      .from(storyBookmarks)
      .where(and(eq(storyBookmarks.userId, userId), eq(storyBookmarks.storyId, storyId)))

    if (existing.length > 0) {
      return res.json({ success: true, message: 'Already bookmarked' })
    }

    const bookmark = await db
      .insert(storyBookmarks)
      .values({
        userId,
        storyId,
      })
      .returning()

    res.json({ success: true, bookmark: bookmark[0] })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add story bookmark' })
  }
})

// Remove story bookmark
router.delete('/stories/:userId/:storyId', async (req, res) => {
  try {
    const { userId, storyId } = req.params

    await db
      .delete(storyBookmarks)
      .where(and(eq(storyBookmarks.userId, userId), eq(storyBookmarks.storyId, storyId)))

    res.json({ success: true, message: 'Bookmark removed' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove bookmark' })
  }
})

export default router
