

## Adapt Shiny Button for the Landing Page

The shiny button uses CSS `@property` animations and a shimmer effect. Since this project uses Tailwind + standard CSS (not Next.js/styled-jsx), we need to adapt it as a reusable React component with a regular `<style>` tag or CSS-in-JS approach.

### What we'll build

A `ShinyButton` component at `src/components/ui/shiny-button.tsx` that creates the animated gradient shimmer effect using inline styles and a global CSS keyframe block (added to `index.css`).

### Where it gets used

Replace the primary CTA buttons in three locations:

1. **Hero** (`Hero.tsx` line 56) — "Join Founder Beta" button gets the shiny treatment
2. **CTA section** (`CTA.tsx` line 65) — "Claim Your Spot" button
3. **Navbar** (`Navbar.tsx` line 96) — "Join Beta" button (subtle, smaller variant)

### Technical approach

- **CSS keyframes in `index.css`**: Add `@property --shiny-x` (if supported) and a `@keyframes shiny-slide` animation for the shimmer gradient sweep. Fallback to a simple `translateX` shimmer for browsers without `@property` support.
- **Component**: A `ShinyButton` wrapper that composes with the existing `Button` component (passes through `variant`, `size`, `className`, `asChild`). Adds the shimmer overlay div with the animation.
- **Colors**: Uses the existing `--primary` HSL token (emerald) for the gradient so it stays on-brand and works in dark mode.
- **Motion**: Continuous subtle shimmer on idle, brighter sweep on hover. No jarring effects.

### Files changed

| File | Change |
|---|---|
| `src/index.css` | Add `@keyframes shiny-slide` and `.shiny-button` utility class |
| `src/components/ui/shiny-button.tsx` | New component wrapping `Button` with shimmer overlay |
| `src/components/landing/Hero.tsx` | Replace "Join Founder Beta" `<Button>` with `<ShinyButton>` |
| `src/components/landing/CTA.tsx` | Replace "Claim Your Spot" `<Button>` with `<ShinyButton>` |
| `src/components/landing/Navbar.tsx` | Replace "Join Beta" `<Button>` with `<ShinyButton>` |

