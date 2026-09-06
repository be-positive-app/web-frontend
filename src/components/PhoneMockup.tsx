import screenCalendarPng from '../assets/screen-calendar.png'
import screenCalendarWebp from '../assets/screen-calendar.webp'

/**
 * Hero device shot.
 *
 * The screen is a real capture of the app's calendar view, not a drawing of
 * one. It is the largest element above the fold, so it carries width/height to
 * reserve its box before it loads and fetchPriority to pull it forward.
 */
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[264px] sm:max-w-[300px]">
      <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-brandYellow/50 blur-2xl" />
      <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-brandBlue/15 blur-2xl" />

      <div className="relative rounded-[36px] bg-slate-900 p-2 shadow-soft">
        <picture className="contents">
          <source srcSet={screenCalendarWebp} type="image/webp" />
          <img
            src={screenCalendarPng}
            alt="The Be Positive calendar screen: February 2026 with the 20th selected, and a Read Book task set for 20:00, repeating daily."
            width={428}
            height={926}
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full rounded-[30px] bg-white"
          />
        </picture>
      </div>
    </div>
  )
}
