import { AwardList } from './components/AwardList'
import { Header } from './components/Header'
import { ProfilePanel } from './components/ProfilePanel'
import { ProjectList } from './components/ProjectList'
import { PublicationList } from './components/PublicationList'
import { Section } from './components/Section'
import { useActiveSection } from './hooks/useActiveSection'

const sectionIds = ['about', 'publications', 'projects', 'awards'] as const

export function App() {
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <Header activeId={activeId} />
      <main className="page-shell">
        <ProfilePanel />

        <div className="content-column">
          <aside className="editorial-note">
            <span>WZ — 2026</span>
            <p>
              This page is taking shape alongside the work it will document.
            </p>
          </aside>

          <Section id="publications" eyebrow="Selected work / 02" title="Publications">
            <PublicationList />
          </Section>

          <Section id="projects" eyebrow="In practice / 03" title="Projects">
            <ProjectList />
          </Section>

          <Section id="awards" eyebrow="Recognition / 04" title="Awards">
            <AwardList />
          </Section>
        </div>
      </main>
    </>
  )
}

