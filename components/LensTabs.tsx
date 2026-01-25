'use client'

import { useState } from 'react'

import { getDashboardCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

const lensKeys = ['year', 'month', 'today'] as const

type LensKey = (typeof lensKeys)[number]

export default function LensTabs() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getDashboardCopy(locale)
  const [active, setActive] = useState<LensKey>('today')

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--panel)] p-2">
      {lensKeys.map((key) => {
        const label = copy.lens[key]
        const isActive = active === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
              isActive
                ? 'bg-ember text-ink'
                : 'text-muted hover:text-aura'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
