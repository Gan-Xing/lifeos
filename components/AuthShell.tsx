'use client'

import Link from 'next/link'

import { getHomeCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

interface AuthShellProps {
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
}

export default function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getHomeCopy(locale)

  return (
    <main className="hero-sky min-h-screen">
      <div className="grid-halo min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-8 px-6 py-16">
          <Link href="/" className="text-xs uppercase tracking-[0.4em] text-subtle">
            {copy.brand}
          </Link>
          <div className="glass-panel rounded-3xl p-10">
            <h1 className="font-display text-3xl text-aura">{title}</h1>
            <p className="mt-3 text-sm text-muted">{subtitle}</p>
            <div className="mt-8 grid gap-4">{children}</div>
            <div className="mt-8 text-sm text-subtle">{footer}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
