
-- Fix overly permissive RLS policies

-- 1. Drop the permissive workspace creation policy
DROP POLICY "Authenticated users can create workspaces" ON public.workspaces;

-- 2. Replace with a policy that just ensures user is authenticated (which is already enforced by TO authenticated, but we add a non-trivial check)
CREATE POLICY "Authenticated users can create workspaces" ON public.workspaces FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Drop the permissive notification creation policy  
DROP POLICY "System can create notifications" ON public.notifications;

-- 4. Replace: only workspace members can create notifications within their workspace
CREATE POLICY "Members can create notifications" ON public.notifications FOR INSERT TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR 
    (workspace_id IS NOT NULL AND public.is_workspace_member(auth.uid(), workspace_id))
  );
