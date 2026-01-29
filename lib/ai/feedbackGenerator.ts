import { callDeepseek } from '@/lib/ai/deepseekClient'
import { getConsoleCopy, type Locale } from '@/lib/i18n'

import type { FeedbackSeverity } from '@prisma/client'

export type FeedbackDraft = {
  summary: string
  correction: string
  nextAction: string
  severity: FeedbackSeverity
}

type EntryInput = {
  title: string
  narrative: string
  identityStatement?: string | null
  antiVision?: string | null
  microAction?: string | null
  alignmentScore?: number | null
  energyScore?: number | null
  moodScore?: number | null
}

const pickSeverity = (alignment?: number | null): FeedbackSeverity => {
  if (alignment === null || alignment === undefined) return 'NORMAL'
  if (alignment < 40) return 'CRITICAL'
  if (alignment < 70) return 'WARNING'
  return 'NORMAL'
}

const buildFallback = (locale: Locale, entry: EntryInput): FeedbackDraft => {
  const fallback = getConsoleCopy(locale).correction.fallback
  const aligned = (entry.alignmentScore ?? 70) >= 70
  const summary = aligned ? fallback.alignedSummary : fallback.driftSummary
  const correction = fallback.correctionQuestion
  const nextAction = entry.microAction
    ? fallback.nextActionTemplate.replace('{action}', entry.microAction)
    : fallback.nextActionPrompt
  return {
    summary,
    correction,
    nextAction,
    severity: pickSeverity(entry.alignmentScore),
  }
}

const buildPrompt = (locale: Locale, entry: EntryInput) => {
  const localeHint = locale === 'zh' ? 'Chinese' : locale === 'fr' ? 'French' : 'English'
  return [
    {
      role: 'system' as const,
      content:
        `You are the LifeOS correction engine. Respond in ${localeHint}. ` +
        'Return a JSON object with keys: summary, correction, nextAction, severity. ' +
        'Use severity values: NORMAL, WARNING, CRITICAL. Keep each field under 2 sentences.',
    },
    {
      role: 'user' as const,
      content: JSON.stringify({
        title: entry.title,
        narrative: entry.narrative,
        identityStatement: entry.identityStatement ?? '',
        antiVision: entry.antiVision ?? '',
        microAction: entry.microAction ?? '',
        alignmentScore: entry.alignmentScore ?? null,
        energyScore: entry.energyScore ?? null,
        moodScore: entry.moodScore ?? null,
      }),
    },
  ]
}

export const generateFeedback = async (locale: Locale, entry: EntryInput): Promise<FeedbackDraft> => {
  if (!process.env.DEEPSEEK_API_KEY) {
    return buildFallback(locale, entry)
  }

  try {
    const response = await callDeepseek({
      messages: buildPrompt(locale, entry),
      responseFormat: 'json_object',
      temperature: 0.2,
      maxTokens: 400,
    })

    const parsed = JSON.parse(response.content) as Partial<FeedbackDraft>
    if (!parsed.summary || !parsed.correction || !parsed.nextAction) {
      return buildFallback(locale, entry)
    }

    return {
      summary: parsed.summary,
      correction: parsed.correction,
      nextAction: parsed.nextAction,
      severity: parsed.severity ?? pickSeverity(entry.alignmentScore),
    }
  } catch {
    return buildFallback(locale, entry)
  }
}
