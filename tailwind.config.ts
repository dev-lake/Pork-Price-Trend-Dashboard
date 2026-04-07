import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#0f766e',
          600: '#0d5f59',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
