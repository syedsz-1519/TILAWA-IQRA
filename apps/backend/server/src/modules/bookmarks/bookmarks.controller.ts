import { Request, Response } from 'express'
import { BookmarksService } from './bookmarks.service'
import { sendSuccess } from '../../utils/response'
import { asyncHandler } from '../../utils/asyncHandler'
import { getUserId } from '../../middlewares/auth'

const service = new BookmarksService()

export const getQuranBookmarksHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const bookmarks = await service.getBookmarks(userId, 'quran')
  sendSuccess(res, bookmarks)
})

export const addQuranBookmarkHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const bookmark = await service.addQuranBookmark(userId, req.body)
  sendSuccess(res, bookmark, 201)
})

export const removeQuranBookmarkHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const surahNumber = parseInt(req.params['surahNumber'] as string, 10)
  const ayahNumber = parseInt(req.params['ayahNumber'] as string, 10)
  const deleted = await service.removeQuranBookmark(userId, surahNumber, ayahNumber)
  sendSuccess(res, { deleted })
})

export const getHadithFavoritesHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const favorites = await service.getBookmarks(userId, 'hadith')
  sendSuccess(res, favorites)
})

export const addHadithFavoriteHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const favorite = await service.addHadithFavorite(userId, req.body)
  sendSuccess(res, favorite, 201)
})

export const removeHadithFavoriteHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const deleted = await service.removeHadithFavorite(userId, req.params['hadithId'] as string)
  sendSuccess(res, { deleted })
})

export const getDuaFavoritesHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const favorites = await service.getBookmarks(userId, 'dua')
  sendSuccess(res, favorites)
})

export const addDuaFavoriteHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const favorite = await service.addDuaFavorite(userId, req.body)
  sendSuccess(res, favorite, 201)
})

export const removeDuaFavoriteHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const deleted = await service.removeDuaFavorite(userId, req.params['duaId'] as string)
  sendSuccess(res, { deleted })
})

export const getStoryBookmarksHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const bookmarks = await service.getBookmarks(userId, 'story')
  sendSuccess(res, bookmarks)
})

export const addStoryBookmarkHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req)
  const bookmark = await service.addStoryBookmark(userId, req.body.storyId)
  sendSuccess(res, bookmark, 201)
})

export const removeStoryBookmarkHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req.params['userId'] as string | undefined) || getUserId(req)
  const deleted = await service.removeStoryBookmark(userId, req.params['storyId'] as string)
  sendSuccess(res, { deleted })
})
