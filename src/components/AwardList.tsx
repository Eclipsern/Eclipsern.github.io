import type { Award } from '../data/content'
import { awards } from '../data/awards'
import { EmptyState } from './EmptyState'

interface AwardListProps {
  items?: Award[]
}

export function AwardList({ items = awards }: AwardListProps) {
  if (items.length === 0) {
    return <EmptyState>奖项内容即将更新。</EmptyState>
  }

  return (
    <div className="content-list">
      {items.map((award) => (
        <article className="content-entry award-entry" key={award.id}>
          <div className="entry-meta">
            <span>{award.issuer}</span>
            <span>{award.year}</span>
          </div>
          <h3>{award.name}</h3>
          <p className="entry-authors">
            {award.issuer} · {award.year}
          </p>
          {award.description && (
            <p className="entry-description">{award.description}</p>
          )}
        </article>
      ))}
    </div>
  )
}
