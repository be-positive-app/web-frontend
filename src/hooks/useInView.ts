import { useEffect, useRef, useState } from 'react'

export function useInView<T extends Element>(options?: {
  rootMargin?: string
  threshold?: number
  once?: boolean
}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        const next = entries.some((e) => e.isIntersecting)
        setInView((prev) => (options?.once ? prev || next : next))
      },
      {
        root: null,
        rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
        threshold: options?.threshold ?? 0.15,
      },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [options?.once, options?.rootMargin, options?.threshold])

  return { ref, inView }
}

