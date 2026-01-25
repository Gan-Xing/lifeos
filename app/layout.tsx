import type { Metadata } from 'next'
import Script from 'next/script'
import { Bricolage_Grotesque, Fraunces, League_Spartan } from 'next/font/google'

import './globals.css'
import AppProviders from '@/components/AppProviders'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
})

const brand = League_Spartan({
  subsets: ['latin'],
  variable: '--font-brand',
})

const body = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'LifeOS · 人生系统',
  description: 'Upgrade your identity. Gamify your life. 升级你的身份内核，游戏化你的人生。',
}

const bootstrapScript = `
(() => {
  try {
    const theme = localStorage.getItem('lifeos:theme');
    if (theme) {
      document.documentElement.dataset.theme = theme;
    }
    const locale = localStorage.getItem('lifeos:preferred-locale');
    if (locale) {
      document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale;
    }
  } catch {}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="onyx"
      suppressHydrationWarning
      className={`${display.variable} ${brand.variable} ${body.variable}`}
    >
      <body className="min-h-screen bg-ink text-aura antialiased">
        <Script id="lifeos-bootstrap" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
