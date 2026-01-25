'use client'

import { getDashboardCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

export default function DashboardAntiVision() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getDashboardCopy(locale)

  return (
    <>
      <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.antiVision.label}</p>
      <p className="mt-3 text-sm text-muted">{copy.antiVision.body}</p>
      <div className="mt-4 rounded-2xl border border-border bg-[color:var(--panel)] p-4 text-sm text-aura">
        {copy.antiVision.callout}
      </div>
    </>
  )
}
