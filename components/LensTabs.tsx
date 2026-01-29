'use client'

import { useState } from 'react'

import { getDashboardCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

const lensKeys = ['year', 'month', 'today'] as const

export type LensKey = (typeof lensKeys)[number]

export default function LensTabs({
  active,
  onChange,
}: {
  active?: LensKey
  onChange?: (next: LensKey) => void
}) {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getDashboardCopy(locale)
  const [internal, setInternal] = useState<LensKey>('today')
  const current = active ?? internal

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--panel)] p-2">
      {lensKeys.map((key) => {
        const label = copy.lens[key]
        const isActive = current === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => {
              if (onChange) {
                onChange(key)
              } else {
                setInternal(key)
              }
            }}
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
