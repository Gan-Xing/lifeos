import type { Locale } from './index'

export type HomeCopy = {
  brand: string
  nav: {
    features: string
    flow: string
    login: string
    dashboard: string
    logout: string
  }
  hero: {
    eyebrow: string
    title: string
    badge: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    bullets: string[]
  }
  panel: {
    eyebrow: string
    title: string
    body: string
    hintLabel: string
    hintBody: string
    streakLabel: string
    streakValue: string
  }
  system: {
    title: string
    forcefieldLabel: string
    items: Array<{ title: string; desc: string }>
  }
  protocol: {
    title: string
    steps: Array<{ title: string; desc: string }>
  }
  game: {
    title: string
    items: Array<{ title: string; desc: string }>
  }
  ai: {
    title: string
    desc: string
    callout: string
  }
  evidence: {
    title: string
    desc: string
    stats: Array<{ label: string; value: string }>
  }
  features: {
    title: string
    items: Array<{ title: string; desc: string }>
  }
  flow: {
    title: string
    body: string
    steps: string[]
  }
}

const copy: Record<Locale, HomeCopy> = {
  en: {
    brand: 'LifeOS · Identity System',
    nav: {
      features: 'Features',
      flow: 'Protocol',
      login: 'Log in',
      dashboard: 'Console',
      logout: 'Log out',
    },
    hero: {
      eyebrow: 'LifeOS',
      title: 'Upgrade your identity.\nGamify your life.',
      badge: 'Identity Core',
      subtitle:
        'LifeOS helps you articulate who you are, detect drift, and act with AI-backed correction loops.',
      primaryCta: 'Start Reset',
      secondaryCta: 'I have an account',
      bullets: [
        'Identity-first · Anti-vision driven · Feedback loops',
        'Visible habits · AI correction · Structured review',
      ],
    },
    panel: {
      eyebrow: 'Today',
      title: 'Identity Check-In',
      body: 'Who am I? Are my actions aligned with that identity? If I continue 5 years, who do I become?',
      hintLabel: 'AI Correction',
      hintBody:
        'Your behavior today looks like avoiding evaluation, not acting as a growing doer. Choose a verifiable 15-minute action and return to the track.',
      streakLabel: 'Current streak',
      streakValue: '4 days',
    },
    system: {
      title: 'The operating system for identity change',
      forcefieldLabel: 'Champ de force',
      items: [
        {
          title: 'Identity Core',
          desc: 'Define who you are becoming and make it the highest priority signal.',
        },
        {
          title: 'Anti‑Vision Pressure',
          desc: 'Keep the cost of drifting visible to fuel decisive action.',
        },
        {
          title: 'Feedback Loop',
          desc: 'Action → sensing → comparison → correction, repeated daily.',
        },
      ],
    },
    protocol: {
      title: '1‑Day Reset Protocol',
      steps: [
        {
          title: 'Morning · Excavation',
          desc: 'Write the anti‑vision and the smallest viable identity declaration.',
        },
        {
          title: 'Daytime · Interrupt',
          desc: 'Timed questions break autopilot and expose avoidance motives.',
        },
        {
          title: 'Night · Synthesize',
          desc: 'Turn the identity into quests, bosses, and tomorrow’s proof.',
        },
      ],
    },
    game: {
      title: 'Life as a game system',
      items: [
        { title: 'Main Quest (1 year)', desc: 'One win condition that defines the year.' },
        { title: 'Boss Fight (1 month)', desc: 'A concrete build or skill to clear next.' },
        { title: 'Daily Quest (today)', desc: 'A verifiable action that earns XP.' },
      ],
    },
    ai: {
      title: 'AI correction is not motivation',
      desc: 'When you fail a quest, AI asks why you avoided it and prescribes the next move.',
      callout: '“What are you trying to protect by not doing it?”',
    },
    evidence: {
      title: 'Evidence dashboard',
      desc: 'Track alignment, energy, and mood as proof of identity in motion.',
      stats: [
        { label: 'Alignment', value: '82%' },
        { label: 'Energy', value: '6/10' },
        { label: 'Mood', value: '7/10' },
      ],
    },
    features: {
      title: 'What powers the system',
      items: [
        {
          title: 'Identity First',
          desc: 'Track proof of becoming who you decide to be, not just tasks completed.',
        },
        {
          title: 'AI Correction',
          desc: 'Every entry is checked for drift, and the next verifiable action is proposed.',
        },
        {
          title: 'Gamified Accountability',
          desc: 'Turn goals into quests and boss fights that build visible momentum.',
        },
      ],
    },
    flow: {
      title: '1-Day Reset Protocol',
      body:
        'LifeOS creates a loop of record → reflect → correct → act → review so identity becomes daily practice.',
      steps: [
        'Log today’s most important identity actions and emotional signals.',
        'AI detects avoidance patterns and demands a verifiable next move.',
        'Convert action into quests and maintain a streak/XP chain.',
      ],
    },
  },
  zh: {
    brand: 'LifeOS · 人生系统',
    nav: {
      features: '功能',
      flow: '体验路径',
      login: '登录',
      dashboard: '控制台',
      logout: '退出',
    },
    hero: {
      eyebrow: 'LifeOS',
      title: 'Upgrade your identity.\nGamify your life.',
      badge: '身份核心',
      subtitle:
        '“升级你的身份内核，游戏化你的人生。” LifeOS 帮你把初心写下来、看见偏离、在 AI 纠偏下持续行动。',
      primaryCta: '开始重置',
      secondaryCta: '已有账号',
      bullets: ['身份优先 · 反愿景驱动 · 反馈回路', '可视化习惯 · AI 监督 · 结构化复盘'],
    },
    panel: {
      eyebrow: '今天',
      title: '身份检视',
      body: '我是谁？我在做的事是否与身份一致？如果继续这样 5 年，我会变成谁？',
      hintLabel: 'AI 纠偏提示',
      hintBody:
        '你今天的行为更像是在“逃避被评价”，而不是走向“成长中的行动者”。选择一个 15 分钟的可验证行动，重新回到身份轨道。',
      streakLabel: '当前连续行动',
      streakValue: '4 天',
    },
    system: {
      title: '身份转型的操作系统',
      forcefieldLabel: '同心力场',
      items: [
        { title: '身份核心', desc: '定义你正在成为的那个人，并作为最高优先级信号。' },
        { title: '反愿景压力', desc: '把偏离的代价持续可见，驱动决断。' },
        { title: '反馈回路', desc: '行动 → 感知 → 对比 → 纠偏，每天重复。' },
      ],
    },
    protocol: {
      title: '一日重置协议',
      steps: [
        { title: '早晨 · 挖掘', desc: '写出反愿景与最小身份声明。' },
        { title: '白天 · 中断', desc: '定时提问打断自动驾驶，暴露回避动机。' },
        { title: '夜晚 · 统合', desc: '把身份转成任务、Boss 与明日证据。' },
      ],
    },
    game: {
      title: '人生游戏化结构',
      items: [
        { title: '主线任务（1年）', desc: '唯一的胜利条件。' },
        { title: 'Boss 战（1月）', desc: '下一步要攻克的技能或构建。' },
        { title: '每日任务（今天）', desc: '可验证行动，获得 XP。' },
      ],
    },
    ai: {
      title: 'AI 纠偏不是打鸡血',
      desc: '当你未完成任务，AI 会追问“为什么”，并给出下一步行动。',
      callout: '“你在用不行动保护什么？”',
    },
    evidence: {
      title: '证据面板',
      desc: '用一致度、能量、情绪作为身份在行动的证据。',
      stats: [
        { label: '一致度', value: '82%' },
        { label: '能量', value: '6/10' },
        { label: '情绪', value: '7/10' },
      ],
    },
    features: {
      title: '系统引擎',
      items: [
        {
          title: '身份优先',
          desc: '把身份当作操作系统，记录并追踪“成为那样的人”的证据。',
        },
        {
          title: 'AI 纠偏',
          desc: '每次记录都会被反馈：是否偏离初心？下一步是什么？',
        },
        {
          title: '游戏化监督',
          desc: '把目标拆成任务与 Boss 战，让习惯成为可见进度。',
        },
      ],
    },
    flow: {
      title: '一日重置协议',
      body: 'LifeOS 通过“记录 → 反思 → 纠偏 → 行动 → 复盘”的闭环，把初心变成日常实践。',
      steps: [
        '记录今天最重要的身份行为与情绪波动。',
        'AI 识别逃避模式，并要求给出可验证行动。',
        '把行动转成任务，形成连续链与积分反馈。',
      ],
    },
  },
  fr: {
    brand: 'LifeOS · Système d’identité',
    nav: {
      features: 'Fonctions',
      flow: 'Protocole',
      login: 'Connexion',
      dashboard: 'Console',
      logout: 'Se déconnecter',
    },
    hero: {
      eyebrow: 'LifeOS',
      title: 'Améliore ton identité.\nTransforme ta vie en jeu.',
      badge: 'Noyau d’identité',
      subtitle:
        "LifeOS t’aide à formuler qui tu es, détecter les dérives et agir grâce à des boucles d’ajustement IA.",
      primaryCta: 'Démarrer le reset',
      secondaryCta: 'J’ai un compte',
      bullets: [
        'Identité d’abord · Anti-vision · Boucles de feedback',
        'Habitudes visibles · Correction IA · Revue structurée',
      ],
    },
    panel: {
      eyebrow: "Aujourd'hui",
      title: 'Bilan d’identité',
      body:
        'Qui suis-je ? Mes actions sont-elles alignées ? Si je continue 5 ans ainsi, qui deviendrai-je ?',
      hintLabel: 'Correction IA',
      hintBody:
        'Aujourd’hui tu sembles éviter l’évaluation plutôt que d’agir comme un apprenant. Choisis une action vérifiable de 15 minutes pour revenir sur la trajectoire.',
      streakLabel: 'Série actuelle',
      streakValue: '4 jours',
    },
    system: {
      title: 'Le système d’exploitation de la transformation',
      forcefieldLabel: 'Forcefield',
      items: [
        { title: 'Noyau d’identité', desc: 'Définis qui tu deviens et fais-en le signal prioritaire.' },
        { title: 'Pression anti‑vision', desc: 'Garde le coût de la dérive visible pour agir.' },
        { title: 'Boucle de feedback', desc: 'Action → perception → comparaison → correction, chaque jour.' },
      ],
    },
    protocol: {
      title: 'Protocole de reset en 1 jour',
      steps: [
        { title: 'Matin · Excavation', desc: 'Écris l’anti‑vision et la déclaration minimale.' },
        { title: 'Journée · Interruption', desc: 'Questions programmées pour briser l’autopilote.' },
        { title: 'Soir · Synthèse', desc: 'Transforme l’identité en quêtes et preuves de demain.' },
      ],
    },
    game: {
      title: 'La vie comme système de jeu',
      items: [
        { title: 'Quête principale (1 an)', desc: 'Une seule condition de victoire.' },
        { title: 'Boss fight (1 mois)', desc: 'La compétence ou construction à franchir.' },
        { title: 'Quête quotidienne (aujourd’hui)', desc: 'Action vérifiable, XP gagné.' },
      ],
    },
    ai: {
      title: 'La correction IA n’est pas de la motivation',
      desc: 'Si tu échoues, l’IA demande pourquoi et prescrit la prochaine action.',
      callout: '“Que cherches‑tu à protéger en ne le faisant pas ?”',
    },
    evidence: {
      title: 'Tableau des preuves',
      desc: 'Suis alignement, énergie et humeur comme preuves de l’identité en action.',
      stats: [
        { label: 'Alignement', value: '82%' },
        { label: 'Énergie', value: '6/10' },
        { label: 'Humeur', value: '7/10' },
      ],
    },
    features: {
      title: 'Le moteur du système',
      items: [
        {
          title: "Identité d’abord",
          desc: 'Suivre les preuves de devenir la personne décidée, pas seulement les tâches.',
        },
        {
          title: 'Correction IA',
          desc: 'Chaque entrée est évaluée et mène à une action vérifiable.',
        },
        {
          title: 'Responsabilisation ludique',
          desc: 'Transformer les objectifs en quêtes et boss fights visibles.',
        },
      ],
    },
    flow: {
      title: 'Protocole de reset en 1 jour',
      body:
        'LifeOS crée une boucle enregistrer → réfléchir → corriger → agir → revoir pour ancrer l’identité.',
      steps: [
        "Noter l’action identitaire la plus importante et les signaux émotionnels.",
        "L’IA détecte l’évitement et exige une action vérifiable.",
        'Transformer l’action en quêtes et en chaîne d’XP.',
      ],
    },
  },
}

export const getHomeCopy = (locale: Locale): HomeCopy => copy[locale]
