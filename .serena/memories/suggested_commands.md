# Suggested Commands

## Project Scripts (pnpm)

```powershell
pnpm dev            # Next.js dev server
pnpm build          # Production build
pnpm start          # Start production server
pnpm lint           # ESLint
pnpm type-check     # tsc --noEmit
pnpm format         # Prettier auto-fix
pnpm format:check   # Prettier check only
```

## Windows / PowerShell Notes

- Shell: PowerShell 5.1 on Windows 11
- No `&&` pipeline chaining — use `;` or `if ($?) { ... }`
- Path separator: `\` (use quotes for paths with spaces)
- No `touch` — use `New-Item -ItemType File`
- No `which` — use `(Get-Command name).Source`

## Git

```powershell
git status
git log --oneline -10
```

Commit convention: Korean message, one purpose per commit.
Prefixes: `feat / fix / refactor / style / chore / docs / test`
