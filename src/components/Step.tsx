import type { ReactNode } from 'react'

type StepProps = {
  index: number
  title: string
  description?: string
  icon: ReactNode
  revealed?: boolean
  delayMs?: number
}

export function Step({
  index,
  title,
  description,
  icon,
  revealed = true,
  delayMs = 0,
}: StepProps) {
  return (
    <div
      className={[
        'relative rounded-3xl border border-slate-200/70 bg-white p-6 shadow-card',
        'transition duration-300 motion-reduce:transition-none',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
      ].join(' ')}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brandYellow/80 text-brandBlue ring-1 ring-brandYellow/40">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandBlue/70">
            Step {index}
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

