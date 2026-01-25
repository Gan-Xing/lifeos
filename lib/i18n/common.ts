import type { Locale } from './index'

export type CommonCopy = {
  controls: {
    settings: string
    language: string
    theme: string
  }
}

const copy: Record<Locale, CommonCopy> = {
  en: {
    controls: {
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
    },
  },
  zh: {
    controls: {
      settings: '设置',
      language: '语言',
      theme: '主题',
    },
  },
  fr: {
    controls: {
      settings: 'Réglages',
      language: 'Langue',
      theme: 'Thème',
    },
  },
}

export const getCommonCopy = (locale: Locale): CommonCopy => copy[locale]
