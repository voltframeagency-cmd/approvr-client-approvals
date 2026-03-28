

## Fix: Horizontal Scroll Overflow on Mobile Dashboard Pages

**Problem**: The entire page scrolls horizontally on mobile (390px viewport). This is caused by content overflowing the main container without being clipped.

**Root Cause**: The `<main>` element in `AppLayout.tsx` (line 126) has no `overflow-x-hidden`, so any child content that extends beyond viewport width (e.g., the `-mx-4 px-4` negative margin pattern on filter tabs, wide table grids) causes the whole page to scroll sideways.

---

### Changes

**1. `src/components/app/AppLayout.tsx`** — Add overflow clipping to the main content area

- Add `overflow-x-hidden` to the `<main>` element (line 126) to prevent any child from causing horizontal page scroll
- This is the single fix that addresses all three pages (`/dashboard/projects`, `/dashboard/notifications`, `/dashboard/settings`) since they all render inside this layout

**2. `src/pages/Projects.tsx`** — Add `overflow-hidden` to the root container as a safety net

**3. `src/pages/Notifications.tsx`** — Add `overflow-hidden` to the root container

**4. `src/pages/Settings.tsx`** — Add `overflow-hidden` to the root container

This is a minimal, targeted fix — one line on the shared layout wrapper, plus defensive overflow clipping on each page root.

