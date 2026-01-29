'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { getConsoleCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

type Entry = {
  id: number
  entryDate: string
  alignmentScore: number | null
  energyScore: number | null
  moodScore: number | null
}

type Quest = {
  id: number
  xp: number
  status: 'ACTIVE' | 'DONE' | 'SKIPPED'
}

const formatMetric = (value: number | null) => (value === null || value === undefined ? '--' : String(value))

const dateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const computeStreak = (entries: Entry[]) => {
  const days = new Set(entries.map((entry) => dateKey(new Date(entry.entryDate))))
  let streak = 0
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  while (days.has(dateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export default function ProgressPanel() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getConsoleCopy(locale)
  const [entries, setEntries] = useState<Entry[]>([])
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [entriesRes, questsRes] = await Promise.all([
        fetch('/api/entries'),
        fetch('/api/quests'),
      ])

      const entriesData = await entriesRes.json()
      const questsData = await questsRes.json()

      if (!entriesRes.ok) {
        throw new Error(entriesData.message ?? copy.status.failed)
      }
      if (!questsRes.ok) {
        throw new Error(questsData.message ?? copy.status.failed)
      }

      setEntries(entriesData.entries ?? [])
      setQuests(questsData.quests ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.status.failed)
    } finally {
      setLoading(false)
    }
  }, [copy.status.failed])

  useEffect(() => {
    void load()
  }, [load])

  const latest = entries[0]
  const streak = useMemo(() => computeStreak(entries), [entries])
  const xpTotal = useMemo(() => quests.filter((quest) => quest.status === 'DONE').reduce((sum, quest) => sum + (quest.xp ?? 0), 0), [quests])

  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.progress.title}</p>
        {loading ? <span className="text-xs text-muted">{copy.status.loading}</span> : null}
      </div>
      {error ? <p className="mt-4 text-sm text-ember">{error}</p> : null}

      {!loading && entries.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-[color:var(--panel)] p-5 text-sm text-muted">
          {copy.progress.empty}
        </div>
      ) : null}

      {entries.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.progress.streakLabel}</p>
            <p className="mt-3 text-2xl font-semibold text-aura">{streak}</p>
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.progress.xpLabel}</p>
            <p className="mt-3 text-2xl font-semibold text-aura">{xpTotal}</p>
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.progress.alignmentLabel}</p>
            <p className="mt-3 text-lg text-aura">{formatMetric(latest?.alignmentScore)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.progress.energyLabel}</p>
            <p className="mt-3 text-lg text-aura">{formatMetric(latest?.energyScore)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5 md:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.progress.moodLabel}</p>
            <p className="mt-3 text-lg text-aura">{formatMetric(latest?.moodScore)}</p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
