import { useEffect, useState } from 'react'

/**
 * Reveal-on-scroll helper.
 *
 * `ref` is a callback ref that stores the observed node in state rather than a
 * ref object: the effect can then depend on the node directly, so the observer
 * is re-attached if the element is swapped out, and callers can read `inView`
 * during render without tripping the react-hooks refs rule.
 */
export function useInView<T extends Element>(options?: {
  rootMargin?: string
  threshold?: number
  once?: boolean
}) {
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!node) return

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

    obs.observe(node)
    return () => obs.disconnect()
  }, [node, options?.once, options?.rootMargin, options?.threshold])

  return { ref: setNode, inView }
}
