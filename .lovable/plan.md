

## Fix logo rendering in SocialProof marquee

**Problem**: The SVG logo paths are from Simple Icons (official), but some (Figma, Notion, Slack) have complex paths that need `fill-rule="evenodd"` to render correctly. Without it, the "holes" in logos fill in solid, making them look malformed.

**Changes in `src/components/landing/SocialProof.tsx`**:

1. Add a `fillRule` property to each logo entry -- Figma, Notion, and Slack need `evenodd`; Stripe, Linear, and Vercel work fine with the default `nonzero`.

2. Update the `<path>` element to apply the fill rule:
   ```tsx
   <path d={logo.svg} fillRule={logo.fillRule || 'nonzero'} />
   ```

3. Increase icon size from `h-6 w-6` to `h-7 w-7` for better clarity at the rendered size.

Single file change, minimal diff.

