
-- Add plan column to workspaces (defaults to 'scaler' for existing workspaces)
ALTER TABLE public.workspaces 
ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'scaler';

-- Create a function to get total storage bytes used by a workspace
-- Sums file_size from deliverables via projects
CREATE OR REPLACE FUNCTION public.get_workspace_storage_bytes(_workspace_id uuid)
RETURNS bigint
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(d.file_size), 0)::bigint
  FROM public.deliverables d
  JOIN public.projects p ON p.id = d.project_id
  WHERE p.workspace_id = _workspace_id
$$;

-- Create a function to get workspace usage stats in one call
CREATE OR REPLACE FUNCTION public.get_workspace_usage(_workspace_id uuid)
RETURNS TABLE (
  project_count bigint,
  team_member_count bigint,
  storage_bytes bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (SELECT COUNT(*) FROM public.projects WHERE workspace_id = _workspace_id)::bigint,
    (SELECT COUNT(*) FROM public.workspace_members WHERE workspace_id = _workspace_id)::bigint,
    (SELECT COALESCE(SUM(d.file_size), 0)::bigint
     FROM public.deliverables d
     JOIN public.projects p ON p.id = d.project_id
     WHERE p.workspace_id = _workspace_id)
$$;
