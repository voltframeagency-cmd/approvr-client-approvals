

## Assessment: What's Missing

After reviewing all key files (`ClientPortal.tsx`, `Dashboard.tsx`, `ProjectDetail.tsx`, `mock-data.ts`), most of the spec is already implemented. Here's what's **not yet built** and worth adding:

### Priority 1: Comment Resolution UX (both sides)
- Add "Resolve" button on comments in ProjectDetail (agency side) — currently only visual dimming exists
- Add filter tabs (All / Open / Resolved) to comments in both ProjectDetail and ClientPortal
- Client portal already has `toggleResolve` but needs the filter UI

### Priority 2: Approval Reminders
- Add "Send Reminder" button on ProjectDetail for pending deliverables
- Add reminder state tracking (mock data: `reminderSentAt`, `reminderCount`)
- Show reminder history in the activity timeline
- Surface "Reminder sent" badge on dashboard attention queue items

### Priority 3: Downloadable Approval Summary
- Add a "Download Summary" button on ProjectDetail
- Generate a clean text/PDF-style summary with project name, deliverables, versions, comments, decisions, timestamps
- Use browser-based generation (e.g. create a printable HTML view or CSV export)

### Priority 4: Client Portal Polish (incremental)
- Add guided helper text beneath key sections ("What does 'Request Changes' mean?", "You're reviewing version X")
- Add comment empty state with guidance copy
- Add a subtle celebration animation on all-approved state (confetti or particle burst)
- Improve mobile spacing: larger tap targets on Approve/Request Changes buttons, better stacked layout
- Add comment submission confirmation toast

### What's Already Done (no changes needed)
- Version history UI ✓
- Last viewed by client ✓  
- Next-step actions ✓
- Branded portal header ✓
- Progress tracking ✓
- Post-approval state with CTAs ✓
- Status badges with active indicators ✓
- Deliverable browsing with selection state ✓

### Technical approach
- All changes are UI-only using existing mock data patterns
- Add `reminderSentAt` and `reminderCount` fields to mock data
- Comment filter state via `useState` in both portal and project detail
- Approval summary as a generated blob download (no backend needed)
- Celebration animation via framer-motion
- Helper text as inline `<p>` elements with `text-muted-foreground text-xs`

### Estimated scope
~4 focused tasks, all front-end. No database or edge function changes needed since we're still on mock data.

