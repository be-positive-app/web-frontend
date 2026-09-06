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
        // The list is rendered twice and travels exactly half the track, so the
        // loop closes on itself with no jump.
        'hero-rail': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        // 1360px per copy over 38s, about 36px/s: clearly moving, still slow
        // enough to read a screen as it goes by.
        'hero-rail': 'hero-rail 38s linear infinite',
      },
    },
  },
  plugins: [typography],
}

