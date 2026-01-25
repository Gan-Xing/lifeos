'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import AuthShell from '@/components/AuthShell'
import { getAuthCopy, locales } from '@/lib/i18n'
import { usePreferredLocale } from '@/lib/usePreferredLocale'

export default function RegisterPage() {
  const router = useRouter()
  const { locale } = usePreferredLocale('zh', locales)
  const copy = getAuthCopy(locale).register
  const [form, setForm] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  return (
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      footer={
        <span>
          {copy.footerPrompt}
          <Link className="text-ember" href="/login">
            {copy.footerAction}
          </Link>
        </span>
      }
    >
      <form className="grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-2 text-sm text-muted">
          {copy.fields.displayName}
          <input
            className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
            value={form.displayName}
            onChange={update('displayName')}
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          {copy.fields.username}
          <input
            className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
            value={form.username}
            onChange={update('username')}
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          {copy.fields.email}
          <input
            type="email"
            className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
            value={form.email}
            onChange={update('email')}
            required
          />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          {copy.fields.password}
          <input
            type="password"
            className="rounded-2xl border border-border bg-[color:var(--panel)] px-4 py-3 text-aura outline-none focus:border-ember"
            value={form.password}
            onChange={update('password')}
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
