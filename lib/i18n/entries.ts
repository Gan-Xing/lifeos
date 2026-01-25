import type { Locale } from './index'

export type EntriesCopy = {
  dashboard: {
    formTitle: string
    formBody: string
    listTitle: string
    listBody: string
  }
  form: {
    titleLabel: string
    titlePlaceholder: string
    narrativeLabel: string
    narrativePlaceholder: string
    identityLabel: string
    identityPlaceholder: string
    antiVisionLabel: string
    antiVisionPlaceholder: string
    microActionLabel: string
    microActionPlaceholder: string
    alignmentLabel: string
    energyLabel: string
    moodLabel: string
    submitIdle: string
    submitLoading: string
    success: string
    failure: string
  }
  list: {
    loading: string
    empty: string
    alignment: string
  }
}

const copy: Record<Locale, EntriesCopy> = {
  en: {
    dashboard: {
      formTitle: 'Today’s Identity Log',
      formBody: 'Capture your most important identity actions and let AI recalibrate your direction.',
      listTitle: 'Recent Logs',
      listBody: 'Track alignment scores and evidence of action over time.',
    },
    form: {
      titleLabel: 'Today’s title',
      titlePlaceholder: 'Example: Return to the identity actor',
      narrativeLabel: 'Today’s narrative',
      narrativePlaceholder: 'What happened today? What role did your identity play?',
      identityLabel: 'Identity statement (optional)',
      identityPlaceholder: 'I am someone who chooses growth',
      antiVisionLabel: 'Anti-vision reminder (optional)',
      antiVisionPlaceholder: 'If I do not change, I will lose…',
      microActionLabel: 'Micro action today (optional)',
      microActionPlaceholder: '15 minutes: execute one critical step',
      alignmentLabel: 'Alignment',
      energyLabel: 'Energy',
      moodLabel: 'Mood',
      submitIdle: 'Save today’s log',
      submitLoading: 'Saving…',
      success: 'Saved. Next, generate an AI correction prompt.',
      failure: 'Save failed',
    },
    list: {
      loading: 'Loading logs…',
      empty: 'No logs yet. Start today.',
      alignment: 'Alignment',
    },
  },
  zh: {
    dashboard: {
      formTitle: '今日身份记录',
      formBody: '把今天最重要的身份行为写下来，让 AI 帮你校准方向。',
      listTitle: '最近记录',
      listBody: '持续追踪身份一致度与行动证据。',
    },
    form: {
      titleLabel: '今日标题',
      titlePlaceholder: '例如：回到身份行动者',
      narrativeLabel: '今日记录',
      narrativePlaceholder: '今天发生了什么？你的身份在其中扮演了什么角色？',
      identityLabel: '身份宣言（可选）',
      identityPlaceholder: '我是一个愿意成长的人',
      antiVisionLabel: '反愿景提醒（可选）',
      antiVisionPlaceholder: '如果不改变，我会失去…',
      microActionLabel: '今日微行动（可选）',
      microActionPlaceholder: '15 分钟：完成关键的一小步',
      alignmentLabel: '身份一致度',
      energyLabel: '能量',
      moodLabel: '情绪',
      submitIdle: '保存今天的记录',
      submitLoading: '保存中…',
      success: '已记录。下一步可以生成 AI 纠偏反馈。',
      failure: '保存失败',
    },
    list: {
      loading: '加载记录中…',
      empty: '还没有记录，从今天开始吧。',
      alignment: '一致度',
    },
  },
  fr: {
    dashboard: {
      formTitle: "Journal d’identité du jour",
      formBody: 'Note tes actions identitaires clés et laisse l’IA ajuster ta direction.',
      listTitle: 'Entrées récentes',
      listBody: "Suivre l’alignement et les preuves d’action dans le temps.",
    },
    form: {
      titleLabel: 'Titre du jour',
      titlePlaceholder: 'Exemple : Revenir à mon identité d’acteur',
      narrativeLabel: 'Récit du jour',
      narrativePlaceholder: "Que s’est-il passé ? Quel rôle a joué ton identité ?",
      identityLabel: 'Déclaration d’identité (optionnel)',
      identityPlaceholder: 'Je suis quelqu’un qui choisit la croissance',
      antiVisionLabel: 'Anti-vision (optionnel)',
      antiVisionPlaceholder: "Si je ne change pas, je perdrai…",
      microActionLabel: 'Micro-action du jour (optionnel)',
      microActionPlaceholder: '15 minutes : accomplir une étape clé',
      alignmentLabel: 'Alignement',
      energyLabel: 'Énergie',
      moodLabel: 'Humeur',
      submitIdle: 'Enregistrer le journal du jour',
      submitLoading: 'Enregistrement…',
      success: 'Enregistré. Ensuite, génère une correction IA.',
      failure: 'Échec de l’enregistrement',
    },
    list: {
      loading: 'Chargement des entrées…',
      empty: "Pas encore d’entrées. Commence aujourd’hui.",
      alignment: 'Alignement',
    },
  },
}

export const getEntriesCopy = (locale: Locale): EntriesCopy => copy[locale]
