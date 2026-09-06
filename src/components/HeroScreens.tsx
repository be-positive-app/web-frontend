import type { CSSProperties } from 'react'
import calendarPng from '../assets/screen-calendar.png'
import calendarWebp from '../assets/screen-calendar.webp'
import newTaskPng from '../assets/screen-new-task.png'
import newTaskWebp from '../assets/screen-new-task.webp'
import signinPng from '../assets/screen-signin.png'
import signinWebp from '../assets/screen-signin.webp'

/** In the order a new user meets them: sign in, plan the day, add a task. */
const SCREENS = [
  {
    label: 'Sign in',
    png: signinPng,
    webp: signinWebp,
    alt: 'The Sign In screen: email and password fields, and buttons to continue with Google or Apple.',
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
] as const

/** Degrees between neighbours on the ring. */
const STEP = 360 / SCREENS.length
/** Seconds for a full turn. Must match the animation duration in tailwind.config.js. */
const SPIN_SECONDS = 24

/**
 * Hero device shot: the three screens ride a turntable that never stops.
 *
 * Each screen counter-rotates against the ring by the same angle, so it circles
 * without ever turning away — all three stay face-on and readable, one swinging
 * to the front while the other two sit back and to the sides. Hiding the back
 * faces instead left a single screen on show for most of the turn, which read
 * as one still picture rather than a carousel.
 *
 * The whole thing is CSS. The ring runs one linear rotation on a loop and each
 * screen runs the same loop, offset by a third of a turn — that offset is the
 * only thing React contributes. There is no state, no timer and no controls,
 * because the ring is meant to keep turning on its own.
 *
 * Hovering pauses both loops so a screen can be read, and prefers-reduced-motion
 * stops them entirely, leaving the three screens standing still in a fan.
 */
export function HeroScreens() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-brandYellow/50 blur-2xl" />
      <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-brandBlue/15 blur-2xl" />

      <div className="group/stage relative [perspective:1200px]">
        <ul
          className="relative h-[450px] [--ring-r:100px] animate-hero-spin [transform-style:preserve-3d] group-hover/stage:[animation-play-state:paused] motion-reduce:animate-none sm:h-[430px] sm:[--ring-r:150px]"
          // The resting pose, for when the animation is off under
          // prefers-reduced-motion. A running animation outranks inline styles
          // in the cascade, so this never fights the spin.
          style={{ transform: 'translateZ(calc(var(--ring-r) * -1))' }}
        >
          {SCREENS.map((screen, index) => (
            <li
              key={screen.label}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-hero-orbit group-hover/stage:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:opacity-100"
              style={
                {
                  '--a': `${index * STEP}deg`,
                  // Matches the animation's first frame, for when it is off.
                  transform:
                    `rotateY(${index * STEP}deg) translateZ(var(--ring-r))` +
                    ` rotateY(${-index * STEP}deg)`,
                  // One delay per animation, in the order the class lists
                  // them. The orbit must not be offset — the seat angle above
                  // already spreads the screens out, and delaying it would
                  // leave the counter-rotation out of step with the ring, which
                  // is what turned a screen round to face backwards. The fade
                  // is offset so a screen brightens exactly as it reaches the
                  // front, at a third of a turn per seat.
                  animationDelay: `0s, ${-SPIN_SECONDS + (index * SPIN_SECONDS) / SCREENS.length}s`,
                } as CSSProperties
              }
            >
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
