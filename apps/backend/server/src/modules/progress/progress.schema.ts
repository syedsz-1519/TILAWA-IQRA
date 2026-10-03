import { z } from 'zod'

export const updateProgressSchema = z.object({
  surahNumber: z.number().int().min(1).max(114),
  lastAyahRead: z.number().int().min(0),
  totalAyahsInSurah: z.number().int().optional().default(286),
  pageNumber: z.number().int().optional().default(1),
  updatedAt: z.string().datetime().optional(),
})

export const batchSyncProgressSchema = z.object({
  items: z.array(
    z.object({
      surahNumber: z.number().int().min(1).max(114),
      lastAyahRead: z.number().int().min(0),
      totalAyahsInSurah: z.number().int().optional().default(286),
      pageNumber: z.number().int().optional().default(1),
      updatedAt: z.string().datetime().optional(),
    })
  ),
})
