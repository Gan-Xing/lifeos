'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

export type ThemeId = 'onyx' | 'ember' | 'arctic' | 'ivory'

export const themes: readonly ThemeId[] = ['onyx', 'ember', 'arctic', 'ivory'] as const

const STORAGE_KEY = 'lifeos:theme'
const DEFAULT_THEME: ThemeId = 'onyx'

const resolveTheme = (value: string | null): ThemeId =>
  themes.includes(value as ThemeId) ? (value as ThemeId) : DEFAULT_THEME

export const usePreferredTheme = () => {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const next = resolveTheme(stored)
    setTheme(next)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = theme
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme])

  const setPreferredTheme = useCallback((next: ThemeId) => {
    setTheme(resolveTheme(next))
  }, [])

  return useMemo(() => ({ theme, setTheme: setPreferredTheme }), [theme, setPreferredTheme])
}
