import calendarPng from '../assets/screen-calendar.png'
import calendarWebp from '../assets/screen-calendar.webp'
import newTaskPng from '../assets/screen-new-task.png'
import newTaskWebp from '../assets/screen-new-task.webp'
import signinPng from '../assets/screen-signin.png'
import signinWebp from '../assets/screen-signin.webp'

const SCREENS = [
  {
    label: 'Add a task',
    caption: 'Set the date, time, how often it repeats and how much it matters.',
    png: newTaskPng,
    webp: newTaskWebp,
    alt: 'The New Task screen: a task name field, date and time pickers, a repeat option, a reminder toggle and a low/medium/high risk selector.',
  },
  {
    label: 'Plan your day',
    caption: 'See the month at a glance and what each day holds.',
    png: calendarPng,
    webp: calendarWebp,
    alt: 'The Calendar screen: February 2026 with the 20th selected, and a Read Book task set for 20:00, repeating daily.',
  },
  {
    label: 'Sign in',
    caption: 'Use your email, or continue with Google or Apple.',
    png: signinPng,
    webp: signinWebp,
    alt: 'The Sign In screen: email and password fields, and buttons to continue with Google or Apple.',
  },
] as const

/**
 * Screens the app actually has, not drawings of them.
 *
 * The captures are different heights (926 and 1129), so every frame is a fixed
 * box and the images are cropped from the top — that keeps one device size
 * across the row instead of a ragged one.
 *
 * Hover lifts a screen clear of the others on a pointer device; touch has no
 * hover, so below sm the row becomes a snapping swipe rail instead.
 */
export function AppScreens() {
  return (
    <section id="screens" className="border-t border-slate-100 bg-slate-50/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
            Inside the app
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            A planner you can actually see
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Real screens from Be Positive — no mockups.
          </p>
        </div>

        <ul className="group/rail mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:justify-center sm:gap-6 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {SCREENS.map((screen) => (
            <li
              key={screen.label}
              className={[
                'group/screen relative shrink-0 snap-center transition duration-300 ease-out motion-reduce:transition-none',
                'sm:group-hover/rail:opacity-60 sm:hover:!opacity-100 sm:hover:z-20 sm:hover:-translate-y-6 sm:hover:scale-[1.05]',
              ].join(' ')}
            >
              <picture className="contents">
                <source srcSet={screen.webp} type="image/webp" />
                <img
                  src={screen.png}
                  alt={screen.alt}
                  width={428}
                  height={926}
                  loading="lazy"
                  decoding="async"
                  className="block h-[430px] w-[198px] rounded-[26px] border-[6px] border-brandNavy bg-white object-cover object-top shadow-card sm:h-[476px] sm:w-[220px]"
                />
              </picture>
              <div className="mt-4 w-[198px] sm:w-[220px] sm:px-2">
                <p className="text-sm font-semibold text-slate-900">{screen.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{screen.caption}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-slate-500 max-sm:hidden">
          Hover a screen to bring it forward
        </p>
      </div>
    </section>
  )
}
