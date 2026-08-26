import type { Project } from '../data/content'
import { projects } from '../data/projects'
import { EmptyState } from './EmptyState'

interface ProjectListProps {
  items?: Project[]
}

export function ProjectList({ items = projects }: ProjectListProps) {
  if (items.length === 0) {
    return <EmptyState>项目内容即将更新。</EmptyState>
  }

  return (
    <div className="content-list">
      {items.map((project) => (
        <article className="content-entry project-entry" key={project.id}>
          {project.image && (
            <img
              className="entry-image"
              src={project.image}
              alt=""
              loading="lazy"
              width="240"
              height="150"
            />
          )}
          <div className="entry-body">
            <div className="entry-meta">
              <span>Project</span>
              <span>{project.year}</span>
            </div>
            <h3>{project.name}</h3>
            <p className="entry-description">{project.description}</p>
            {project.link && (
              <div className="entry-links">
                <a href={project.link} target="_blank" rel="noreferrer">
                  View project
                </a>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

