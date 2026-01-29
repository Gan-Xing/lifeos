'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { getConsoleCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'
import { useToast } from '@/components/ToastProvider'

const CHECKPOINTS = [11, 15, 19]
const RANDOM_MINUTES = { min: 45, max: 120 }

const formatCountdown = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
}

const getNextCheckpoint = (now: Date) => {
  const next = new Date(now)
  for (const hour of CHECKPOINTS) {
    next.setHours(hour, 0, 0, 0)
    if (now < next) return next
  }
  next.setDate(now.getDate() + 1)
  next.setHours(CHECKPOINTS[0], 0, 0, 0)
  return next
}

const getRandomCheckpoint = (now: Date) => {
  const minutes =
    RANDOM_MINUTES.min + Math.random() * (RANDOM_MINUTES.max - RANDOM_MINUTES.min)
  const next = new Date(now)
  next.setMinutes(next.getMinutes() + Math.round(minutes))
  return next
}

export default function InterruptPanel() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getConsoleCopy(locale)
  const prompts = useMemo(() => copy.interrupt.prompts, [copy.interrupt.prompts])
  const { title, dismiss } = copy.interrupt
  const { addToast } = useToast()
  const [mode, setMode] = useState<'schedule' | 'random'>('schedule')
  const [nextCheck, setNextCheck] = useState<Date | null>(null)
  const [countdown, setCountdown] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')
  const lastTrigger = useRef<number | null>(null)

  useEffect(() => {
    const pickPrompt = () => prompts[Math.floor(Math.random() * prompts.length)]

    const init = () => {
      const now = new Date()
      const next = mode === 'random' ? getRandomCheckpoint(now) : getNextCheckpoint(now)
      setNextCheck(next)
      setPrompt(pickPrompt())
      setCountdown(formatCountdown(next.getTime() - now.getTime()))
    }

    init()

    const interval = window.setInterval(() => {
      const now = new Date()
      setNextCheck((current) => {
        const base = current ?? (mode === 'random' ? getRandomCheckpoint(now) : getNextCheckpoint(now))
        if (now >= base) {
          if (lastTrigger.current !== base.getTime()) {
            lastTrigger.current = base.getTime()
            const promptText = pickPrompt()
            setPrompt(promptText)
            addToast(promptText, {
              tone: 'warning',
              variant: 'modal',
              title,
              actionLabel: dismiss,
            })
          }
          const next = mode === 'random' ? getRandomCheckpoint(now) : getNextCheckpoint(now)
          setCountdown(formatCountdown(next.getTime() - now.getTime()))
          return next
        }
        setCountdown(formatCountdown(base.getTime() - now.getTime()))
        return base
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [prompts, mode, addToast, title, dismiss])

  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.interrupt.title}</p>
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-subtle">
          <span>{copy.interrupt.modeLabel}</span>
          <button
            type="button"
            onClick={() => setMode('schedule')}
            className={`rounded-full border px-3 py-1 ${
              mode === 'schedule' ? 'border-ember text-ember' : 'border-border text-muted'
            }`}
          >
            {copy.interrupt.modeSchedule}
          </button>
          <button
            type="button"
            onClick={() => setMode('random')}
            className={`rounded-full border px-3 py-1 ${
              mode === 'random' ? 'border-ember text-ember' : 'border-border text-muted'
            }`}
          >
            {copy.interrupt.modeRandom}
          </button>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-border bg-[color:var(--panel)] p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.interrupt.promptLabel}</p>
        <p className="mt-3 text-sm text-aura">{prompt}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-subtle">
        <span>{copy.interrupt.nextCheck}</span>
        <span className="text-aura">{nextCheck ? nextCheck.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
      </div>
      <div className="mt-2 text-sm text-muted">{countdown}</div>
    </section>
  )
}
