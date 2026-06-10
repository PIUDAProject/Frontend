# Conventions

## Language Rules

- No `any` types — always specify exact types
- No magic numbers/strings → extract as constants
- No manual `useMemo`/`useCallback` — React Compiler handles optimization
- Functions: Single Responsibility Principle
- Always include error handling (try/catch with typed errors)
- No hardcoded secrets or API keys — use environment variables
- No `localStorage` for auth tokens — use HttpOnly cookies

## Server / Client Component Decision

Default: React Server Component (RSC).
Add `'use client'` only when component needs:

- Browser APIs (window, document, navigator)
- Event handlers (onClick, onChange, etc.)
- React hooks (useState, useEffect, useRef, etc.)

## Naming

- Variables/functions: English
- Code comments: Korean
- File naming: kebab-case for routes, PascalCase for components

## Color Usage (Design System)

- Primary blue (`--color-primary`) ≤ 10% of any screen — rarity gives authority
- No pure black (#000) or pure white (#FFF) — use ink/surface tokens
- No side-stripe borders — use tonal backgrounds instead
- OKLCH for all color definitions

## Component Patterns

- Standard buttons: `h-9`, `rounded-md` (10px). CTA buttons: `h-14`, `w-full`, `rounded-2xl` (20px), `shadow-fab` — 화면당 최대 1개
- Inputs: use `.input-standard` class
- Typography weights: only `[400+600]` or `[400+700]` combinations
- Max 1 Display heading per page

## Accessibility

- WCAG AA (mobile-first)
- `prefers-reduced-motion` supported (already in globals.css)
- `viewport-fit: cover` for notch/home indicator

Stack & tokens → `mem:tech_stack`
