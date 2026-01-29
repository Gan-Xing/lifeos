'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { getConsoleCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

type Feedback = {
  id: number
  summary: string
  correction: string
  nextAction: string
  severity: 'NORMAL' | 'WARNING' | 'CRITICAL'
  createdAt: string
  entry?: {
    title: string
    entryDate: string
  }
}

const severityStyles: Record<Feedback['severity'], string> = {
  NORMAL: 'border-moss text-moss',
  WARNING: 'border-ember text-ember',
  CRITICAL: 'border-ember text-ember',
}

export default function CorrectionPanel() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getConsoleCopy(locale)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/feedback')
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? copy.status.failed)
      }
      setFeedbacks(data.feedbacks ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.status.failed)
    } finally {
      setLoading(false)
    }
  }, [copy.status.failed])

  useEffect(() => {
    void load()
  }, [load])

  const latest = feedbacks[0]
  const formattedDate = useMemo(() => {
    if (!latest?.createdAt) return null
    const date = new Date(latest.createdAt)
    if (Number.isNaN(date.getTime())) return null
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)
  }, [latest])

  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.correction.title}</p>
          <p className="mt-2 text-sm text-muted">{copy.correction.subtitle}</p>
        </div>
        {loading ? <span className="text-xs text-muted">{copy.status.loading}</span> : null}
      </div>

      {error ? <p className="mt-4 text-sm text-ember">{error}</p> : null}

      {!loading && !latest ? (
        <div className="mt-6 rounded-2xl border border-border bg-[color:var(--panel)] p-5 text-sm text-muted">
          {copy.correction.empty}
        </div>
      ) : null}

      {latest ? (
        <div className="mt-6 grid gap-4">
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.correction.summaryLabel}</p>
              <span className={`rounded-full border px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] ${severityStyles[latest.severity]}`}>
                {latest.severity}
              </span>
            </div>
            <p className="mt-3 text-sm text-aura">{latest.summary}</p>
            {latest.entry?.title ? (
              <p className="mt-2 text-xs text-muted">
                {formattedDate ? `${formattedDate} · ` : ''}{latest.entry.title}
              </p>
            ) : null}
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.correction.correctionLabel}</p>
            <p className="mt-3 text-sm text-aura">{latest.correction}</p>
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.correction.nextLabel}</p>
            <p className="mt-3 text-sm text-aura">{latest.nextAction}</p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
