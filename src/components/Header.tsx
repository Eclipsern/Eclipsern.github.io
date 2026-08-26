const navigation = [
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
] as const

interface HeaderProps {
  activeId: string
}

export function Header({ activeId }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="site-brand" href="#about" aria-label="Wenqin Zhou homepage">
          <span>WZ</span>
          <span aria-hidden="true">/</span>
          <span>Homepage</span>
        </a>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  className="nav-link"
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

