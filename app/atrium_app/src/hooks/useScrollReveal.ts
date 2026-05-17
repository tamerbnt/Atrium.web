import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrollRevealOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  stagger?: number
  delay?: number
  ease?: string
}

export function useScrollReveal(
  ref: RefObject<Element | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 16,
    x = 0,
    opacity = 0,
    duration = 0.5,
    stagger = 0,
    delay = 0,
    ease = 'power2.out',
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const targets = stagger > 0
      ? Array.from(element.children)
      : [element]

    gsap.fromTo(
      targets,
      { y, x, opacity },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll()
        .filter((t: InstanceType<typeof ScrollTrigger>) => t.trigger === element)
        .forEach((t: InstanceType<typeof ScrollTrigger>) => t.kill())
    }
  }, [])
}
