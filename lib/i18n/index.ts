export type Locale = 'en' | 'zh' | 'fr'

export const locales: readonly Locale[] = ['en', 'zh', 'fr'] as const

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  zh: '中文',
  fr: 'FR',
}

export * from './home'
export * from './auth'
export * from './dashboard'
export * from './docs'
export * from './entries'
export * from './common'
