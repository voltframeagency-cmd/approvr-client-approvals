import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useProjects(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!workspaceId,
  });
}

export function useProject(projectId: string | undefined) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!projectId) return null;
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (project: {
      workspace_id: string;
      name: string;
      client_name: string;
      client_email?: string;
      description?: string;
      project_type?: string;
      deadline?: string;
    }) => {
      const { data, error } = await supabase
        .from('projects')
        .insert({ ...project, created_by: user?.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects', data.workspace_id] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase
        .from('projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data.id] });
    },
  });
}

export function useDeliverables(projectId: string | undefined) {
  return useQuery({
    queryKey: ['deliverables', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const { data, error } = await supabase
        .from('deliverables')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });
}

export function useDeliverableVersions(deliverableId: string | undefined) {
  return useQuery({
    queryKey: ['deliverable-versions', deliverableId],
    queryFn: async () => {
      if (!deliverableId) return [];
      const { data, error } = await supabase
        .from('deliverable_versions')
        .select('*')
        .eq('deliverable_id', deliverableId)
        .order('version_number', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!deliverableId,
  });
}

export function useComments(deliverableId: string | undefined, versionNumber?: number) {
  return useQuery({
    queryKey: ['comments', deliverableId, versionNumber],
    queryFn: async () => {
      if (!deliverableId) return [];
      let query = supabase
        .from('comments')
        .select('*')
        .eq('deliverable_id', deliverableId)
        .order('created_at', { ascending: true });
      if (versionNumber !== undefined) {
        query = query.eq('version_number', versionNumber);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!deliverableId,
  });
}

export function useCreateDeliverable() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (deliverable: {
      project_id: string;
      title: string;
      file_name: string;
      file_type?: string;
      file_url?: string;
      file_size?: number;
    }) => {
      const { data, error } = await supabase
        .from('deliverables')
        .insert({ ...deliverable, uploaded_by: user?.id })
        .select()
        .single();
      if (error) throw error;

      // Also create version 1
      await supabase.from('deliverable_versions').insert({
        deliverable_id: data.id,
        version_number: 1,
        file_url: deliverable.file_url,
        file_name: deliverable.file_name,
        file_size: deliverable.file_size,
        note: 'Initial upload',
        submitted_by: user?.id,
      });

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['deliverables', data.project_id] });
    },
  });
}

export function useUploadDeliverableFile() {
  return useMutation({
    mutationFn: async ({ file, projectId }: { file: File; projectId: string }) => {
      const fileExt = file.name.split('.').pop();
      const filePath = `${projectId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('deliverables')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('deliverables')
        .getPublicUrl(filePath);

      return {
        file_url: urlData.publicUrl,
        file_name: file.name,
        file_type: fileExt || 'unknown',
        file_size: file.size,
        file_path: filePath,
      };
    },
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (comment: {
      deliverable_id: string;
      version_number: number;
      body: string;
      author_type?: string;
    }) => {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          ...comment,
          author_id: user?.id,
          author_type: comment.author_type || 'agency',
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.deliverable_id] });
    },
  });
}

export function useNotifications() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useActivityLog(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['activity-log', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!workspaceId,
  });
}
