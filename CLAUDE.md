# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Ongil (온길)** — A medication management service for adult-child caregivers. Korean-only, mobile-first (390px max-width).

- Product spec: @PRODUCT.md
- Design system: @DESIGN.md
- Next.js agent rules: @AGENTS.md

## Commands

```bash
pnpm dev           # dev server
pnpm build         # production build
pnpm lint          # ESLint
pnpm type-check    # tsc --noEmit
pnpm format        # Prettier (auto-fix)
pnpm format:check  # Prettier (check only)
```

Pre-commit hook runs ESLint + Prettier automatically via husky + lint-staged.

## Stack

- **Next.js 16** App Router · **React 19** · **TypeScript 5**
- **Tailwind CSS v4** — configured via `@theme inline` in `globals.css`, no `tailwind.config.js`
- **React Compiler** enabled (`reactCompiler: true` in `next.config.ts`) — do not add manual `useMemo`/`useCallback` unless profiling proves it necessary
- **shadcn/ui** primitives in `src/components/ui/` (Button, Card, Dialog, Drawer, Sheet, Sonner)
- **CVA** (`class-variance-authority`) for component variant definitions
- **dayjs** for date math; **vaul** for drawer primitives; **sonner** for toasts
- Package manager: **pnpm**

> Next.js 16 has breaking changes from prior versions. Check `node_modules/next/dist/docs/` before writing routing or data-fetching code. See @AGENTS.md.

## Architecture

```
src/
  app/
    layout.tsx                    # Root layout: Pretendard Variable font, lang="ko", PWA meta
    page.tsx                      # Root entry (redirects into the app)
    globals.css                   # Design token definitions (see below)
    (main)/                       # Bottom-nav + header shell: home, parents
    (my-shell)/ (note-shell)/ (report-shell)/
                                   # Sub-shell layouts: back button + bottom nav, no header
    (my-standalone)/ (note-standalone)/ (parents-standalone)/
    (chat-standalone)/ (medication-standalone)/ (onboarding-standalone)/ (report-standalone)/
                                   # Full-screen flows: no bottom nav (detail pages, forms, wizards)
      [route]/
        page.tsx                 # Route entry (Server Component)
        _components/             # Route-local components (underscore prefix opts out of routing)
    api/report/pdf/               # Route handler: streams the @react-pdf/renderer PDF
  components/
    ui/                           # shadcn/ui primitives (restyled via CSS tokens)
    layout/                       # App-shell components (AppHeader, BottomNav, MedicationSheet)
    chat/ parent-form/ send-card/ # Components shared across 2+ routes
  lib/
    actions/                      # Server Actions ('use server') — currently stubs, see below
    data/                         # Mock data + data-shape functions consumed by pages
    schema/                       # Zod schemas for form validation
    stores/                       # Zustand stores (e.g. medication-sheet-store)
    pdf/                          # @react-pdf/renderer document + color tokens for the PDF report
    constants/                    # Shared constants (chat limits, medication color map)
    date.ts, utils.ts             # dayjs helpers, cn() (clsx + tailwind-merge)
  types/api.ts                    # Shared API-facing types
```

Route groups follow a `(domain-shellType)` naming convention. The shell type controls chrome, not the URL path:

- **`-shell`** — persistent bottom nav, no top app header (sub-pages of a tab, e.g. `/my`, `/note`, `/report`)
- **`-standalone`** — no bottom nav, no header; full-bleed flow (detail/edit pages, multi-step forms, chat)
- **`(main)`** — the only group with both `AppHeader` and `BottomNav`

Route groups don't affect URL segments, so the same path prefix (e.g. `/my`) can be split across groups — check which group currently owns a segment before adding a sibling route to avoid an accidental collision.

There is no backend integration yet: `lib/data/*` supplies mock data shaped like the real API contracts, and `lib/actions/*` are `'use server'` stubs (see the `TODO` comments) awaiting real persistence + `revalidatePath` calls. Types in `lib/data/types.ts` are the source of truth for these shapes until an API layer replaces them.

All pages are React Server Components by default. Add `'use client'` only when the component requires browser APIs or event handlers.

### CSS Token Architecture (`globals.css`)

Three-layer structure:

1. **`:root`** — primitive + semantic tokens as CSS custom properties (`--blue-600`, `--surface`, `--status-done`, etc.)
2. **`@theme inline`** — re-exports `:root` values as Tailwind utilities (`bg-primary`, `text-status-done`, `rounded-md`, etc.)
3. **`@utility`** — custom utilities that can't be expressed as tokens (`shadow-card`, `shadow-raised`, `shadow-fab`, `kr-wrap`)

Tailwind classes map directly to these tokens. There are no arbitrary values or hardcoded colors in component files — use token-mapped utilities only.

### Key Conventions

- Use `cn()` from `@/lib/utils` for all `className` merges
- shadcn components accept a `className` prop for one-off overrides; prefer token-mapped utilities over inline styles
- Korean body/list text must use the `kr-wrap` utility (`word-break: keep-all`)
- Bottom nav and app header carry `view-transition-name`; assign unique names to any new cross-page transition elements
- Tap targets must be ≥ 44px; use negative margin + padding expansion (e.g., `-m-2.5 p-2.5`) rather than increasing visual size

## Commit Convention

Messages in Korean, one purpose per commit:

```
feat / fix / refactor / style / chore / docs / test
```
