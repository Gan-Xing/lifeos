'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import ControlDock from '@/components/ControlDock'
import SignalField from '@/components/SignalField'
import { getHomeCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

export default function HomePage() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getHomeCopy(locale)
  const [sessionName, setSessionName] = useState<string | null>(null)
  const [loadingSession, setLoadingSession] = useState(true)

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch('/api/auth/session')
        const data = await res.json()
        setSessionName(data.session?.displayName ?? null)
      } catch {
        setSessionName(null)
      } finally {
        setLoadingSession(false)
      }
    }
    void loadSession()
  }, [])

  const onLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setSessionName(null)
  }

  return (
    <main className="hero-sky relative min-h-screen">
      <SignalField className="pointer-events-none fixed inset-0 z-0 opacity-90" />
      <div className="grid-halo relative z-10 min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-12 px-6 pb-20 pt-12">
          <header className="flex flex-wrap items-center justify-between gap-6">
            <div className="text-sm uppercase tracking-[0.4em] text-subtle">
              <span className="brand-mark">{copy.brand}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link className="text-muted hover:text-aura" href="#features">
                {copy.nav.features}
              </Link>
              <Link className="text-muted hover:text-aura" href="#flow">
                {copy.nav.flow}
              </Link>
              {loadingSession ? null : sessionName ? (
                <>
                  <Link
                    className="rounded-full border border-border px-4 py-2 text-aura transition hover:border-border"
                    href="/dashboard"
                  >
                    {copy.nav.dashboard}
                  </Link>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="rounded-full border border-border px-4 py-2 text-muted transition hover:text-aura"
                  >
                    {copy.nav.logout}
                  </button>
                </>
              ) : (
                <Link
                  className="rounded-full border border-border px-4 py-2 text-aura transition hover:border-border"
                  href="/login"
                >
                  {copy.nav.login}
                </Link>
              )}
              <ControlDock />
            </div>
          </header>

          <section className="grid gap-12">
            <div className="flex flex-col gap-6 border-b border-border pb-10">
              <p className="fade-rise text-xs uppercase tracking-[0.4em] text-subtle">{copy.hero.eyebrow}</p>
              <h1 className="fade-rise delay-1 font-display text-4xl leading-tight text-aura md:text-5xl">
                {copy.hero.title.split('\n').map((line, index) => (
                  <span key={line}>
                    {line}
                    {index === 0 ? <br /> : null}
                  </span>
                ))}
              </h1>
              <div className="fade-rise delay-2 badge-core">
                <span aria-hidden />
                {copy.hero.badge}
              </div>
              <p className="fade-rise delay-2 max-w-2xl text-lg text-muted">{copy.hero.subtitle}</p>
              <div className="fade-rise delay-3 flex flex-wrap gap-4 pt-2">
                <Link
                  href="/register"
                  className="rounded-full bg-ember px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_20px_60px_var(--glow-1)]"
                >
                  {copy.hero.primaryCta}
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-aura"
                >
                  {copy.hero.secondaryCta}
                </Link>
              </div>
              <ul className="fade-rise delay-4 grid gap-2 text-sm text-subtle">
                {copy.hero.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <section className="grid gap-6">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <h2 className="text-sm uppercase tracking-[0.4em] text-subtle">{copy.system.title}</h2>
                <span className="text-xs text-muted">{copy.panel.streakLabel} {copy.panel.streakValue}</span>
              </div>
              <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
                <div className="glass-panel gridlines rounded-3xl p-6">
                  <div className="forcefield mx-auto h-56 w-56">
                    <div className="forcefield-ring"></div>
                    <span className="marker-dot" style={{ top: '18%', left: '52%', animationDelay: '0s' }} />
                    <span className="marker-dot" style={{ top: '64%', left: '22%', animationDelay: '0.8s' }} />
                    <span className="marker-dot" style={{ top: '70%', left: '68%', animationDelay: '1.4s' }} />
                  </div>
                  <div className="mt-6 text-xs uppercase tracking-[0.3em] text-subtle">
                    {copy.system.forcefieldLabel}
                  </div>
                  <p className="mt-2 text-sm text-muted">{copy.system.items[0].desc}</p>
                </div>
                <div className="grid gap-4">
                  {copy.system.items.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
                      <h3 className="text-base font-semibold text-aura">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-6 border-y border-border py-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold text-aura">{copy.protocol.title}</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.panel.eyebrow}</span>
              </div>
              <div className="relative grid gap-4 md:grid-cols-3">
                <div className="protocol-line hidden md:block" />
                {copy.protocol.steps.map((step, index) => (
                  <div key={step.title} className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-xs font-semibold text-aura">
                        {index + 1}
                      </span>
                      <p className="text-xs uppercase tracking-[0.3em] text-subtle">{step.title}</p>
                    </div>
                    <p className="mt-3 text-sm text-muted">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6">
              <div className="grid gap-2">
                <h2 className="text-2xl font-semibold text-aura">{copy.game.title}</h2>
                <p className="text-sm text-muted">{copy.panel.body}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {copy.game.items.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-subtle">{item.title}</p>
                    <p className="mt-3 text-sm text-muted">{item.desc}</p>
                    <div className="mt-4 h-1 w-full rounded-full bg-[color:var(--surface)]">
                      <div className="h-1 rounded-full bg-ember" style={{ width: '68%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-border bg-[color:var(--panel)] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.ai.title}</p>
                <p className="mt-4 text-sm text-muted">{copy.ai.desc}</p>
                <div className="mt-4 rounded-2xl border border-border bg-[color:var(--surface)] p-4 text-sm text-aura">
                  {copy.ai.callout}
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-[color:var(--panel)] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.evidence.title}</p>
                <p className="mt-4 text-sm text-muted">{copy.evidence.desc}</p>
                <div className="mt-4 grid gap-3">
                  {copy.evidence.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between text-sm text-aura">
                      <span>{stat.label}</span>
                      <span className="font-semibold">{stat.value}</span>
                    </div>
                  ))}
                  <div className="mt-2 h-2 w-full rounded-full bg-[color:var(--surface)]">
                    <div className="h-2 rounded-full bg-ember" style={{ width: '72%' }} />
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section id="flow" className="rounded-3xl border border-border bg-[color:var(--panel)] p-10">
            <div className="grid gap-6">
              <div>
                <h2 className="font-display text-3xl text-aura">{copy.flow.title}</h2>
                <p className="mt-4 text-sm text-muted">{copy.flow.body}</p>
              </div>
              <div className="grid gap-4 text-sm text-muted">
                {copy.flow.steps.map((step) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-ember"></span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
