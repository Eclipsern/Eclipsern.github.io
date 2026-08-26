import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AwardList } from './AwardList'
import { ProjectList } from './ProjectList'
import { PublicationList } from './PublicationList'

describe('content lists', () => {
  it('renders honest empty states', () => {
    render(<PublicationList items={[]} />)
    render(<ProjectList items={[]} />)
    render(<AwardList items={[]} />)

    expect(screen.getByText('论文内容即将更新。')).toBeInTheDocument()
    expect(screen.getByText('项目内容即将更新。')).toBeInTheDocument()
    expect(screen.getByText('奖项内容即将更新。')).toBeInTheDocument()
  })

  it('renders complete optional publication fields without empty links', () => {
    render(
      <PublicationList
        items={[
          {
            id: 'paper-1',
            title: 'A Test Paper',
            authors: ['Wenqin Zhou', 'A. Collaborator'],
            venue: 'TestConf',
            year: 2026,
            summary: 'A concise summary.',
            links: {
              paper: 'https://example.com/paper',
              code: 'https://example.com/code',
            },
          },
        ]}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'A Test Paper' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Wenqin Zhou · A. Collaborator'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Paper' })).toHaveAttribute(
      'href',
      'https://example.com/paper',
    )
    expect(screen.getByRole('link', { name: 'Code' })).toHaveAttribute(
      'href',
      'https://example.com/code',
    )
  })

  it('renders project and award records', () => {
    render(
      <ProjectList
        items={[
          {
            id: 'project-1',
            name: 'A Project',
            year: 2026,
            description: 'Project description.',
          },
        ]}
      />,
    )
    render(
      <AwardList
        items={[
          {
            id: 'award-1',
            name: 'An Award',
            issuer: 'Awarding Body',
            year: 2026,
          },
        ]}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'A Project' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Awarding Body · 2026')).toBeInTheDocument()
  })
})
