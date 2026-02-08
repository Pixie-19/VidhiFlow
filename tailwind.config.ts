import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--bolt-font-sans)'],
        mono: ['var(--bolt-font-mono)'],
      },
      colors: {
        bolt: {
          primary: 'var(--bolt-primary)',
          'primary-hover': 'var(--bolt-primary-hover)',
          'primary-muted': 'var(--bolt-primary-muted)',
          'primary-border': 'var(--bolt-primary-border)',
          secondary: 'var(--bolt-secondary)',
          'secondary-hover': 'var(--bolt-secondary-hover)',
          'secondary-muted': 'var(--bolt-secondary-muted)',
          background: 'var(--bolt-background)',
          surface: 'var(--bolt-surface)',
          'surface-elevated': 'var(--bolt-surface-elevated)',
          text: 'var(--bolt-text)',
          'text-muted': 'var(--bolt-text-muted)',
          'text-subtle': 'var(--bolt-text-subtle)',
          'text-inverse': 'var(--bolt-text-inverse)',
          border: 'var(--bolt-border)',
          'border-strong': 'var(--bolt-border-strong)',
        },
        judiciary: {
          gold: '#c9a227',
          navy: '#1a365d',
          cream: '#f7f4ed',
        },
        gold: {
          400: '#d4af37',
          500: '#c9a227',
          600: '#b8921f',
        },
      },
      borderRadius: {
        'bolt-sm': 'var(--bolt-radius-sm)',
        'bolt-md': 'var(--bolt-radius-md)',
        'bolt-lg': 'var(--bolt-radius-lg)',
        'bolt-xl': 'var(--bolt-radius-xl)',
      },
      boxShadow: {
        'bolt-sm': 'var(--bolt-shadow-sm)',
        'bolt-md': 'var(--bolt-shadow-md)',
        'bolt-lg': 'var(--bolt-shadow-lg)',
      },
    },
  },
  plugins: [],
};

export default config;
