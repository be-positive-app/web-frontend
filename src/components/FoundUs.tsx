import { Check, Loader2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SITE_META } from '../config/siteMeta'

/**
 * Where the answers go. With nothing configured the popup never opens rather
 * than collecting answers into the void, which would be asking visitors for
 * something and then throwing it away.
 */
const ENDPOINT =
  (import.meta.env.VITE_SURVEY_ENDPOINT as string | undefined)?.trim() ||
  SITE_META.surveyEndpoint

const SOURCES = ['LinkedIn', 'Google', 'Facebook', 'Instagram', 'TikTok', 'Other'] as const
type Source = (typeof SOURCES)[number]

/** Answered or dismissed — either way this browser is not asked again. */
const ASKED_KEY = 'bp:found-us-answered'
/**
 * Long enough for the page to paint first. A dialog that arrives over a blank
 * page reads as a fault rather than a question.
 */
const OPEN_AFTER_MS = 800

function alreadyAsked() {
  try {
    return window.localStorage.getItem(ASKED_KEY) !== null
  } catch {
    // Private mode and blocked site data both throw; asking again is the
    // harmless failure here.
    return false
  }
}

function rememberAsked() {
  try {
    window.localStorage.setItem(ASKED_KEY, '1')
  } catch {
    // Not worth failing the submission over.
  }
}

/**
 * "How did you find us?" as a popup — one tap, or a few words under Other.
 *
 * It opens as soon as the page has drawn, by request. That is the most likely
 * thing on this page to be seen and the most likely to be resented: an
 * interstitial over the content on arrival is also what Google's mobile
 * intrusive-interstitial rule is about, so if search traffic ever dips this is
 * the first thing to put back on a delay. It opens once ever — answering and
 * dismissing are both an answer to whether they want to be asked.
 *
 * Built on <dialog>, which gives the focus trap, Escape, and the top layer for
 * free; doing those by hand is where home-made modals usually go wrong.
 *
 * Only the chosen source and, under Other, whatever is typed goes anywhere.
 * Nothing identifying is collected or attached, which is why the free-text box
 * says not to put personal details in it: it is the one field that could carry
 * any, and they would then sit in an inbox nobody expected them to reach.
 */
export function FoundUs() {
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null)
  const [open, setOpen] = useState(false)
  const [choice, setChoice] = useState<Source | null>(null)
  const [note, setNote] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')

  // Ask straight away, once the page has drawn.
  useEffect(() => {
    if (!ENDPOINT || alreadyAsked()) return
    const armed = window.setTimeout(() => setOpen(true), OPEN_AFTER_MS)
    return () => window.clearTimeout(armed)
  }, [])

  // <dialog> only becomes modal through showModal(), never through an attribute.
  useEffect(() => {
    if (open && dialog && !dialog.open) dialog.showModal()
  }, [open, dialog])

  function close() {
    rememberAsked()
    dialog?.close()
    setOpen(false)
  }

  async function send(source: Source, detail?: string) {
    setState('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Without this Formspree answers with a redirect to its own
          // thank-you page instead of the JSON this reads.
          Accept: 'application/json',
        },
        body: JSON.stringify({
          // Formspree reads a leading underscore as an instruction; this one
          // becomes the subject line of the email it sends.
          _subject: 'bepositive.cc — how did you find us?',
          source,
          detail: detail?.trim() || undefined,
          page: window.location.pathname,
        }),
      })
      if (!response.ok) throw new Error(String(response.status))
      rememberAsked()
      setState('done')
      window.setTimeout(close, 1600)
    } catch {
      // Say so rather than showing a tick for something that never arrived.
      setState('failed')
    }
  }

  if (!open) return null

  return (
    <dialog
      ref={setDialog}
      aria-labelledby="found-us-title"
      onCancel={(event) => {
        // Escape; let it through, but record the answer to being asked.
        event.preventDefault()
        close()
      }}
      onClick={(event) => {
        // A click that lands on the dialog itself is a click on the backdrop:
        // the panel inside covers everything else.
        if (event.target === event.currentTarget) close()
      }}
      className="w-[calc(100vw-2rem)] max-w-lg rounded-[28px] border border-slate-200 bg-white p-0 shadow-2xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-8 text-center sm:p-10">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-ring"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {state === 'done' ? (
          <p className="inline-flex items-center gap-2 py-4 text-base font-semibold text-slate-900">
            <Check className="h-5 w-5 text-brandBlue" aria-hidden="true" />
            Thank you — that helps us more than you would think.
          </p>
        ) : (
          <>
            <h2
              id="found-us-title"
              className="text-balance text-2xl font-extrabold tracking-tight text-slate-900"
            >
              How did you find us?
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
              One tap. It tells us where to keep showing up.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {SOURCES.map((source, index) => {
                const selected = choice === source
                return (
                  <button
                    key={source}
                    type="button"
                    autoFocus={index === 0}
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
              <>
                <form
                  className="mx-auto mt-5 flex max-w-sm flex-col items-center gap-2 sm:flex-row"
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
                <p className="mt-3 text-xs text-slate-500">
                  Please do not include personal details.
                </p>
              </>
            ) : null}

            {state === 'failed' ? (
              <p className="mt-4 text-sm font-semibold text-red-600" role="alert">
                That did not go through. Please try again.
              </p>
            ) : null}
          </>
        )}
      </div>
    </dialog>
  )
}
