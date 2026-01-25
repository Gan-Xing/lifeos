'use client'

import { useState } from 'react'

import EntryForm from '@/components/EntryForm'
import EntryList from '@/components/EntryList'
import { getEntriesCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

export default function DashboardClient() {
  const [refreshKey, setRefreshKey] = useState(0)
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getEntriesCopy(locale)

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="glass-panel rounded-3xl p-8">
        <h2 className="font-display text-2xl text-aura">{copy.dashboard.formTitle}</h2>
        <p className="mt-2 text-sm text-muted">{copy.dashboard.formBody}</p>
        <div className="mt-6">
          <EntryForm onCreated={() => setRefreshKey((prev) => prev + 1)} />
        </div>
      </div>
      <div className="glass-panel rounded-3xl p-8">
        <h2 className="font-display text-2xl text-aura">{copy.dashboard.listTitle}</h2>
        <p className="mt-2 text-sm text-muted">{copy.dashboard.listBody}</p>
        <div className="mt-6">
          <EntryList key={refreshKey} />
        </div>
      </div>
    </div>
  )
}
