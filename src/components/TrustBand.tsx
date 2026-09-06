import { Globe2, Smartphone, Star } from 'lucide-react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { SITE_META } from '../config/siteMeta'
import { useInView } from '../hooks/useInView'

/**
 * Splits a display figure into the part worth counting up and the text around
 * it, so "400+" animates to 400 and keeps its plus, and "5.0" keeps its decimal.
 */
function parseFigure(display: string) {
  const match = display.match(/^(\D*?)([\d.]+)(.*)$/)
  if (!match) return { prefix: '', target: 0, suffix: display, decimals: 0 }
  const [, prefix, digits, suffix] = match
  return {
    prefix,
    target: Number(digits),
    suffix,
    decimals: digits.includes('.') ? digits.split('.')[1].length : 0,
  }
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/** Subscribed during render rather than mirrored into state via an effect. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION)
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
}

/**
 * Counts from zero to `target` once `active` turns true.
 *
 * The safety timer matters more than the animation: without an
 * IntersectionObserver — or with one that never fires because the section is
 * already past — `active` would stay false and the band would sit on a zero
 * forever. After a second it counts up regardless. Anyone who asked for less
 * motion is handed the final figure at render, without an animation at all.
 */
function useCountUp(target: number, active: boolean, durationMs = 1600) {
  const [value, setValue] = useState(0)
  const [armed, setArmed] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (armed) return
    const timer = window.setTimeout(() => setArmed(true), 1000)
    return () => window.clearTimeout(timer)
  }, [armed])

  useEffect(() => {
    if (reducedMotion || (!active && !armed)) return

    let frame = 0
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs)
      setValue(target * (1 - Math.pow(1 - progress, 3)))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [active, armed, reducedMotion, target, durationMs])

  return reducedMotion ? target : value
}

function Figure({ display, active }: { display: string; active: boolean }) {
  const { prefix, target, suffix, decimals } = parseFigure(display)
  const value = useCountUp(target, active)

  return (
    <p className="text-6xl font-extrabold leading-none tracking-tight tabular-nums sm:text-8xl">
      <span className="bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent">
        {prefix}
        {value.toFixed(decimals)}
      </span>
      <span className="text-brandYellow">{suffix}</span>
    </p>
  )
}

/**
 * Five stars, filling up to `value` in step with the score beside them — same
 * count-up, so they share its safety net rather than hanging empty if the
 * observer never fires. A half point renders as a half star.
 */
function Stars({ value, active }: { value: number; active: boolean }) {
  const filled = useCountUp(value, active)

  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, filled - index))
        return (
          // The glow sits on the wrapper, not on the star inside the clip:
          // clipped, it rendered as a hard dark square behind each star.
          <span
            key={index}
            className="relative block h-7 w-7 sm:h-9 sm:w-9"
            style={fill > 0 ? { filter: 'drop-shadow(0 0 10px rgba(255,244,92,0.3))' } : undefined}
          >
            <Star className="absolute inset-0 h-full w-full text-white/20" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-7 w-7 fill-brandYellow text-brandYellow sm:h-9 sm:w-9" />
            </span>
          </span>
        )
      })}
    </div>
  )
}

/**
 * The proof band: the numbers, set big, counting up as they scroll in.
 *
 * Everything here is either a real figure from the stores or a plain fact about
 * the listing. The rating half only renders once SITE_META.rating holds a real
 * App Store / Play Console number — there is deliberately no placeholder score,
 * because a rating the stores cannot back up breaks their marketing rules and
 * Google's structured-data policy.
 */
export function TrustBand() {
  const rating = SITE_META.rating
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.3 })

  return (
    <section className="relative isolate overflow-hidden border-t border-slate-100 bg-brandNavy text-white">
      {/* A grid that fades out towards the edges, plus two brand glows, so the
          band reads as a surface rather than a flat navy block. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-16 -z-10 h-80 w-80 rounded-full bg-brandBlue/30 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-10 -z-10 h-80 w-80 rounded-full bg-brandYellow/12 blur-[110px]"
      />

      <div
        ref={ref}
        className="mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-brandYellow/30 bg-brandYellow/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brandYellow">
          Already planning with us
        </p>

        <div
          className={[
            'mt-12 grid gap-12 sm:gap-14',
            rating ? 'lg:grid-cols-2' : '',
          ].join(' ')}
        >
          <div className="flex flex-col items-center">
            <Figure display={SITE_META.downloads} active={inView} />
            <p className="mt-5 max-w-sm text-balance text-base font-semibold text-white/75 sm:text-lg">
              downloads on the App Store and Google Play
            </p>
          </div>

          {rating ? (
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-3">
                <Figure display={rating.value} active={inView} />
                <p className="text-2xl font-bold text-white/40 sm:text-3xl">/ 5</p>
              </div>
              <div className="mt-6">
                <Stars value={Number(rating.value)} active={inView} />
              </div>
              <p className="mt-5 max-w-sm text-balance text-base font-semibold text-white/75 sm:text-lg">
                from {rating.count} App Store and Google Play ratings
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 backdrop-blur-sm">
            <Globe2 className="h-4 w-4 text-brandYellow" aria-hidden="true" />
            Available in every region both stores serve
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 backdrop-blur-sm">
            <Smartphone className="h-4 w-4 text-brandYellow" aria-hidden="true" />
            iOS and Android
          </span>
        </div>
      </div>
    </section>
  )
}
