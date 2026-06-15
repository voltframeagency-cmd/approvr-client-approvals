# Swap hub icon with actual Approvr logo

In `src/components/landing/IntegrationsStack.tsx`, the central "Sync Hub" node currently uses a generic double-check SVG. Replace it with the real brand `<Logo />` component (same one used in the navbar/footer).

## Change
- Import `Logo` from `@/components/brand/Logo`.
- Remove the placeholder icon container (the `h-9 w-9` rounded square with the inline double-check SVG) and the duplicate "Approvr" text below it.
- Render `<Logo className="h-5 w-auto" />` in its place, keeping the "SYNC HUB" uppercase teal tag underneath so the hub still reads as the Approvr Sync Hub.
- Keep the breathing teal glow, glass card, and orbit animations exactly as they are.

No other files touched.
