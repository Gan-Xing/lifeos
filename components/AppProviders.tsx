'use client'

import { LocaleProvider } from '@/lib/usePreferredLocale'
import { usePreferredTheme } from '@/lib/usePreferredTheme'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  usePreferredTheme()
  return <LocaleProvider>{children}</LocaleProvider>
}
