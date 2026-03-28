

## Add bright dark-mode shadows to Testimonials buttons and quote icon

Apply the same teal-glow dark-mode shadow treatment from HowItWorks to the selected elements in Testimonials.

### Changes in `src/components/landing/Testimonials.tsx`

1. **Mobile nav buttons (lines 119-131)** — add `dark:shadow-[0_8px_24px_-4px_hsl(169_76%_48%/0.15)]` alongside existing `shadow-lg`

2. **Desktop nav buttons (lines 134-148)** — add `dark:shadow-[0_12px_32px_-6px_hsl(169_76%_48%/0.2)]` alongside existing `shadow-xl`, plus `dark:hover:shadow-[0_16px_48px_-8px_hsl(169_76%_48%/0.3)]` for hover state

3. **Quote icon (line 77)** — add a subtle dark-mode glow via `dark:drop-shadow-[0_4px_12px_hsl(169_76%_48%/0.15)]` or wrap with a filter style

All changes in one file, class-only modifications.

