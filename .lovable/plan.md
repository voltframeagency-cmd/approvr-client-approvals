

## Fix Shiny Button Hover Glow

The current CSS implementation matches the reference structurally, but Tailwind utility classes on the button (`h-12 px-8 text-[15px]`) are overriding the `.shiny-cta` base styles, and the `glow-primary` class adds a competing `box-shadow` that conflicts with the inset glow effect.

Additionally, the `span` element's `display: inline-flex` and `align-items: center` (added for the arrow icon) may be interfering with the `span::before` pseudo-element positioning for the hover glow.

### Changes

**`src/index.css`** — Fix the `.shiny-cta span` styles to ensure `span::before` glow renders correctly:
- Add `position: relative` to the shared pseudo-element rule only for `::before` and `::after` (not `span::before` which inherits from span)
- Ensure the span's pseudo-element has proper dimensions and isn't clipped by flex layout

**`src/components/landing/Hero.tsx`** — Remove `glow-primary` class from ShinyButton (it adds a competing outer box-shadow that muddies the hover glow effect)

**`src/components/landing/CTA.tsx`** and **`src/components/landing/Navbar.tsx`** — Same: remove any `glow-primary` if present

### Root cause

The `glow-primary` utility applies `box-shadow: 0 0 20px ...` which overwrites the button's `box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle)`, breaking the visual hierarchy. On hover, the `span::before` inset glow competes with this outer glow and looks washed out. Removing `glow-primary` lets the conic-gradient border and inner shimmer shine through properly.

