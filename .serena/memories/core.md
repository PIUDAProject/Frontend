# Core

Korean medication management app "Ongil(온길)" — adult-child caregiver → elderly parent.

## Source Map

```
src/app/
  layout.tsx      # Root layout: Pretendard font, lang="ko", metadata
  page.tsx        # Home screen (Server Component)
  globals.css     # Tailwind v4 @theme tokens + @layer base/components
src/components/
  ui/             # shadcn/ui 원본 (수정 금지, 래핑만 할 것)
    button.tsx    # cta 사이즈 variant 포함
    card.tsx
    dialog.tsx
    drawer.tsx
    sheet.tsx
    sonner.tsx
  ongil/          # ongil 커스텀 합성 컴포넌트 (아직 미생성)
src/lib/
  utils.ts        # cn() = clsx + tailwind-merge
next.config.ts    # Next.js config: reactCompiler=true
package.json      # name="piuda", scripts, deps
components.json   # shadcn/ui 설정 (style: new-york, rsc: true)
```

## Project-Wide Invariants

- Mobile-first, 390px max-width
- Korean-only, single language
- All pages RSC by default — `'use client'` only for browser APIs / event handlers
- Design tokens live in `globals.css @theme` — NOT in tailwind.config.js (doesn't exist)
- React Compiler enabled → NO manual useMemo/useCallback

## Domain Vocabulary

- 온길(Ongil) = brand name
- 보호자(caregiver) = adult-child primary user
- 부모님(parent) = secondary user (receives phone call only)
- 약(medication) / 복약(adherence) / 복약 스케줄(medication schedule)

Language rules · domain terms · Server/Client criteria → `mem:conventions`
Stack details → `mem:tech_stack`
Commands → `mem:suggested_commands`
