

## Elevate Demo Panel with Glassmorphic + Green Gradient Styling

The demo container (right panel in Features section) currently has a flat `bg-card` with a barely-visible gradient overlay. We'll make it visually striking with glassmorphism and subtle green gradients.

### Changes to `src/components/landing/Features.tsx`

**Demo container (line 125):** Replace the plain `bg-card` with glassmorphic styling:
- `bg-card/60 backdrop-blur-2xl` for the frosted glass effect
- `border-primary/10` for a subtle green-tinted border
- `shadow-[0_8px_32px_-8px_hsl(160_84%_39%/0.08)]` for a green-tinted ambient shadow

**Gradient overlay (line 126):** Strengthen the background gradient:
- Replace `from-primary/[0.02]` with a multi-stop gradient: `bg-[radial-gradient(ellipse_at_top_left,hsl(160_84%_39%/0.06),transparent_60%),radial-gradient(ellipse_at_bottom_right,hsl(160_84%_39%/0.04),transparent_60%)]`
- Add a second decorative layer with a soft green glow dot in one corner

**Inner content area:** Add a subtle inner border/ring using `ring-1 ring-primary/5` for extra glass depth.

### Summary
Two lines of styling changes in `Features.tsx` to transform the demo panel from flat white to a premium glassmorphic container with green-tinted gradients and ambient shadows.

