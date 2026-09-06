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
          decoding="async"
          draggable={false}
          className="block h-[390px] w-[180px] select-none rounded-[24px] border-[6px] border-brandBlue bg-white object-cover object-top shadow-card sm:h-[476px] sm:w-[220px]"
        />
      </picture>
      <figcaption className="text-xs font-bold uppercase tracking-[0.14em] text-brandBlue">
        {screen.label}
      </figcaption>
    </figure>
  )
}

/**
 * The app screens, as a slider that moves on its own.
 *
 * The list is rendered twice and the rail travels exactly half the track, so
 * the loop closes on itself without a jump. That copy is why the rail is held to
 * a column instead of running edge to edge: a copy sits one list-width from its
 * original, so if the window is wide enough the two are on screen together and
 * the same screen is visibly duplicated. Running full width, copies were 1085px
 * apart in a 1440px window, which is how two of the same screen ended up side by
 * side.
 *
 * The condition is not width > window but width > window + one card: a screen
 * can be showing its last sliver at one edge while its copy shows its first at
 * the other. One copy is 1260px against a 848px window and a 220px card, so 1100
 * is needed and there is room to spare.
 *
 * The second copy is hidden from screen readers, which would otherwise hear
 * every screen described twice.
 *
 * There are deliberately no arrows and no pause on hover: a hover pause is
 * invisible on a phone but stops the slider on a desktop the moment the pointer
 * drifts over it, which reads as broken. prefers-reduced-motion stops the travel
 * — an endlessly moving strip is exactly what that setting is for — and hands
 * back a rail the reader scrolls instead of a row frozen mid-track.
 */
export function HeroScreens() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div className="relative">
        <div className="pointer-events-none absolute -top-8 left-[6%] h-40 w-40 rounded-full bg-brandYellow/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-[8%] h-48 w-48 rounded-full bg-brandBlue/10 blur-3xl" />

        <div className="relative overflow-hidden pb-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto">
          <ul className="flex w-max animate-hero-rail gap-6 motion-reduce:mx-auto motion-reduce:animate-none sm:gap-8">
            {SCREENS.map((screen, index) => (
              <li key={screen.label} className="shrink-0 motion-reduce:snap-start">
                <Phone screen={screen} eager={index === 0} />
              </li>
            ))}
            {SCREENS.map((screen) => (
              <li
                key={`${screen.label}-repeat`}
                // Only exists to close the travelling loop; with the travel off
                // it would just be the same five screens scrolled twice.
                className="shrink-0 motion-reduce:hidden"
                aria-hidden="true"
              >
                <Phone screen={screen} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
