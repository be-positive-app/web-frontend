import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: '#0808c1',
        brandYellow: '#fff45c',
        brandNavy: '#060d24',
      },
      boxShadow: {
        soft: '0 12px 30px -18px rgba(0,0,0,0.35)',
      },
      keyframes: {
        // The hero turntable. The ring is pulled back by its own radius so the
        // screen facing the viewer sits at z = 0 and never changes size.
        'hero-spin': {
          from: { transform: 'translateZ(calc(var(--ring-r) * -1)) rotateY(0deg)' },
          to: { transform: 'translateZ(calc(var(--ring-r) * -1)) rotateY(-360deg)' },
        },
        // Each screen is sharp as it passes the front (0% and 100%) and sinks
        // to a ghost across the back. The dim stops sit a third of the way
        // round rather than a sixth: neighbours are offset by a third of the
        // turn, so anything tighter leaves a moment mid-crossover where every
        // screen is dim at once. Tuned for three screens.
        'hero-face': {
          '0%, 100%': { opacity: '1', filter: 'blur(0px)' },
          '33%, 67%': { opacity: '0.5', filter: 'blur(1px)' },
        },
      },
      animation: {
        'hero-spin': 'hero-spin 24s linear infinite',
        'hero-face': 'hero-face 24s linear infinite',
      },
    },
  },
  plugins: [typography],
}

