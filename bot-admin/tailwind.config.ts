import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        noria: {
          teal: '#0D7377',
          navy: '#062231',
          cream: '#F4EFE6',
          coral: '#FF6B5B',
          mist: '#7FD1CC',
        },
      },
    },
  },
  plugins: [],
}

export default config
