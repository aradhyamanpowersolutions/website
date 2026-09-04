/**
 * Design tokens for the "plant floor" direction: concrete ground, ink text,
 * safety-orange accent. Colours are CSS variables (see globals.css) so dark mode
 * is a single token swap rather than a `dark:` variant on every element.
 */
/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ground: 'rgb(var(--ground) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        hivis: 'rgb(var(--hivis) / <alpha-value>)',
        'hivis-ink': 'rgb(var(--hivis-ink) / <alpha-value>)',
        signal: 'rgb(var(--signal) / <alpha-value>)',
        whatsapp: 'rgb(var(--whatsapp) / <alpha-value>)',
      },
      fontFamily: {
        // Archivo carries a width axis — condensed for signage, normal for text.
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Tight, deliberate display scale. Body sits at 15/16px.
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.15em' }],
        display: ['clamp(2.75rem, 6.4vw, 5rem)', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
        title: ['clamp(2rem, 3.6vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        measure: '62ch',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 50s) linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
