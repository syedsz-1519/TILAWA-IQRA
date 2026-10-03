import { z } from 'zod'

export const updateXpSchema = z.object({
  xpGain: z.number().int().min(1, 'xpGain must be at least 1'),
  minutesRead: z.number().int().min(0).optional().default(0),
})
