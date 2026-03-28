import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Palette, Zap, Plus, Trash2, ExternalLink, Building2, ShieldCheck, Bell, Users, CreditCard,
  Settings as SettingsIcon, CheckCircle2, Clock, History, Mail, Eye, MailWarning,
  HardDrive, FolderOpen
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useDemo } from '@/contexts/DemoContext';
import { useWorkspace, useWorkspaceMembers, useInviteMember, useUpdateMemberRole, useRemoveMember, usePendingInvitations } from '@/hooks/use-workspace';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useWorkspaceUsage, getWorkspacePlanConfig } from '@/hooks/use-workspace-usage';

const Settings = () => {
  const { user } = useAuth();
  const { isDemoMode, demoPlan, demoUserName, demoAgencyName, planConfig: demoPlanConfig, demoData, usage: demoUsage } = useDemo();
  const { data: workspace, refetch: refetchWorkspace } = useWorkspace();
  const { data: usageData } = useWorkspaceUsage(workspace?.id);
  const wsPlanConfig = isDemoMode ? demoPlanConfig : (workspace ? getWorkspacePlanConfig(workspace.plan) : null);
  const { data: members, refetch: refetchMembers } = useWorkspaceMembers(workspace?.id);
  const { data: pendingInvitations } = usePendingInvitations(workspace?.id);
  const inviteMember = useInviteMember();
  const updateRole = useUpdateMemberRole();
  const removeMember = useRemoveMember();

  // In demo mode, use demo data for usage and members
  const effectiveUsage = isDemoMode && demoUsage ? {
    projectCount: demoUsage.projectsUsed,
    storageGB: demoUsage.storageUsedGB,
    teamMemberCount: demoUsage.teamMembersUsed,
    storageBytes: demoUsage.storageUsedGB * 1024 * 1024 * 1024,
  } : usageData;
  const effectiveMembers = isDemoMode ? (demoData?.members ?? []) : members;

  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'notifications' | 'team' | 'usage'>('general');
  
  // Form state
  const [workspaceName, setWorkspaceName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');

  // Invite state
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member'>('member');

  // Sync form state with workspace data
  const displayName = isDemoMode ? (demoAgencyName || '') : (workspace?.name || '');
  const displayAgency = isDemoMode ? (demoAgencyName || '') : (workspace?.agency_name || '');
  const displaySupportEmail = isDemoMode ? `support@${demoAgencyName.toLowerCase().replace(/\s+/g, '')}.com` : (workspace?.support_email || '');

  const handleSave = async (section: string) => {
    if (isDemoMode) { toast.success(`${section} updated (demo)`); return; }
    if (!workspace) return;
    const updates: any = {};
    if (section === 'Identity') {
      if (workspaceName) updates.name = workspaceName;
      if (agencyName) updates.agency_name = agencyName;
      if (supportEmail) updates.support_email = supportEmail;
    }
    
    if (Object.keys(updates).length > 0) {
      const { error } = await supabase
        .from('workspaces')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', workspace.id);
      
      if (error) {
        toast.error('Failed to save', { description: error.message });
        return;
      }
      refetchWorkspace();
    }
    toast.success(`${section} updated`);
  };

  const handleInvite = async () => {
    if (isDemoMode) { toast.success('Invitation sent (demo)'); setInviteDialogOpen(false); return; }
    if (!workspace || !inviteEmail) return;
    
    // Check team limit before inviting
    const { checkTeamLimit } = await import('@/hooks/use-workspace-usage');
    const teamCheck = checkTeamLimit(usageData, workspace.plan);
    if (!teamCheck.allowed) {
      toast.error('Team limit reached', { description: `Your plan allows ${teamCheck.limit} team members. Upgrade to add more.` });
      return;
    }
    
    try {
      await inviteMember.mutateAsync({ workspaceId: workspace.id, email: inviteEmail, role: inviteRole });
      toast.success('Invitation sent', { description: `Invited ${inviteEmail} as ${inviteRole}` });
      setInviteEmail('');
      setInviteDialogOpen(false);
    } catch (err: any) {
      toast.error('Failed to invite', { description: err.message });
    }
  };

  const handleRoleChange = async (memberId: string, newRole: 'admin' | 'member') => {
    if (!workspace) return;
    try {
      await updateRole.mutateAsync({ memberId, role: newRole, workspaceId: workspace.id });
      toast.success('Role updated');
    } catch (err: any) {
      toast.error('Failed to update role', { description: err.message });
    }
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    if (!workspace) return;
    try {
      await removeMember.mutateAsync({ memberId, workspaceId: workspace.id });
      toast.success(`Removed ${memberName}`);
    } catch (err: any) {
      toast.error('Failed to remove member', { description: err.message });
    }
  };

  const currentUserRole = members?.find(m => m.user_id === user?.id)?.role;
  const isAdminOrOwner = isDemoMode ? true : (currentUserRole === 'owner' || currentUserRole === 'admin');

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'usage', label: 'Plan & Usage', icon: CreditCard },
  ];

  if (!isDemoMode && !workspace) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-8 max-w-5xl overflow-hidden">
      <div className="flex flex-col gap-0.5 sm:gap-1">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xl sm:text-2xl font-bold tracking-tight">
          Workspace Settings
        </motion.h1>
        <p className="text-muted-foreground text-[13px] sm:text-[14px]">Manage your workspace, team, and notification preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 sm:gap-8">
        <aside className="lg:w-64 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-xl text-[12px] lg:text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 lg:w-full",
                  activeTab === tab.id ? "bg-primary/[0.06] text-primary shadow-sm" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}>
                <tab.icon className={cn("h-3.5 w-3.5 lg:h-4 lg:w-4", activeTab === tab.id ? "text-primary" : "text-muted-foreground")} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="space-y-6">
              
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="font-semibold text-[15px] sm:text-base">Workspace Identity</h2>
                    <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5">Foundational details for your workspace.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground/80">Workspace Name</Label>
                      <Input value={workspaceName || displayName} onChange={e => setWorkspaceName(e.target.value)} className="h-9 sm:h-10 text-[13px]" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground/80">Agency Name</Label>
                      <Input value={agencyName || displayAgency} onChange={e => setAgencyName(e.target.value)} className="h-9 sm:h-10 text-[13px]" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] uppercase tracking-wider text-muted-foreground/80">Support Email</Label>
                      <Input value={supportEmail || displaySupportEmail} onChange={e => setSupportEmail(e.target.value)} className="h-9 sm:h-10 text-[13px]" />
                    </div>
                  </div>
                  <div className="pt-3 flex justify-end">
                    <Button onClick={() => handleSave('Identity')} className="h-9 px-6 text-[13px] w-full sm:w-auto">Save Changes</Button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="font-semibold text-[15px] sm:text-base">Notification Preferences</h2>
                    <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5">Configure which events trigger team notifications.</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                      <MailWarning className="h-3.5 w-3.5" /> Alert Rules
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {[
                        { label: 'New Client Comment', key: 'notify_on_comment' },
                        { label: 'Deliverable Approved', key: 'notify_on_approval' },
                        { label: 'Revisions Requested', key: 'notify_on_changes_requested' },
                      ].map((rule) => (
                        <div key={rule.label} className="flex items-center justify-between p-3 border rounded-xl hover:bg-muted/30 transition-colors">
                          <span className="text-[13px]">{rule.label}</span>
                          <input type="checkbox" checked={(workspace as any)?.[rule.key] ?? true}
                            onChange={async (e) => {
                              await supabase.from('workspaces').update({ [rule.key]: e.target.checked }).eq('id', workspace.id);
                              refetchWorkspace();
                            }}
                            className="accent-primary h-4 w-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Team Tab */}
              {activeTab === 'team' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="font-semibold text-[15px] sm:text-base">Team Management</h2>
                        <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5">Manage collaborators and permissions.</p>
                      </div>
                      {isAdminOrOwner && (
                        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full sm:w-auto">
                              <Plus className="h-3.5 w-3.5" /> Invite Member
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Invite Team Member</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-2">
                              <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                <Input placeholder="colleague@agency.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className="h-11" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest text-muted-foreground">Role</Label>
                                <Select value={inviteRole} onValueChange={v => setInviteRole(v as any)}>
                                  <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="member">Member</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button onClick={handleInvite} disabled={!inviteEmail || inviteMember.isPending} className="w-full h-11 font-bold">
                                {inviteMember.isPending ? 'Sending...' : 'Send Invite'}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    <div className="space-y-2">
                      {members?.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border hover:bg-muted/10 transition-colors">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-xs sm:text-sm">
                            {(member.full_name || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] sm:text-[13px] font-medium">{member.full_name || 'Unknown'}</p>
                            <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">{member.user_id === user?.id ? user.email : ''}</p>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-4">
                            {isAdminOrOwner && member.role !== 'owner' && member.user_id !== user?.id ? (
                              <Select value={member.role} onValueChange={v => handleRoleChange(member.id, v as any)}>
                                <SelectTrigger className="h-7 text-[10px] w-24 border-none bg-muted/50">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="member">Member</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <span className={cn(
                                "text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-1.5 sm:px-2 py-0.5 rounded-full",
                                member.role === 'owner' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                              )}>
                                {member.role}
                              </span>
                            )}
                            {isAdminOrOwner && member.role !== 'owner' && member.user_id !== user?.id && (
                              <button onClick={() => handleRemoveMember(member.id, member.full_name || 'member')}
                                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pending Invitations */}
                    {pendingInvitations && pendingInvitations.length > 0 && (
                      <div className="pt-4 border-t">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-3 flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5" /> Pending Invitations
                        </h3>
                        <div className="space-y-2">
                          {pendingInvitations.map((inv: any) => (
                            <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl border border-dashed">
                              <div>
                                <p className="text-[12px] font-medium">{inv.email}</p>
                                <p className="text-[10px] text-muted-foreground">Invited as {inv.role} · {new Date(inv.created_at).toLocaleDateString()}</p>
                              </div>
                              <span className="text-[10px] bg-warning/10 text-warning px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Pending</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Usage Tab */}
              {activeTab === 'usage' && (
                <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="font-semibold text-[15px] sm:text-base">Plan & Usage</h2>
                    <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5">Your current plan and resource usage.</p>
                  </div>
                  <div className="bg-primary/[0.03] p-4 sm:p-6 rounded-2xl border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4"><Zap className="h-24 w-24 text-primary/[0.03] rotate-12" /></div>
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary px-2 py-0.5 rounded bg-primary/10 uppercase tracking-wider">
                            {wsPlanConfig?.name ?? 'FOUNDER BETA'}
                          </span>
                          {wsPlanConfig && (
                            <span className="text-[12px] font-bold text-muted-foreground">${wsPlanConfig.price}/mo</span>
                          )}
                        </div>
                        <p className="text-[13px] text-muted-foreground max-w-sm pt-1">
                          {wsPlanConfig?.id === 'studio' 
                            ? 'Full-featured plan for agencies running high-volume client work.'
                            : 'Core plan for solo creatives and small teams.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Usage meters */}
                  {usageData && wsPlanConfig && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-xl border space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <FolderOpen className="h-3 w-3" /> Projects
                          </span>
                          <span className="text-[11px] font-bold text-foreground">
                            {usageData.projectCount}/{wsPlanConfig.limits.maxProjects ?? '∞'}
                          </span>
                        </div>
                        <Progress 
                          value={wsPlanConfig.limits.maxProjects ? (usageData.projectCount / wsPlanConfig.limits.maxProjects) * 100 : 15} 
                          className="h-1.5"
                        />
                      </div>
                      <div className="p-4 rounded-xl border space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <HardDrive className="h-3 w-3" /> Storage
                          </span>
                          <span className="text-[11px] font-bold text-foreground">
                            {usageData.storageGB} GB / {wsPlanConfig.limits.maxStorageGB} GB
                          </span>
                        </div>
                        <Progress 
                          value={(usageData.storageGB / wsPlanConfig.limits.maxStorageGB) * 100} 
                          className="h-1.5"
                        />
                      </div>
                      <div className="p-4 rounded-xl border space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Users className="h-3 w-3" /> Team Seats
                          </span>
                          <span className="text-[11px] font-bold text-foreground">
                            {usageData.teamMemberCount}/{wsPlanConfig.limits.maxTeamMembers}
                          </span>
                        </div>
                        <Progress 
                          value={(usageData.teamMemberCount / wsPlanConfig.limits.maxTeamMembers) * 100} 
                          className="h-1.5"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
