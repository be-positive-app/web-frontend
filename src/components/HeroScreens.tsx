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

type Screen = (typeof SCREENS)[number]

function Phone({ screen, eager }: { screen: Screen; eager?: boolean }) {
  return (
    <figure className="m-0 flex flex-col items-center gap-3">
      <picture className="contents">
        <source srcSet={screen.webp} type="image/webp" />
        <img
          src={screen.png}
          alt={screen.alt}
          width={428}
          height={926}
          fetchPriority={eager ? 'high' : 'auto'}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className="block h-[420px] w-[194px] select-none rounded-[26px] border-[6px] border-brandBlue bg-white object-cover object-top shadow-card sm:h-[400px] sm:w-[185px]"
        />
      </picture>
      <figcaption className="text-xs font-bold uppercase tracking-[0.14em] text-brandBlue">
        {screen.label}
      </figcaption>
    </figure>
  )
}

/**
 * The app screens, as a slider the full width of the page.
 *
 * Two presentations rather than one responsive compromise. On a pointer device
 * the screens ride a rail that travels left to right on its own; on a touch
 * device they are a snapping rail the reader swipes by hand, which is what a
 * phone affords and what a hands-off animation cannot offer.
 *
 * Nothing here is drawn in 3D. An earlier version rotated a ring and had each
 * screen counter-rotate to cancel it, which broke wherever the spec is followed
 * strictly: the blur used for the depth fade flattens an element's 3D context,
 * so the counter-rotation stopped cancelling and the screens turned edge-on and
 * disappeared. Computed styles could not show that either, which is how it
 * reached the live site. There is no 3D left here to flatten.
 *
 * The travelling rail renders the list twice and moves exactly half the track,
 * so the loop closes on itself with no jump. The second copy is hidden from
 * screen readers, which would otherwise hear every screen described twice.
 */
export function HeroScreens() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-10 left-[8%] h-40 w-40 rounded-full bg-brandYellow/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 right-[10%] h-48 w-48 rounded-full bg-brandBlue/10 blur-3xl" />

      {/* Touch: swipe it. */}
      <ul className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
        {SCREENS.map((screen, index) => (
          <li key={screen.label} className="shrink-0 snap-center">
            <Phone screen={screen} eager={index === 0} />
          </li>
        ))}
      </ul>

      {/* Pointer: it travels on its own. */}
      <div className="relative hidden overflow-hidden pb-6 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:block">
        <ul className="flex w-max animate-hero-rail gap-8 motion-reduce:animate-none">
          {SCREENS.map((screen, index) => (
            <li key={screen.label} className="shrink-0">
              <Phone screen={screen} eager={index === 0} />
            </li>
          ))}
          {SCREENS.map((screen) => (
            <li key={`${screen.label}-repeat`} className="shrink-0" aria-hidden="true">
              <Phone screen={screen} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
