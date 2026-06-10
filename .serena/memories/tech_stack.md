# Tech Stack

## Runtime & Framework

- **Next.js 16.2.6** — App Router. Breaking changes from prior versions. Always check `node_modules/next/dist/docs/` before writing routing/data-fetching code.
- **React 19.2.4** — React Compiler enabled (`reactCompiler: true` in next.config.ts). `ref` is a plain prop — do NOT use `forwardRef` in new code.
- **TypeScript 5** — strict mode assumed

## UI Library

- **shadcn/ui** — style: "new-york", RSC: true, iconLibrary: "lucide"
- Components live in `src/components/ui/` — never edit these files, wrap them
- Custom ongil compositions go in `src/components/ongil/`

## Styling

- **Tailwind CSS v4** — CSS-first, no `tailwind.config.js`
- `globals.css` structure: `@import "tailwindcss"` → `@import "tw-animate-css"` → `:root {}` (primitives+semantic) → `@theme inline {}` (utilities) → `@utility` (elevation, kr-wrap) → `@layer base` → `@layer components`
- **`@plugin` is for JS plugins only** — CSS-only packages like `tw-animate-css` must use `@import`, not `@plugin`
- All design tokens in `globals.css @theme inline`, accessible as Tailwind utilities

## Installed Packages (key)

- `lucide-react` — icons only, strokeWidth=1.8. Never emoji as icons.
- `clsx` + `tailwind-merge` → `cn()` in `src/lib/utils.ts`
- `class-variance-authority` — CVA for new component variants
- `tw-animate-css` — animation utilities (imported via `@import`)
- `sonner` — toasts, mounted in layout.tsx as `<Toaster position="top-center" richColors closeButton />`
- `vaul` — drawer (used by shadcn Drawer component)
- `@radix-ui/react-dialog`, `@radix-ui/react-slot` — shadcn primitives

## Package Manager

- **pnpm only** — never npm or yarn

## Font

- **Pretendard Variable** — self-hosted at `public/fonts/PretendardVariable.woff2`
- Loaded via `next/font/local`, CSS variable `--font-pretendard`
- Weight range: 45–920 (variable axis). 2MB full file — subset with glyphhanger if performance needed.

## Key Design Tokens (globals.css @theme inline)

**shadcn semantic**: `background`, `foreground`, `card`, `primary`, `primary-foreground`, `secondary`, `muted`, `muted-foreground`, `accent`, `destructive`, `border`, `input`, `ring`
**ongil brand**: `surface`, `surface-2`, `line`, `brand-link`, `danger`, `danger-bg`, `caution`, `caution-bg`, `status-active-bg`, `status-done-bg`, `meal-morning/noon/night`, `med-blue/purple/orange` + `-bg` variants
**Blue scale**: `blue-50/100/600/700/800/900`
**Ink scale**: `ink-50/100/200/300/400/500/700/900`
**Elevation**: `shadow-card`, `shadow-raised`, `shadow-fab` (brand-tinted, never replace with Tailwind defaults)
**Radius**: `radius-sm`(8px) `radius-md`(10px) `radius-lg`(12px) `radius-xl`(16px) `radius-2xl`(20px) `radius-3xl`(22px)
**Typography**: `text-2xs`(11px) `text-xs`(12px) `text-sm`(13px) `text-base`(15px) `text-lg`(17px) `text-xl`(19px/-0.01em) `text-2xl`(23px/-0.02em) `text-3xl`(26px) `text-4xl`(30px)
