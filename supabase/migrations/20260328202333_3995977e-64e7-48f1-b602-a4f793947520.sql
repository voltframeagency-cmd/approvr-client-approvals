
-- ============================================
-- 1. ENUMS
-- ============================================
CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'member');
CREATE TYPE public.project_status AS ENUM ('draft', 'in_review', 'changes_requested', 'approved');
CREATE TYPE public.deliverable_status AS ENUM ('draft', 'in_review', 'changes_requested', 'approved');
CREATE TYPE public.invitation_status AS ENUM ('pending', 'accepted', 'expired');
CREATE TYPE public.notification_type AS ENUM ('approval', 'comment', 'upload', 'reminder', 'status_change', 'invite');
CREATE TYPE public.notification_urgency AS ENUM ('low', 'medium', 'high', 'critical');

-- ============================================
-- 2. PROFILES TABLE
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. WORKSPACES TABLE
-- ============================================
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  agency_name TEXT,
  support_email TEXT,
  timezone TEXT DEFAULT 'America/New_York',
  brand_description TEXT,
  accent_color TEXT DEFAULT '#0d9488',
  logo_url TEXT,
  portal_welcome_message TEXT DEFAULT 'Welcome! Review the deliverables below and leave your feedback.',
  portal_footer_text TEXT,
  portal_help_url TEXT,
  portal_success_message TEXT DEFAULT 'Thank you! Your approval has been recorded.',
  notify_on_comment BOOLEAN DEFAULT true,
  notify_on_approval BOOLEAN DEFAULT true,
  notify_on_changes_requested BOOLEAN DEFAULT true,
  reminder_cadence_days INT DEFAULT 3,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. WORKSPACE MEMBERS (ROLES TABLE)
-- ============================================
CREATE TABLE public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. INVITATIONS TABLE
-- ============================================
CREATE TABLE public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'member',
  invited_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status invitation_status NOT NULL DEFAULT 'pending',
  token TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '7 days')
);
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. PROJECTS TABLE
-- ============================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  description TEXT,
  status project_status NOT NULL DEFAULT 'draft',
  project_type TEXT,
  deadline TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. DELIVERABLES TABLE
-- ============================================
CREATE TABLE public.deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_url TEXT,
  file_size BIGINT,
  status deliverable_status NOT NULL DEFAULT 'draft',
  current_version INT NOT NULL DEFAULT 1,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 8. DELIVERABLE VERSIONS TABLE
-- ============================================
CREATE TABLE public.deliverable_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deliverable_id UUID NOT NULL REFERENCES public.deliverables(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  file_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  note TEXT,
  change_summary TEXT,
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(deliverable_id, version_number)
);
ALTER TABLE public.deliverable_versions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 9. COMMENTS TABLE
-- ============================================
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deliverable_id UUID NOT NULL REFERENCES public.deliverables(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT,
  author_type TEXT NOT NULL DEFAULT 'agency',
  body TEXT NOT NULL,
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 10. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  type notification_type NOT NULL DEFAULT 'reminder',
  urgency notification_urgency NOT NULL DEFAULT 'low',
  read BOOLEAN DEFAULT false,
  archived BOOLEAN DEFAULT false,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  deliverable_id UUID REFERENCES public.deliverables(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 11. ACTIVITY LOG TABLE
-- ============================================
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_name TEXT,
  action TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'status_change',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 12. SECURITY DEFINER FUNCTION FOR ROLE CHECKS
-- ============================================
CREATE OR REPLACE FUNCTION public.has_workspace_role(_user_id UUID, _workspace_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = _user_id AND workspace_id = _workspace_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_workspace_member(_user_id UUID, _workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = _user_id AND workspace_id = _workspace_id
  )
$$;

CREATE OR REPLACE FUNCTION public.is_workspace_admin_or_owner(_user_id UUID, _workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = _user_id AND workspace_id = _workspace_id AND role IN ('owner', 'admin')
  )
$$;

-- ============================================
-- 13. AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 14. RLS POLICIES
-- ============================================

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Workspaces: members can view, admins/owners can update
CREATE POLICY "Members can view workspace" ON public.workspaces FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), id));
CREATE POLICY "Admins can update workspace" ON public.workspaces FOR UPDATE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), id));
CREATE POLICY "Authenticated users can create workspaces" ON public.workspaces FOR INSERT TO authenticated
  WITH CHECK (true);

