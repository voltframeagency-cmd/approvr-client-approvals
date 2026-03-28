import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { planConfigs } from '@/lib/plan-config';

export interface WorkspaceUsage {
  projectCount: number;
  teamMemberCount: number;
  storageBytes: number;
  storageGB: number;
}

export function useWorkspaceUsage(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['workspace-usage', workspaceId],
    queryFn: async (): Promise<WorkspaceUsage> => {
      if (!workspaceId) throw new Error('No workspace ID');

      const { data, error } = await supabase.rpc('get_workspace_usage', {
        _workspace_id: workspaceId,
      });

      if (error) throw error;

      const row = Array.isArray(data) ? data[0] : data;
      const storageBytes = Number(row?.storage_bytes ?? 0);

      return {
        projectCount: Number(row?.project_count ?? 0),
        teamMemberCount: Number(row?.team_member_count ?? 0),
        storageBytes,
        storageGB: Math.round((storageBytes / (1024 * 1024 * 1024)) * 100) / 100,
      };
    },
    enabled: !!workspaceId,
    staleTime: 30_000, // Cache for 30s — usage doesn't change rapidly
  });
}

/**
 * Returns the plan config for a workspace's plan column value.
 * Falls back to 'scaler' for unknown values.
 */
export function getWorkspacePlanConfig(planValue: string | null | undefined) {
  if (planValue === 'studio') return planConfigs.studio;
  return planConfigs.scaler;
}

/**
 * Check if a workspace can upload a file of the given size (in bytes).
 * Returns { allowed, currentGB, limitGB, remainingGB }.
 */
export function checkStorageLimit(
  usage: WorkspaceUsage | undefined,
  planValue: string | null | undefined,
  fileSizeBytes: number = 0
) {
  if (!usage) return { allowed: true, currentGB: 0, limitGB: 0, remainingGB: 0 };
  
  const config = getWorkspacePlanConfig(planValue);
  const limitBytes = config.limits.maxStorageGB * 1024 * 1024 * 1024;
  const afterUpload = usage.storageBytes + fileSizeBytes;
  
  return {
    allowed: afterUpload <= limitBytes,
    currentGB: usage.storageGB,
    limitGB: config.limits.maxStorageGB,
    remainingGB: Math.max(0, Math.round(((limitBytes - usage.storageBytes) / (1024 * 1024 * 1024)) * 100) / 100),
  };
}

/**
 * Check if a workspace can create another project.
 */
export function checkProjectLimit(
  usage: WorkspaceUsage | undefined,
  planValue: string | null | undefined
) {
  if (!usage) return { allowed: true, current: 0, limit: null as number | null };
  
  const config = getWorkspacePlanConfig(planValue);
  const limit = config.limits.maxProjects;
  
  return {
    allowed: limit === null || usage.projectCount < limit,
    current: usage.projectCount,
    limit,
  };
}

/**
 * Check if a workspace can add another team member.
 */
export function checkTeamLimit(
  usage: WorkspaceUsage | undefined,
  planValue: string | null | undefined
) {
  if (!usage) return { allowed: true, current: 0, limit: 0 };
  
  const config = getWorkspacePlanConfig(planValue);
  
  return {
    allowed: usage.teamMemberCount < config.limits.maxTeamMembers,
    current: usage.teamMemberCount,
    limit: config.limits.maxTeamMembers,
  };
}
