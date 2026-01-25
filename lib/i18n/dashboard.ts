import type { Locale } from './index'

export type DashboardCopy = {
  header: {
    label: string
    greeting: string
    northStar: string
    logout: string
  }
  lens: {
    year: string
    month: string
    today: string
  }
  identity: {
    title: string
    statementLabel: string
    statementPlaceholder: string
    antiVisionLabel: string
    antiVisionPlaceholder: string
    mainQuestLabel: string
    mainQuestPlaceholder: string
    bossLabel: string
    bossPlaceholder: string
  }
  hero: {
    eyebrow: string
    title: string
    body: string
  }
  cards: {
    correction: {
      label: string
      body: string
    }
    streak: {
      label: string
      value: string
      helper: string
    }
  }
  antiVision: {
    label: string
    body: string
    callout: string
  }
}

const copy: Record<Locale, DashboardCopy> = {
  en: {
    header: {
      label: 'Dashboard',
      greeting: 'Welcome back, {name}',
      northStar: 'North Star',
      logout: 'Log out',
    },
    lens: {
      year: 'Year Lens',
      month: 'Month Lens',
      today: 'Today Lens',
    },
    identity: {
      title: 'Identity Core',
      statementLabel: 'Identity statement',
      statementPlaceholder: 'Set who you are becoming',
      antiVisionLabel: 'Anti-vision',
      antiVisionPlaceholder: 'Define the life you refuse to drift into',
      mainQuestLabel: 'Main quest (1-year)',
      mainQuestPlaceholder: 'Define the win condition',
      bossLabel: 'Boss fight (1-month)',
      bossPlaceholder: 'Define the next obstacle to defeat',
    },
    hero: {
      eyebrow: 'Identity Compass',
      title: 'Today’s Focus',
      body: 'Align with your identity: Who am I becoming, and what is one verifiable action today?',
    },
    cards: {
      correction: {
        label: 'AI Correction',
        body: 'After each entry, I check alignment and suggest the next action.',
      },
      streak: {
        label: 'Action Streak',
        value: '0 days',
        helper: 'Starts after your first entry is saved.',
      },
    },
    antiVision: {
      label: 'Anti-vision',
      body: 'Keep the cost visible: what happens if you keep drifting for 5–10 years?',
      callout: 'Write the worst-case future with full sensory detail to regain control.',
    },
  },
  zh: {
    header: {
      label: 'Dashboard',
      greeting: '欢迎回来，{name}',
      northStar: '北极星目标',
      logout: '退出',
    },
    lens: {
      year: '年度透镜',
      month: '月度透镜',
      today: '今日透镜',
    },
    identity: {
      title: '身份核心',
      statementLabel: '身份声明',
      statementPlaceholder: '设定你正在成为的那个人',
      antiVisionLabel: '反愿景',
      antiVisionPlaceholder: '明确你拒绝滑向的生活',
      mainQuestLabel: '主线任务（1年）',
      mainQuestPlaceholder: '设定唯一胜利条件',
      bossLabel: 'Boss 战（1月）',
      bossPlaceholder: '定义近期需要攻克的关卡',
    },
    hero: {
      eyebrow: 'Identity Compass',
      title: '今日焦点',
      body: '聚焦身份线索：我是谁？我正在成为谁？今天做一件可验证的事。',
    },
    cards: {
      correction: {
        label: 'AI 纠偏提示',
        body: '记录完成后，我会检查行为与身份的一致度，并给出下一步行动建议。',
      },
      streak: {
        label: '连续行动',
        value: '0 天',
        helper: '保存第一条记录后开始计数。',
      },
    },
    antiVision: {
      label: '反愿景',
      body: '保持代价可见：如果继续偏离 5–10 年，会变成什么样？',
      callout: '用感官细节写下最糟糕的未来，把自己拉回掌控。',
    },
  },
  fr: {
    header: {
      label: 'Tableau de bord',
      greeting: 'Bon retour, {name}',
      northStar: 'North Star',
      logout: 'Se déconnecter',
    },
    lens: {
      year: 'Lentille annuelle',
      month: 'Lentille mensuelle',
      today: 'Lentille du jour',
    },
    identity: {
      title: 'Noyau d’identité',
      statementLabel: 'Déclaration d’identité',
      statementPlaceholder: 'Définis la personne que tu deviens',
      antiVisionLabel: 'Anti-vision',
      antiVisionPlaceholder: 'Clarifie la vie que tu refuses de subir',
      mainQuestLabel: 'Quête principale (1 an)',
      mainQuestPlaceholder: 'Définis la condition de victoire',
      bossLabel: 'Boss fight (1 mois)',
      bossPlaceholder: 'Définis le prochain obstacle à vaincre',
    },
    hero: {
      eyebrow: 'Boussole d’identité',
      title: 'Priorité du jour',
      body: "Aligne-toi : qui es-tu en train de devenir et quelle action vérifiable aujourd’hui ?",
    },
    cards: {
      correction: {
        label: 'Correction IA',
        body: "Après chaque entrée, je vérifie l’alignement et propose la prochaine action.",
      },
      streak: {
        label: 'Série d’actions',
        value: '0 jours',
        helper: 'Commence après la première entrée enregistrée.',
      },
    },
    antiVision: {
      label: 'Anti-vision',
      body: 'Garde le coût visible : que se passe-t-il si tu dérives 5–10 ans ?',
      callout: 'Écris le pire futur avec des détails sensoriels pour reprendre le contrôle.',
    },
  },
}

export const getDashboardCopy = (locale: Locale): DashboardCopy => copy[locale]
