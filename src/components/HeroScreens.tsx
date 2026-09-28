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
import { useT } from '../i18n'

/** Roughly the order a new user meets them, from signing in to looking back. */
const SCREENS = [
  {
    label: 'screens.signin',
    png: signinPng,
    webp: signinWebp,
    alt: 'screens.signin.alt',
  },
  {
    label: 'screens.home',
    png: homePng,
    webp: homeWebp,
    alt: 'screens.home.alt',
  },
  {
    label: 'screens.calendar',
    png: calendarPng,
    webp: calendarWebp,
    alt: 'screens.calendar.alt',
  },
  {
    label: 'screens.newTask',
    png: newTaskPng,
    webp: newTaskWebp,
    alt: 'screens.newTask.alt',
  },
  {
    label: 'screens.overview',
    png: overviewPng,
    webp: overviewWebp,
    alt: 'screens.overview.alt',
  },
] as const

type Screen = (typeof SCREENS)[number]

function Phone({ screen, eager }: { screen: Screen; eager?: boolean }) {
  const { t } = useT()
  return (
    <figure className="m-0 flex flex-col items-center gap-3">
      <picture className="contents">
        <source srcSet={screen.webp} type="image/webp" />
        <img
          src={screen.png}
          alt={t(screen.alt)}
          width={428}
          height={926}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
          className="block h-[390px] w-[180px] select-none rounded-[24px] border-[6px] border-brandBlue bg-white object-cover object-top shadow-card sm:h-[476px] sm:w-[220px]"
        />
      </picture>
      <figcaption className="text-xs font-bold uppercase tracking-[0.14em] text-brandBlue">
        {t(screen.label)}
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
 * drifts over it, which reads as broken.
 *
 * It also does not honour prefers-reduced-motion, which it did until the owner
 * asked four times for a hero that moves — their own machine has the setting on,
 * which is why it kept looking frozen to them. This is a deliberate trade
 * against that setting, not an oversight: a visitor who asked their system for
 * less motion gets the travel anyway. Reinstating it is one class each on the
 * frame and the list, motion-reduce:overflow-x-auto and motion-reduce:animate-none,
 * which leaves a rail they can scroll by hand instead.
 */
export function HeroScreens() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div className="relative">
        <div className="pointer-events-none absolute -top-8 left-[6%] h-40 w-40 rounded-full bg-brandYellow/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 right-[8%] h-48 w-48 rounded-full bg-brandBlue/10 blur-3xl" />

        <div className="relative overflow-hidden pb-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <ul className="flex w-max animate-hero-rail gap-6 sm:gap-8">
            {SCREENS.map((screen, index) => (
              <li key={screen.label} className="shrink-0">
                <Phone screen={screen} eager={index === 0} />
              </li>
            ))}
            {SCREENS.map((screen) => (
              <li
                key={`${screen.label}-repeat`}
                className="shrink-0"
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
