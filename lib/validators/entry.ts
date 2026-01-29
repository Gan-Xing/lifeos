import { z } from 'zod'

export const entrySchema = z.object({
  title: z.string().min(1, '请输入标题'),
  narrative: z.string().min(1, '请输入今日记录'),
  locale: z.enum(['en', 'zh', 'fr']).optional(),
  identityStatement: z.string().optional().nullable(),
  antiVision: z.string().optional().nullable(),
  microAction: z.string().optional().nullable(),
  alignmentScore: z.number().int().min(0).max(100).optional().nullable(),
  energyScore: z.number().int().min(0).max(10).optional().nullable(),
  moodScore: z.number().int().min(0).max(10).optional().nullable(),
})
