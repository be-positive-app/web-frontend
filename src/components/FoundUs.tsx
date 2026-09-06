import { Check, Loader2 } from 'lucide-react'
import { useState } from 'react'

/**
 * Where the answers go. A form-to-email service or your own endpoint that
 * accepts a JSON POST — see the note in the component below.
 *
 * With nothing configured the whole section stays off the page rather than
 * collecting answers into the void, which would be asking visitors for
 * something and then throwing it away.
 */
const ENDPOINT = (import.meta.env.VITE_SURVEY_ENDPOINT as string | undefined)?.trim()

const SOURCES = ['LinkedIn', 'Google', 'Facebook', 'Instagram', 'TikTok', 'Other'] as const
type Source = (typeof SOURCES)[number]

/** Remembers that this browser already answered, so it is asked once. */
const ANSWERED_KEY = 'bp:found-us-answered'

function alreadyAnswered() {
  try {
    return window.localStorage.getItem(ANSWERED_KEY) === '1'
  } catch {
    // Private mode and blocked site data both throw; asking again is the
    // harmless failure here.
    return false
  }
}

function rememberAnswered() {
  try {
    window.localStorage.setItem(ANSWERED_KEY, '1')
  } catch {
    // Not worth failing the submission over.
  }
}

/**
 * "How did you find us?" — one tap, or a few words under Other.
 *
 * Only the chosen source and, for Other, whatever the visitor types is sent.
 * Nothing identifying is collected or attached, which is why the free-text box
 * says not to put personal details in it: it is the one field that could carry
 * any, and it would then sit in an inbox nobody expected it to reach.
 */
export function FoundUs() {
  const [choice, setChoice] = useState<Source | null>(null)
  const [note, setNote] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
  const [dismissed] = useState(alreadyAnswered)

  if (!ENDPOINT || dismissed) return null

  async function send(source: Source, detail?: string) {
    setState('sending')
    try {
      const response = await fetch(ENDPOINT as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'bepositive.cc — how did you find us?',
          source,
          detail: detail?.trim() || undefined,
          page: window.location.pathname,
        }),
      })
      if (!response.ok) throw new Error(String(response.status))
      rememberAnswered()
      setState('done')
    } catch {
      // Say so rather than showing a tick for something that never arrived.
      setState('failed')
    }
  }

  return (
    <section className="border-t border-slate-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-[30px] border border-slate-200 bg-slate-50/60 p-8 text-center sm:p-10">
          {state === 'done' ? (
            <p className="inline-flex items-center gap-2 text-base font-semibold text-slate-900">
              <Check className="h-5 w-5 text-brandBlue" aria-hidden="true" />
              Thank you — that helps us more than you would think.
            </p>
          ) : (
            <>
              <h2 className="text-balance text-2xl font-extrabold tracking-tight text-slate-900">
                How did you find us?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
                One tap. It tells us where to keep showing up.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {SOURCES.map((source) => {
                  const selected = choice === source
                  return (
                    <button
                      key={source}
                      type="button"
                      disabled={state === 'sending'}
                      aria-pressed={selected}
                      onClick={() => {
                        setChoice(source)
                        setState('idle')
                        // Other needs its own words first; the rest are complete
                        // answers on their own.
                        if (source !== 'Other') void send(source)
                      }}
                      className={[
                        'rounded-full border px-5 py-2.5 text-sm font-semibold transition focus-ring disabled:opacity-60',
                        selected
                          ? 'border-brandBlue bg-brandBlue text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-brandBlue/40 hover:text-brandBlue',
                      ].join(' ')}
                    >
                      {source}
                    </button>
                  )
                })}
              </div>

              {choice === 'Other' ? (
                <form
                  className="mx-auto mt-5 flex max-w-md flex-col items-center gap-2 sm:flex-row"
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (note.trim()) void send('Other', note)
                  }}
                >
                  <label className="sr-only" htmlFor="found-us-note">
                    Where did you find us?
                  </label>
                  <input
                    id="found-us-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    maxLength={120}
                    autoComplete="off"
                    placeholder="A friend, a podcast, somewhere else…"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus-ring"
                  />
                  <button
                    type="submit"
                    disabled={!note.trim() || state === 'sending'}
                    className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-brandBlue px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:shadow-md hover:shadow-brandYellow/25 focus-ring disabled:opacity-50"
                  >
                    {state === 'sending' ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : null}
                    OK
                  </button>
                </form>
              ) : null}

              {choice === 'Other' ? (
                <p className="mt-3 text-xs text-slate-500">
                  Please do not include personal details.
                </p>
              ) : null}

              {state === 'failed' ? (
                <p className="mt-4 text-sm font-semibold text-red-600" role="alert">
                  That did not go through. Please try again.
                </p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
