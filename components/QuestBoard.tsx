'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { getConsoleCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'
import LensTabs, { type LensKey } from '@/components/LensTabs'

type Quest = {
  id: number
  title: string
  description: string | null
  level: 'YEAR' | 'MONTH' | 'DAY'
  status: 'ACTIVE' | 'DONE' | 'SKIPPED'
  dueDate: string | null
  xp: number
  parentQuest?: {
    id: number
    title: string
    level: 'YEAR' | 'MONTH' | 'DAY'
  } | null
}

const formatDate = (value: string | null) => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date)
}

export default function QuestBoard() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getConsoleCopy(locale)
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lens, setLens] = useState<LensKey>('today')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/quests')
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? copy.status.failed)
      }
      setQuests(data.quests ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.status.failed)
    } finally {
      setLoading(false)
    }
  }, [copy.status.failed])

  useEffect(() => {
    void load()
  }, [load])

  const grouped = useMemo(() => {
    const base = {
      YEAR: [] as Quest[],
      MONTH: [] as Quest[],
      DAY: [] as Quest[],
    }
    quests.forEach((quest) => {
      base[quest.level].push(quest)
    })
    return base
  }, [quests])

  const overdue = useMemo(() => {
    const now = Date.now()
    return quests.filter((quest) => {
      if (quest.status !== 'ACTIVE') return false
      if (!quest.dueDate) return false
      const due = new Date(quest.dueDate).getTime()
      return !Number.isNaN(due) && due < now
    })
  }, [quests])


  const onMarkDone = async (questId: number) => {
    try {
      setError(null)
      const res = await fetch(`/api/quests/${questId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DONE' }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? copy.status.failed)
      }
      setQuests((prev) =>
        prev.map((quest) => (quest.id === questId ? { ...quest, status: 'DONE' } : quest)),
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.status.failed)
    }
  }

  const renderColumn = (label: string, items: Quest[]) => (
    <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-subtle">{label}</p>
        <span className="text-xs text-muted">{items.length}</span>
      </div>
      <div className="mt-4 grid gap-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted">{copy.quests.empty}</p>
        ) : (
          items.map((quest) => (
            <div key={quest.id} className="rounded-2xl border border-border bg-[color:var(--surface)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-aura">{quest.title}</p>
                  {quest.description ? <p className="mt-1 text-xs text-muted">{quest.description}</p> : null}
                  {quest.parentQuest?.title ? (
                    <p className="mt-2 text-[0.7rem] uppercase tracking-[0.2em] text-subtle">
                      {copy.quests.parentLabel} · {quest.parentQuest.title}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col items-end gap-2 text-xs">
                  <span className="rounded-full border border-border px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                    {quest.status === 'DONE' ? copy.quests.done : copy.quests.active}
                  </span>
                  {quest.xp ? (
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ember">
                      +{quest.xp} {copy.quests.xpLabel}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>{formatDate(quest.dueDate)}</span>
                {quest.status !== 'DONE' ? (
                  <button
                    type="button"
                    onClick={() => onMarkDone(quest.id)}
                    className="rounded-full border border-border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-ember"
                  >
                    {copy.quests.markDone}
                  </button>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.quests.title}</p>
        </div>
        {loading ? <span className="text-xs text-muted">{copy.status.loading}</span> : null}
      </div>
      <div className="mt-4">
        <LensTabs active={lens} onChange={setLens} />
      </div>
      {error ? <p className="mt-4 text-sm text-ember">{error}</p> : null}
      {overdue.length > 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.correction.title}</p>
          <p className="mt-3 text-sm text-aura">
            {copy.correction.fallback.driftSummary} {overdue[0]?.title ? `· ${overdue[0].title}` : ''}
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.correction.correctionLabel}</p>
              <p className="mt-2 text-aura">{copy.correction.fallback.correctionQuestion}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.correction.nextLabel}</p>
              <p className="mt-2 text-aura">
                {overdue[0]?.title
                  ? copy.correction.fallback.nextActionTemplate.replace('{action}', overdue[0].title)
                  : copy.correction.fallback.nextActionPrompt}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mt-6 grid gap-4">
        {lens === 'year' ? renderColumn(copy.quests.year, grouped.YEAR) : null}
        {lens === 'month' ? renderColumn(copy.quests.month, grouped.MONTH) : null}
        {lens === 'today' ? renderColumn(copy.quests.day, grouped.DAY) : null}
      </div>
    </section>
  )
}
