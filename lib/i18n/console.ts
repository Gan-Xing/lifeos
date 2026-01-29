import type { Locale } from './index'

export type ConsoleCopy = {
  status: {
    loading: string
    failed: string
  }
  identity: {
    title: string
    edit: string
    empty: string
    fields: {
      statement: string
      vision: string
      antiVision: string
      constraints: string
    }
  }
  quests: {
    title: string
    year: string
    month: string
    day: string
    empty: string
    markDone: string
    active: string
    done: string
    xpLabel: string
    parentLabel: string
  }
  progress: {
    title: string
    streakLabel: string
    xpLabel: string
    alignmentLabel: string
    energyLabel: string
    moodLabel: string
    empty: string
  }
  correction: {
    title: string
    subtitle: string
    summaryLabel: string
    correctionLabel: string
    nextLabel: string
    empty: string
    fallback: {
      alignedSummary: string
      driftSummary: string
      correctionQuestion: string
      nextActionPrompt: string
      nextActionTemplate: string
    }
  }
  reset: {
    title: string
    subtitle: string
    steps: {
      one: string
      two: string
      three: string
    }
    actions: {
      next: string
      back: string
      submit: string
    }
    fields: {
      identityStatement: string
      visionMvp: string
      antiVision: string
      constraints: string
      yearQuest: string
      monthQuest: string
      dayQuest: string
    }
    placeholders: {
      identityStatement: string
      visionMvp: string
      antiVision: string
      constraints: string
      yearQuest: string
      monthQuest: string
      dayQuest: string
    }
  }
  reflection: {
    title: string
    subtitle: string
    fields: {
      alive: string
      numb: string
      enemy: string
      intent: string
    }
    submit: string
    listTitle: string
    empty: string
  }
    interrupt: {
      title: string
      nextCheck: string
      promptLabel: string
      modeLabel: string
      modeSchedule: string
      modeRandom: string
      dismiss: string
      prompts: string[]
    }
}

