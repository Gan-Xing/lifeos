'use client'

import { useState } from 'react'

import { getCommonCopy, localeLabels, locales } from '@/lib/i18n'
import { themes, type ThemeId } from '@/lib/usePreferredTheme'
import { usePreferredLocale } from '@/lib/usePreferredLocale'
import { usePreferredTheme } from '@/lib/usePreferredTheme'

const themeLabels: Record<ThemeId, { en: string; zh: string; fr: string }> = {
  onyx: { en: 'Onyx', zh: '曜黑', fr: 'Onyx' },
  ember: { en: 'Ember', zh: '余烬', fr: 'Braise' },
  arctic: { en: 'Arctic', zh: '霜蓝', fr: 'Arctique' },
  ivory: { en: 'Ivory', zh: '象牙', fr: 'Ivoire' },
}

export default function ControlDock({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const { locale, setLocale } = usePreferredLocale('zh', locales)
  const common = getCommonCopy(locale)
  const { theme, setTheme } = usePreferredTheme()

  return (
    <div
      className={`relative ${className}`}
      tabIndex={-1}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setOpen(false)
        }
      }}
    >
      <button
        type="button"
        aria-label="Open settings"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--panel)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted transition hover:text-aura"
      >
        <span>{common.controls.settings}</span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className={`h-3 w-3 transition ${open ? 'rotate-180' : 'rotate-0'}`}
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-72 rounded-2xl border border-border bg-[color:var(--panel)] p-4 shadow-xl shadow-black/40 backdrop-blur">
          <div className="text-xs uppercase tracking-[0.3em] text-subtle">
            {common.controls.language}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {locales.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLocale(item)}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.3em] transition ${
                  item === locale
                    ? 'border-ember text-ember'
                    : 'border-border text-muted hover:text-aura'
                }`}
              >
                {localeLabels[item]}
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs uppercase tracking-[0.3em] text-subtle">
            {common.controls.theme}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {themes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTheme(item)}
                className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.3em] transition ${
                  item === theme
                    ? 'border-ember text-ember'
                    : 'border-border text-muted hover:text-aura'
                }`}
              >
                {themeLabels[item][locale]}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
