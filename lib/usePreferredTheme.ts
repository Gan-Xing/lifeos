'use client'

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ThemeId = 'onyx' | 'ember' | 'arctic' | 'ivory'

export const themes: readonly ThemeId[] = ['onyx', 'ember', 'arctic', 'ivory'] as const

const STORAGE_KEY = 'lifeos:theme'
const DEFAULT_THEME: ThemeId = 'onyx'

const resolveTheme = (value: string | null): ThemeId =>
  themes.includes(value as ThemeId) ? (value as ThemeId) : DEFAULT_THEME

type ThemeState = {
  theme: ThemeId
  setTheme: (next: ThemeId) => void
}

const ThemeContext = createContext<ThemeState | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const next = resolveTheme(stored)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(next)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined' || !hydrated) return
    document.documentElement.dataset.theme = theme
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme, hydrated])

  const setPreferredTheme = useCallback((next: ThemeId) => {
    setTheme(resolveTheme(next))
  }, [])

  const value = useMemo(() => ({ theme, setTheme: setPreferredTheme }), [theme, setPreferredTheme])

  return createElement(ThemeContext.Provider, { value }, children)
}

export const usePreferredTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('usePreferredTheme must be used within a ThemeProvider')
  }
  return ctx
}
