import type { Publication } from '../data/content'
import { publications } from '../data/publications'
import { EmptyState } from './EmptyState'

interface PublicationListProps {
  items?: Publication[]
}

export function PublicationList({ items = publications }: PublicationListProps) {
  if (items.length === 0) {
    return <EmptyState>论文内容即将更新。</EmptyState>
  }

  return (
    <div className="content-list">
      {items.map((publication) => (
        <article className="content-entry publication-entry" key={publication.id}>
          {publication.image && (
            <img
              className="entry-image"
              src={publication.image}
              alt=""
              loading="lazy"
              width="240"
              height="150"
            />
          )}
          <div className="entry-body">
            <div className="entry-meta">
              <span>{publication.venue}</span>
              <span>{publication.year}</span>
            </div>
            <h3>{publication.title}</h3>
            <p className="entry-authors">{publication.authors.join(' · ')}</p>
            {publication.summary && (
              <p className="entry-description">{publication.summary}</p>
            )}
            {(publication.links?.paper || publication.links?.code) && (
              <div className="entry-links" aria-label={`${publication.title} links`}>
                {publication.links.paper && (
                  <a href={publication.links.paper} target="_blank" rel="noreferrer">
                    Paper
                  </a>
                )}
                {publication.links.code && (
                  <a href={publication.links.code} target="_blank" rel="noreferrer">
                    Code
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

