import { StoreButtons } from './StoreButtons'
import { SITE_META } from '../config/siteMeta'

type DownloadCtaProps = {
  appStoreHref?: string
  googlePlayHref?: string
}

/** Closing call to action: the same offer, at the point the page has made its case. */
export function DownloadCta({ appStoreHref, googlePlayHref }: DownloadCtaProps) {
  return (
    <section className="border-t border-slate-100 bg-brandNavy text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandYellow">
          Start today
        </p>
        <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your day. Your goals. <span className="text-brandYellow">Your progress.</span>
        </h2>
        <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75">
          Join the {SITE_META.downloads} people planning their day with Be Positive.
        </p>
        <div className="mt-2">
          <StoreButtons
            variant="secondary"
            appStoreHref={appStoreHref}
            googlePlayHref={googlePlayHref}
          />
        </div>
      </div>
    </section>
  )
}
