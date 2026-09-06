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
        // Each screen rides the ring but spins the opposite way by the same
        // amount, so it orbits without ever turning away: the third rotateY
        // cancels the ring's. --a is the screen's seat on the ring, set per
        // item; --ring-r is inherited from the ring itself.
        'hero-orbit': {
          from: {
            transform:
              'rotateY(var(--a)) translateZ(var(--ring-r)) rotateY(calc(-1 * var(--a)))',
          },
          to: {
            transform:
              'rotateY(var(--a)) translateZ(var(--ring-r)) rotateY(calc(360deg - var(--a)))',
          },
        },
        // Depth cue only — every screen faces the viewer now, so the ones
        // round the back are dimmed rather than hidden.
        'hero-face': {
          '0%, 100%': { opacity: '1', filter: 'blur(0px)' },
          '33%, 67%': { opacity: '0.45', filter: 'blur(1px)' },
        },
      },
      animation: {
        'hero-spin': 'hero-spin 24s linear infinite',
        'hero-orbit': 'hero-orbit 24s linear infinite, hero-face 24s linear infinite',
      },
    },
  },
  plugins: [typography],
}

