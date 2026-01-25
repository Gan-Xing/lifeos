'use client'

import { getDashboardCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

export default function DashboardHero() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getDashboardCopy(locale)

  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.hero.eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl text-aura">{copy.hero.title}</h2>
          <p className="mt-2 text-sm text-muted">{copy.hero.body}</p>
        </div>
        <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
          <p className="text-xs text-subtle">{copy.cards.correction.label}</p>
          <p className="mt-3 text-sm text-aura">{copy.cards.correction.body}</p>
        </div>
        <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
          <p className="text-xs text-subtle">{copy.cards.streak.label}</p>
          <p className="mt-3 text-2xl font-semibold text-aura">{copy.cards.streak.value}</p>
          <p className="text-xs text-subtle">{copy.cards.streak.helper}</p>
        </div>
      </div>
    </section>
  )
}
