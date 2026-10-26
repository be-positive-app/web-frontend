import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Gauge,
  Globe2,
  HeartHandshake,
  Mail,
  Package,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ContactSalesForm } from '../components/ContactSalesForm'
import { RequestDemoForm } from '../components/RequestDemoForm'
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
import { TeamsCalculator } from '../components/TeamsCalculator'
import { Testimonials } from '../components/Testimonials'

const kicker = 'text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue'
const h2 = 'mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl'

export function Teams() {
  usePageMeta(useLocalRouteMeta('/teams'))
  const { t, lang } = useT()

  const { ref: featuresRef, inView: featuresInView } = useInView<HTMLDivElement>({ once: true })
  const { ref: howRef, inView: howInView } = useInView<HTMLDivElement>({ once: true })

  return (
    <div>
      <section className="overflow-x-clip bg-brandBlue text-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/15 px-4 py-2 text-sm font-semibold text-white">
              <Building2 className="h-4 w-4 text-brandYellow" aria-hidden="true" />
              <span>{t('teams.kicker')}</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              <span>{t('teams.h1a')}</span> <span className="text-brandYellow">{t('teams.h1b')}</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/95 sm:text-lg">
              {t('teams.lead')}
            </p>

            <div className="mt-7 flex flex-col items-center gap-4">
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brandYellow px-6 py-3.5 text-base font-semibold text-brandNavy shadow-soft transition hover:bg-white focus-ring"
              >
                {t('teams.cta')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:border-brandYellow hover:text-brandYellow focus-ring"
              >
                {t('demo.cta')}
              </a>
              <div className="flex items-center justify-center gap-2 text-center text-sm text-white">
                <Check className="h-4 w-4 text-brandYellow" aria-hidden="true" />
                <span>{t('teams.noCard')}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-center text-xs font-semibold text-white">
                <Globe2 className="h-4 w-4 text-brandYellow" aria-hidden="true" />
                <span>{t('teams.langs')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className={kicker}>{t('teams.why.kicker')}</p>
            <h2 className={h2}>{t('teams.why.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.why.text')}</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {(['why1', 'why2', 'why3'] as const).map((k) => (
              <div key={k} className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-card">
                <div className="text-4xl font-extrabold tracking-tight text-brandBlue">{t(`teams.${k}.stat`)}</div>
                <div className="mt-1 text-base font-semibold text-slate-900">{t(`teams.${k}.title`)}</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{t(`teams.${k}.text`)}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500">{t('teams.why.sources')}</p>
        </div>
      </section>
      <section id="features" className="scroll-mt-20 border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className={kicker}>{t('teams.features.kicker')}</p>
            <h2 className={h2}>{t('teams.features.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.features.text')}</p>
          </div>

          <div ref={featuresRef} className="mt-10 grid gap-5 sm:grid-cols-2">
            <FeatureCard icon={<Gauge className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat1.title')} description={t('teams.feat1.text')} revealed={featuresInView} delayMs={0} />
            <FeatureCard icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat2.title')} description={t('teams.feat2.text')} revealed={featuresInView} delayMs={60} />
            <FeatureCard icon={<HeartHandshake className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat3.title')} description={t('teams.feat3.text')} revealed={featuresInView} delayMs={120} />
            <FeatureCard icon={<CalendarDays className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat4.title')} description={t('teams.feat4.text')} revealed={featuresInView} delayMs={180} />
            <FeatureCard icon={<Package className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat5.title')} description={t('teams.feat5.text')} revealed={featuresInView} delayMs={240} />
            <FeatureCard icon={<BarChart3 className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat6.title')} description={t('teams.feat6.text')} revealed={featuresInView} delayMs={300} />
            <FeatureCard icon={<Plug className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat7.title')} description={t('teams.feat7.text')} revealed={featuresInView} delayMs={360} />
            <FeatureCard icon={<Users className="h-5 w-5" aria-hidden="true" />} title={t('teams.feat8.title')} description={t('teams.feat8.text')} revealed={featuresInView} delayMs={420} />
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


      <section id="addons" className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className={kicker}>{t('teams.addons.kicker')}</p>
            <h2 className={h2}>{t('teams.addons.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.addons.text')}</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {([
              ['addon1', <Sparkles key="a1" className="h-5 w-5" aria-hidden="true" />],
              ['addon3', <Wrench key="a3" className="h-5 w-5" aria-hidden="true" />],
            ] as const).map(([k, icon]) => (
              <div key={k} className="rounded-3xl border border-brandBlue/15 bg-gradient-to-b from-brandBlue/5 to-white p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brandBlue text-white">{icon}</div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">{t(`teams.${k}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t(`teams.${k}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className={kicker}>{t('teams.ind.kicker')}</p>
            <h2 className={h2}>{t('teams.ind.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.ind.text')}</p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {(['restaurant', 'retail', 'agency', 'clinic', 'education', 'beauty', 'services', 'other'] as const).map((k) => (
              <li key={k} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">{t(`teams.ind.${k}`)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <p className={kicker}>{t('teams.cmp.kicker')}</p>
              <h2 className={h2}>{t('teams.cmp.title')}</h2>
            </div>
            <ul className="grid gap-4">
              {(['cmp1', 'cmp2', 'cmp3', 'cmp4'] as const).map((k) => (
                <li key={k} className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brandBlue" aria-hidden="true" />
                  <span className="text-base leading-relaxed text-slate-700">{t(`teams.${k}`)}</span>
                </li>
              ))}
            </ul>
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

      <section id="demo" className="scroll-mt-20 border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-8 rounded-[30px] border border-slate-200 bg-white p-8 shadow-card sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <p className={kicker}>{t('demo.kicker')}</p>
              <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{t('demo.title')}</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{t('demo.text')}</p>
              <ol className="mt-5 grid gap-2 text-sm text-slate-700">
                {(['demo.s1', 'demo.s2', 'demo.s3'] as const).map((k, i) => (
                  <li key={k} className="flex items-start gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brandBlue/10 text-xs font-bold text-brandBlue">{i + 1}</span><span>{t(k)}</span></li>
                ))}
              </ol>
            </div>
            <RequestDemoForm />
          </div>
        </div>
      </section>

      <Testimonials />

      <section id="pricing" className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className={kicker}>{t('teams.pricing.kicker')}</p>
            <h2 className={h2}>{t('teams.pricing.title')}</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.pricing.text')}</p>
          </div>

          <TeamsPricingCards />

          <TeamsCalculator />

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


      <section id="teams-faq" className="border-t border-slate-100 bg-slate-50/60">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className={kicker}>{t('teams.faq.kicker')}</p>
          <h2 className={h2}>{t('teams.faq.title')}</h2>
          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {(['faq1', 'faq2', 'faq3', 'faq4', 'faq5'] as const).map((k) => (
              <details key={k} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl text-left text-base font-semibold text-slate-900 focus-ring">
                  {t(`teams.${k}.q`)}
                  <ChevronDown className="h-5 w-5 shrink-0 text-brandBlue transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                </summary>
                <p className="mt-3 pr-9 text-base leading-relaxed text-slate-600">{t(`teams.${k}.a`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-hero-gradient">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <h2 className={h2}>{t('teams.final.title')}</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">{t('teams.final.text')}</p>
          <a href={APP_URL} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-brandBlue px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:shadow-md focus-ring">
            {t('teams.cta')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
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
