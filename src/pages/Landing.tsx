import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Download,
  LineChart,
  ListTodo,
  Mail,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { DownloadCta } from '../components/DownloadCta'
import { Faq } from '../components/Faq'
import { FoundUs } from '../components/FoundUs'
import { FeatureCard } from '../components/FeatureCard'
import { HeroScreens } from '../components/HeroScreens'
import { Pricing } from '../components/Pricing'
import { Problem } from '../components/Problem'
import { Step } from '../components/Step'
import { TrustBand } from '../components/TrustBand'
import { StoreButtons } from '../components/StoreButtons'
import { SITE_META } from '../config/siteMeta'
import { useInView } from '../hooks/useInView'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'
import { useLocalRouteMeta } from '../i18n/paths'

const appStoreHref =
  (import.meta.env.VITE_APP_STORE_URL as string | undefined)?.trim() ||
  SITE_META.appStoreUrl
const googlePlayHref =
  (import.meta.env.VITE_GOOGLE_PLAY_URL as string | undefined)?.trim() ||
  SITE_META.googlePlayUrl

export function Landing() {
  usePageMeta(useLocalRouteMeta('/'))
  const { t } = useT()

  const { ref: featuresRef, inView: featuresInView } = useInView<HTMLDivElement>({ once: true })
  const { ref: howRef, inView: howInView } = useInView<HTMLDivElement>({ once: true })

  return (
    <div>
      {/* The travelling rail is wider than the viewport by design, and the
          decorative blobs sit outside their container; clip both here so
          neither can widen the page. */}
      <section id="home" className="overflow-x-clip bg-hero-gradient">
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20">
          {/* Centred now that the screens sit below rather than beside it —
              left-aligned, it left half the hero empty. */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-brandBlue" aria-hidden="true" />
              <span>
                {t('landing.badge')}
                <span className="text-brandBlue">.</span>
              </span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              <span>{t('landing.h1a')}</span>{' '}
              <span>{t('landing.h1b')}</span>{' '}
              <span className="text-brandBlue">{t('landing.h1c')}</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              {t('landing.lead')}
            </p>

            <div className="mt-7 flex flex-col items-center gap-4">
              <StoreButtons appStoreHref={appStoreHref} googlePlayHref={googlePlayHref} />

              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                <Download className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                <span>{t('landing.downloads', { n: SITE_META.downloads })}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-center text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                <span>{t('landing.tagline')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Outside the max-width wrapper on purpose: the rail wants the whole
            page to travel across, not a column of it. */}
        <div className="pb-16 sm:pb-20">
          <HeroScreens />
        </div>
      </section>

      <Problem />

      <TrustBand />

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
              {t('landing.features.kicker')}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t('landing.features.title')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {t('landing.features.text')}
            </p>
          </div>

          <div
            ref={featuresRef}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2"
          >
            <FeatureCard
              icon={<ListTodo className="h-5 w-5" aria-hidden="true" />}
              title={t('landing.f1.title')}
              description={t('landing.f1.text')}
              revealed={featuresInView}
              delayMs={0}
            />
            <FeatureCard
              icon={<CalendarDays className="h-5 w-5" aria-hidden="true" />}
              title={t('landing.f2.title')}
              description={t('landing.f2.text')}
              revealed={featuresInView}
              delayMs={80}
            />
            <FeatureCard
              icon={<Bell className="h-5 w-5" aria-hidden="true" />}
              title={t('landing.f3.title')}
              description={t('landing.f3.text')}
              revealed={featuresInView}
              delayMs={140}
            />
            <FeatureCard
              icon={<LineChart className="h-5 w-5" aria-hidden="true" />}
              title={t('landing.f4.title')}
              description={t('landing.f4.text')}
              revealed={featuresInView}
              delayMs={220}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
              {t('landing.how.kicker')}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t('landing.how.title')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {t('landing.how.text')}
            </p>
          </div>

          <div ref={howRef} className="mt-10 grid gap-5 lg:grid-cols-3">
            <Step
              index={1}
              title={t('landing.s1.title')}
              description={t('landing.s1.text')}
              icon={<ListTodo className="h-5 w-5" aria-hidden="true" />}
              revealed={howInView}
              delayMs={0}
            />
            <Step
              index={2}
              title={t('landing.s2.title')}
              description={t('landing.s2.text')}
              icon={<Bell className="h-5 w-5" aria-hidden="true" />}
              revealed={howInView}
              delayMs={90}
            />
            <Step
              index={3}
              title={t('landing.s3.title')}
              description={t('landing.s3.text')}
              icon={<LineChart className="h-5 w-5" aria-hidden="true" />}
              revealed={howInView}
              delayMs={180}
            />
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-slate-600">
            <ArrowRight className="h-4 w-4 text-brandBlue" aria-hidden="true" />
            <p>
              {t('landing.howNote')}
            </p>
          </div>
        </div>
      </section>

      <Pricing />

      <Faq />

      <FoundUs />

      <DownloadCta appStoreHref={appStoreHref} googlePlayHref={googlePlayHref} />

      <section id="contact" className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="grid gap-8 rounded-[30px] border border-slate-200 bg-white p-8 shadow-card sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
                {t('landing.contact.kicker')}
              </p>
              <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {t('landing.contact.title')}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {t('landing.contact.text')}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <a
                href={`mailto:${SITE_META.supportEmail}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-brandBlue px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {SITE_META.supportEmail}
              </a>
              <p className="text-sm text-slate-500">
                {t('landing.contact.orPre')}{' '}
                <Link className="font-semibold text-brandBlue hover:underline" to="/privacy">
                  {t('landing.contact.privacy')}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

