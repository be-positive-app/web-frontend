import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  Check,
  ClipboardCheck,
  Mail,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ContactSalesForm } from '../components/ContactSalesForm'
import { FeatureCard } from '../components/FeatureCard'
import { Step } from '../components/Step'
import { TeamsPricingCards } from '../components/TeamsPricingCards'
import { TeamsScreens } from '../components/TeamsScreens'
import { SITE_META } from '../config/siteMeta'
import { TEAMS_APP_URL as APP_URL } from '../config/teamsPricing'
import { useInView } from '../hooks/useInView'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'
import { localizedPath, useLocalRouteMeta } from '../i18n/paths'

const kicker = 'text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70'
const h2 = 'mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl'

export function Teams() {
  usePageMeta(useLocalRouteMeta('/teams'))
  const { t, lang } = useT()

  const { ref: featuresRef, inView: featuresInView } = useInView<HTMLDivElement>({ once: true })
  const { ref: howRef, inView: howInView } = useInView<HTMLDivElement>({ once: true })

  return (
    <div>
      <section className="overflow-x-clip bg-hero-gradient">
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <Building2 className="h-4 w-4 text-brandBlue" aria-hidden="true" />
              <span>{t('teams.kicker')}</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              <span>{t('teams.h1a')}</span> <span className="text-brandBlue">{t('teams.h1b')}</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              {t('teams.lead')}
            </p>

            <div className="mt-7 flex flex-col items-center gap-4">
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brandBlue px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
              >
                {t('teams.cta')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <div className="flex items-center justify-center gap-2 text-center text-sm text-slate-600">
                <Check className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                <span>{t('teams.noCard')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className={kicker}>{t('teams.features.kicker')}</p>
            <h2 className={h2}>{t('teams.features.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.features.text')}</p>
          </div>

          <div ref={featuresRef} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            <FeatureCard icon={<Users className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat1.title')} description={t('teams.feat1.text')} revealed={featuresInView} delayMs={0} />
            <FeatureCard icon={<Bell className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat2.title')} description={t('teams.feat2.text')} revealed={featuresInView} delayMs={80} />
            <FeatureCard icon={<BarChart3 className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat3.title')} description={t('teams.feat3.text')} revealed={featuresInView} delayMs={140} />
            <FeatureCard icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat4.title')} description={t('teams.feat4.text')} revealed={featuresInView} delayMs={220} />
          </div>
        </div>
      </section>

      <section id="screens" className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className={kicker}>{t('teams.screens.kicker')}</p>
            <h2 className={h2}>{t('teams.screens.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.screens.text')}</p>
          </div>
          <div className="mt-10">
            <TeamsScreens />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className={kicker}>{t('teams.how.kicker')}</p>
            <h2 className={h2}>{t('teams.how.title')}</h2>
          </div>

          <div ref={howRef} className="mt-10 grid gap-5 lg:grid-cols-3">
            <Step index={1} title={t('teams.step1.title')} description={t('teams.step1.text')} icon={<Building2 className="h-5 w-5" aria-hidden="true" />} revealed={howInView} delayMs={0} />
            <Step index={2} title={t('teams.step2.title')} description={t('teams.step2.text')} icon={<ClipboardCheck className="h-5 w-5" aria-hidden="true" />} revealed={howInView} delayMs={90} />
            <Step index={3} title={t('teams.step3.title')} description={t('teams.step3.text')} icon={<BarChart3 className="h-5 w-5" aria-hidden="true" />} revealed={howInView} delayMs={180} />
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className={kicker}>{t('teams.pricing.kicker')}</p>
            <h2 className={h2}>{t('teams.pricing.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.pricing.text')}</p>
          </div>

          <TeamsPricingCards />

          <p className="mt-8 text-center text-sm text-slate-500">
            {t('teams.terms.pre')}{' '}
            <Link to="/terms" className="font-semibold text-brandBlue hover:underline">
              {t('teams.terms.tos')}
            </Link>{' '}
            {t('teams.terms.and')}{' '}
            <Link to="/privacy" className="font-semibold text-brandBlue hover:underline">
              {t('teams.terms.privacy')}
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="grid gap-8 rounded-[30px] border border-slate-200 bg-white p-8 shadow-card sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <p className={kicker}>{t('teams.contact.kicker')}</p>
              <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {t('teams.contact.title')}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.contact.text')}</p>
              <p className="mt-6 text-sm text-slate-500">
                {t('teams.contact.or')}{' '}
                <a href={`mailto:${SITE_META.supportEmail}`} className="inline-flex items-center gap-1.5 font-semibold text-brandBlue hover:underline">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {SITE_META.supportEmail}
                </a>
              </p>
              <p className="mt-6 text-sm text-slate-500">
                {t('teams.contact.personalPre')}{' '}
                <Link className="font-semibold text-brandBlue hover:underline" to={localizedPath(lang, '/')}>
                  {t('teams.contact.personalLink')}
                </Link>
                .
              </p>
            </div>

            <ContactSalesForm />
          </div>
        </div>
      </section>
    </div>
  )
}
