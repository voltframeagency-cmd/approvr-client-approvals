

# GSAP Scroll-Based Section Transitions

No copywriting or text content will be changed. Only scroll-triggered visual transitions between sections.

## Transition Map

```text
Hero ── crossfade + parallax lift ── SocialProof
SocialProof ── horizontal wipe ── HowItWorks
HowItWorks ── scale zoom-through ── Features
Features ── vertical clip reveal ── Testimonials
Testimonials ── parallax overlap ── Pricing
Pricing ── glow burst ── CTA
CTA ── simple fade ── Footer
```

## Changes

### 1. `src/pages/Index.tsx`
Wrap each section component in a div with `data-section` attributes (e.g., `data-section="hero"`, `data-section="social-proof"`, etc.) so GSAP can target them.

### 2. `src/hooks/use-smooth-scroll.ts`
Add 6 scrub-based `ScrollTrigger` timelines inside `useGsapScrollTrigger`:

- **Hero → SocialProof**: Hero content fades out + shifts up; SocialProof fades in from below
- **SocialProof → HowItWorks**: `clipPath: inset(0 100% 0 0)` → `inset(0 0% 0 0)` wipe reveal
- **HowItWorks → Features**: Scale 1→1.05 + blur out; Features scales 0.95→1 + sharpens
- **Features → Testimonials**: `clipPath: circle(0%)` → `circle(75%)` expansion
- **Testimonials → Pricing**: Pricing slides up with shadow, overlapping Testimonials
- **Pricing → CTA**: Radial glow expansion + scale-in

All use concrete color values (no CSS variable parsing in GSAP). Mobile (< 768px) degrades to simple fade-in only.

### 3. Section components (minor)
Add `id` or forwarded `data-section` attributes where missing — attribute additions only, zero text/layout changes.

