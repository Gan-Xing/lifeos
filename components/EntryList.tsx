'use client'

import { useEffect, useMemo, useState } from 'react'

import { getEntriesCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

interface Entry {
  id: number
  title: string
  narrative: string
  entryDate: string
  alignmentScore: number | null
}

export default function EntryList() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getEntriesCopy(locale)

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(locale), [locale])

  const loadEntries = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/entries')
      const data = await res.json()
      if (res.ok) {
        setEntries(data.entries ?? [])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadEntries()
  }, [])

  if (loading) {
    return <p className="text-sm text-subtle">{copy.list.loading}</p>
  }

  if (entries.length === 0) {
    return <p className="text-sm text-subtle">{copy.list.empty}</p>
  }

  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <article key={entry.id} className="glass-panel rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs text-subtle">
            <span>{dateFormatter.format(new Date(entry.entryDate))}</span>
            <span>
              {copy.list.alignment} {entry.alignmentScore ?? '—'}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-aura">{entry.title}</h3>
          <p className="mt-2 text-sm text-muted">{entry.narrative}</p>
        </article>
      ))}
    </div>
  )
}
