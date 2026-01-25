import { z } from 'zod'

export const identitySchema = z.object({
  identityStatement: z.string().min(3),
  visionMvp: z.string().min(3),
  antiVision: z.string().min(3),
  constraints: z.string().optional(),
})
