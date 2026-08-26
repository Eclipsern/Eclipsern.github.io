import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section className="content-section" id={id} aria-labelledby={headingId}>
      <header className="section-header">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{title}</h2>
      </header>
      {children}
    </section>
  )
}

