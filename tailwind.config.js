import typography from '@tailwindcss/typography'

/**
 * Seats on the hero ring. Must match SCREENS.length in HeroScreens.tsx.
 *
 * The fade stops are derived from it rather than hand-written: a screen holds
 * the front for one seat's worth of the turn, stays fully crisp for half a seat
 * either side of it, and is dimmed by the time the next seat comes round. Fixed
 * stops silently stopped matching the ring twice while the screen count moved.
 */
const HERO_SEATS = 5
const SEAT = 100 / HERO_SEATS
const PLATEAU = SEAT / 2

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
        // Cancels the ring's rotation for whatever rides it, so a screen
        // orbits without ever turning away from the viewer. Deliberately free
        // of custom properties: a transform keyframe built out of var() is not
        // reliably interpolated everywhere, and this one is identical for every
        // screen anyway — their seats are set by a static transform instead.
        'hero-counter': {
          from: { transform: 'rotateY(0deg)' },
          to: { transform: 'rotateY(360deg)' },
        },
        // Depth cue only — every screen faces the viewer, so the ones round
        // the back are dimmed rather than hidden. The dim stops sit one seat
        // either side of the front: neighbours are one seat apart, and anything
        // tighter leaves a moment mid-crossover where every screen is dim at
        // once. Tuned for six screens — one seat is a sixth of a turn.
        'hero-face': {
          // A plateau across the front, not a single sharp peak: a linear
          // fall-off left both screens half-dim through every crossover, so
          // nothing on the ring was ever crisp. The plateau means the screen
          // handing over and the one taking over are both clear as they pass.
          [`0%, ${PLATEAU}%, ${100 - PLATEAU}%, 100%`]: {
            opacity: '1',
            filter: 'blur(0px)',
          },
          [`${SEAT}%, ${100 - SEAT}%`]: { opacity: '0.2', filter: 'blur(2.5px)' },
        },
      },
      animation: {
        'hero-spin': 'hero-spin 24s linear infinite',
        'hero-counter': 'hero-counter 24s linear infinite',
        'hero-face': 'hero-face 24s linear infinite',
      },
    },
  },
  plugins: [typography],
}

