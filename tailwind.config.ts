import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--bg)',
        aura: 'var(--text)',
        ember: 'var(--primary)',
        moss: 'var(--secondary)',
        dusk: 'var(--surface)',
        muted: 'var(--muted)',
        subtle: 'var(--muted-strong)',
        border: 'var(--border)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 0.6s ease both',
        shimmer: 'shimmer 12s ease infinite',
      },
    },
  },
  plugins: [],
}

export default config
