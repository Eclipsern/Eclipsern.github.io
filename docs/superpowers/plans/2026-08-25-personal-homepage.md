# Wenqin Zhou Personal Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished React/Vite academic homepage for Wenqin Zhou that is ready for ongoing publication, project, and award updates and can be deployed on GitHub Pages.

**Architecture:** A single-page React application renders a typed profile and three typed content collections. Focused presentation components own one section each, while a small active-section hook connects page scroll position to the header navigation. Vite emits a static `dist` directory with relative asset paths for GitHub Pages.

**Tech Stack:** React 19.2.8, TypeScript 7.0.2, Vite 8.2.2, Vitest 4.1.11, Testing Library 16.3.2, bundled Fraunces and Noto Sans SC fonts, CSS.

**Spec:** `docs/superpowers/specs/2026-08-25-personal-homepage-design.md`

## Global Constraints

- The public profile copy is exactly `Wenqin Zhou`, `24049200434@stu.xidian.edu.cn`, and `西电网信院大二`.
- Use the user-provided image as `public/avatar.jpg`; do not generate or substitute another avatar.
- Do not invent publications, projects, awards, research interests, social accounts, location, or biography details.
- Keep Publications, Projects, and Awards in separate typed data files.
- Use no router, backend, database, CMS, analytics, contact form, login, or comment system.
- Use only the browser's main scroll container.
- Meet WCAG AA contrast, preserve visible keyboard focus, and honor `prefers-reduced-motion`.
- Vite must emit relative asset paths and the project must include a GitHub Pages deployment workflow.

---

### Task 1: Project Foundation and Profile Data

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/vite-env.d.ts`
- Create: `src/test/setup.ts`
- Create: `src/data/profile.test.ts`
- Create: `src/data/profile.ts`
- Create: `public/avatar.jpg`

**Interfaces:**
- Consumes: user-provided avatar at `C:/Users/Lenovo/AppData/Local/Temp/codex-clipboard-63d16cd4-47d2-4cfb-9f77-9715ef3b109b.jpg`
- Produces: `Profile` and `profile: Profile` from `src/data/profile.ts`

- [ ] **Step 1: Create the Vite, TypeScript, and Vitest foundation**

Create `package.json` with these exact scripts and dependency families:

```json
{
  "name": "wenqin-zhou-homepage",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@fontsource/fraunces": "^5.3.0",
    "@fontsource/noto-sans-sc": "^5.3.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.2",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.5",
    "@vitejs/plugin-react": "^6.1.0",
    "jsdom": "^30.0.1",
    "typescript": "^7.0.2",
    "vite": "^8.2.2",
    "vitest": "^4.1.11"
  }
}
```

Create TypeScript project references with strict checking, `jsx: react-jsx`, `moduleResolution: Bundler`, DOM libraries for the app, and `noEmit: true`. Create `vite.config.ts` with React, `base: './'`, and a `jsdom` test environment loading `src/test/setup.ts`. Create `src/test/setup.ts` containing:

```ts
import '@testing-library/jest-dom/vitest'
```

Create `.gitignore` containing `node_modules`, `dist`, `coverage`, `.vite`, and editor/OS noise. Create a minimal `index.html` with `<div id="root"></div>` and module script `/src/main.tsx`.

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: exit code 0 and a new `package-lock.json`.

- [ ] **Step 3: Write the failing profile-data test**

Create `src/data/profile.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { profile } from './profile'

describe('profile', () => {
  it('contains only the approved public profile fields', () => {
    expect(profile).toEqual({
      name: 'Wenqin Zhou',
      email: '24049200434@stu.xidian.edu.cn',
      bio: '西电网信院大二',
      avatar: './avatar.jpg',
      avatarAlt: 'Wenqin Zhou 的头像',
    })
  })
})
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test -- src/data/profile.test.ts`

Expected: FAIL because `src/data/profile.ts` does not exist.

- [ ] **Step 5: Add the typed profile and copy the approved avatar**

Create `src/data/profile.ts`:

```ts
export interface Profile {
  name: string
  email: string
  bio: string
  avatar: string
  avatarAlt: string
}