-- Workspace Members: members can view members, admins can manage
CREATE POLICY "Members can view team" ON public.workspace_members FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Admins can add members" ON public.workspace_members FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));
CREATE POLICY "Admins can update members" ON public.workspace_members FOR UPDATE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));
CREATE POLICY "Admins can remove members" ON public.workspace_members FOR DELETE TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));

-- Invitations: admins can manage, anyone can view by token
CREATE POLICY "Admins can manage invitations" ON public.invitations FOR ALL TO authenticated
  USING (public.is_workspace_admin_or_owner(auth.uid(), workspace_id));
CREATE POLICY "Anyone can view invitation by token" ON public.invitations FOR SELECT TO authenticated
  USING (true);

-- Projects: workspace members can CRUD
CREATE POLICY "Members can view projects" ON public.projects FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can create projects" ON public.projects FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can update projects" ON public.projects FOR UPDATE TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));

-- Deliverables: access through project's workspace
CREATE POLICY "Members can view deliverables" ON public.deliverables FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id AND public.is_workspace_member(auth.uid(), p.workspace_id)
  ));
CREATE POLICY "Members can create deliverables" ON public.deliverables FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id AND public.is_workspace_member(auth.uid(), p.workspace_id)
  ));
CREATE POLICY "Members can update deliverables" ON public.deliverables FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id AND public.is_workspace_member(auth.uid(), p.workspace_id)
  ));

-- Deliverable Versions
CREATE POLICY "Members can view versions" ON public.deliverable_versions FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.deliverables d JOIN public.projects p ON p.id = d.project_id
    WHERE d.id = deliverable_id AND public.is_workspace_member(auth.uid(), p.workspace_id)
  ));
CREATE POLICY "Members can create versions" ON public.deliverable_versions FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.deliverables d JOIN public.projects p ON p.id = d.project_id
    WHERE d.id = deliverable_id AND public.is_workspace_member(auth.uid(), p.workspace_id)
  ));

-- Comments
CREATE POLICY "Members can view comments" ON public.comments FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.deliverables d JOIN public.projects p ON p.id = d.project_id
    WHERE d.id = deliverable_id AND public.is_workspace_member(auth.uid(), p.workspace_id)
  ));
CREATE POLICY "Members can create comments" ON public.comments FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.deliverables d JOIN public.projects p ON p.id = d.project_id
    WHERE d.id = deliverable_id AND public.is_workspace_member(auth.uid(), p.workspace_id)
  ));
CREATE POLICY "Members can update comments" ON public.comments FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.deliverables d JOIN public.projects p ON p.id = d.project_id
    WHERE d.id = deliverable_id AND public.is_workspace_member(auth.uid(), p.workspace_id)
  ));

-- Notifications: users can view/update their own
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT TO authenticated
  WITH CHECK (true);

-- Activity Log: members can view
CREATE POLICY "Members can view activity" ON public.activity_log FOR SELECT TO authenticated
  USING (public.is_workspace_member(auth.uid(), workspace_id));
CREATE POLICY "Members can log activity" ON public.activity_log FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_member(auth.uid(), workspace_id));

-- ============================================
-- 15. STORAGE BUCKET FOR DELIVERABLES
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('deliverables', 'deliverables', false, 104857600, NULL);

-- Storage RLS: workspace members can upload/view files for their projects
CREATE POLICY "Members can upload deliverables" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'deliverables');
CREATE POLICY "Members can view deliverables" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'deliverables');
CREATE POLICY "Members can update deliverables" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'deliverables');
CREATE POLICY "Members can delete deliverables" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'deliverables');
