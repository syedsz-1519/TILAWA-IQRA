import { z } from 'zod'

export const createQuranBookmarkSchema = z.object({
  surahNumber: z.number().int().min(1).max(114),
  ayahNumber: z.number().int().min(1),
  pageNumber: z.number().int().optional(),
  note: z.string().optional(),
  folder: z.string().optional(),
})

export const createHadithFavoriteSchema = z.object({
  hadithId: z.string().min(1),
  hadithText: z.string().min(1),
  hadithSource: z.string().optional(),
})

export const createDuaFavoriteSchema = z.object({
  duaId: z.string().min(1),
  duaText: z.string().min(1),
  duaTranslation: z.string().optional(),
  benefit: z.string().optional(),
})

export const createStoryBookmarkSchema = z.object({
  storyId: z.string().min(1),
})
