import { z } from 'zod'

export const updateHifzProgressSchema = z.object({
  cardId: z.string().min(1, 'cardId is required'),
  deckId: z.string().min(1, 'deckId is required'),
  quality: z.number().int().min(0).max(5, 'quality score must be between 0 and 5'),
})

export const getHifzProgressQuerySchema = z.object({
  deckId: z.string().optional(),
  status: z.enum(['new', 'learning', 'review', 'mastered']).optional(),
  dueOnly: z.enum(['true', 'false']).optional(),
})
