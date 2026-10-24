import { Clock, HelpCircle, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { routeMeta } from '../config/routeMeta'
import { SITE_META } from '../config/siteMeta'
import { usePageMeta } from '../hooks/usePageMeta'
import { useT } from '../i18n'

const SUPPORT_EMAIL = SITE_META.supportEmail

export function Support() {
  usePageMeta(routeMeta('/support'))
  const { t } = useT()

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t('legal.support')}
          </h1>
          <Link
            to="/"
            className="shrink-0 rounded-2xl bg-brandBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            {t('page.backHome')}
          </Link>
        </div>

        <p className="mt-5 text-base leading-relaxed text-slate-600">
          {t('sup.lead')}
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(t('sup.mailSubject'))}`}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-brandBlue px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
          >
            <Mail className="h-5 w-5 shrink-0" aria-hidden />
            {SUPPORT_EMAIL}
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
            <div className="flex items-center gap-2 text-brandBlue">
              <Clock className="h-5 w-5" aria-hidden />
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                {t('sup.timeTitle')}
              </h2>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {t('sup.timeText')}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-card">
            <div className="flex items-center gap-2 text-brandBlue">
              <HelpCircle className="h-5 w-5" aria-hidden />
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                {t('sup.includeTitle')}
              </h2>
            </div>
            <ul className="mt-2 list-inside list-disc text-sm leading-relaxed text-slate-600">
              <li>{t('sup.include1')}</li>
              <li>{t('sup.include2')}</li>
              <li>{t('sup.include3')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-2 text-brandBlue">
            <MessageCircle className="h-5 w-5" aria-hidden />
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              {t('sup.privacyTitle')}
            </h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {t('sup.privacyText')}{' '}
            <Link to="/privacy" className="font-semibold text-brandBlue hover:underline">
              {t('legal.privacy')}
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
