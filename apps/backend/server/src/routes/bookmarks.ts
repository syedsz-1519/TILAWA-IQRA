import { Router } from 'express'
import { Bookmark } from '../models'

const router = Router()

// ============ MUSHAF (QURAN) BOOKMARKS ============

// Get user's Quran bookmarks
router.get('/quran/:userId', async (_req, res) => {
  try {
    const { userId } = _req.params
    const bookmarks = await Bookmark.find({ userId, type: 'quran' }).sort({ createdAt: -1 })

    res.json({ success: true, bookmarks })
  } catch (error) {
    console.error('Error fetching Quran bookmarks:', error)
    res.status(500).json({ error: 'Failed to fetch Quran bookmarks' })
  }
})

// Add Quran bookmark
router.post('/quran', async (req, res) => {
  try {
    const { userId, surahNumber, ayahNumber } = req.body

    if (!userId || !surahNumber || !ayahNumber) {
      res.status(400).json({ error: 'userId, surahNumber, and ayahNumber are required' })
      return
    }

    // Check if already bookmarked
    const existing = await Bookmark.findOne({
      userId,
      type: 'quran',
      itemId: `${surahNumber}-${ayahNumber}`,
    })

    if (existing) {
      res.json({ success: true, message: 'Already bookmarked', bookmark: existing })
      return
    }

    const bookmark = await Bookmark.create({
      userId,
      type: 'quran',
      itemId: `${surahNumber}-${ayahNumber}`,
      surahNumber,
      ayahNumber,
    })

    res.status(201).json({ success: true, bookmark })
  } catch (error) {
    console.error('Error creating Quran bookmark:', error)
    res.status(500).json({ error: 'Failed to create bookmark' })
  }
})

// Remove Quran bookmark
router.delete('/quran/:userId/:surahNumber/:ayahNumber', async (_req, res) => {
  try {
    const { userId, surahNumber, ayahNumber } = _req.params

    const result = await Bookmark.findOneAndDelete({
      userId,
      type: 'quran',
      surahNumber: parseInt(surahNumber),
      ayahNumber: parseInt(ayahNumber),
    })

    res.json({ success: true, message: 'Bookmark removed', deleted: !!result })
  } catch (error) {
    console.error('Error deleting Quran bookmark:', error)
    res.status(500).json({ error: 'Failed to remove bookmark' })
  }
})

// ============ HADITH FAVORITES ============

// Get user's Hadith favorites
router.get('/hadith/:userId', async (_req, res) => {
  try {
    const { userId } = _req.params
    const favorites = await Bookmark.find({ userId, type: 'hadith' }).sort({ createdAt: -1 })

    res.json({ success: true, favorites })
  } catch (error) {
    console.error('Error fetching hadith bookmarks:', error)
    res.status(500).json({ error: 'Failed to fetch hadith bookmarks' })
  }
})

// Add hadith favorite
router.post('/hadith', async (req, res) => {
  try {
    const { userId, hadithId, hadithText, hadithSource } = req.body

    if (!userId || !hadithId) {
      res.status(400).json({ error: 'userId and hadithId are required' })
      return
    }

    // Check if already favorited
    const existing = await Bookmark.findOne({
      userId,
      type: 'hadith',
      itemId: hadithId,
    })

    if (existing) {
      res.json({ success: true, message: 'Already favorited', favorite: existing })
      return
    }

    const favorite = await Bookmark.create({
      userId,
      type: 'hadith',
      itemId: hadithId,
      hadithId,
      hadithText,
      hadithSource,
    })

    res.status(201).json({ success: true, favorite })
  } catch (error) {
    console.error('Error creating hadith favorite:', error)
    res.status(500).json({ error: 'Failed to add hadith favorite' })
  }
})

