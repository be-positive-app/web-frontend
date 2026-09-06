import { Globe2, Smartphone, Star } from 'lucide-react'
import { SITE_META } from '../config/siteMeta'

/** Five stars, filled up to `value` — half a star is rendered as a half fill. */
function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, value - index))
        return (
          <span key={index} className="relative block h-7 w-7 sm:h-8 sm:w-8">
            <Star className="absolute inset-0 h-full w-full text-white/25" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-7 w-7 fill-brandYellow text-brandYellow sm:h-8 sm:w-8" />
            </span>
          </span>
        )
      })}
    </div>
  )
}

/**
 * The proof band: the numbers, set big.
 *
 * Everything here is either a real figure from the stores or a plain fact about
 * the listing. The rating half only renders once SITE_META.rating holds a real
 * App Store / Play Console number — there is deliberately no placeholder score,
 * because a rating the stores cannot back up breaks their marketing rules and
 * Google's structured-data policy.
 */
export function TrustBand() {
  const rating = SITE_META.rating

  return (
    <section className="border-t border-slate-100 bg-brandNavy text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandYellow">
          Already planning with us
        </p>

        <div
          className={[
            'mt-10 grid gap-10 sm:gap-12',
            rating ? 'lg:grid-cols-2 lg:divide-x lg:divide-white/10' : '',
          ].join(' ')}
        >
          <div className="flex flex-col items-center">
            <p className="text-6xl font-extrabold leading-none tracking-tight sm:text-8xl">
              {SITE_META.downloads}
            </p>
            <p className="mt-4 max-w-xs text-balance text-base font-semibold text-white/80 sm:text-lg">
              downloads on the App Store and Google Play
            </p>
          </div>

          {rating ? (
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-3">
                <p className="text-6xl font-extrabold leading-none tracking-tight sm:text-8xl">
                  {rating.value}
                </p>
                <p className="text-2xl font-bold text-white/50 sm:text-3xl">/ 5</p>
              </div>
              <div className="mt-5">
                <Stars value={Number(rating.value)} />
              </div>
              <p className="mt-4 max-w-xs text-balance text-base font-semibold text-white/80 sm:text-lg">
                from {rating.count} App Store and Google Play ratings
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85">
            <Globe2 className="h-4 w-4 text-brandYellow" aria-hidden="true" />
            Available in every region both stores serve
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85">
            <Smartphone className="h-4 w-4 text-brandYellow" aria-hidden="true" />
            iOS and Android
          </span>
        </div>
      </div>
    </section>
  )
}
