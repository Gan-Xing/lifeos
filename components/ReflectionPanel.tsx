'use client'

import { useCallback, useEffect, useState } from 'react'

import { getConsoleCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

type Reflection = {
  id: number
  entryDate: string
  aliveMoments: string
  numbMoments: string
  enemyInsight: string
  nextIntent: string
}

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export default function ReflectionPanel() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getConsoleCopy(locale)
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [form, setForm] = useState({
    aliveMoments: '',
    numbMoments: '',
    enemyInsight: '',
    nextIntent: '',
  })

  const load = useCallback(async () => {
    try {
      setMessage(null)
      setLoading(true)
      const res = await fetch('/api/reflections')
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? copy.status.failed)
      }
      setReflections(data.reflections ?? [])
    } catch (err) {
      setMessage(err instanceof Error ? err.message : copy.status.failed)
    } finally {
      setLoading(false)
    }
  }, [copy.status.failed])

  useEffect(() => {
    void load()
  }, [load])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    try {
      const res = await fetch('/api/reflections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? copy.status.failed)
      }
      setForm({ aliveMoments: '', numbMoments: '', enemyInsight: '', nextIntent: '' })
      await load()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : copy.status.failed)
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="glass-panel rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.reflection.title}</p>
        <p className="mt-2 text-sm text-muted">{copy.reflection.subtitle}</p>
        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
            {copy.reflection.fields.alive}
            <textarea
              className="min-h-[90px] rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
              value={form.aliveMoments}
              onChange={(event) => setForm((prev) => ({ ...prev, aliveMoments: event.target.value }))}
              required
            />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
            {copy.reflection.fields.numb}
            <textarea
              className="min-h-[90px] rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
              value={form.numbMoments}
              onChange={(event) => setForm((prev) => ({ ...prev, numbMoments: event.target.value }))}
              required
            />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
            {copy.reflection.fields.enemy}
            <textarea
              className="min-h-[90px] rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
              value={form.enemyInsight}
              onChange={(event) => setForm((prev) => ({ ...prev, enemyInsight: event.target.value }))}
              required
            />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
            {copy.reflection.fields.intent}
            <textarea
              className="min-h-[90px] rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
              value={form.nextIntent}
              onChange={(event) => setForm((prev) => ({ ...prev, nextIntent: event.target.value }))}
              required
            />
          </label>
          {message ? <p className="text-sm text-ember">{message}</p> : null}
          <button
            type="submit"
            className="rounded-full bg-ember px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink"
          >
            {copy.reflection.submit}
          </button>
        </form>
      </div>

      <div className="glass-panel rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.reflection.listTitle}</p>
        {loading ? <p className="mt-4 text-sm text-muted">{copy.status.loading}</p> : null}
        <div className="mt-4 grid gap-3">
          {reflections.length === 0 && !loading ? (
            <p className="text-sm text-muted">{copy.reflection.empty}</p>
          ) : (
            reflections.map((reflection) => (
              <div key={reflection.id} className="rounded-2xl border border-border bg-[color:var(--panel)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-subtle">{formatDate(reflection.entryDate)}</p>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-ember">{copy.reflection.title}</span>
                </div>
                <p className="mt-3 text-sm text-aura">{reflection.nextIntent}</p>
                <p className="mt-1 text-xs text-muted">{reflection.enemyInsight}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
