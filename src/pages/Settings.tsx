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

  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'notifications' | 'integrations' | 'team' | 'usage'>('general');
  
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
    { id: 'integrations', label: 'Integrations', icon: Zap },
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
                              if (isDemoMode) { toast.success('Preference updated (demo)'); return; }
                              if (!workspace) return;
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

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="card-elevated p-4 sm:p-6 space-y-6 sm:space-y-8">
                  <div>
                    <h2 className="font-semibold text-[15px] sm:text-base">Connected Applications</h2>
                    <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5">
                      Configure backend plumbing integrations for your agency. Client-facing portals remain clean, lightweight, and zero-friction.
                    </p>
                  </div>
                  
                  <div className="space-y-6 sm:space-y-8">
                    {/* Section 1: Identity & Authentication (SSO) */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Identity & Authentication (SSO)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Google SSO Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Google Client Auth</h3>
                                  <p className="text-[10px] text-muted-foreground">Single Sign-On (SSO)</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Eliminate client registration friction. Clients can access their deliverables and request changes instantly using their Google account.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full text-muted-foreground" disabled>
                            Google Auth Enabled
                          </Button>
                        </div>

                        {/* Microsoft SSO Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-4 w-4" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#F1511B" d="M121.666 121.666H0V0h121.666z"/>
                                    <path fill="#80CC28" d="M256 121.666H134.335V0H256z"/>
                                    <path fill="#00ADEF" d="M121.663 256.002H0V134.336h121.663z"/>
                                    <path fill="#FBBC09" d="M256 256.002H134.335V134.336H256z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Microsoft SSO</h3>
                                  <p className="text-[10px] text-muted-foreground">Single Sign-On (SSO)</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Provide enterprise-grade single sign-on. Allow corporate clients to access projects securely using Microsoft Workspace profiles.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Microsoft SSO...")}>
                            Connect Microsoft SSO
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Notification Systems */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                        <Bell className="h-3.5 w-3.5 text-indigo-500" /> Notification Systems
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Slack Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 2447.6 2452.5" xmlns="http://www.w3.org/2000/svg">
                                    <g clipRule="evenodd" fillRule="evenodd">
                                      <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/>
                                      <path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/>
                                      <path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/>
                                      <path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/>
                                    </g>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Slack Notifications</h3>
                                  <p className="text-[10px] text-muted-foreground">Internal Channel Sync</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Receive instant notifications when clients view files, add comments, or sign off. Approvr pings your internal Slack channels automatically.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Slack Notifications...")}>
                            Connect Slack
                          </Button>
                        </div>

                        {/* Microsoft Teams Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="4 4 36 38" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="url(#teams-a)" d="M22 20h12a6 6 0 0 1 6 6v10a6 6 0 0 1-12 0V26a6 6 0 0 0-6-6Z"/>
                                    <path fill="url(#teams-b)" d="M8 24a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v12a6 6 0 0 0 6 6H18c-5.523 0-10-4.477-10-10v-8Z"/>
                                    <path fill="url(#teams-c)" fillOpacity={0.7} d="M8 24a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v12a6 6 0 0 0 6 6H18c-5.523 0-10-4.477-10-10v-8Z"/>
                                    <path fill="url(#teams-d)" fillOpacity={0.7} d="M8 24a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v12a6 6 0 0 0 6 6H18c-5.523 0-10-4.477-10-10v-8Z"/>
                                    <path fill="url(#teams-e)" d="M33 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
                                    <path fill="url(#teams-f)" fillOpacity={0.46} d="M33 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
                                    <path fill="url(#teams-g)" fillOpacity={0.4} d="M33 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
                                    <path fill="url(#teams-h)" d="M18 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
                                    <path fill="url(#teams-i)" fillOpacity={0.6} d="M18 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
                                    <path fill="url(#teams-j)" fillOpacity={0.5} d="M18 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
                                    <rect width="16" height="16" x="4" y="23" fill="url(#teams-k)" rx="3.25"/>
                                    <rect width="16" height="16" x="4" y="23" fill="url(#teams-l)" fillOpacity={0.7} rx="3.25"/>
                                    <path fill="#fff" d="M15.48 28.105h-2.448v7.466h-2.065v-7.466H8.52V26.43h6.96v1.676Z"/>
                                    <defs>
                                      <radialGradient id="teams-a" cx="0" cy="0" r="1" gradientTransform="matrix(13.4784 0 0 33.2694 39.797 22.174)" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#A98AFF"/><stop offset={0.14} stopColor="#8C75FF"/><stop offset={0.565} stopColor="#5F50E2"/><stop offset={0.9} stopColor="#3C2CB8"/>
                                      </radialGradient>
                                      <radialGradient id="teams-b" cx="0" cy="0" r="1" gradientTransform="matrix(12.1875 30.39997 -30.74442 12.3256 8.812 16.4)" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#85C2FF"/><stop offset={0.69} stopColor="#7588FF"/><stop offset={1} stopColor="#6459FE"/>
                                      </radialGradient>
                                      <radialGradient id="teams-d" cx="0" cy="0" r="1" gradientTransform="rotate(113.326 8.093 17.645) scale(19.2186 15.4273)" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#BD96FF"/><stop offset={0.687} stopColor="#BD96FF" stopOpacity={0}/>
                                      </radialGradient>
                                      <radialGradient id="teams-e" cx="0" cy="0" r="1" gradientTransform="matrix(0 -10 12.6216 0 33 11.571)" gradientUnits="userSpaceOnUse">
                                        <stop offset={0.268} stopColor="#6868F7"/><stop offset={1} stopColor="#3923B1"/>
                                      </radialGradient>
                                      <radialGradient id="teams-f" cx="0" cy="0" r="1" gradientTransform="matrix(5.47024 4.59847 -6.65117 7.91208 28.867 10.544)" gradientUnits="userSpaceOnUse">
                                        <stop offset={0.271} stopColor="#A1D3FF"/><stop offset={0.813} stopColor="#A1D3FF" stopOpacity={0}/>
                                      </radialGradient>
                                      <radialGradient id="teams-g" cx="0" cy="0" r="1" gradientTransform="rotate(-41.658 32.118 -43.42) scale(8.51275 20.8824)" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#E3ACFD"/><stop offset={0.816} stopColor="#9FA2FF" stopOpacity={0}/>
                                      </radialGradient>
                                      <radialGradient id="teams-h" cx="0" cy="0" r="1" gradientTransform="matrix(0 -12 15.146 0 18 8.286)" gradientUnits="userSpaceOnUse">
                                        <stop offset={0.268} stopColor="#8282FF"/><stop offset={1} stopColor="#3923B1"/>
                                      </radialGradient>
                                      <radialGradient id="teams-i" cx="0" cy="0" r="1" gradientTransform="rotate(40.052 -3.155 21.416) scale(8.57554 12.4035)" gradientUnits="userSpaceOnUse">
                                        <stop offset={0.271} stopColor="#A1D3FF"/><stop offset={0.813} stopColor="#A1D3FF" stopOpacity={0}/>
                                      </radialGradient>
                                      <radialGradient id="teams-j" cx="0" cy="0" r="1" gradientTransform="rotate(-41.658 20.382 -26.516) scale(10.2153 25.0589)" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#E3ACFD"/><stop offset={0.816} stopColor="#9FA2FF" stopOpacity={0}/>
                                      </radialGradient>
                                      <radialGradient id="teams-k" cx="0" cy="0" r="1" gradientTransform="rotate(45 -25.763 16.328) scale(22.6274)" gradientUnits="userSpaceOnUse">
                                        <stop offset={0.047} stopColor="#688EFF"/><stop offset={0.947} stopColor="#230F94"/>
                                      </radialGradient>
                                      <radialGradient id="teams-l" cx="0" cy="0" r="1" gradientTransform="matrix(0 11.2 -13.0702 0 12 32.6)" gradientUnits="userSpaceOnUse">
                                        <stop offset={0.571} stopColor="#6965F6" stopOpacity={0}/><stop offset={1} stopColor="#8F8FFF"/>
                                      </radialGradient>
                                      <linearGradient id="teams-c" x1="20.594" x2="20.594" y1="18" y2="42" gradientUnits="userSpaceOnUse">
                                        <stop offset={0.801} stopColor="#6864F6" stopOpacity={0}/><stop offset={1} stopColor="#5149DE"/>
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Microsoft Teams</h3>
                                  <p className="text-[10px] text-muted-foreground">Team Alerts</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Sync real-time approval logs directly to Microsoft Teams channels. Keep your creative department in the loop automatically.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Microsoft Teams...")}>
                            Connect Teams
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Project Trackers (One-Way Status Updates) */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                        <FolderOpen className="h-3.5 w-3.5 text-primary" /> Project Trackers (One-Way Status Updates)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Asana Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 251 232" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#F06A6A" d="M179.383 54.3733c0 30.0166-24.337 54.3737-54.354 54.3737-30.0355 0-54.3733-24.3382-54.3733-54.3737S94.9935 0 125.029 0c30.017 0 54.354 24.3378 54.354 54.3733ZM54.3928 122.33c-30.0166 0-54.373269 24.338-54.373269 54.355 0 30.017 24.337769 54.373 54.373269 54.373 30.0354 0 54.3732-24.338 54.3732-54.373 0-30.017-24.3378-54.355-54.3732-54.355Zm141.2532 0c-30.035 0-54.373 24.338-54.373 54.374 0 30.035 24.338 54.373 54.373 54.373 30.017 0 54.374-24.338 54.374-54.373 0-30.036-24.338-54.374-54.374-54.374Z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Asana Projects</h3>
                                  <p className="text-[10px] text-muted-foreground">Task Sync</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Link deliverables directly to Asana tasks. Automatically advance tasks or move them to 'Approved' columns as soon as clients sign off.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Asana...")}>
                            Connect Asana
                          </Button>
                        </div>

                        {/* Linear Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#5E6AD2" d="M1.225 61.523c-.222-.949.908-1.546 1.597-.857l36.512 36.512c.69.69.092 1.82-.857 1.597-18.425-4.323-32.93-18.827-37.252-37.252ZM.002 46.889a.99.99 0 0 0 .29.76L52.35 99.71c.201.2.478.307.76.29 2.37-.149 4.695-.46 6.963-.927.765-.157 1.03-1.096.478-1.648L2.576 39.448c-.552-.551-1.491-.286-1.648.479a50.067 50.067 0 0 0-.926 6.962ZM4.21 29.705a.988.988 0 0 0 .208 1.1l64.776 64.776c.289.29.726.375 1.1.208a49.908 49.908 0 0 0 5.185-2.684.981.981 0 0 0 .183-1.54L8.436 24.336a.981.981 0 0 0-1.541.183 49.896 49.896 0 0 0-2.684 5.185Zm8.448-11.631a.986.986 0 0 1-.045-1.354C21.78 6.46 35.111 0 49.952 0 77.592 0 100 22.407 100 50.048c0 14.84-6.46 28.172-16.72 37.338a.986.986 0 0 1-1.354-.045L12.659 18.074Z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Linear Issues</h3>
                                  <p className="text-[10px] text-muted-foreground">Issue Tracking</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Sync project cycles. Update issue states, close bug tickets, or notify design owners as soon as client revision cycles are completed.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Linear...")}>
                            Connect Linear
                          </Button>
                        </div>

                        {/* Notion Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center text-foreground">
                                  <svg className="h-5 w-5" viewBox="0 0 256 268" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z" opacity={0.15}/>
                                    <path fill="currentColor" d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.155 9.879l-11.946 1.043V203.95l7.792-.516.516.516c0 .524-1.044 1.56-2.084 1.56l-34.8.52c-.523 0-1.558-.52-1.558-1.56l.52-.516 7.79-.516V103.056l-21.3 27.534-.516.52c-.524 0-.524-.52-1.033-.52l-21.824-27.534v100.9l7.79.516.52.516c0 .524-1.044 1.56-2.084 1.56l-34.28.52c-.524 0-1.559-.52-1.559-1.56l.52-.516 7.278-.516V92.65l-8.31-.52c-.524 0-1.036-.526-.524-1.56l16.108-1.043 31.171 39.51 30.655-39.51 28.053-1.559c.523 0 .523.517.523 1.043Z" />
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Notion Workspace</h3>
                                  <p className="text-[10px] text-muted-foreground">Database Sync</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Sync approvals to your custom internal databases. Write feedback directly to Notion pages, link client contacts, and keep your workspace structured.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Notion...")}>
                            Connect Notion
                          </Button>
                        </div>

                        {/* Trello Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 63 63" xmlns="http://www.w3.org/2000/svg">
                                    <linearGradient id="trello-a" x1="50.048061%" x2="50.048061%" y1="100%" y2="0%">
                                      <stop stopColor="#0052cc"/><stop offset={1} stopColor="#2684ff"/>
                                    </linearGradient>
                                    <path d="m55.59.07h-47.59c-4.09405078 0-7.41448241 3.31595294-7.42006073 7.41v47.52c-.00791682 1.9730991.77030774 3.8681213 2.16269326 5.2661365 1.39238553 1.3980151 3.28425224 2.1838635 5.25736747 2.1838635h47.59c1.9713817-.0026407 3.8606757-.7896772 5.250897-2.1874031s2.1670753-3.2912295 2.1591638-5.2625969v-47.52c-.0055694-4.09014608-3.3199147-7.40449138-7.4100608-7.41zm-28.09 44.93c-.0026377.6594819-.2678382 1.2907542-.7369724 1.7542587-.4691341.4635046-1.1035619.721065-1.7630276.7158222h-10.4c-1.3602365-.005588-2.46-1.1098333-2.46-2.4700809v-30.95c0-1.3602476 1.0997635-2.4644929 2.46-2.47h10.4c1.3618668.0054804 2.4645196 1.1081332 2.47 2.47zm24-14.21c0 .6603158-.2642968 1.2931595-.7340204 1.7572465-.4697237.464087-1.1057125.7207735-1.7659796.7129359h-10.4c-1.3618668-.0056628-2.4645196-1.1083156-2.47-2.4701824v-16.74c.0054804-1.3618668 1.1081332-2.4645196 2.47-2.47h10.4c1.3602365.0055071 2.4600111 1.1097524 2.46 2.47z" fill="url(#trello-a)"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Trello Boards</h3>
                                  <p className="text-[10px] text-muted-foreground">List Status Sync</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Keep your boards clean. Move Trello cards from 'Pending Approval' to 'Completed' columns automatically when clients sign off.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Trello...")}>
                            Connect Trello
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: File & Design Hosting */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                        <HardDrive className="h-3.5 w-3.5 text-primary" /> File & Design Hosting
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Google Drive Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"/>
                                    <path fill="#00ac47" d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A9.06 9.06 0 0 0 0 53h27.5z"/>
                                    <path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z"/>
                                    <path fill="#00832d" d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z"/>
                                    <path fill="#2684fc" d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/>
                                    <path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25 59.8 53h27.45c0-1.55-.4-3.1-1.2-4.5z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Google Drive</h3>
                                  <p className="text-[10px] text-muted-foreground">Source Asset Linking</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Link heavy deliverables directly from Google Drive. Offload hosting limits and share high-res source files safely and automatically.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Google Drive...")}>
                            Connect Google Drive
                          </Button>
                        </div>

                        {/* Figma Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#figma-clip)">
                                      <path d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z" fill="#0ACF83"/>
                                      <path d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z" fill="#A259FF"/>
                                      <path d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z" fill="#F24E1E"/>
                                      <path d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z" fill="#FF7262"/>
                                      <path d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z" fill="#1ABCFE"/>
                                    </g>
                                    <defs>
                                      <clipPath id="figma-clip">
                                        <rect width="53.3333" height="80" fill="white"/>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Figma Embeds</h3>
                                  <p className="text-[10px] text-muted-foreground">Live Canvas Reviews</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Embed live Figma files directly inside the client portal. Clients review and approve live canvases without needing Figma accounts.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Figma...")}>
                            Connect Figma
                          </Button>
                        </div>

                        {/* Dropbox Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#0061FE" d="M43.7 32 23.404 44.75 43.701 57.5 64 44.75 84.3 57.5l20.298-12.75L84.299 32 64.002 44.75 43.7 32Zm0 51L23.404 70.25 43.701 57.5 64 70.25 43.702 83Zm20.302-12.75L84.299 57.5l20.298 12.75L84.299 83 64.002 70.25Zm0 29.75L43.7 87.25 64 74.5l20.3 12.75L64.002 100Z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Dropbox Storage</h3>
                                  <p className="text-[10px] text-muted-foreground">Deliverable Sync</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Link your Dropbox team folders. Access revision assets and render packages directly through Approvr client frames.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting Dropbox...")}>
                            Connect Dropbox
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Section 5: Automation & Payments */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 text-orange-500" /> Automation & Finance (Zapier, Stripe)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Zapier Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0c-.55 0-1 .45-1 1v7.66l-5.42-5.42c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L9.59 10H1.93c-.55 0-1 .45-1 1s.45 1 1 1h7.66l-5.42 5.42c-.39.39-.39 1.02 0 1.41.2.2.45.3.71.3s.51-.1.71-.3L11 13.34V21c0 .55.45 1 1 1s1-.45 1-1v-7.66l5.42 5.42c.2.2.45.3.71.3s.51-.1.71-.3c.39-.39.39-1.02 0-1.41L14.41 12h7.66c.55 0 1-.45 1-1s-.45-1-1-1h-7.66l-5.42-5.42c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0L13 8.66V1c0-.55-.45-1-1-1z" fill="#ff4f00"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Zapier Automation</h3>
                                  <p className="text-[10px] text-muted-foreground">Triggers & Webhooks</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Trigger custom flows in 5,000+ apps. Automatically create QuickBooks invoices, notify Slack channels, or log approvals in Google Sheets.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full gap-1.5" onClick={() => toast.info("Zapier webhook settings configured")}>
                            Configure Zapier <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Stripe Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-900 border flex items-center justify-center">
                                  <svg className="h-5 w-5" viewBox="100 100 312 312" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#635bff" fillRule="evenodd" d="m120 392 272-57.683V120l-272 58.357z" clipRule="evenodd"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Stripe Checkout</h3>
                                  <p className="text-[10px] text-muted-foreground">Payment Collections</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Collect payments directly from client sign-off pages. Paste your Stripe payment links to collect deposits or final balances. Approvr takes 0% cuts.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full gap-1.5" onClick={() => toast.info("Stripe payment webhook is active")}>
                            Configure Stripe <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
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
                      {(isDemoMode ? (effectiveMembers ?? []).map((m: any) => ({ id: m.id, full_name: m.name, user_id: m.id, role: m.role })) : members)?.map((member: any) => (
                        <div key={member.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border hover:bg-muted/10 transition-colors">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-xs sm:text-sm">
                            {(member.full_name || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] sm:text-[13px] font-medium">{member.full_name || 'Unknown'}</p>
                            <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">{isDemoMode ? '' : (member.user_id === user?.id ? user?.email : '')}</p>
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
                  {effectiveUsage && wsPlanConfig && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 rounded-xl border space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <FolderOpen className="h-3 w-3" /> Projects
                          </span>
                          <span className="text-[11px] font-bold text-foreground">
                            {effectiveUsage.projectCount}/{wsPlanConfig.limits.maxProjects ?? '∞'}
                          </span>
                        </div>
                        <Progress 
                          value={wsPlanConfig.limits.maxProjects ? (effectiveUsage.projectCount / wsPlanConfig.limits.maxProjects) * 100 : 15} 
                          className="h-1.5"
                        />
                      </div>
                      <div className="p-4 rounded-xl border space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <HardDrive className="h-3 w-3" /> Storage
                          </span>
                          <span className="text-[11px] font-bold text-foreground">
                            {effectiveUsage.storageGB} GB / {wsPlanConfig.limits.maxStorageGB} GB
                          </span>
                        </div>
                        <Progress 
                          value={(effectiveUsage.storageGB / wsPlanConfig.limits.maxStorageGB) * 100} 
                          className="h-1.5"
                        />
                      </div>
                      <div className="p-4 rounded-xl border space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Users className="h-3 w-3" /> Team Seats
                          </span>
                          <span className="text-[11px] font-bold text-foreground">
                            {effectiveUsage.teamMemberCount}/{wsPlanConfig.limits.maxTeamMembers}
                          </span>
                        </div>
                        <Progress 
                          value={(effectiveUsage.teamMemberCount / wsPlanConfig.limits.maxTeamMembers) * 100} 
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
