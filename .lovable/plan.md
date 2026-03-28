

## Simplified & Robust Project Creation — Improvement Plan

### Problem
The current "Create Project" dialog has 5 fields, a raw date picker, and no guidance — it feels like a generic form rather than a tool built for agency workflows. For our audience (design agencies, freelancers, video studios), creating a project should feel fast and intentional.

### What Changes

**1. Streamline to 3 fields + smart defaults**
- **Project Name** — required, with smarter placeholders per context ("Website Redesign for...", "Brand Package — ...")
- **Client / Brand Name** — required, single field
- **Approval Deadline** — required, but switch from raw `<input type="date">` to preset quick-pick chips: "1 week", "2 weeks", "30 days", "Custom" (only shows date input on "Custom")

**Remove from the dialog:**
- Client Email — move to project settings after creation (reduces friction)
- Description — move to project detail page (nobody writes descriptions at creation time)

**2. Add Project Type selector**
A single row of selectable chips/pills: `Branding` · `Web Design` · `Video/Motion` · `Social/Ads` · `Other`. Optional, defaults to none. This helps organize projects and later enables type-specific templates.

**3. Better visual hierarchy**
- Larger project name input (it's the hero field)
- Deadline chips in a horizontal row, not a calendar widget
- Single prominent "Create" CTA at bottom

### Technical Details

**Files modified:**
- `src/pages/Projects.tsx` — Rewrite the dialog form section: remove email/description fields, add project type chips, add deadline quick-pick chips with a conditional custom date input
- `src/lib/mock-data.ts` — Add optional `projectType` field to the `Project` interface

**No new dependencies.** Uses existing UI primitives (Button, Input, Label, Dialog).

### Result
The form goes from 5 fields to 3 (name, client, deadline) with an optional type selector. Creation takes ~10 seconds instead of ~30. Email and description are deferred to the project detail page where they belong.

