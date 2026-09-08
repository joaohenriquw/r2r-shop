import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF4E00',        // acento — fundo de CTA, ícones, "2" do wordmark
          orangeText: '#D63F00',    // laranja escurecido — uso APENAS em texto (>= 4.5:1 sobre branco, WCAG AA)
          orangeHover: '#E64700',   // laranja hover em fundos
          dark: '#1B1E21',          // grafite — texto/títulos principais
          offWhite: '#F5F4F1',      // creme suave — fundo secundário
          surface: '#FAFAF8',       // superfície ainda mais clara
          border: '#E4E2DD',        // borda suave
          metal: '#D9D7D2',         // borda média
          steel: '#9AA1A7',         // aço — texto muted (NÃO usar em texto pequeno)
          slate: '#5A6167',         // texto soft (WCAG AA)
        },
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,30,33,0.04), 0 2px 8px rgba(27,30,33,0.06)',
        cardHover: '0 4px 12px rgba(255,78,0,0.10), 0 2px 4px rgba(27,30,33,0.05)',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [],
}

export default config
