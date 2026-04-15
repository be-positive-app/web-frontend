import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
  delayMs?: number
  revealed?: boolean
}

export function FeatureCard({
  icon,
  title,
  description,
  delayMs = 0,
  revealed = true,
}: FeatureCardProps) {
  return (
    <div
      className={[
        'group relative rounded-3xl border border-slate-200/70 bg-white p-6 shadow-card',
        'transition duration-300 will-change-transform hover:-translate-y-1 hover:shadow-soft motion-reduce:transform-none motion-reduce:transition-none',
        'focus-within:ring-4 focus-within:ring-brandYellow/30',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
      ].join(' ')}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brandBlue/10 text-brandBlue ring-1 ring-brandBlue/10 transition group-hover:bg-brandYellow/60">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

