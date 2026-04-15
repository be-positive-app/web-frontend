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

export function Landing() {
  const features = useInView<HTMLDivElement>({ once: true })
  const how = useInView<HTMLDivElement>({ once: true })
  const download = useInView<HTMLDivElement>({ once: true })

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
              Be Positive helps you organize tasks, keep a clear daily structure, and
              stay consistent—so you get more done without the stress.
            </p>

            <div className="mt-7 flex flex-col gap-4">
              <StoreButtons />

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                <span>Simple, fast, effective. Built for students and pros.</span>
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
              A clean workflow that makes planning feel effortless—and results feel
              inevitable.
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
              Three steps. One simple system. A better day—every day.
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
              title="Get reminders"
              description="Gentle nudges to keep you on track—without noise."
              icon={<Bell className="h-5 w-5" aria-hidden="true" />}
              revealed={how.inView}
              delayMs={90}
            />
            <Step
              index={3}
              title="Track your progress"
              description="See what’s working and build momentum with streaks."
              icon={<LineChart className="h-5 w-5" aria-hidden="true" />}
              revealed={how.inView}
              delayMs={180}
            />
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-slate-600">
            <ArrowRight className="h-4 w-4 text-brandBlue" aria-hidden="true" />
            <p>
              Designed to be intuitive on mobile, powerful enough for real routines.
            </p>
          </div>
        </div>
      </section>

      <section id="download" className="border-t border-slate-100 bg-hero-gradient">
        <div
          ref={download.ref}
          className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="grid gap-10 rounded-[34px] border border-slate-200 bg-white/80 p-8 shadow-soft backdrop-blur sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Start organizing your life today
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                A lightweight productivity system that’s easy to stick with. Download
                Be Positive and get a clear plan in minutes.
              </p>

              <div
                className={[
                  'mt-7 transition duration-300',
                  download.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                ].join(' ')}
              >
                <StoreButtons variant="primary" />
                <ul className="mt-4 grid gap-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                    Simple
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                    Fast
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brandBlue" aria-hidden="true" />
                    Effective
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6">
              <div className="absolute -right-14 -top-10 h-40 w-40 rounded-full bg-brandYellow/50 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-brandBlue/15 blur-3xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
                  Your day, simplified
                </p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
                  “I finally feel in control of my schedule.”
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Students use it to stay on top of deadlines. Professionals use it to
                  protect deep work. Everyone uses it to keep momentum.
                </p>

                <div className="mt-6 grid gap-3">
                  <MiniStat label="Daily plan clarity" value="High" />
                  <MiniStat label="Distraction resistance" value="Better" />
                  <MiniStat label="Consistency streak" value="Growing" />
                </div>
              </div>
            </div>
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
                Want early access or have questions?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Email us and we’ll get back to you. We’re building Be Positive with
                real feedback from students and professionals.
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

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="inline-flex items-center gap-2 text-sm font-semibold text-brandBlue">
        <span className="grid h-2 w-2 rounded-full bg-brandYellow ring-2 ring-brandBlue/15" />
        {value}
      </p>
    </div>
  )
}

