'use client'

import { LocaleProvider } from '@/lib/usePreferredLocale'
import { ThemeProvider } from '@/lib/usePreferredTheme'
import { ToastProvider } from '@/components/ToastProvider'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <ToastProvider>{children}</ToastProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
