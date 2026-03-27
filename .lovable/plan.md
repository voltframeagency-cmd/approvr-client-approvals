

# Refine Approvr — Strategic Sharpening Pass

## Summary

A comprehensive refinement across landing page copy, dashboard UX, client portal experience, and visual polish to sharpen Approvr's positioning as the cleanest client approval portal for creative agencies. No new features are added — this is about tightening what exists.

## Changes

### 1. Sharpen landing page positioning copy

**Files:** `Hero.tsx`, `SocialProof.tsx`, `HowItWorks.tsx`, `Features.tsx`, `Testimonials.tsx`, `CTA.tsx`, `Footer.tsx`, `Navbar.tsx`

- **Hero headline**: Change to "Stop chasing approvals across email, Slack, and WhatsApp" with subhead: "One branded portal where clients review deliverables, leave feedback, and sign off. Built for agencies."
- **Hero CTA**: "Start free trial" → "Join Founder Beta" (consistency with pricing)
- **Navbar CTA**: "Start free trial" → "Join Founder Beta"
- **Footer CTA**: "Start free trial" → "Join Founder Beta"
- **Social proof stats labels**: Adjust to be more approval-specific (e.g., "Approval cycles completed" instead of "Projects approved")
- **HowItWorks header**: "Three steps to your first approval" → "From deliverable to signoff in three steps"
- **Features header**: "Everything you need. Nothing you don't." → "Purpose-built for client approvals" with sub: "Upload. Review. Approve. That's it. No project management, no invoicing, no feature bloat."
- **Testimonials**: Make quotes more agency-specific — reference "email threads", "chasing clients", "branded portal", and specific verticals (web design, branding studios)
- **CTA section**: Tighten to "Your first client approval is five minutes away" with founding-user messaging
- **Footer tagline**: More specific — "The client approval portal for web design agencies, branding studios, and creative teams."

### 2. Strengthen dashboard as an approvals control center

**File:** `Dashboard.tsx`

- **Header**: "Welcome back, Alex" → "Approval overview" with subtitle "Here's what's blocked, waiting, or ready."
- **Reorder stat cards** to: Needs attention → Changes requested → Pending reviews → Approved (urgency-first)
- **Add "Reminders sent" indicator** in the attention queue items (mock: "Reminder sent 2d ago" on overdue items)
- **Add "Last reminded" column** to attention queue metadata
- **Rename "All projects"** → "Active approvals" and filter to only show non-draft, non-approved projects by default
- **Activity feed**: Filter to only show approval-relevant events (approvals, changes requested, comments, client views) — remove generic uploads/invites from the feed title area
- **Add empty state** for when no items need attention: calm success message "All caught up — no blocked approvals right now"

### 3. Polish the client portal for maximum simplicity

**File:** `ClientPortal.tsx`

- **Welcome card copy**: More specific — "Review each deliverable below. Approve what looks good, request changes on what doesn't. Your agency will be notified instantly."
- **Add comment resolution badges** in the feedback section (already in data model, surface `resolved` state visually)
- **Add "resolve" button** on comments for agency-side users (small text button)
- **Improve the "All approved" celebration state**: Add a subtle confetti-like animation or a more prominent success illustration instead of just text
- **Show "Last updated" timestamp** on each deliverable card in the sidebar
- **Add deliverable count summary** at the top of the sidebar: "4 deliverables · 2 approved"

### 4. UX polish pass — typography, spacing, and micro-interactions

**Files:** `index.css`, `StatusBadge.tsx`, `Dashboard.tsx`, `AppLayout.tsx`

- **StatusBadge refinement**: Increase pill padding slightly, add subtle border (e.g., `ring-1 ring-current/10`) for better definition
- **Card spacing**: Increase padding on `card-elevated` from `p-4`/`p-5` to `p-5`/`p-6` consistently across dashboard cards
- **Dashboard stat cards**: Add subtle border-left accent color indicator (2px left border matching the accent)
- **Activity feed items**: Add a subtle separator between items (thin bottom border) for better scannability
- **Sidebar**: Add a subtle gradient overlay at the bottom before the user section for depth
- **Empty states**: Ensure all empty states have consistent styling — centered icon, primary text, muted subtext

### 5. Align pricing and CTA copy globally

**Files:** `Pricing.tsx`, `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`

- Ensure every CTA across the site consistently says "Join Founder Beta" (not "Start free trial" in some places)
- Pricing subtitle: "Early access for founding users. Upgrade when you're ready to scale." (already good, keep)
- Footer: Replace "Start free trial" link with "Join Founder Beta"

### Design Notes

- No new pages or routes added
- No new features added — this is a copy, hierarchy, and polish pass
- All changes follow existing patterns (card-elevated, motion animations, muted-foreground)
- The dashboard should feel like a focused approvals triage view, not a generic admin panel
- The landing page should immediately communicate "this is for agencies tired of email approvals"

