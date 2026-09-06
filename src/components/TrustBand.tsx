import { Download, Globe2, Smartphone, Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { SITE_META } from '../config/siteMeta'

type Stat = {
  icon: ReactNode
  value: string
  label: string
}

/**
 * The proof strip: what we can actually stand behind.
 *
 * Every figure here is either a real number from the stores or a plain fact
 * about the listing. The rating tile only appears once SITE_META.rating holds a
 * real App Store / Play Console number — there is deliberately no placeholder
 * score, because a made-up rating breaks both stores' marketing rules and
 * Google's structured-data policy.
 */
export function TrustBand() {
  const stats: Stat[] = [
    {
      icon: <Download className="h-5 w-5" aria-hidden="true" />,
      value: SITE_META.downloads,
      label: 'downloads on the App Store and Google Play',
    },
    {
      icon: <Globe2 className="h-5 w-5" aria-hidden="true" />,
      value: 'Worldwide',
      label: 'available in every region both stores serve',
    },
    {
      icon: <Smartphone className="h-5 w-5" aria-hidden="true" />,
      value: 'iOS + Android',
      label: 'the same planner, on the phone you already carry',
    },
  ]

  const rating = SITE_META.rating
  if (rating) {
    stats.push({
      icon: <Star className="h-5 w-5" aria-hidden="true" />,
      value: `${rating.value} / 5`,
      label: `from ${rating.count} App Store and Google Play ratings`,
    })
  }

  return (
    <section className="border-t border-slate-100 bg-brandNavy text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandYellow">
            Already planning with us
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            {SITE_META.downloads} people have downloaded Be Positive
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-white/70">
            It is on the App Store and Google Play everywhere both stores reach — so
            wherever your day starts, the planner is one download away.
          </p>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brandYellow text-brandNavy">
                {stat.icon}
              </div>
              <dt className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-white/70">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