const copy: Record<Locale, ConsoleCopy> = {
  en: {
    status: {
      loading: 'Loading...',
      failed: 'Something went wrong.',
    },
    identity: {
      title: 'Identity Database',
      edit: 'Edit Identity',
      empty: 'No identity profile yet. Run the 1-day reset.',
      fields: {
        statement: 'Identity statement',
        vision: 'Vision MVP',
        antiVision: 'Anti-vision',
        constraints: 'Constraints',
      },
    },
    quests: {
      title: 'Quest Board',
      year: 'Main Quest (Year)',
      month: 'Boss Fight (Month)',
      day: 'Daily Quest (Today)',
      empty: 'No quests yet. Create them in reset protocol.',
      markDone: 'Mark done',
      active: 'Active',
      done: 'Done',
      xpLabel: 'XP',
      parentLabel: 'Linked to',
    },
    progress: {
      title: 'Evidence & Streak',
      streakLabel: 'Streak',
      xpLabel: 'XP earned',
      alignmentLabel: 'Alignment',
      energyLabel: 'Energy',
      moodLabel: 'Mood',
      empty: 'No entries yet. Log today to start the loop.',
    },
    correction: {
      title: 'AI Correction',
      subtitle: 'Find drift, name avoidance, prescribe the next move.',
      summaryLabel: 'Signal',
      correctionLabel: 'Correction',
      nextLabel: 'Next action',
      empty: 'No correction yet. Log a daily entry.',
      fallback: {
        alignedSummary: 'Alignment is steady. Keep the signal clean.',
        driftSummary: 'Drift detected. Realign before the day ends.',
        correctionQuestion: 'What are you protecting by not acting?',
        nextActionPrompt: 'Define one 15-minute action and do it now.',
        nextActionTemplate: 'Complete the next action: {action}.',
      },
    },
    reset: {
      title: '1-Day Reset Protocol',
      subtitle: 'Define identity, create the quest structure, and start the loop.',
      steps: {
        one: 'Morning · Identity & Anti-vision',
        two: 'Midday · Main Quest & Boss',
        three: 'Evening · Daily Quest',
      },
      actions: {
        next: 'Next',
        back: 'Back',
        submit: 'Activate LifeOS',
      },
      fields: {
        identityStatement: 'Identity statement',
        visionMvp: 'Vision MVP',
        antiVision: 'Anti-vision',
        constraints: 'Constraints',
        yearQuest: 'Main quest (1 year)',
        monthQuest: 'Boss fight (1 month)',
        dayQuest: 'Daily quest (today)',
      },
      placeholders: {
        identityStatement: 'I am the kind of person who…',
        visionMvp: 'Describe the minimum viable future you want.',
        antiVision: 'If I do not change, in 5–10 years I will…',
        constraints: 'What will you never sacrifice?',
        yearQuest: 'Define the win condition for the year.',
        monthQuest: 'Define the next boss to defeat.',
        dayQuest: 'Define today’s verifiable action.',
      },
    },
    reflection: {
      title: 'Night Reflection',
      subtitle: 'Close the loop and prepare tomorrow’s intent.',
      fields: {
        alive: 'Alive moments',
        numb: 'Numb moments',
        enemy: 'Real enemy insight',
        intent: 'Tomorrow’s intent',
      },
      submit: 'Save reflection',
      listTitle: 'Recent reflections',
      empty: 'No reflections yet.',
    },
    interrupt: {
      title: 'Interrupt Protocol',
      nextCheck: 'Next check-in',
      promptLabel: 'Prompt',
      modeLabel: 'Mode',
      modeSchedule: 'Schedule',
      modeRandom: 'Random',
      dismiss: 'Acknowledge',
      prompts: [
        'What are you avoiding right now?',
        'If your actions were a movie, what would the audience say your goal is?',
        'What single action would prove your identity today?',
      ],
    },
  },
  zh: {
    status: {
      loading: '加载中...',
      failed: '加载失败，请稍后重试。',
    },
    identity: {
      title: '身份数据库',
      edit: '编辑身份档案',
      empty: '尚未建立身份档案，先完成一日重置。',
      fields: {
        statement: '身份声明',
        vision: '愿景 MVP',
        antiVision: '反愿景',
        constraints: '约束条件',
      },
    },
    quests: {
      title: '任务面板',
      year: '主线任务（1年）',
      month: 'Boss 战（1月）',
      day: '今日任务（今天）',
      empty: '暂无任务，请在重置协议中创建。',
      markDone: '标记完成',
      active: '进行中',
      done: '已完成',
      xpLabel: '积分',
      parentLabel: '关联',
    },
    progress: {
      title: '证据与连贯链',
      streakLabel: '连续天数',
      xpLabel: '累计积分',
      alignmentLabel: '一致度',
      energyLabel: '能量',
      moodLabel: '情绪',
      empty: '还没有日志，先记录今天。',
    },
    correction: {
      title: 'AI 纠偏',
      subtitle: '识别偏离，指出回避，给出下一步动作。',
      summaryLabel: '信号',
      correctionLabel: '纠偏问题',
      nextLabel: '下一步动作',
      empty: '暂无纠偏，先记录今日日志。',
      fallback: {
        alignedSummary: '整体一致度稳定，继续保持。',
        driftSummary: '出现偏离信号，需要尽快纠偏。',
        correctionQuestion: '你在用不行动保护什么？',
        nextActionPrompt: '定义一个 15 分钟的可验证行动并立刻完成。',
        nextActionTemplate: '完成下一步动作：{action}。',
      },
    },
    reset: {
      title: '一日重置协议',
      subtitle: '完成身份定义与任务结构，开启闭环。',
      steps: {
        one: '早晨 · 身份与反愿景',
        two: '白天 · 主线与 Boss',
        three: '夜晚 · 今日任务',
      },
      actions: {
        next: '下一步',
        back: '上一步',
        submit: '激活 LifeOS',
      },
      fields: {
        identityStatement: '身份声明',
        visionMvp: '愿景 MVP',
        antiVision: '反愿景',
        constraints: '约束条件',
        yearQuest: '主线任务（1年）',
        monthQuest: 'Boss 战（1月）',
        dayQuest: '今日任务（今天）',
      },
      placeholders: {
        identityStatement: '我是那种……的人',
        visionMvp: '描述你希望成为的最低可行未来',
        antiVision: '如果不改变，5-10 年后我会…',
        constraints: '哪些东西永远不愿意牺牲？',
        yearQuest: '设定一年的胜利条件',
        monthQuest: '定义近期要攻克的 Boss',
        dayQuest: '定义今天的可验证行动',
      },
    },
    reflection: {
      title: '晚间复盘',
      subtitle: '闭环复盘，准备明日意图。',
      fields: {
        alive: '存活时刻',
        numb: '麻木时刻',
        enemy: '真实敌人洞察',
        intent: '明日意图',
      },
      submit: '保存复盘',
      listTitle: '最近复盘',
      empty: '暂无复盘记录。',
    },
    interrupt: {
      title: '中断机制',
      nextCheck: '下一次觉醒',
      promptLabel: '提示',
      modeLabel: '模式',
      modeSchedule: '定时',
      modeRandom: '随机',
      dismiss: '知道了',
      prompts: [
        '你现在在逃避什么？',
        '如果被拍成电影，观众会认为你的目标是什么？',
        '今天哪一个行动能证明你的身份？',
      ],
    },
  },
  fr: {
    status: {
      loading: 'Chargement...',
      failed: 'Une erreur est survenue.',
    },
    identity: {
      title: "Base d'identité",
      edit: 'Modifier l’identité',
      empty: 'Aucun profil. Lance le reset 1 jour.',
      fields: {
        statement: 'Déclaration d’identité',
        vision: 'Vision MVP',
        antiVision: 'Anti‑vision',
        constraints: 'Contraintes',
      },
    },
    quests: {
      title: 'Tableau des quêtes',
      year: 'Quête principale (1 an)',
      month: 'Boss fight (1 mois)',
      day: 'Quête du jour',
      empty: 'Aucune quête. Crée‑les dans le reset.',
      markDone: 'Marquer terminé',
      active: 'Actif',
      done: 'Terminé',
      xpLabel: 'XP',
      parentLabel: 'Liée à',
    },
    progress: {
      title: 'Preuves & série',
      streakLabel: 'Série',
      xpLabel: 'XP gagné',
      alignmentLabel: 'Alignement',
      energyLabel: 'Énergie',
      moodLabel: 'Humeur',
      empty: 'Aucune entrée. Note ta journée pour démarrer.',
    },
    correction: {
      title: 'Correction IA',
      subtitle: 'Repère la dérive, nomme l’évitement, prescris le prochain pas.',
      summaryLabel: 'Signal',
      correctionLabel: 'Correction',
      nextLabel: 'Prochaine action',
      empty: 'Aucune correction. Ajoute une entrée.',
      fallback: {
        alignedSummary: 'Alignement stable. Garde le signal net.',
        driftSummary: 'Dérive détectée. Réajuste aujourd’hui.',
        correctionQuestion: 'Que protèges-tu en n’agissant pas ?',
        nextActionPrompt: 'Définis une action de 15 minutes et fais-la maintenant.',
        nextActionTemplate: 'Termine la prochaine action : {action}.',
      },
    },
    reset: {
      title: 'Protocole de reset 1 jour',
      subtitle: 'Définis l’identité et la structure des quêtes.',
      steps: {
        one: 'Matin · Identité & Anti‑vision',
        two: 'Journée · Quête & Boss',
        three: 'Soir · Quête du jour',
      },
      actions: {
        next: 'Suivant',
        back: 'Retour',
        submit: 'Activer LifeOS',
      },
      fields: {
        identityStatement: 'Déclaration d’identité',
        visionMvp: 'Vision MVP',
        antiVision: 'Anti‑vision',
        constraints: 'Contraintes',
        yearQuest: 'Quête principale (1 an)',
        monthQuest: 'Boss fight (1 mois)',
        dayQuest: 'Quête du jour',
      },
      placeholders: {
        identityStatement: "Je suis le genre de personne qui…",
        visionMvp: 'Décris le futur minimal souhaité.',
        antiVision: "Si je ne change pas, dans 5-10 ans je serai…",
        constraints: 'Que ne sacrifieras-tu jamais ?',
        yearQuest: 'Condition de victoire annuelle.',
        monthQuest: 'Définir le prochain boss.',
        dayQuest: "Définir l’action vérifiable d’aujourd’hui.",
      },
    },
    reflection: {
      title: 'Réflexion du soir',
      subtitle: 'Boucler la journée et préparer demain.',
      fields: {
        alive: 'Moments vivants',
        numb: 'Moments engourdis',
        enemy: "Vrai ennemi",
        intent: "Intention de demain",
      },
      submit: 'Enregistrer',
      listTitle: 'Réflexions récentes',
      empty: 'Aucune réflexion.',
    },
    interrupt: {
      title: "Interruption",
      nextCheck: 'Prochain check-in',
      promptLabel: 'Question',
      modeLabel: 'Mode',
      modeSchedule: 'Planifié',
      modeRandom: 'Aléatoire',
      dismiss: 'Compris',
      prompts: [
        "Qu’est-ce que tu évites ?",
        "Si tes actions étaient un film, quel serait ton objectif ?",
        "Quelle action prouverait ton identité aujourd’hui ?",
      ],
    },
  },
}

export const getConsoleCopy = (locale: Locale): ConsoleCopy => copy[locale]
