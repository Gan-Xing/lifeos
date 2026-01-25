import type { Locale } from './index'

export type AuthCopy = {
  login: {
    title: string
    subtitle: string
    footerPrompt: string
    footerAction: string
    fields: {
      identifier: string
      identifierPlaceholder: string
      password: string
    }
    submit: {
      idle: string
      loading: string
    }
    errors: {
      failed: string
    }
  }
  register: {
    title: string
    subtitle: string
    footerPrompt: string
    footerAction: string
    fields: {
      displayName: string
      username: string
      email: string
      password: string
    }
    submit: {
      idle: string
      loading: string
    }
    errors: {
      failed: string
    }
  }
}

const copy: Record<Locale, AuthCopy> = {
  en: {
    login: {
      title: 'Return to your identity track',
      subtitle: 'Enter the LifeOS console and keep today aligned with who you are becoming.',
      footerPrompt: "Don't have an account?",
      footerAction: 'Create one',
      fields: {
        identifier: 'Username or email',
        identifierPlaceholder: 'you@example.com',
        password: 'Password',
      },
      submit: {
        idle: 'Enter LifeOS',
        loading: 'Signing in…',
      },
      errors: {
        failed: 'Login failed',
      },
    },
    register: {
      title: 'Create your LifeOS',
      subtitle: 'Start a new identity-driven system for your life.',
      footerPrompt: 'Already have an account?',
      footerAction: 'Sign in',
      fields: {
        displayName: 'Display name',
        username: 'Username',
        email: 'Email',
        password: 'Password',
      },
      submit: {
        idle: 'Create LifeOS',
        loading: 'Creating…',
      },
      errors: {
        failed: 'Registration failed',
      },
    },
  },
  zh: {
    login: {
      title: '回到你的身份轨道',
      subtitle: '登录后进入 LifeOS 仪表盘，继续今天的身份行动。',
      footerPrompt: '还没有账号？',
      footerAction: '立即创建',
      fields: {
        identifier: '用户名或邮箱',
        identifierPlaceholder: 'you@example.com',
        password: '密码',
      },
      submit: {
        idle: '进入 LifeOS',
        loading: '登录中…',
      },
      errors: {
        failed: '登录失败',
      },
    },
    register: {
      title: '创建你的 LifeOS',
      subtitle: '用身份驱动的方式开始一段新的生命系统。',
      footerPrompt: '已有账号？',
      footerAction: '立即登录',
      fields: {
        displayName: '昵称',
        username: '用户名',
        email: '邮箱',
        password: '密码',
      },
      submit: {
        idle: '创建 LifeOS',
        loading: '创建中…',
      },
      errors: {
        failed: '注册失败',
      },
    },
  },
  fr: {
    login: {
      title: "Reprends ta trajectoire d'identité",
      subtitle: 'Accède au tableau LifeOS pour rester aligné aujourd’hui.',
      footerPrompt: "Pas encore de compte ?",
      footerAction: 'Créer un compte',
      fields: {
        identifier: 'Nom d’utilisateur ou email',
        identifierPlaceholder: 'you@example.com',
        password: 'Mot de passe',
      },
      submit: {
        idle: 'Entrer dans LifeOS',
        loading: 'Connexion…',
      },
      errors: {
        failed: 'Connexion échouée',
      },
    },
    register: {
      title: 'Créer ton LifeOS',
      subtitle: 'Commence un nouveau système de vie piloté par l’identité.',
      footerPrompt: 'Déjà un compte ? ',
      footerAction: 'Se connecter',
      fields: {
        displayName: 'Nom affiché',
        username: "Nom d’utilisateur",
        email: 'Email',
        password: 'Mot de passe',
      },
      submit: {
        idle: 'Créer LifeOS',
        loading: 'Création…',
      },
      errors: {
        failed: 'Inscription échouée',
      },
    },
  },
}

export const getAuthCopy = (locale: Locale): AuthCopy => copy[locale]
