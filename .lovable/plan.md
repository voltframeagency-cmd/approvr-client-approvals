

# Next Step Actions System for Approvr

## Summary

Add a "Next Step Actions" feature that lets agencies configure external action links (contracts, invoices, payments, bookings, file downloads) at the workspace or project level. These actions surface elegantly in the client portal after all deliverables are approved, and in the agency-side project detail view for configuration.

## Changes

### 1. Data model — `src/lib/mock-data.ts`

Add new types and mock data:

- `NextStepAction` interface: `id`, `label`, `url`, `providerType` (enum: `contract_link | invoice_link | payment_link | booking_link | file_delivery_link | onboarding_link | custom_url`), `displayCondition` (`on_approval | always`), `scope` (`workspace | project`), `projectId?`
- Add `mockNextStepActions` array with 3-4 sample actions (e.g., "Open contract link" pointing to DocuSign, "Pay now" pointing to Stripe, "Book next call" pointing to Calendly, "Download final files" as a file delivery link)

### 2. Client Portal — `src/pages/ClientPortal.tsx`

After the existing deliverable review UI, when `allApproved === true`, render a new **"What's next"** section:

- Premium card with a celebratory but calm header ("All approved — here's what's next")
- List of next step action buttons, each showing: icon based on provider type, label text, and an external link arrow
- Buttons open links in new tabs
- Subtle entrance animation matching existing motion patterns
- Clear visual separation — this section only appears post-approval

### 3. Agency Project Detail — `src/pages/ProjectDetail.tsx`

Add a new **"Next Steps"** tab alongside preview/versions/timeline:

- Lists configured next step actions for the project (project-level + inherited workspace-level)
- Each action row shows: provider type badge, label, URL (truncated), and edit/remove buttons
- "Add action" button opens inline form with fields: label, URL, provider type dropdown, display condition toggle
- Read-only indicator for workspace-level actions ("Inherited from workspace")

### 4. Settings page — `src/pages/Settings.tsx`

Add a new **"Next Step Actions"** section below "Client portal branding":

- Card titled "Default next step actions" with subtitle: "These actions appear in all client portals after approval. Override per-project in project settings."
- List of workspace-level actions with add/edit/remove
- Inline add form: label input, URL input, provider type select, display condition toggle
- Provider type options rendered with appropriate icons

### 5. Provider type icons mapping

Create a small utility or inline map for provider type to icon:
- `contract_link` → FileSignature / ScrollText
- `invoice_link` → Receipt
- `payment_link` → CreditCard
- `booking_link` → Calendar
- `file_delivery_link` → Download
- `onboarding_link` → Rocket
- `custom_url` → ExternalLink

### Design Notes

- All new UI follows existing patterns: `card-elevated`, `text-[13px]`, subtle `motion` entrance animations, muted foreground for secondary text
- CTA buttons in the client portal use `variant="outline"` with the external link icon — they should not look like Approvr-native actions
- No language implies Approvr provides these services — labels are user-defined, links open externally
- The "What's next" section feels like a premium concierge handoff, not a checkout flow

