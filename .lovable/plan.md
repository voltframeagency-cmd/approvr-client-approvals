

## Features Section Redesign: Pinned Scrollytelling

### The Problem
Six feature cards in a 3×2 grid is generic and forgettable. For a premium SaaS, the features section should command attention and create a cinematic scroll experience.

### The Approach: Pinned Scroll + Stacked Reveals

A **pinned scrollytelling layout** where:

1. The viewport pins the features section as you scroll
2. Left side: a large interactive demo panel that transitions between demos
3. Right side: feature text (title + description) that fades/slides in sync with scroll progress
4. Each feature gets ~100vh of scroll distance, so 6 features = ~600vh of scroll height
5. As you scroll through each "chapter," the demo crossfades and the text swaps with a smooth animation

```text
┌─────────────────────────────────────────┐
│           Section heading               │
│  "Everything you need. Nothing you      │
│   don't."                               │
├────────────────────┬────────────────────┤
│                    │                    │
│   Interactive      │   Feature title    │
│   Demo (large,     │   Description      │
│   pinned)          │   (fades in/out    │
│                    │    per scroll)     │
│                    │                    │
│                    │   ● ● ● ○ ○ ○     │
│                    │   progress dots    │
├────────────────────┴────────────────────┤
│  (scrolls through 6 features while     │
│   this panel stays pinned)             │
└─────────────────────────────────────────┘
```

### Technical Details

**File changes:**

1. **`src/components/landing/Features.tsx`** — Complete rewrite:
   - Use GSAP `ScrollTrigger` with `pin: true` to pin the section
   - Create a tall scroll container (`height: 600vh`) with the pinned inner panel
   - Use ScrollTrigger's `progress` (0→1) to determine which feature (0–5) is active
   - Left panel: `AnimatePresence` crossfade between the 6 demo components (rendered larger, ~400px tall)
   - Right panel: text slides up/fades with each feature transition
   - Progress dots at the bottom show current position
   - On mobile: stack vertically with the demo on top and text below, still pinned

2. **`src/hooks/use-smooth-scroll.ts`** — No changes needed (existing GSAP+Lenis setup handles pinning natively)

3. **`src/components/landing/FeatureInteractiveDemos.tsx`** — Minor tweaks:
   - Scale up the demos slightly since they'll render in a larger container
   - Each demo stays the same logic, just displayed bigger

**Key implementation details:**
- GSAP ScrollTrigger `pin` with `scrub: true` for buttery scroll-linked progress
- `useRef` to track the pinned container, calculate active index from scroll progress
- `useState` for `activeIndex`, updated via ScrollTrigger's `onUpdate` callback
- Framer Motion `AnimatePresence` for crossfade transitions between demos
- Feature number indicator (e.g., "01 / 06") for editorial polish
- Subtle parallax offset on the demo panel as features transition

**Mobile behavior:** Falls back to a simpler stacked layout where each feature is a full-width card that animates in on scroll (no pinning, since pinned scroll on mobile touch can feel janky).

