

## Optimize Dark Mode Across Dashboard Pages

**Problem**: Hardcoded `slate-*` colors (e.g., `bg-slate-50`, `ring-slate-200`, `text-slate-900`, `bg-white`, `from-slate-900`) are used extensively instead of semantic Tailwind tokens. These don't adapt properly in dark mode, causing washed-out cards, invisible borders, and poor contrast.

---

### Changes

**1. `src/components/app/AppLayout.tsx`**
- Line 75: Replace `from-slate-900 via-slate-900 to-slate-800` with `from-card via-card to-card` (sidebar upgrade card) — currently looks the same in both themes
- Line 126: Replace `bg-slate-50/30` with `bg-muted/30` for the main content background

**2. `src/pages/Dashboard.tsx`**
- Lines 123, 162, 202: Replace `ring-slate-200/60 dark:ring-slate-800/60` with `ring-border/60` (uses semantic border token, auto-adapts)
- Line 241: Replace `bg-slate-100 dark:bg-slate-800` with `bg-muted` for progress bar track
- Line 257: Replace `ring-slate-200/40` with `ring-border/40`
- Line 273: Replace `before:bg-slate-100 dark:before:bg-slate-800` with `before:bg-border` for timeline line
- Lines 304: The "Upgrade to Pro" card uses `from-slate-900` — keep as-is (intentionally dark in both themes) but add `dark:from-card dark:via-card dark:to-card` so it blends in dark mode
- Line 327: Replace `bg-slate-100 dark:bg-slate-800/50` and `border-slate-200/50 dark:border-slate-700/50` with `bg-muted` and `border-border/50`; replace `bg-slate-200 dark:bg-slate-700` skeleton lines with `bg-muted-foreground/20`

**3. `src/pages/ProjectDetail.tsx`**
- Replace all `bg-slate-50 dark:bg-black/20` input backgrounds with `bg-muted/50`
- Replace `border-slate-200 dark:border-white/5` with `border-border`
- Replace `bg-white dark:bg-slate-900` with `bg-card`
- Replace `bg-slate-50 dark:bg-white/5` icon containers with `bg-muted`
- Replace `text-slate-700 dark:text-slate-200` and `text-slate-900 dark:text-white` with `text-foreground`
- Replace `hover:bg-slate-50 dark:hover:bg-white/[0.02]` with `hover:bg-muted/50`
- Replace `hover:bg-slate-100 dark:hover:bg-white/5` with `hover:bg-muted`
- Replace `shadow-slate-200 dark:shadow-none` and `shadow-slate-200/50 dark:hover:shadow-none` with `shadow-border/20`
- Replace `bg-slate-900 dark:bg-primary` button with `bg-primary`

**4. `src/pages/Settings.tsx`**
- Line 319: Replace `bg-white` in the branding preview with `bg-card`
- Any other hardcoded `slate-*` references → semantic tokens

**5. `src/pages/Projects.tsx`**
- Scan and replace any remaining hardcoded `slate-*` references with semantic tokens

### Summary
This is a systematic find-and-replace of ~30-40 hardcoded color references across 5 files, swapping them for semantic Tailwind tokens (`bg-card`, `bg-muted`, `text-foreground`, `border-border`, `ring-border`) that automatically adapt to light/dark mode via CSS variables.

