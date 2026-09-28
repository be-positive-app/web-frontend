import { StoreButtons } from './StoreButtons'
import { SITE_META } from '../config/siteMeta'
import { useT } from '../i18n'

type DownloadCtaProps = {
  appStoreHref?: string
  googlePlayHref?: string
}

/** Closing call to action: the same offer, at the point the page has made its case. */
export function DownloadCta({ appStoreHref, googlePlayHref }: DownloadCtaProps) {
  const { t } = useT()
  return (
    <section className="border-t border-slate-100 bg-brandNavy text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandYellow">
          {t('cta.kicker')}
        </p>
        <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t('cta.titleA')} <span className="text-brandYellow">{t('cta.titleB')}</span>
        </h2>
        <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75">
          {t('cta.text', { n: SITE_META.downloads })}
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
