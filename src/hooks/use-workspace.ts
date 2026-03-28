import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface WorkspaceData {
  id: string;
  name: string;
  agency_name: string | null;
  support_email: string | null;
  timezone: string | null;
  brand_description: string | null;
  accent_color: string | null;
  logo_url: string | null;
  portal_welcome_message: string | null;
  portal_footer_text: string | null;
  portal_help_url: string | null;
  portal_success_message: string | null;
  notify_on_comment: boolean | null;
  notify_on_approval: boolean | null;
  notify_on_changes_requested: boolean | null;
  reminder_cadence_days: number | null;
}

export interface WorkspaceMemberData {
  id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  joined_at: string;
  profiles?: { full_name: string | null; avatar_url: string | null } | null;
  // Flattened for convenience
  email?: string;
  full_name?: string;
}

export function useWorkspace() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['workspace', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      // Get the user's workspace through workspace_members
      const { data: membership, error: memberError } = await supabase
        .from('workspace_members')
        .select('workspace_id')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (memberError) throw memberError;
      if (!membership) return null;

      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('id', membership.workspace_id)
        .single();

      if (error) throw error;
      return data as WorkspaceData;
    },
    enabled: !!user,
  });
}

export function useWorkspaceMembers(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['workspace-members', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      
      const { data, error } = await supabase
        .from('workspace_members')
        .select('id, user_id, role, joined_at')
        .eq('workspace_id', workspaceId);

      if (error) throw error;

      // Fetch profiles for each member
      const userIds = data.map(m => m.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      return data.map(m => ({
        ...m,
        full_name: profileMap.get(m.user_id)?.full_name || 'Unknown',
        avatar_url: profileMap.get(m.user_id)?.avatar_url,
      })) as WorkspaceMemberData[];
    },
    enabled: !!workspaceId,
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ name, agencyName }: { name: string; agencyName?: string }) => {
      if (!user) throw new Error('Not authenticated');

      // Create workspace
      const { data: workspace, error: wsError } = await supabase
        .from('workspaces')
        .insert({ name, agency_name: agencyName || name })
        .select()
        .single();

      if (wsError) throw wsError;

      // Add creator as owner
      const { error: memberError } = await supabase
        .from('workspace_members')
        .insert({
          workspace_id: workspace.id,
          user_id: user.id,
          role: 'owner' as any,
        });

      if (memberError) throw memberError;

      return workspace;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace'] });
    },
  });
}

export function useInviteMember() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ workspaceId, email, role }: { workspaceId: string; email: string; role: 'admin' | 'member' }) => {
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('invitations')
        .insert({
          workspace_id: workspaceId,
          email,
          role: role as any,
          invited_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['invitations', variables.workspaceId] });
    },
  });
}

export function useUpdateMemberRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, role, workspaceId }: { memberId: string; role: 'admin' | 'member'; workspaceId: string }) => {
      const { error } = await supabase
        .from('workspace_members')
        .update({ role: role as any })
        .eq('id', memberId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', variables.workspaceId] });
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, workspaceId }: { memberId: string; workspaceId: string }) => {
      const { error } = await supabase
        .from('workspace_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workspace-members', variables.workspaceId] });
    },
  });
}

export function usePendingInvitations(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['invitations', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('workspace_id', workspaceId)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!workspaceId,
  });
}
