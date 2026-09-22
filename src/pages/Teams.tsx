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
import { FeatureCard } from '../components/FeatureCard'
import { Step } from '../components/Step'
import { routeMeta } from '../config/routeMeta'
import { SITE_META } from '../config/siteMeta'
import { useInView } from '../hooks/useInView'
import { usePageMeta } from '../hooks/usePageMeta'

/** Where "Start free trial" sends a company — the Teams product itself, not this marketing site. */
const APP_URL = 'https://web.bepositive.cc'

type Plan = {
  id: 'starter' | 'team' | 'enterprise'
  name: string
  sub: string
  price: string | null
  cadence: string
  recommended?: boolean
  features: string[]
}

const CORE_FEATURES = [
  'Shared tasks and calendar',
  'Task assignment and reminders',
  'Workflow board per department',
  'Google Meet and Zoom links on tasks',
  'Priority support',
  'Mobile app included',
]

const PLANS: Plan[] = [
  { id: 'starter', name: 'Starter', sub: 'For teams of up to 10 people', price: '$24.90', cadence: '/ month', features: CORE_FEATURES },
  { id: 'team', name: 'Team', sub: 'For companies of up to 50 people, flat price', price: '$69.90', cadence: '/ month', recommended: true, features: CORE_FEATURES },
  { id: 'enterprise', name: 'Enterprise', sub: '51+ people, contract and invoice', price: null, cadence: '', features: [...CORE_FEATURES, 'Bank transfer, annual invoice', 'Dedicated onboarding'] },
]

export function Teams() {
  usePageMeta(routeMeta('/teams'))

  const { ref: featuresRef, inView: featuresInView } = useInView<HTMLDivElement>({ once: true })
  const { ref: howRef, inView: howInView } = useInView<HTMLDivElement>({ once: true })

  return (
    <div>
      <section className="overflow-x-clip bg-hero-gradient">
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <Building2 className="h-4 w-4 text-brandBlue" aria-hidden="true" />
              <span>For companies</span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              <span>Manage your team&apos;s tasks.</span>{' '}
              <span className="text-brandBlue">See real results.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Be Positive Teams gives every task an owner, a moderator, and a deadline —
              with notifications that keep people on schedule and weekly reports that show
              who is actually getting things done.
            </p>

            <div className="mt-7 flex flex-col items-center gap-4">
              <a
                href={APP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brandBlue px-6 py-3.5 text-base font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
              >
                Start 30-day free trial
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <div className="flex items-center justify-center gap-2 text-center text-sm text-slate-600">
                <Check className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                <span>No credit card required to start</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">Features</p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything a growing team needs
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              One workspace for tasks, people, and the numbers behind them.
            </p>
          </div>

          <div ref={featuresRef} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
            <FeatureCard
              icon={<Users className="h-5 w-5" aria-hidden="true" />}
              title="Task assignment & moderator oversight"
              description="Assign tasks to the right person, track subtasks with their own owners, and let a moderator watch over each department."
              revealed={featuresInView}
              delayMs={0}
            />
            <FeatureCard
              icon={<Bell className="h-5 w-5" aria-hidden="true" />}
              title="Notifications that keep people moving"
              description="Assignment, overdue, and completion alerts, plus a morning digest so nobody starts the day guessing what's due."
              revealed={featuresInView}
              delayMs={80}
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" aria-hidden="true" />}
              title="Weekly, monthly and yearly reports"
              description="Department comparisons and completion rates that show who's carrying the team — exportable as a PDF."
              revealed={featuresInView}
              delayMs={140}
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" aria-hidden="true" />}
              title="Departments, projects, and workflow stages"
              description="Organize work the way your company is actually structured, with company-wide visibility for owners."
              revealed={featuresInView}
              delayMs={220}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">How it works</p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Set up in minutes
            </h2>
          </div>

          <div ref={howRef} className="mt-10 grid gap-5 lg:grid-cols-3">
            <Step
              index={1}
              title="Create your workspace"
              description="Invite your team by email or a shared invite code — no IT setup required."
              icon={<Building2 className="h-5 w-5" aria-hidden="true" />}
              revealed={howInView}
              delayMs={0}
            />
            <Step
              index={2}
              title="Assign tasks & moderators"
              description="Put every task in a department, give it an owner, and let moderators keep watch."
              icon={<ClipboardCheck className="h-5 w-5" aria-hidden="true" />}
              revealed={howInView}
              delayMs={90}
            />
            <Step
              index={3}
              title="Track progress with reports"
              description="See who's on track at a glance, every week, without asking around."
              icon={<BarChart3 className="h-5 w-5" aria-hidden="true" />}
              revealed={howInView}
              delayMs={180}
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">Pricing</p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              A flat price per company, not per seat
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Hiring someone mid-year never means a billing surprise.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-3xl border p-8 shadow-card ${
                  p.recommended ? 'border-2 border-brandBlue' : 'border-slate-200'
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brandYellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-brandNavy">
                    Most popular
                  </span>
                )}
                <p className={`text-sm font-semibold ${p.recommended ? 'text-brandBlue' : 'text-slate-600'}`}>{p.name}</p>
                <p className="mt-1 text-xs text-slate-500">{p.sub}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  {p.price ? (
                    <>
                      <span className="text-4xl font-extrabold tracking-tight text-slate-900">{p.price}</span>
                      <span className="text-base text-slate-500">{p.cadence}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">Contact us</span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-600">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brandBlue" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.id === 'enterprise' ? `mailto:${SITE_META.supportEmail}` : APP_URL}
                  target={p.id === 'enterprise' ? undefined : '_blank'}
                  rel={p.id === 'enterprise' ? undefined : 'noreferrer'}
                  className={`mt-6 inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus-ring ${
                    p.recommended
                      ? 'bg-brandBlue text-white shadow-soft hover:shadow-md hover:shadow-brandYellow/25'
                      : 'border border-slate-300 text-slate-800 hover:border-brandBlue hover:text-brandBlue'
                  }`}
                >
                  {p.id === 'enterprise' ? 'Contact sales' : 'Start free trial'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="grid gap-8 rounded-[30px] border border-slate-200 bg-white p-8 shadow-card sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">Contact</p>
              <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Questions before you start?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Email us and we&apos;ll walk you through setup, pricing, or a bigger plan.
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
                Looking for the personal app instead?{' '}
                <Link className="font-semibold text-brandBlue hover:underline" to="/">
                  See Be Positive for individuals
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
