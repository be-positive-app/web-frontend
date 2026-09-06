import calendarPng from '../assets/screen-calendar.png'
import calendarWebp from '../assets/screen-calendar.webp'
import newTaskPng from '../assets/screen-new-task.png'
import newTaskWebp from '../assets/screen-new-task.webp'
import signinPng from '../assets/screen-signin.png'
import signinWebp from '../assets/screen-signin.webp'

const SCREENS = [
  {
    label: 'Add a task',
    png: newTaskPng,
    webp: newTaskWebp,
    tilt: 'sm:-rotate-6',
    alt: 'The New Task screen: a task name field, date and time pickers, a repeat option, a reminder toggle and a low/medium/high risk selector.',
  },
  {
    label: 'Plan your day',
    png: calendarPng,
    webp: calendarWebp,
    tilt: 'sm:rotate-0',
    alt: 'The Calendar screen: February 2026 with the 20th selected, and a Read Book task set for 20:00, repeating daily.',
  },
  {
    label: 'Sign in',
    png: signinPng,
    webp: signinWebp,
    tilt: 'sm:rotate-6',
    alt: 'The Sign In screen: email and password fields, and buttons to continue with Google or Apple.',
  },
] as const

/**
 * Hero device shot: three screens the app actually has, fanned.
 *
 * On a pointer device they overlap and hovering one pulls it upright and clear
 * of the others. Touch has no hover, so below sm the fan becomes a snapping
 * swipe rail at a size where the screens are still readable.
 *
 * The captures are 428x926 and 428x1129, so each frame is a fixed box and the
 * image is cropped from the top — one device size across the row, not a ragged
 * one.
 */
export function HeroScreens() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-brandYellow/50 blur-2xl" />
      <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-brandBlue/15 blur-2xl" />

      <ul className="group/fan relative flex snap-x snap-mandatory items-end gap-4 overflow-x-auto pb-10 [scrollbar-width:none] sm:justify-center sm:gap-0 sm:overflow-visible sm:pb-4 [&::-webkit-scrollbar]:hidden">
        {SCREENS.map((screen) => (
          <li
            key={screen.label}
            className={[
              'group/screen relative shrink-0 snap-center transition duration-300 ease-out motion-reduce:transition-none',
              'sm:-ml-9 sm:first:ml-0',
              screen.tilt,
              'sm:group-hover/fan:opacity-50',
              'sm:hover:!opacity-100 sm:hover:z-20 sm:hover:-translate-y-6 sm:hover:rotate-0 sm:hover:scale-[1.06]',
            ].join(' ')}
          >
            <picture className="contents">
              <source srcSet={screen.webp} type="image/webp" />
              <img
                src={screen.png}
                alt={screen.alt}
                width={428}
                height={926}
                fetchPriority="high"
                decoding="async"
                className="block h-[398px] w-[184px] rounded-[24px] border-[6px] border-brandBlue bg-white object-cover object-top shadow-card sm:h-[364px] sm:w-[168px]"
              />
            </picture>
            <span className="pointer-events-none absolute inset-x-0 -bottom-7 text-center text-xs font-bold uppercase tracking-[0.12em] text-brandBlue opacity-0 transition group-hover/screen:opacity-100 motion-reduce:transition-none max-sm:hidden">
              {screen.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
