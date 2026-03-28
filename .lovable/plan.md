

## Add Theme Toggle to Landing Page Navbar

**What**: Add a dark/light mode toggle button to the landing page `Navbar` component, matching the style already used in the dashboard sidebar (`ThemeToggle`).

### Changes

**`src/components/landing/Navbar.tsx`**
- Import `ThemeToggle` from `@/components/app/ThemeToggle`
- Add `<ThemeToggle />` in the right-side button group, before the "Log in" button
- Style it to match navbar aesthetics: `h-8 w-8 rounded-lg text-muted-foreground/80 hover:text-foreground` with ghost-like hover

This is a single-file, single-line addition since `ThemeToggle` already exists and handles all toggle logic.