export const profile: Profile = {
  name: 'Wenqin Zhou',
  email: '24049200434@stu.xidian.edu.cn',
  bio: '西电网信院大二',
  avatar: './avatar.jpg',
  avatarAlt: 'Wenqin Zhou 的头像',
}
```

Copy the single explicit source image to `public/avatar.jpg` with PowerShell `Copy-Item -LiteralPath` and confirm the destination exists with `Get-Item`.

- [ ] **Step 6: Run the profile test**

Run: `npm test -- src/data/profile.test.ts`

Expected: PASS with one test.

- [ ] **Step 7: Commit the foundation**

```powershell
git add .gitignore package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html public/avatar.jpg src/vite-env.d.ts src/test/setup.ts src/data/profile.ts src/data/profile.test.ts
git commit -m "chore: scaffold React homepage"
```

---

### Task 2: Typed Content Collections and List Components

**Files:**
- Create: `src/data/content.ts`
- Create: `src/data/publications.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/awards.ts`
- Create: `src/components/EmptyState.tsx`
- Create: `src/components/PublicationList.tsx`
- Create: `src/components/ProjectList.tsx`
- Create: `src/components/AwardList.tsx`
- Create: `src/components/ContentLists.test.tsx`

**Interfaces:**
- Consumes: `Publication[]`, `Project[]`, and `Award[]` values supplied by their data modules or component props
- Produces: `PublicationList`, `ProjectList`, and `AwardList` React components with `items` props

- [ ] **Step 1: Write failing content-list tests**

Create `src/components/ContentLists.test.tsx`:

```tsx
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
        items={[{
          id: 'paper-1',
          title: 'A Test Paper',
          authors: ['Wenqin Zhou', 'A. Collaborator'],
          venue: 'TestConf',
          year: 2026,
          summary: 'A concise summary.',
          links: { paper: 'https://example.com/paper', code: 'https://example.com/code' },
        }]}
      />,
    )

    expect(screen.getByRole('heading', { name: 'A Test Paper' })).toBeInTheDocument()
    expect(screen.getByText('Wenqin Zhou · A. Collaborator')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Paper' })).toHaveAttribute('href', 'https://example.com/paper')
    expect(screen.getByRole('link', { name: 'Code' })).toHaveAttribute('href', 'https://example.com/code')
  })

  it('renders project and award records', () => {
    render(<ProjectList items={[{ id: 'project-1', name: 'A Project', year: 2026, description: 'Project description.' }]} />)
    render(<AwardList items={[{ id: 'award-1', name: 'An Award', issuer: 'Awarding Body', year: 2026 }]} />)

    expect(screen.getByRole('heading', { name: 'A Project' })).toBeInTheDocument()
    expect(screen.getByText('Awarding Body · 2026')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/ContentLists.test.tsx`

Expected: FAIL because the list modules do not exist.

- [ ] **Step 3: Define the data interfaces and empty collections**

Create `src/data/content.ts`:

```ts
export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: number
  summary?: string
  image?: string
  links?: { paper?: string; code?: string }
}

export interface Project {
  id: string
  name: string
  year: number
  description: string
  image?: string
  link?: string
}

export interface Award {
  id: string
  name: string
  issuer: string
  year: number
  description?: string
}
```

Create `publications.ts`, `projects.ts`, and `awards.ts` as separately exported, typed, empty arrays:

```ts
import type { Publication } from './content'
export const publications: Publication[] = []
```

Use the matching type and export name in each of the other two files.

- [ ] **Step 4: Implement the empty state and list components**

`EmptyState` accepts a single `children: ReactNode` prop and renders `<p className="empty-state">`. Each list accepts an optional `items` prop defaulting to its matching data array. Empty arrays render the exact Chinese messages asserted above. Non-empty arrays render semantic `<article>` records with headings, metadata, optional summaries/images, and only the links actually present in the record. External links use `target="_blank"` and `rel="noreferrer"`.

Use these public signatures:

```tsx
export function PublicationList({ items = publications }: { items?: Publication[] })
export function ProjectList({ items = projects }: { items?: Project[] })
export function AwardList({ items = awards }: { items?: Award[] })
```

- [ ] **Step 5: Run the content-list tests**

Run: `npm test -- src/components/ContentLists.test.tsx`

Expected: PASS with three tests.

- [ ] **Step 6: Commit the content model**

```powershell
git add src/data/content.ts src/data/publications.ts src/data/projects.ts src/data/awards.ts src/components/EmptyState.tsx src/components/PublicationList.tsx src/components/ProjectList.tsx src/components/AwardList.tsx src/components/ContentLists.test.tsx
git commit -m "feat: add extensible profile content sections"
```

---

### Task 3: Semantic Page Composition and Active Navigation

**Files:**
- Create: `src/hooks/useActiveSection.ts`
- Create: `src/components/Header.tsx`
- Create: `src/components/ProfilePanel.tsx`
- Create: `src/components/Section.tsx`
- Create: `src/App.tsx`
- Create: `src/App.test.tsx`
- Create: `src/main.tsx`

**Interfaces:**
- Consumes: `profile`, the three list components, and section IDs `about`, `publications`, `projects`, `awards`
- Produces: a complete semantic page and `useActiveSection(ids: string[]): string`

- [ ] **Step 1: Write the failing application test**

Create `src/App.test.tsx`:

```tsx
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

    expect(screen.getByRole('heading', { name: 'Wenqin Zhou', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('西电网信院大二')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '24049200434@stu.xidian.edu.cn' })).toHaveAttribute(
      'href',
      'mailto:24049200434@stu.xidian.edu.cn',
    )
    expect(screen.getByRole('img', { name: 'Wenqin Zhou 的头像' })).toHaveAttribute('src', './avatar.jpg')
    expect(screen.getByRole('heading', { name: 'Publications' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Awards' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because `src/App.tsx` does not exist.

- [ ] **Step 3: Implement section tracking and navigation**

Implement `useActiveSection(ids)` with initial value `about`. In an effect, create one `IntersectionObserver` using `rootMargin: '-20% 0px -65% 0px'`, observe every matching element, and set the active ID when an intersecting entry appears. Disconnect it in the cleanup function.

Create `Header.tsx` with the exact navigation records below and `aria-current="location"` on the active link:

```ts
const navigation = [
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
] as const
```

The brand link is `WZ / Homepage` and points to `#about`. The `<nav>` label is `Primary navigation`.

- [ ] **Step 4: Implement the profile panel, section wrapper, and App**

`ProfilePanel` renders the approved image, `<h1>`, bio, and complete mailto link. `Section` accepts `id`, `eyebrow`, `title`, and `children`, and associates its `<section>` with the heading by `aria-labelledby`.

`App` uses `useActiveSection(['about', 'publications', 'projects', 'awards'])`, renders `Header`, and creates a two-column `.page-shell`. The profile panel is inside `<section id="about">`; the content column contains the three list sections. Add the quiet introductory lines `A growing record of work, ideas, and milestones.` and `This page is taking shape alongside the work it will document.` without adding biographical claims.

Create `src/main.tsx` with `createRoot`, `StrictMode`, font imports, `./styles/globals.css`, and `<App />`.

- [ ] **Step 5: Run application and full tests**

Run: `npm test`

Expected: all profile, content-list, and App tests PASS.

- [ ] **Step 6: Commit the page structure**

```powershell
git add src/hooks/useActiveSection.ts src/components/Header.tsx src/components/ProfilePanel.tsx src/components/Section.tsx src/App.tsx src/App.test.tsx src/main.tsx
git commit -m "feat: compose academic homepage"
```

---

### Task 4: Distinctive Responsive Styling and Browser QA

**Files:**
- Create: `src/styles/globals.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: class names emitted by Tasks 2 and 3
- Produces: desktop and mobile layouts with the approved editorial ink aesthetic

- [ ] **Step 1: Establish the visual tokens and page texture**

Create `src/styles/globals.css` with these exact root tokens, global behavior, focus rules, and reduced-motion override:

```css
:root {
  color: #171513;
  background: #f3efe7;
  font-family: 'Noto Sans SC', sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  --paper: #f3efe7;
  --ink: #171513;
  --muted: #6b655d;
  --line: #c9c0b3;
  --accent: #8b2e2e;
  --display: 'Fraunces', serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; min-width: 320px; min-height: 100vh; background: var(--paper); }
a { color: inherit; }
:focus-visible { outline: 3px solid var(--accent); outline-offset: 4px; }

body::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  content: '';
  pointer-events: none;
  opacity: 0.34;
  background-image:
    linear-gradient(rgba(23, 21, 19, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 21, 19, 0.025) 1px, transparent 1px);
  background-size: 32px 32px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Style the header, editorial grid, avatar, and content records**

Add focused rules for all emitted classes. Use a 72px sticky header with a 1px bottom rule, an 1180px centered container, and a desktop grid of `280px minmax(0, 1fr)`. Make the profile column sticky beneath the header. Render the avatar as a square with `aspect-ratio: 1`, `object-fit: cover`, a 2px ink border, and an offset `box-shadow: 12px 12px 0 var(--accent)`. Use `var(--display)` for the name and section titles. Give records thin top borders and a 4px horizontal hover translation rather than rounded cards or large shadows.

Use a staggered `reveal` animation only for the profile and main sections, with total duration under 700ms. Header active links receive a dark-red underline. Empty states use a dashed top and bottom border, muted text, and generous vertical whitespace.

- [ ] **Step 3: Add responsive rules**

At `max-width: 800px`, make the page grid one column, return the profile to normal flow, constrain the avatar to 220px, and make the header navigation horizontally scrollable. At `max-width: 520px`, reduce outer padding to 20px, reduce the display sizes with `clamp()`, and ensure metadata/link rows wrap. No selector may apply `overflow-y: auto` to a content section.

- [ ] **Step 4: Add production metadata**

Modify `index.html` so it has language `zh-CN`, title `Wenqin Zhou — Homepage`, description `Wenqin Zhou 的个人学术主页，记录论文、项目与奖项。`, theme color `#f3efe7`, and matching Open Graph title, description, and type `website`.

- [ ] **Step 5: Build and launch the production site**

Run: `npm run build`

Expected: exit code 0 and a populated `dist` directory.

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite reports a local HTTP URL. Keep this process running for the browser checks.

- [ ] **Step 6: Verify desktop and mobile behavior in the browser**

At a desktop viewport near 1280×800, verify the two-column layout, square avatar treatment, sticky profile, visible section headings, working email href, active navigation changes while scrolling, and zero console errors.

At a mobile viewport near 390×844, verify the single-column flow, horizontally usable navigation, no content clipping, and `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

Capture one desktop and one mobile screenshot for visual review. Check the supplied image remains sharp enough at rendered size and that the text contrast remains readable over the texture.

- [ ] **Step 7: Commit the finished interface**

```powershell
git add src/styles/globals.css index.html
git commit -m "style: add ink editorial homepage design"
```

---

### Task 5: GitHub Pages Deployment and Maintenance Guide

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`

**Interfaces:**
- Consumes: `npm ci`, `npm test`, and `npm run build`
- Produces: an official GitHub Pages artifact deployment and clear data-editing instructions

- [ ] **Step 1: Add the Pages workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Write the maintenance guide**

Create `README.md` with exact sections for local setup (`npm install`, `npm run dev`), validation (`npm test`, `npm run build`), content editing locations, and GitHub Pages activation. Explain every property of `Publication`, `Project`, and `Award` with one non-published example inside a fenced code block. State clearly that examples stay in the README and the live data arrays remain empty until the owner adds real records.

Deployment instructions must tell the owner to push `main`, open the repository's Settings → Pages, choose GitHub Actions as the source, and wait for the `Deploy to GitHub Pages` workflow to finish.

- [ ] **Step 3: Run final automated verification**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: exit code 0 with no TypeScript or Vite errors.

Run: `git status --short`

Expected: only `.github/workflows/deploy.yml` and `README.md` are uncommitted before the final task commit.

- [ ] **Step 4: Commit deployment support**

```powershell
git add .github/workflows/deploy.yml README.md
git commit -m "docs: add GitHub Pages deployment"
```

- [ ] **Step 5: Final visual and repository check**

Reopen the production build through a static server and repeat the desktop and mobile checks from Task 4. Confirm the console is clean, all internal anchor links work, the mailto link is correct without activating it, and `git status --short` is empty.
