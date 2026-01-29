'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { getConsoleCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

const stepKeys = ['one', 'two', 'three'] as const

type StepKey = (typeof stepKeys)[number]

type ResetForm = {
  identityStatement: string
  visionMvp: string
  antiVision: string
  constraints: string
  yearQuest: string
  monthQuest: string
  dayQuest: string
}

const withOptional = (value: string) => (value.trim().length > 0 ? value.trim() : undefined)

const buildDueDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

export default function ResetProtocol() {
  const router = useRouter()
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getConsoleCopy(locale)
  const [step, setStep] = useState<StepKey>('one')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [form, setForm] = useState<ResetForm>({
    identityStatement: '',
    visionMvp: '',
    antiVision: '',
    constraints: '',
    yearQuest: '',
    monthQuest: '',
    dayQuest: '',
  })

  const stepIndex = stepKeys.indexOf(step)
  const canGoNext = useMemo(() => {
    if (step === 'one') {
      return [form.identityStatement, form.visionMvp, form.antiVision].every((value) => value.trim().length > 0)
    }
    if (step === 'two') {
      return [form.yearQuest, form.monthQuest].every((value) => value.trim().length > 0)
    }
    return form.dayQuest.trim().length > 0
  }, [form, step])

  const nextStep = () => {
    const next = stepKeys[Math.min(stepIndex + 1, stepKeys.length - 1)]
    setStep(next)
  }

  const prevStep = () => {
    const next = stepKeys[Math.max(stepIndex - 1, 0)]
    setStep(next)
  }

  const onSubmit = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const identityRes = await fetch('/api/identity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identityStatement: form.identityStatement.trim(),
          visionMvp: form.visionMvp.trim(),
          antiVision: form.antiVision.trim(),
          constraints: withOptional(form.constraints),
        }),
      })
      const identityData = await identityRes.json()
      if (!identityRes.ok) {
        throw new Error(identityData.message ?? copy.status.failed)
      }

      const yearRes = await fetch('/api/quests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.yearQuest.trim(),
          level: 'YEAR',
          dueDate: buildDueDate(365),
          xp: 500,
        }),
      })
      const yearData = await yearRes.json()
      if (!yearRes.ok) {
        throw new Error(yearData.message ?? copy.status.failed)
      }

      const monthRes = await fetch('/api/quests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.monthQuest.trim(),
          level: 'MONTH',
          parentQuestId: yearData.quest?.id,
          dueDate: buildDueDate(30),
          xp: 200,
        }),
      })
      const monthData = await monthRes.json()
      if (!monthRes.ok) {
        throw new Error(monthData.message ?? copy.status.failed)
      }

      const dayRes = await fetch('/api/quests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.dayQuest.trim(),
          level: 'DAY',
          parentQuestId: monthData.quest?.id,
          dueDate: buildDueDate(1),
          xp: 50,
        }),
      })
      const dayData = await dayRes.json()
      if (!dayRes.ok) {
        throw new Error(dayData.message ?? copy.status.failed)
      }

      router.push('/dashboard')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : copy.status.failed)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.reset.title}</p>
          <p className="mt-2 text-sm text-muted">{copy.reset.subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
          {stepKeys.map((key, index) => (
            <span
              key={key}
              className={`rounded-full border px-3 py-1 ${
                index <= stepIndex ? 'border-ember text-ember' : 'border-border text-muted'
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-[color:var(--panel)] p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.reset.steps[step]}</p>
      </div>

      <div className="mt-6 grid gap-4">
        {step === 'one' ? (
          <>
            <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
              {copy.reset.fields.identityStatement}
              <textarea
                className="min-h-[96px] rounded-2xl border border-border bg-[color:var(--surface)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
                value={form.identityStatement}
                onChange={(event) => setForm((prev) => ({ ...prev, identityStatement: event.target.value }))}
                placeholder={copy.reset.placeholders.identityStatement}
                required
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
              {copy.reset.fields.visionMvp}
              <textarea
                className="min-h-[96px] rounded-2xl border border-border bg-[color:var(--surface)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
                value={form.visionMvp}
                onChange={(event) => setForm((prev) => ({ ...prev, visionMvp: event.target.value }))}
                placeholder={copy.reset.placeholders.visionMvp}
                required
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
              {copy.reset.fields.antiVision}
              <textarea
                className="min-h-[96px] rounded-2xl border border-border bg-[color:var(--surface)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
                value={form.antiVision}
                onChange={(event) => setForm((prev) => ({ ...prev, antiVision: event.target.value }))}
                placeholder={copy.reset.placeholders.antiVision}
                required
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
              {copy.reset.fields.constraints}
              <textarea
                className="min-h-[80px] rounded-2xl border border-border bg-[color:var(--surface)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
                value={form.constraints}
                onChange={(event) => setForm((prev) => ({ ...prev, constraints: event.target.value }))}
                placeholder={copy.reset.placeholders.constraints}
              />
            </label>
          </>
        ) : null}

        {step === 'two' ? (
          <>
            <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
              {copy.reset.fields.yearQuest}
              <input
                className="rounded-2xl border border-border bg-[color:var(--surface)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
                value={form.yearQuest}
                onChange={(event) => setForm((prev) => ({ ...prev, yearQuest: event.target.value }))}
                placeholder={copy.reset.placeholders.yearQuest}
                required
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
              {copy.reset.fields.monthQuest}
              <input
                className="rounded-2xl border border-border bg-[color:var(--surface)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
                value={form.monthQuest}
                onChange={(event) => setForm((prev) => ({ ...prev, monthQuest: event.target.value }))}
                placeholder={copy.reset.placeholders.monthQuest}
                required
              />
            </label>
          </>
        ) : null}

        {step === 'three' ? (
          <label className="grid gap-2 text-xs uppercase tracking-[0.3em] text-subtle">
            {copy.reset.fields.dayQuest}
            <input
              className="rounded-2xl border border-border bg-[color:var(--surface)] px-4 py-3 text-sm text-aura outline-none focus:border-ember"
              value={form.dayQuest}
              onChange={(event) => setForm((prev) => ({ ...prev, dayQuest: event.target.value }))}
              placeholder={copy.reset.placeholders.dayQuest}
              required
            />
          </label>
        ) : null}
      </div>

      {message ? <p className="mt-4 text-sm text-ember">{message}</p> : null}

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={prevStep}
          disabled={stepIndex === 0}
          className="rounded-full border border-border px-5 py-2 text-xs uppercase tracking-[0.3em] text-muted disabled:opacity-40"
        >
          {copy.reset.actions.back}
        </button>
        {stepIndex < stepKeys.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canGoNext}
            className="rounded-full bg-ember px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink disabled:opacity-50"
          >
            {copy.reset.actions.next}
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canGoNext || loading}
            className="rounded-full bg-ember px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink disabled:opacity-50"
          >
            {loading ? copy.status.loading : copy.reset.actions.submit}
          </button>
        )}
      </div>
    </section>
  )
}
