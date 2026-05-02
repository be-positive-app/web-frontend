import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  LineChart,
  ListTodo,
  Mail,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FeatureCard } from '../components/FeatureCard'
import { PhoneMockup } from '../components/PhoneMockup'
import { Step } from '../components/Step'
import { StoreButtons } from '../components/StoreButtons'
import { useInView } from '../hooks/useInView'

const appStoreHref =
  (import.meta.env.VITE_APP_STORE_URL as string | undefined)?.trim() || 
  'https://apps.apple.com/app/be-positive-life-planner/id6760747846'
const googlePlayHref =
  (import.meta.env.VITE_GOOGLE_PLAY_URL as string | undefined)?.trim() ||
  'https://play.google.com/store/apps/details?id=com.bepositive.mobile'

export function Landing() {
  const features = useInView<HTMLDivElement>({ once: true })
  const how = useInView<HTMLDivElement>({ once: true })

  return (
    <div>
      <section id="home" className="bg-hero-gradient">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-brandBlue" aria-hidden="true" />
              <span>
                Minimal planning, maximum focus
                <span className="text-brandBlue">.</span>
              </span>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Plan your day. Stay focused.{' '}
              <span className="text-brandBlue">Feel positive.</span>
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              Do you struggle to complete tasks on time? Be Positive Life Planner helps you plan tasks, send reminders, and analyze your daily results - so you can stay focused and productive every day.
            </p>

            <div className="mt-7 flex flex-col gap-4">
              <StoreButtons appStoreHref={appStoreHref} googlePlayHref={googlePlayHref} />

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                <span>Task manager & daily planner app with reminders, focus tools, and progress tracking.</span>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <PhoneMockup />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
              Features
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to stay productive
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Plan smarter. Stay consistent. See results.
            </p>
          </div>

          <div
            ref={features.ref}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2"
          >
            <FeatureCard
              icon={<ListTodo className="h-5 w-5" aria-hidden="true" />}
              title="Smart Task Management"
              description="Organize tasks efficiently and prioritize what matters."
              revealed={features.inView}
              delayMs={0}
            />
            <FeatureCard
              icon={<CalendarDays className="h-5 w-5" aria-hidden="true" />}
              title="Calendar Planning"
              description="Plan your day with a clear and structured schedule."
              revealed={features.inView}
              delayMs={80}
            />
            <FeatureCard
              icon={<Bell className="h-5 w-5" aria-hidden="true" />}
              title="Daily Reminders"
              description="Never miss important tasks with smart notifications."
              revealed={features.inView}
              delayMs={140}
            />
            <FeatureCard
              icon={<LineChart className="h-5 w-5" aria-hidden="true" />}
              title="Progress Tracking"
              description="Track your productivity and build better habits over time."
              revealed={features.inView}
              delayMs={220}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
              How it works
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Three steps to plan, focus, and win every day.
            </p>
          </div>

          <div ref={how.ref} className="mt-10 grid gap-5 lg:grid-cols-3">
            <Step
              index={1}
              title="Add your tasks"
              description="Capture everything quickly, then choose what matters most."
              icon={<ListTodo className="h-5 w-5" aria-hidden="true" />}
              revealed={how.inView}
              delayMs={0}
            />
            <Step
              index={2}
              title="Get Positive reminders"
              description="Stay focused with calm, distraction-free reminders."
              icon={<Bell className="h-5 w-5" aria-hidden="true" />}
              revealed={how.inView}
              delayMs={90}
            />
            <Step
              index={3}
              title="Track your progress"
              description="Track your wins and grow your streaks over time."
              icon={<LineChart className="h-5 w-5" aria-hidden="true" />}
              revealed={how.inView}
              delayMs={180}
            />
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-slate-600">
            <ArrowRight className="h-4 w-4 text-brandBlue" aria-hidden="true" />
            <p>
              Effortless on mobile, powerful for your daily routine.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="grid gap-8 rounded-[30px] border border-slate-200 bg-white p-8 shadow-card sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
                Contact
              </p>
              <h2 className="mt-3 text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Have a question or suggestion?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Email us today—we’ll get back to you fast. Built with real feedback to help you stay consistent.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <a
                href="mailto:info@bepositive.cc"
                className="inline-flex items-center gap-2 rounded-2xl bg-brandBlue px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 hover:ring-1 hover:ring-brandYellow/50 focus-ring"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                info@bepositive.cc
              </a>
              <p className="text-sm text-slate-500">
                Or check the{' '}
                <Link className="font-semibold text-brandBlue hover:underline" to="/privacy">
                  Privacy Policy
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

