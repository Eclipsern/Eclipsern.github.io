import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

beforeEach(() => {
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
    expect(screen.getByText('西电网信院大二')).toBeInTheDocument()
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
})
