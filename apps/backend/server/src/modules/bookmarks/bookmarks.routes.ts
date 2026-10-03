import { Router } from 'express'
import {
  getQuranBookmarksHandler,
  addQuranBookmarkHandler,
  removeQuranBookmarkHandler,
  getHadithFavoritesHandler,
  addHadithFavoriteHandler,
  removeHadithFavoriteHandler,
  getDuaFavoritesHandler,
  addDuaFavoriteHandler,
  removeDuaFavoriteHandler,
  getStoryBookmarksHandler,
  addStoryBookmarkHandler,
  removeStoryBookmarkHandler,
} from './bookmarks.controller'
import { authenticate, optionalAuthenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import {
  createQuranBookmarkSchema,
  createHadithFavoriteSchema,
  createDuaFavoriteSchema,
  createStoryBookmarkSchema,
} from './bookmarks.schema'

const router = Router()

// Quran Bookmarks
router.get('/quran', authenticate, getQuranBookmarksHandler)
router.get('/quran/:userId', optionalAuthenticate, getQuranBookmarksHandler)
router.post('/quran', optionalAuthenticate, validate({ body: createQuranBookmarkSchema }), addQuranBookmarkHandler)
router.delete('/quran/:surahNumber/:ayahNumber', authenticate, removeQuranBookmarkHandler)
router.delete('/quran/:userId/:surahNumber/:ayahNumber', optionalAuthenticate, removeQuranBookmarkHandler)

// Hadith Favorites
router.get('/hadith', authenticate, getHadithFavoritesHandler)
router.get('/hadith/:userId', optionalAuthenticate, getHadithFavoritesHandler)
router.post('/hadith', optionalAuthenticate, validate({ body: createHadithFavoriteSchema }), addHadithFavoriteHandler)
router.delete('/hadith/:hadithId', authenticate, removeHadithFavoriteHandler)
router.delete('/hadith/:userId/:hadithId', optionalAuthenticate, removeHadithFavoriteHandler)

// Dua Favorites
router.get('/dua', authenticate, getDuaFavoritesHandler)
router.get('/dua/:userId', optionalAuthenticate, getDuaFavoritesHandler)
router.post('/dua', optionalAuthenticate, validate({ body: createDuaFavoriteSchema }), addDuaFavoriteHandler)
router.delete('/dua/:duaId', authenticate, removeDuaFavoriteHandler)
router.delete('/dua/:userId/:duaId', optionalAuthenticate, removeDuaFavoriteHandler)

// Story Bookmarks
router.get('/stories', authenticate, getStoryBookmarksHandler)
router.get('/stories/:userId', optionalAuthenticate, getStoryBookmarksHandler)
router.post('/stories', optionalAuthenticate, validate({ body: createStoryBookmarkSchema }), addStoryBookmarkHandler)
router.delete('/stories/:storyId', authenticate, removeStoryBookmarkHandler)
router.delete('/stories/:userId/:storyId', optionalAuthenticate, removeStoryBookmarkHandler)

export default router
