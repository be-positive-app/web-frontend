export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="absolute -left-8 -top-10 h-32 w-32 rounded-full bg-brandYellow/50 blur-2xl" />
      <div className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full bg-brandBlue/15 blur-2xl" />

      <div className="relative rounded-[36px] bg-slate-900 p-2 shadow-soft">
        <div className="rounded-[30px] bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-brandBlue" />
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Today
              </p>
            </div>
            <p className="text-xs font-semibold text-slate-500">Be Positive Life Planner</p>
          </div>

          <div className="px-5 pb-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandBlue/70">
                Focus
              </p>
              <p className="mt-2 text-base font-semibold tracking-tight text-slate-900">
                Finish 3 high-impact tasks
              </p>
              <div className="mt-3 grid gap-2">
                <TaskRow label="Marketing research" time="09:30" />
                <TaskRow label="Write project outline" time="11:00" highlight />
                <TaskRow label="Gym + reset" time="18:00" />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                Quick plan
              </p>
              <div className="mt-3 grid gap-3">
                <TimelineRow label="Deep work block" from="10:00" to="12:00" />
                <TimelineRow label="Meetings" from="14:00" to="15:00" />
                <TimelineRow label="Wrap-up + reflect" from="20:30" to="20:45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TaskRow({
  label,
  time,
  highlight = false,
}: {
  label: string
  time: string
  highlight?: boolean
}) {
  return (
    <div
      className={[
        'flex items-center justify-between rounded-xl border px-3 py-2',
        highlight
          ? 'border-brandYellow/70 bg-brandYellow/50'
          : 'border-slate-200 bg-white',
      ].join(' ')}
    >
      <div className="flex min-w-0 items-center gap-2">
        <div
          className={[
            'h-2.5 w-2.5 flex-none rounded-full',
            highlight ? 'bg-brandBlue' : 'bg-slate-300',
          ].join(' ')}
        />
        <p className="truncate text-sm font-medium text-slate-900">{label}</p>
      </div>
      <p className="ml-3 flex-none text-xs font-semibold text-slate-600">{time}</p>
    </div>
  )
}

function TimelineRow({
  label,
  from,
  to,
}: {
  label: string
  from: string
  to: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">{label}</p>
        <p className="mt-0.5 text-xs text-slate-500">
          {from}–{to}
        </p>
      </div>
      <div className="h-2 w-20 flex-none overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
        <div className="h-full w-2/3 rounded-full bg-brandBlue/70" />
      </div>
    </div>
  )
}

