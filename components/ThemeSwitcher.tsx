'use client'

import { themes, type ThemeId } from '@/lib/usePreferredTheme'

const themeLabels: Record<ThemeId, string> = {
  onyx: 'Onyx',
  ember: 'Ember',
  arctic: 'Arctic',
  ivory: 'Ivory',
}

export default function ThemeSwitcher({
  theme,
  onChange,
  className = '',
}: {
  theme: ThemeId
  onChange: (next: ThemeId) => void
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {themes.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.3em] transition ${
            item === theme
              ? 'border-ember text-ember'
              : 'border-border text-muted hover:text-aura'
          }`}
        >
          {themeLabels[item]}
        </button>
      ))}
    </div>
  )
}
