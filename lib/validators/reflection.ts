import { z } from 'zod'

export const reflectionSchema = z.object({
  aliveMoments: z.string().min(3),
  numbMoments: z.string().min(3),
  enemyInsight: z.string().min(3),
  nextIntent: z.string().min(3),
})
