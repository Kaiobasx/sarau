'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-motion]')
    const revealAll = () => {
      elements.forEach((element) => {
        element.dataset.motionVisible = 'true'
      })
    }

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      revealAll()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const element = entry.target as HTMLElement
          element.dataset.motionVisible = 'true'
          observer.unobserve(element)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
    )

    const observeWithin = (root: ParentNode) => {
      if (root instanceof Element && root.matches('[data-motion]')) {
        observer.observe(root)
      }
      root.querySelectorAll<HTMLElement>('[data-motion]').forEach((element) => observer.observe(element))
    }

    elements.forEach((element) => observer.observe(element))
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) observeWithin(node)
        })
      })
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [pathname])

  return null
}
