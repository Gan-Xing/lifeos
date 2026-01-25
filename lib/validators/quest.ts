import { z } from 'zod'

export const questSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  level: z.enum(['YEAR', 'MONTH', 'DAY']),
  dueDate: z.string().optional(),
  xp: z.number().int().nonnegative().optional(),
})
