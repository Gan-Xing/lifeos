'use client'

import { useState } from 'react'

import { getEntriesCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

interface EntryFormProps {
  onCreated?: () => void
}

export default function EntryForm({ onCreated }: EntryFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getEntriesCopy(locale)
  const [form, setForm] = useState({
    title: '',
    narrative: '',
    identityStatement: '',
    antiVision: '',
    microAction: '',
    alignmentScore: 70,
    energyScore: 6,
    moodScore: 6,
  })

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value
    setForm((prev) => ({
      ...prev,
      [key]: key.includes('Score') ? Number(value) : value,
    }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? copy.form.failure)
      }
      setForm({
        title: '',
        narrative: '',
        identityStatement: '',
        antiVision: '',
        microAction: '',
        alignmentScore: 70,
        energyScore: 6,
        moodScore: 6,
      })
      onCreated?.()
      setMessage(copy.form.success)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.form.failure)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <label className="grid gap-2 text-sm text-muted">
        {copy.form.titleLabel}
        <input
          className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
          value={form.title}
          onChange={update('title')}
          required
          placeholder={copy.form.titlePlaceholder}
        />
      </label>
      <label className="grid gap-2 text-sm text-muted">
        {copy.form.narrativeLabel}
        <textarea
          className="min-h-[140px] rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
          value={form.narrative}
          onChange={update('narrative')}
          required
          placeholder={copy.form.narrativePlaceholder}
        />
      </label>
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm text-muted">
          {copy.form.identityLabel}
          <input
            className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
            value={form.identityStatement}
            onChange={update('identityStatement')}
            placeholder={copy.form.identityPlaceholder}
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          {copy.form.antiVisionLabel}
          <input
            className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
            value={form.antiVision}
            onChange={update('antiVision')}
            placeholder={copy.form.antiVisionPlaceholder}
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-muted">
        {copy.form.microActionLabel}
        <input
          className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
          value={form.microAction}
          onChange={update('microAction')}
          placeholder={copy.form.microActionPlaceholder}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-xs text-muted">
          {copy.form.alignmentLabel} {form.alignmentScore}
          <input
            type="range"
            min="0"
            max="100"
            value={form.alignmentScore}
            onChange={update('alignmentScore')}
          />
        </label>
        <label className="grid gap-2 text-xs text-muted">
          {copy.form.energyLabel} {form.energyScore}
          <input
            type="range"
            min="0"
            max="10"
            value={form.energyScore}
            onChange={update('energyScore')}
          />
        </label>
        <label className="grid gap-2 text-xs text-muted">
          {copy.form.moodLabel} {form.moodScore}
          <input
            type="range"
            min="0"
            max="10"
            value={form.moodScore}
            onChange={update('moodScore')}
          />
        </label>
      </div>
      {message ? <p className="text-sm text-ember">{message}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-ember px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink disabled:opacity-60"
      >
        {loading ? copy.form.submitLoading : copy.form.submitIdle}
      </button>
    </form>
  )
}
