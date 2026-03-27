

# Section-to-Section Scroll Transitions

## What we'll build

A varied set of GSAP ScrollTrigger-powered transitions between each landing page section, using your existing Lenis + GSAP stack. Each transition will feel distinct, creating a cinematic scroll experience without snap-locking the viewport.

## Transition map

```text
Hero → SocialProof        : Crossfade + parallax push (Hero fades out & shifts up, SocialProof rises in)
SocialProof → HowItWorks  : Horizontal wipe/reveal (content clips in from left as you scroll)
HowItWorks → Features     : Scale reveal (Features scales up from 0.9 with blur clearing)
Features → Testimonials   : Parallax overlap (Features pins briefly, Testimonials slides over it like a card)
Testimonials → Pricing     : Crossfade dissolve (smooth opacity blend)
Pricing → CTA             : Scale-in + glow pulse (CTA pops in with a subtle radial glow burst)
```

## How it works

1. **Wrapper data attributes** — Each section gets a `data-transition="crossfade|wipe|scale|overlap|dissolve|glow"` attribute in `Index.tsx`.

2. **Single GSAP setup** — Extend `useGsapScrollTrigger` in `use-smooth-scroll.ts` with a new block that queries `[data-transition]` elements and applies the matching ScrollTrigger animation per type.

3. **Transition implementations** (all scrub-based, no snapping):
   - **Crossfade + parallax**: Pin outgoing section briefly, animate opacity 1→0 and y→−60 while incoming fades in.
   - **Horizontal wipe**: Use `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` on the incoming section via ScrollTrigger scrub.
   - **Scale reveal**: Incoming starts at `scale(0.92) blur(8px)` and resolves to `scale(1) blur(0)`.
   - **Parallax overlap**: Outgoing section pins, incoming slides up over it with a subtle shadow, then outgoing unpins.
   - **Dissolve**: Simple opacity crossfade between adjacent sections.
   - **Glow burst**: Scale 0.96→1 with a radial `box-shadow` that expands and fades.

4. **Performance safeguards**:
   - All transitions use `will-change: transform, opacity` only during active scroll.
   - No `backdrop-blur` on moving elements (per existing convention).
   - `viewport: once` where appropriate to avoid re-triggering.
   - Mobile: transitions simplified to fade-only below `md` breakpoint to avoid jank.

## Files changed

| File | Change |
|---|---|
| `src/pages/Index.tsx` | Wrap each section component in a `<div data-transition="...">` with the appropriate type |
| `src/hooks/use-smooth-scroll.ts` | Add transition logic inside `useGsapScrollTrigger` — one handler per transition type, all using ScrollTrigger scrub |

No new dependencies — uses existing GSAP, ScrollTrigger, and Lenis.

