'use client'

import { getDashboardCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

export default function IdentitySnapshot() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getDashboardCopy(locale)

  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.hero.eyebrow}</p>
          <h2 className="mt-2 font-display text-2xl text-aura">{copy.identity.title}</h2>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.identity.statementLabel}</p>
          <p className="mt-3 text-sm text-muted">{copy.identity.statementPlaceholder}</p>
        </div>
        <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.identity.antiVisionLabel}</p>
          <p className="mt-3 text-sm text-muted">{copy.identity.antiVisionPlaceholder}</p>
        </div>
        <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.identity.mainQuestLabel}</p>
          <p className="mt-3 text-sm text-muted">{copy.identity.mainQuestPlaceholder}</p>
        </div>
        <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.identity.bossLabel}</p>
          <p className="mt-3 text-sm text-muted">{copy.identity.bossPlaceholder}</p>
        </div>
      </div>
    </section>
  )
}
