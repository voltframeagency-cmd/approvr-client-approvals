

## Audit: Missing Details Across Dashboard and Client Portal

After reviewing every page in the app, here are the gaps that need attention:

### Critical Issues

1. **Client Portal is 100% hardcoded** — It uses `mockProjects[0]`, hardcodes "Rivera Design Co", "Sarah Chen", and "Rivera Design" regardless of demo plan or real user. It never reads from `DemoContext` or Supabase. The portal should dynamically reflect the agency's workspace branding (name, accent color, logo) and the actual project/client data.

2. **Dashboard and Projects still fall back to mock data for real users** — When `isDemoMode` is false, both pages use `mockProjects` / `mockActivity` instead of querying Supabase (`projects`, `deliverables`, `activity_log` tables). The entire authenticated experience shows fake data.

3. **Project creation is client-side only** — `Projects.tsx` pushes a new project into local React state. It never inserts into the `projects` table in Supabase, so nothing persists.

4. **No upload gating** — Storage tracking exists but nothing blocks uploads when the limit is exceeded. The `checkStorageLimit` helper is defined but never called.

5. **Team invite limit not enforced** — `checkTeamLimit` exists but the Settings invite flow never checks it before sending.

### Detail-Level Issues

6. **Client Portal footer says "© 2024 Rivera Design Co"** — Should be dynamic year and workspace name.

7. **Client Portal FAQ link points to `support.riveradesign.co`** — Hardcoded external URL; should use the workspace's `portal_help_url` field.

8. **Client Portal welcome message is hardcoded** — "Welcome back, Sarah" instead of using workspace `portal_welcome_message`.

9. **Dashboard welcome says "Welcome back, there"** for real users — Should use the user's `full_name` from their profile, not a static fallback.

10. **Notifications page uses only mock/demo data** — Never queries the real `notifications` table for authenticated users.

11. **ProjectDetail uses only mock data for real users** — Same pattern as Dashboard; falls back to `mockProjects` instead of Supabase queries.

12. **Demo mode project links break** — Demo project IDs (e.g., `proj-scaler-1`) won't match any real mock data IDs, so clicking into a project from the demo dashboard may show "Project not found" if the data sets diverge.

13. **No project limit enforcement on "New Project" button** — In demo mode, `projectLimitReached` is checked but in real mode the beta system controls it, not the plan config. These two systems aren't unified.

---

### Recommended Implementation Plan

**Phase 1 — Wire real Supabase data (highest impact)**
- Query `projects`, `deliverables`, `activity_log`, `notifications` for authenticated users across Dashboard, Projects, ProjectDetail, and Notifications pages
- Insert real projects into Supabase from the create dialog
- Keep mock/demo data path for demo mode only

**Phase 2 — Dynamic Client Portal**
- Accept project ID via URL param (e.g., `/portal/:token`)
- Fetch workspace branding (name, logo, accent color, welcome message, help URL) and project data from Supabase
- Replace all hardcoded names, colors, and links

**Phase 3 — Enforce plan limits**
- Call `checkStorageLimit` before file uploads, show upgrade prompt when exceeded
- Call `checkTeamLimit` before sending invites in Settings
- Call `checkProjectLimit` before project creation (unify beta vs. plan logic)

**Phase 4 — Polish**
- Dynamic footer year and workspace name in Client Portal
- Use profile `full_name` for Dashboard greeting
- Ensure demo project IDs are consistent across `demoData` so navigation works end-to-end

### Technical Notes
- All Supabase tables and RLS policies are already in place for projects, deliverables, notifications, and activity_log
- The `useWorkspaceUsage` hook and `checkStorageLimit` / `checkTeamLimit` / `checkProjectLimit` helpers are built and ready to wire
- Client Portal currently has no auth — it will need a token-based or public access pattern for external clients

