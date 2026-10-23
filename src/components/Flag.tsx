import type { Lang } from '../i18n'

/** Small SVG flags (no emoji, so they render the same on every OS). */
export function Flag({ code, className = 'h-4 w-5' }: { code: Lang; className?: string }) {
  const common = { className: `${className} shrink-0 rounded-[3px] ring-1 ring-black/10`, viewBox: '0 0 20 14', 'aria-hidden': true as const }
  switch (code) {
    case 'en':
      return (
        <svg {...common}>
          <rect width="20" height="14" fill="#012169" />
          <path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="2.6" />
          <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1" />
          <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4" />
          <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.2" />
        </svg>
      )
    case 'az':
      return (
        <svg {...common}>
          <rect width="20" height="14" fill="#3F9C35" />
          <rect width="20" height="9.33" fill="#ED2939" />
          <rect width="20" height="4.67" fill="#00B5E2" />
          <circle cx="9.6" cy="7" r="2.1" fill="#fff" />
          <circle cx="10.2" cy="7" r="1.7" fill="#ED2939" />
          <circle cx="11.6" cy="7" r="0.65" fill="#fff" />
        </svg>
      )
    case 'ru':
      return (
        <svg {...common}>
          <rect width="20" height="14" fill="#D52B1E" />
          <rect width="20" height="9.33" fill="#0039A6" />
          <rect width="20" height="4.67" fill="#fff" />
        </svg>
      )
    case 'tr':
      return (
        <svg {...common}>
          <rect width="20" height="14" fill="#E30A17" />
          <circle cx="7.5" cy="7" r="3.4" fill="#fff" />
          <circle cx="8.3" cy="7" r="2.7" fill="#E30A17" />
          <circle cx="11.4" cy="7" r="1" fill="#fff" />
        </svg>
      )
  }
}
