'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import AuthShell from '@/components/AuthShell'
import { getAuthCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

export default function LoginPage() {
  const router = useRouter()
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getAuthCopy(locale).login
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message ?? copy.errors.failed)
      }
      router.push('/dashboard')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : copy.errors.failed)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      footer={
        <span>
          {copy.footerPrompt}
          <Link className="text-ember" href="/register">
            {copy.footerAction}
          </Link>
        </span>
      }
    >
      <form className="grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm text-muted">
          {copy.fields.identifier}
          <input
            className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder={copy.fields.identifierPlaceholder}
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          {copy.fields.password}
          <input
            className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {message ? <p className="text-sm text-ember">{message}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-ember px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink disabled:opacity-60"
        >
          {loading ? copy.submit.loading : copy.submit.idle}
        </button>
      </form>
    </AuthShell>
  )
}
