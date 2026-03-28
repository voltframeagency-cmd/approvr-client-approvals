

## Add adaptive blur edges to logo marquee

**What**: Improve the left/right gradient fade overlays on the logo marquee strip so they blend seamlessly in both light and dark modes.

**Changes in `src/components/landing/SocialProof.tsx`**:

- Replace the two gradient overlay `div`s (lines 89-90) with updated versions that use `from-background` instead of `from-muted/30`. This leverages the theme-aware `background` CSS variable, ensuring proper blending in both light and dark modes.
- Increase the overlay width from `w-32` to `w-40` for a more pronounced fade effect.
- The left overlay: `bg-gradient-to-r from-background via-background/80 to-transparent`
- The right overlay: `bg-gradient-to-l from-background via-background/80 to-transparent`

This is a minimal two-line change in one file.

