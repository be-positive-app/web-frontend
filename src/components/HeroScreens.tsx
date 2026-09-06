import calendarPng from '../assets/screen-calendar.png'
import calendarWebp from '../assets/screen-calendar.webp'
import homePng from '../assets/screen-home.png'
import homeWebp from '../assets/screen-home.webp'
import newTaskPng from '../assets/screen-new-task.png'
import newTaskWebp from '../assets/screen-new-task.webp'
import overviewPng from '../assets/screen-overview.png'
import overviewWebp from '../assets/screen-overview.webp'
import signinPng from '../assets/screen-signin.png'
import signinWebp from '../assets/screen-signin.webp'

/** Roughly the order a new user meets them, from signing in to looking back. */
const SCREENS = [
  {
    label: 'Sign in',
    png: signinPng,
    webp: signinWebp,
    alt: 'The Sign In screen: email and password fields, and buttons to continue with Google or Apple.',
  },
  {
    label: 'Today at a glance',
    png: homePng,
    webp: homeWebp,
    alt: "The Home screen: a Good Afternoon greeting for Friday 20 February above today's tasks — Morning Exercise at 07:00, Work on Project at 10:00, and Read Book at 20:00, ticked off.",
  },
  {
    label: 'Plan your day',
    png: calendarPng,
    webp: calendarWebp,
    alt: 'The Calendar screen: February 2026 with the 20th selected, and a Read Book task set for 20:00, repeating daily.',
  },
  {
    label: 'Add a task',
    png: newTaskPng,
    webp: newTaskWebp,
    alt: 'The New Task screen: a task name field, date and time pickers, a repeat option, a reminder toggle and a low/medium/high risk selector.',
  },
  {
    label: 'Track your progress',
    png: overviewPng,
    webp: overviewWebp,
    alt: 'The Overview screen: 64 tasks completed, an 80% completion rate, 22 active days and a best streak of 9, above a weekly productivity chart.',
  },
] as const

/** Degrees between neighbours on the ring. */
const STEP = 360 / SCREENS.length
/**
 * Seconds for a full turn. Must match the animation duration in
 * tailwind.config.js, whose HERO_SEATS must in turn match SCREENS.length —
 * the fade stops there are derived from the number of seats.
 */
const SPIN_SECONDS = 24

/**
 * Hero device shot: the screens ride a turntable that never stops.
 *
 * Each screen sits at a fixed seat on the ring, and the element inside it
 * counter-rotates against the ring so the screen circles without ever turning
 * away — every one stays face-on and readable, one swinging to the front while
 * the rest sit back and to the sides.
 *
 * The counter-rotation lives on its own element rather than sharing the seat's,
 * because the two need different phases: the counter-rotation must stay in step
 * with the ring, while the fade is offset by one seat so a screen brightens
 * exactly as it reaches the front. Sharing one animation-delay between them put
 * the counter-rotation out of step and turned a screen round to face backwards.
 *
 * The whole thing is CSS; the per-seat offsets are the only thing React
 * contributes. There are deliberately no controls and no pause-on-hover — a
 * hover pause is invisible on a phone but freezes the hero on a desktop as soon
 * as the pointer drifts over it, which reads as the carousel being broken.
 * prefers-reduced-motion still stops it, leaving the screens standing in a fan.
 */
export function HeroScreens() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-brandYellow/50 blur-2xl" />
      <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-brandBlue/15 blur-2xl" />

      <div className="relative [perspective:1200px]">
        <ul
          className="relative h-[450px] [--ring-r:130px] animate-hero-spin [transform-style:preserve-3d] motion-reduce:animate-none sm:h-[430px] sm:[--ring-r:180px]"
          // The resting pose, for when the animation is off under
          // prefers-reduced-motion. A running animation outranks inline styles
          // in the cascade, so this never fights the spin.
          style={{ transform: 'translateZ(calc(var(--ring-r) * -1))' }}
        >
          {SCREENS.map((screen, index) => (
            <li
              key={screen.label}
              className="absolute inset-0 grid place-items-center [transform-style:preserve-3d] animate-hero-face motion-reduce:animate-none motion-reduce:opacity-100"
              style={{
                // The seat: static, so the screens sit one step apart. The
                // trailing rotation undoes the seat angle, leaving the
                // counter-rotation below to cancel the ring's and nothing else.
                transform: `rotateY(${index * STEP}deg) translateZ(var(--ring-r)) rotateY(${-index * STEP}deg)`,
                animationDelay: `${-SPIN_SECONDS + (index * SPIN_SECONDS) / SCREENS.length}s`,
              }}
            >
              <div className="flex flex-col items-center gap-3 animate-hero-counter motion-reduce:animate-none">
                <picture className="contents">
                  <source srcSet={screen.webp} type="image/webp" />
                  <img
                    src={screen.png}
                    alt={screen.alt}
                    width={428}
                    height={926}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding="async"
                    draggable={false}
                    className="block h-[398px] w-[184px] select-none rounded-[24px] border-[6px] border-brandBlue bg-white object-cover object-top shadow-card sm:h-[380px] sm:w-[176px]"
                  />
                </picture>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brandBlue">
                  {screen.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
