import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
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
/** How long a screen faces the viewer before the ring turns again. */
const AUTO_ADVANCE_MS = 4200
/** Horizontal drag, in px, that counts as a swipe rather than a tap. */
const SWIPE_THRESHOLD = 40

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return reduced
}

/**
 * Hero device shot: the three screens stand on a turntable and the ring rotates
 * one step at a time, so a screen swings to the front, holds long enough to be
 * read, then hands over to the next.
 *
 * `turn` counts steps and is never reduced, so the ring only ever turns one
 * way — going back to the first screen keeps spinning forward instead of
 * rewinding. The active index is `turn` folded back into range.
 *
 * Rotation pauses while the pointer or keyboard focus is on the carousel, and
 * prefers-reduced-motion turns the automatic rotation off entirely; the arrows,
 * the dots and swiping still work in every case.
 */
export function HeroScreens() {
  const [turn, setTurn] = useState(0)
  const [held, setHeld] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const dragStartX = useRef<number | null>(null)

  const active = ((turn % SCREENS.length) + SCREENS.length) % SCREENS.length

  useEffect(() => {
    if (held || reducedMotion) return
    // `turn` is a dependency so a click or a swipe restarts the dwell time
    // rather than leaving the next automatic turn part-way through it.
    const timer = window.setTimeout(() => setTurn((current) => current + 1), AUTO_ADVANCE_MS)
    return () => window.clearTimeout(timer)
  }, [held, reducedMotion, turn])

  /** Shortest way round to `index`: -1, 0 or 1 steps from the active screen. */
  function goTo(index: number) {
    const delta = ((index - active + 1 + SCREENS.length) % SCREENS.length) - 1
    setTurn((current) => current + delta)
  }

  function onPointerDown(event: ReactPointerEvent) {
    dragStartX.current = event.clientX
  }

  function onPointerUp(event: ReactPointerEvent) {
    const startX = dragStartX.current
    dragStartX.current = null
    if (startX === null) return
    const dx = event.clientX - startX
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    setTurn((current) => current + (dx < 0 ? 1 : -1))
  }

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-brandYellow/50 blur-2xl" />
      <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-brandBlue/15 blur-2xl" />

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Screens from the Be Positive app"
        className="relative touch-pan-y [perspective:1200px]"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocusCapture={() => setHeld(true)}
        onBlurCapture={() => setHeld(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStartX.current = null
        }}
      >
        <ul
          className="relative h-[420px] [--ring-r:128px] [transform-style:preserve-3d] transition-transform duration-700 ease-in-out motion-reduce:transition-none sm:h-[400px] sm:[--ring-r:170px]"
          style={{
            // Pulling the whole ring back by its radius keeps the front screen
            // at z = 0, so perspective never changes its apparent size.
            transform: `translateZ(calc(var(--ring-r) * -1)) rotateY(${-turn * STEP}deg)`,
          }}
        >
          {SCREENS.map((screen, index) => {
            const isActive = index === active
            return (
              <li
                key={screen.label}
                aria-hidden={!isActive}
                className="absolute inset-0 grid place-items-center transition-[opacity,filter] duration-700 ease-in-out motion-reduce:transition-none"
                style={{
                  transform: `rotateY(${index * STEP}deg) translateZ(var(--ring-r))`,
                  opacity: isActive ? 1 : 0.3,
                  filter: isActive ? 'none' : 'blur(2px)',
                }}
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
              </li>
            )
          })}
        </ul>
      </div>

      <p className="mt-1 text-center text-xs font-bold uppercase tracking-[0.14em] text-brandBlue">
        {SCREENS[active].label}
      </p>

      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setTurn((current) => current - 1)}
          aria-label="Previous screen"
          className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-brandBlue shadow-sm transition hover:border-brandBlue/40 focus-ring"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {SCREENS.map((screen, index) => (
            <button
              key={screen.label}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show the ${screen.label} screen`}
              aria-current={index === active}
              className="group/dot grid h-6 place-items-center px-0.5 focus-ring"
            >
              <span
                className={[
                  'block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none',
                  index === active
                    ? 'w-6 bg-brandBlue'
                    : 'w-2 bg-slate-300 group-hover/dot:bg-brandBlue/50',
                ].join(' ')}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setTurn((current) => current + 1)}
          aria-label="Next screen"
          className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-brandBlue shadow-sm transition hover:border-brandBlue/40 focus-ring"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
