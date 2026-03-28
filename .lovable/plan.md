

# Apply Elite Motion, UI, and Copy Constraints

Systematic pass across all landing page components to enforce the cubic-bezier easing profiles, duration limits, stagger choreography, compound-sentence elimination, and pricing psychology from the framework.

---

## 1. Motion Easing Overhaul (All Landing Components)

Replace all generic `"easeOut"`, `"easeIn"`, and loose easing arrays with the four standardized cubic-bezier profiles:

- **Standard motion** (expansions, moves): `[0.2, 0.0, 0, 1.0]`
- **Emphasized decelerate** (entrances, modals): `[0.05, 0.7, 0.1, 1.0]`
- **Emphasized accelerate** (exits): `[0.3, 0.0, 0.8, 0.15]`
- **Expressive** (interactive/playful): `[0.4, 0.14, 0.3, 1.0]`

Define these as shared constants in `Animations.tsx` and import them across components.

**Files**: `Animations.tsx`, `Hero.tsx`, `SocialProof.tsx`, `HowItWorks.tsx`, `Features.tsx`, `Testimonials.tsx`, `Pricing.tsx`, `CTA.tsx`, `Navbar.tsx`

## 2. Duration Constraints

Audit and clamp all animation durations:
- Micro-interactions (hover, button press): cap at 150ms
- Structural moves (fade-in sections, expand cards): 250–400ms
- Large moves (hero entrance, mockup reveal): 400–500ms max
- **Kill all 800ms and 1000ms durations** currently in the codebase

Current violations:
- `Features.tsx`: 0.8s, 1s section animations
- `CTA.tsx`: 1s container, 0.8s items
- `Testimonials.tsx`: 0.8s header, 0.6s card transitions
- `Pricing.tsx`: 0.8s header, 0.8s cards
- `HowItWorks.tsx`: inherits long durations
- `Hero.tsx`: 0.9s mockup entrance, 0.7s container
- `SocialProof.tsx`: 1s logo marquee fade

## 3. Stagger Choreography

Standardize all stagger delays to **50ms** (0.05s) between sequential items:
- `SocialProof.tsx` stats: currently 0.1s → change to 0.05s
- `Pricing.tsx` cards: currently 0.15s → change to 0.05s
- `CTA.tsx` items: currently 0.2s → change to 0.05s
- `Animations.tsx` StaggerContainer: currently 0.06s → change to 0.05s

## 4. Kill Linear Easing

- `Testimonials.tsx` progress bar uses `ease: "linear"` — replace with standard motion curve
- Remove any `transition-all` CSS classes that default to linear and replace with explicit duration/ease

## 5. Compound Sentence Audit (Copy)

Scan all copy for compound sentences joined by "and", "but", "or" and split them. Key violations:

- **Hero.tsx** subhead: "Clients open it, review, and hit approve — done." → Split: "Clients open it. They review. They hit approve — done."
- **HowItWorks.tsx** Step 1: "Drag your designs, docs, or videos into the project. Pick the version. Hit send." → "Drag your designs into the project. Docs. Videos. Pick the version. Hit send."
- **HowItWorks.tsx** Step 2: "No login, no app download." → Keep (this is a list fragment, not a compound sentence)
- **Features.tsx** Feature 1: "Designs, docs, videos — organized by version from day one." → Keep (list fragment)
- **Footer.tsx**: "Built for world-class agencies who prioritize velocity and professional delivery." → Rewrite: "The approval tool agencies actually use. Fast. Clean. Done right."

## 6. Pricing Number Psychology

- `SocialProof.tsx`: stat value "2,400+" displays with comma → strip comma to "2400+"
- Pricing values ($0, $29, $24, $79, $64) are already comma-free — no change needed
- Annual billing display `${price * 12}/yr` — values won't hit comma territory at current prices, fine as-is

## 7. Shared Easing Constants

Create a central export in `Animations.tsx`:

```text
export const EASING = {
  standard:  [0.2, 0.0, 0, 1.0],
  enter:     [0.05, 0.7, 0.1, 1.0],
  exit:      [0.3, 0.0, 0.8, 0.15],
  expressive:[0.4, 0.14, 0.3, 1.0],
};

export const DURATION = {
  micro: 0.15,
  structural: 0.35,
  large: 0.5,
};

export const STAGGER = 0.05;
```

All components import from this single source of truth.

---

## Files Modified
- `src/components/motion/Animations.tsx` — add easing/duration/stagger constants, update existing variants
- `src/components/landing/Hero.tsx` — easing + duration fixes, copy split
- `src/components/landing/SocialProof.tsx` — stagger, easing, strip comma from stat
- `src/components/landing/HowItWorks.tsx` — easing + duration, copy refinement
- `src/components/landing/Features.tsx` — easing + duration clamp
- `src/components/landing/Testimonials.tsx` — easing + duration, kill linear
- `src/components/landing/Pricing.tsx` — easing + duration + stagger
- `src/components/landing/CTA.tsx` — easing + duration + stagger
- `src/components/landing/Footer.tsx` — copy rewrite
- `src/components/landing/Navbar.tsx` — easing standardization

