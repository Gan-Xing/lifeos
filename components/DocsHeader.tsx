'use client'

import Link from 'next/link'

import { getDocsCopy, locales, type Locale } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

type Props = {
  kind: 'vision' | 'specs'
  showBack?: boolean
}

export default function DocsHeader({ kind, showBack = false }: Props) {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getDocsCopy(locale)[kind]

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.eyebrow}</p>
        <h1 className="font-display text-3xl text-aura">{copy.title}</h1>
      </div>
      {showBack ? (
        <Link
          href="/dashboard"
          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted hover:text-aura"
        >
          {getDocsCopy(locale).vision.back}
        </Link>
      ) : null}
    </header>
  )
}
