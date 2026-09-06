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
        // The desktop rail. The screen list is rendered twice, so travelling
        // exactly half the track and snapping back is seamless. Percentages,
        // not pixels or custom properties, so it holds for any list length.
        'hero-rail': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        // Slow enough to read a screen as it goes past.
        'hero-rail': 'hero-rail 55s linear infinite',
      },
    },
  },
  plugins: [typography],
}

