import { z } from 'zod'

export const updateNafsSchema = z.object({
  prayersCompleted: z.array(z.string()).optional(),
  fastingStatus: z.boolean().optional(),
  quranMinutes: z.number().int().min(0).optional(),
  charityAmount: z.number().min(0).optional(),
  habits: z.record(z.string(), z.boolean()).optional(),
  reflection: z.string().optional(),
})
