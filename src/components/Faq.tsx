import { ChevronDown } from 'lucide-react'
import { FAQ } from '../config/faq'

/**
 * Rendered with <details>, so every answer is present in the HTML whether or
 * not it is open — collapsed copy still has to be readable by crawlers, and
 * the disclosure works without JavaScript or a keyboard trap.
 */
export function Faq() {
  return (
    <section id="faq" className="border-t border-slate-100 bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brandBlue/70">
          FAQ
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Questions people ask before downloading
        </h2>

        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map((entry) => (
            <details key={entry.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl text-left text-base font-semibold text-slate-900 focus-ring">
                {entry.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-brandBlue transition group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 pr-9 text-base leading-relaxed text-slate-600">
                {entry.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
