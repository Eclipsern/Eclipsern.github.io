import { useEffect, useState } from 'react'

export function useActiveSection(ids: readonly string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '')
  const sectionKey = ids.join('|')

  useEffect(() => {
    const sectionIds = sectionKey.split('|').filter(Boolean)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const syncWithHash = () => {
      const hashId = window.location.hash.slice(1)
      if (sectionIds.includes(hashId)) {
        setActiveId(hashId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)
        if (visibleSection) {
          setActiveId(visibleSection.target.id)
        }
      },
      { rootMargin: '-20% 0px -40% 0px' },
    )

    syncWithHash()
    window.addEventListener('hashchange', syncWithHash)
    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('hashchange', syncWithHash)
      observer.disconnect()
    }
  }, [sectionKey])

  return activeId
}
