# Task Completion Checklist

Run these in order after any coding task:

```powershell
pnpm type-check     # TypeScript — must pass with 0 errors
pnpm lint           # ESLint — must pass
pnpm format:check   # Prettier — must pass (or run pnpm format to fix)
pnpm build          # Verify production build succeeds
```

Pre-commit hook (husky + lint-staged) auto-runs ESLint + Prettier on staged files.

## Additional Checks

- No `any` types introduced
- No hardcoded secrets
- RSC vs `'use client'` boundary correct (see `mem:conventions`)
- Design tokens used (not raw hex/px values)
- Korean commit message, correct prefix

Commands reference → `mem:suggested_commands`
