import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useState, useSyncExternalStore } from 'react'
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

/**
 * Which ends of the rail are reached, subscribed during render.
 *
 * The snapshot is a string rather than an object because useSyncExternalStore
 * compares snapshots by identity — a fresh object every call would loop for ever.
 */
function useRailEdges(rail: HTMLElement | null) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!rail) return () => {}
      rail.addEventListener('scroll', onChange, { passive: true })
      const resize = new ResizeObserver(onChange)
      resize.observe(rail)
      return () => {
        rail.removeEventListener('scroll', onChange)
        resize.disconnect()
      }
    },
    [rail],
  )

  const snapshot = useCallback(() => {
    if (!rail) return 'start,end'
    // A sub-pixel scroll position must still count as the end, or the arrow
    // sticks around with nothing left to scroll to.
    const atStart = rail.scrollLeft <= 1
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1
    return `${atStart ? 'start' : ''},${atEnd ? 'end' : ''}`
  }, [rail])

  const edges = useSyncExternalStore(subscribe, snapshot, () => 'start,end')
  return { atStart: edges.includes('start'), atEnd: edges.includes('end') }
}

/**
 * The app screens, as a slider driven by the reader.
 *
 * Arrows and a swipe, the way a video site's shelf works — deliberately not an
 * animation. Two earlier attempts moved on their own and both failed on real
 * machines rather than in testing: one turned the screens edge-on and made them
 * vanish, and the one that replaced it had to render the list twice to close
 * its loop, so the screens visibly repeated. A rail the reader scrolls has
 * neither problem, and it cannot be stopped by a browser or an accessibility
 * setting either — which is what kept making the hero look broken.
 *
 * Scroll snapping means a nudge always lands with a screen aligned, so nothing
 * is ever left half cut off at the edge.
 */
export function HeroScreens() {
  const [rail, setRail] = useState<HTMLUListElement | null>(null)
  const { atStart, atEnd } = useRailEdges(rail)

  function page(direction: -1 | 1) {
    if (!rail) return
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.85,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="relative">
        <div className="pointer-events-none absolute -top-8 left-[6%] h-40 w-40 rounded-full bg-brandYellow/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-[8%] h-48 w-48 rounded-full bg-brandBlue/10 blur-3xl" />

        <ul
          ref={setRail}
          className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] sm:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {SCREENS.map((screen, index) => (
            <li key={screen.label} className="shrink-0 snap-start">
              <figure className="m-0 flex flex-col items-center gap-3">
                <picture className="contents">
                  <source srcSet={screen.webp} type="image/webp" />
                  <img
                    src={screen.png}
                    alt={screen.alt}
                    width={428}
                    height={926}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    className="block h-[420px] w-[194px] select-none rounded-[26px] border-[6px] border-brandBlue bg-white object-cover object-top shadow-card sm:h-[519px] sm:w-[240px]"
                  />
                </picture>
                <figcaption className="text-xs font-bold uppercase tracking-[0.14em] text-brandBlue">
                  {screen.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {/* Rendered out entirely at the ends rather than hidden with the
            attribute, which the responsive display class would override.
            Touch scrolls by swiping, so the arrows are for pointers only. */}
        {atStart ? null : (
          <button
            type="button"
            onClick={() => page(-1)}
            aria-label="Previous screens"
            className="absolute -left-4 top-[42%] hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-brandBlue shadow-card transition hover:border-brandBlue/40 hover:bg-brandYellow focus-ring sm:grid"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
        {atEnd ? null : (
          <button
            type="button"
            onClick={() => page(1)}
            aria-label="More screens"
            className="absolute -right-4 top-[42%] hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-brandBlue shadow-card transition hover:border-brandBlue/40 hover:bg-brandYellow focus-ring sm:grid"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
