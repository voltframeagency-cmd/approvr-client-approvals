

## Fix the Green Box on Hover

The "green box" appearing on hover is the `span::before` pseudo-element. It renders as a visible rectangle because it lacks `border-radius`. The inset `box-shadow` on it creates a rectangular glow outline instead of matching the pill shape of the button.

### Changes

**`src/index.css`** — Add `border-radius: 360px` to `.shiny-cta span::before` so the inset glow follows the pill shape of the button instead of appearing as a green rectangle.

Single line addition to the existing `span::before` rule block (around line 301-309).

