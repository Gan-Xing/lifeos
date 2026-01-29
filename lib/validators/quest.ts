import { z } from 'zod'

export const questSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  level: z.enum(['YEAR', 'MONTH', 'DAY']),
  parentQuestId: z.number().int().positive().optional(),
  dueDate: z.string().optional(),
  xp: z.number().int().nonnegative().optional(),
})

export const questUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  xp: z.number().int().nonnegative().optional(),
  status: z.enum(['ACTIVE', 'DONE', 'SKIPPED']).optional(),
  parentQuestId: z.number().int().positive().optional(),
})
