'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import ControlDock from '@/components/ControlDock'
import { getDashboardCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

interface DashboardHeaderProps {
  displayName: string
}

export default function DashboardHeader({ displayName }: DashboardHeaderProps) {
  const router = useRouter()
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getDashboardCopy(locale)

  const onLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-subtle">{copy.header.label}</p>
        <h1 className="font-display text-3xl text-aura">
          {copy.header.greeting.replace('{name}', displayName)}
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/vision"
          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted hover:text-aura"
        >
          {copy.header.northStar}
        </Link>
        <ControlDock />
        <button
          type="button"
          onClick={onLogout}
          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted hover:text-aura"
        >
          {copy.header.logout}
        </button>
      </div>
    </div>
  )
}
