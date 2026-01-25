import type { Locale } from './index'

export type DocsCopy = {
  vision: {
    eyebrow: string
    title: string
    back: string
  }
  specs: {
    eyebrow: string
    title: string
  }
}

const copy: Record<Locale, DocsCopy> = {
  en: {
    vision: {
      eyebrow: 'North Star',
      title: 'LifeOS Product Vision',
      back: 'Back to Console',
    },
    specs: {
      eyebrow: 'Specs',
      title: 'LifeOS Requirements',
    },
  },
  zh: {
    vision: {
      eyebrow: 'North Star',
      title: 'LifeOS 产品愿景',
      back: '返回控制台',
    },
    specs: {
      eyebrow: 'Specs',
      title: 'LifeOS 开发基本要求',
    },
  },
  fr: {
    vision: {
      eyebrow: 'North Star',
      title: 'Vision produit LifeOS',
      back: 'Retour au console',
    },
    specs: {
      eyebrow: 'Specs',
      title: 'Exigences LifeOS',
    },
  },
}

export const getDocsCopy = (locale: Locale): DocsCopy => copy[locale]
