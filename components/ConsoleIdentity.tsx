'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { getConsoleCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

type IdentityProfile = {
  identityStatement: string
  visionMvp: string
  antiVision: string
  constraints: string | null
}

export default function ConsoleIdentity() {
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getConsoleCopy(locale)
  const [profile, setProfile] = useState<IdentityProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError(null)
      const res = await fetch('/api/identity')
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? copy.status.failed)
      }
      setProfile(data.profile ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.status.failed)
    } finally {
      setLoading(false)
    }
  }, [copy.status.failed])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <section className="glass-panel rounded-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-subtle">{copy.identity.title}</p>
          <p className="mt-2 text-sm text-muted">{copy.identity.fields.statement}</p>
        </div>
        <Link
          href="/reset"
          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted hover:text-aura"
        >
          {copy.identity.edit}
        </Link>
      </div>
      {loading ? (
        <p className="mt-6 text-sm text-muted">{copy.status.loading}</p>
      ) : error ? (
        <p className="mt-6 text-sm text-ember">{error}</p>
      ) : !profile ? (
        <div className="mt-6 rounded-2xl border border-border bg-[color:var(--panel)] p-5 text-sm text-muted">
          <p>{copy.identity.empty}</p>
          <Link className="mt-3 inline-flex text-xs uppercase tracking-[0.3em] text-ember" href="/reset">
            {copy.reset.title}
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.identity.fields.statement}</p>
            <p className="mt-3 text-sm text-aura">{profile.identityStatement}</p>
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.identity.fields.vision}</p>
            <p className="mt-3 text-sm text-aura">{profile.visionMvp}</p>
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.identity.fields.antiVision}</p>
            <p className="mt-3 text-sm text-aura">{profile.antiVision}</p>
          </div>
          <div className="rounded-2xl border border-border bg-[color:var(--panel)] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-subtle">{copy.identity.fields.constraints}</p>
            <p className="mt-3 text-sm text-aura">
              {profile.constraints ? profile.constraints : '-'}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
