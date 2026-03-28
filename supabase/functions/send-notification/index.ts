import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationPayload {
  type: 'status_change' | 'new_deliverable' | 'approval' | 'rejection' | 'comment';
  project_id: string;
  workspace_id: string;
  deliverable_id?: string;
  actor_name: string;
  details?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: NotificationPayload = await req.json();
    const { type, project_id, workspace_id, deliverable_id, actor_name, details } = payload;

    // Get project details
    const { data: project } = await supabase
      .from('projects')
      .select('name, client_name')
      .eq('id', project_id)
      .single();

    if (!project) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get workspace notification settings
    const { data: workspace } = await supabase
      .from('workspaces')
      .select('notify_on_comment, notify_on_approval, notify_on_changes_requested')
      .eq('id', workspace_id)
      .single();

    // Check if this notification type is enabled
    if (workspace) {
      if (type === 'comment' && !workspace.notify_on_comment) {
        return new Response(JSON.stringify({ skipped: true, reason: 'Comments notifications disabled' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if ((type === 'approval' || type === 'rejection') && !workspace.notify_on_approval) {
        return new Response(JSON.stringify({ skipped: true, reason: 'Approval notifications disabled' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Get all workspace members to notify
    const { data: members } = await supabase
      .from('workspace_members')
      .select('user_id')
      .eq('workspace_id', workspace_id);

    if (!members || members.length === 0) {
      return new Response(JSON.stringify({ skipped: true, reason: 'No members to notify' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build notification content
    let title = '';
    let body = '';
    let urgency: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    let notificationType: string = type;

    switch (type) {
      case 'status_change':
        title = 'Project Status Changed';
        body = `${actor_name} updated "${project.name}" status. ${details || ''}`;
        urgency = 'medium';
        notificationType = 'status_change';
        break;
      case 'new_deliverable':
        title = 'New Deliverable Uploaded';
        body = `${actor_name} uploaded a new deliverable to "${project.name}". ${details || ''}`;
        urgency = 'medium';
        notificationType = 'upload';
        break;
      case 'approval':
        title = 'Deliverable Approved';
        body = `${actor_name} approved a deliverable in "${project.name}". ${details || ''}`;
        urgency = 'high';
        notificationType = 'approval';
        break;
      case 'rejection':
        title = 'Changes Requested';
        body = `${actor_name} requested changes in "${project.name}". ${details || ''}`;
        urgency = 'high';
        notificationType = 'comment';
        break;
      case 'comment':
        title = 'New Comment';
        body = `${actor_name} commented on "${project.name}". ${details || ''}`;
        urgency = 'low';
        notificationType = 'comment';
        break;
    }

    // Create notifications for all workspace members
    const notifications = members.map(m => ({
      user_id: m.user_id,
      workspace_id,
      title,
      body,
      type: notificationType,
      urgency,
      project_id,
      deliverable_id: deliverable_id || null,
    }));

    const { error: insertError } = await supabase
      .from('notifications')
      .insert(notifications);

    if (insertError) {
      console.error('Failed to create notifications:', insertError);
      return new Response(JSON.stringify({ error: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Log activity
    await supabase.from('activity_log').insert({
      workspace_id,
      project_id,
      actor_name,
      action: body,
      type,
    });

    return new Response(JSON.stringify({ success: true, notified: members.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