// Remove hadith favorite
router.delete('/hadith/:userId/:hadithId', async (_req, res) => {
  try {
    const { userId, hadithId } = _req.params

    const result = await Bookmark.findOneAndDelete({
      userId,
      type: 'hadith',
      hadithId,
    })

    res.json({ success: true, message: 'Favorite removed', deleted: !!result })
  } catch (error) {
    console.error('Error deleting hadith favorite:', error)
    res.status(500).json({ error: 'Failed to remove favorite' })
  }
})

// ============ DUA FAVORITES ============

// Get user's Dua favorites
router.get('/dua/:userId', async (_req, res) => {
  try {
    const { userId } = _req.params
    const favorites = await Bookmark.find({ userId, type: 'dua' }).sort({ createdAt: -1 })

    res.json({ success: true, favorites })
  } catch (error) {
    console.error('Error fetching dua bookmarks:', error)
    res.status(500).json({ error: 'Failed to fetch dua bookmarks' })
  }
})

// Add dua favorite
router.post('/dua', async (req, res) => {
  try {
    const { userId, duaId, duaText, duaTranslation, benefit } = req.body

    if (!userId || !duaId) {
      res.status(400).json({ error: 'userId and duaId are required' })
      return
    }

    // Check if already favorited
    const existing = await Bookmark.findOne({
      userId,
      type: 'dua',
      itemId: duaId,
    })

    if (existing) {
      res.json({ success: true, message: 'Already favorited', favorite: existing })
      return
    }

    const favorite = await Bookmark.create({
      userId,
      type: 'dua',
      itemId: duaId,
      duaId,
      duaText,
      duaTranslation,
      benefit,
    })

    res.status(201).json({ success: true, favorite })
  } catch (error) {
    console.error('Error creating dua favorite:', error)
    res.status(500).json({ error: 'Failed to add dua favorite' })
  }
})

// Remove dua favorite
router.delete('/dua/:userId/:duaId', async (_req, res) => {
  try {
    const { userId, duaId } = _req.params

    const result = await Bookmark.findOneAndDelete({
      userId,
      type: 'dua',
      duaId,
    })

    res.json({ success: true, message: 'Favorite removed', deleted: !!result })
  } catch (error) {
    console.error('Error deleting dua favorite:', error)
    res.status(500).json({ error: 'Failed to remove favorite' })
  }
})

// ============ STORY BOOKMARKS ============

// Get user's story bookmarks
router.get('/stories/:userId', async (_req, res) => {
  try {
    const { userId } = _req.params
    const bookmarks = await Bookmark.find({ userId, type: 'story' }).sort({ createdAt: -1 })

    res.json({ success: true, bookmarks })
  } catch (error) {
    console.error('Error fetching story bookmarks:', error)
    res.status(500).json({ error: 'Failed to fetch story bookmarks' })
  }
})

// Add story bookmark
router.post('/stories', async (req, res) => {
  try {
    const { userId, storyId } = req.body

    if (!userId || !storyId) {
      res.status(400).json({ error: 'userId and storyId are required' })
      return
    }

    // Check if already bookmarked
    const existing = await Bookmark.findOne({
      userId,
      type: 'story',
      itemId: storyId,
    })

    if (existing) {
      res.json({ success: true, message: 'Already bookmarked', bookmark: existing })
      return
    }

    const bookmark = await Bookmark.create({
      userId,
      type: 'story',
      itemId: storyId,
      storyId,
    })

    res.status(201).json({ success: true, bookmark })
  } catch (error) {
    console.error('Error creating story bookmark:', error)
    res.status(500).json({ error: 'Failed to add story bookmark' })
  }
})

// Remove story bookmark
router.delete('/stories/:userId/:storyId', async (_req, res) => {
  try {
    const { userId, storyId } = _req.params

    const result = await Bookmark.findOneAndDelete({
      userId,
      type: 'story',
      storyId,
    })

    res.json({ success: true, message: 'Bookmark removed', deleted: !!result })
  } catch (error) {
    console.error('Error deleting story bookmark:', error)
    res.status(500).json({ error: 'Failed to remove bookmark' })
  }
})

export default router
