import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

beforeEach(() => {
  window.history.replaceState(null, '', '#about')

  class IntersectionObserverMock {
    observe = vi.fn()
    disconnect = vi.fn()
    unobserve = vi.fn()
  }

  vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
})

describe('App', () => {
  it('publishes the approved identity and semantic sections', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Wenqin Zhou', level: 1 }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Undergrad student, School of Cyber Engineering, Xidian University',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: '24049200434@stu.xidian.edu.cn' }),
    ).toHaveAttribute('href', 'mailto:24049200434@stu.xidian.edu.cn')
    expect(
      screen.getByRole('img', { name: 'Wenqin Zhou 的头像' }),
    ).toHaveAttribute('src', './avatar.jpg')
    expect(
      screen.getByRole('heading', { name: 'Publications' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Projects' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Awards' })).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Primary navigation' }),
    ).toBeInTheDocument()
  })

  it('marks a hash-targeted section as the current navigation item', () => {
    render(<App />)

    act(() => {
      window.history.replaceState(null, '', '#awards')
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(screen.getByRole('link', { name: 'Awards' })).toHaveAttribute(
      'aria-current',
      'location',
    )
  })
})
