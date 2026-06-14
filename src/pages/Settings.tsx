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
                      Keep your existing tools. Approvr handles the client-facing portals, updating your internal databases automatically.
                    </p>
                  </div>
                  
                  <div className="space-y-6 sm:space-y-8">
                    {/* Priority 1: Third-Party Authentication (SSO) */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Priority 1: Third-Party Authentication (SSO)
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
                      </div>
                    </div>

                    {/* Priority 2: Existing Project Trackers */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                        <FolderOpen className="h-3.5 w-3.5 text-primary" /> Priority 2: Project Trackers (Asana, Linear, Notion, ClickUp)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Asana Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="6" r="3.2" />
                                    <circle cx="6.5" cy="15.5" r="3.2" />
                                    <circle cx="17.5" cy="15.5" r="3.2" />
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
                                <div className="h-9 w-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2c5.522 0 10 4.477 10 10 0 5.522-4.478 10-10 10S2 17.522 2 12C2 6.477 6.478 2 12 2zm3.327 5.753l-6.143 6.143-.377-.376 4.636-4.637-.886-.885-4.636 4.636-.377-.377 3.136-3.136-.885-.885-3.136 3.136-.376-.376 1.636-1.637-.885-.885-2.012 2.012 5.064 5.064 8.163-8.163-.884-.884z"/>
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
                              Sync project cycles. Update issue states, close bug tickets, or notify design owners as soon as revision cycles are completed.
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
                                <div className="h-9 w-9 rounded-lg bg-slate-500/10 dark:bg-slate-400/10 flex items-center justify-center text-foreground">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
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

                        {/* ClickUp Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 18.439l3.69-2.828c1.961 2.56 4.044 3.739 6.363 3.739 2.307 0 4.33-1.166 6.203-3.704L22 18.405C19.298 22.065 15.941 24 12.053 24 8.178 24 4.788 22.078 2 18.439zM12.04 6.15l-6.568 5.66-3.036-3.52L12.055 0l9.543 8.296-3.05 3.509z"/>
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">ClickUp Tasks</h3>
                                  <p className="text-[10px] text-muted-foreground">Status Updates</p>
                                </div>
                              </div>
                              <span className="text-[9px] bg-muted text-muted-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Not Connected</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed pt-1">
                              Bring client feedback directly into ClickUp. Update custom fields, track completion times, and synchronize approvals with your team's sprint board.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8 text-[11px] font-bold w-full" onClick={() => toast.success("Connecting ClickUp...")}>
                            Connect ClickUp
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Priority 3: Automation Hubs & Payments */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 flex items-center gap-2">
                        <Zap className="h-3.5 w-3.5 text-orange-500" /> Priority 3: Automation & Payments (Zapier, Stripe)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Zapier Card */}
                        <div className="p-4 rounded-xl border bg-card/50 hover:bg-card/85 transition-colors flex flex-col justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0c-.55 0-1 .45-1 1v7.66l-5.42-5.42c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L9.59 10H1.93c-.55 0-1 .45-1 1s.45 1 1 1h7.66l-5.42 5.42c-.39.39-.39 1.02 0 1.41.2.2.45.3.71.3s.51-.1.71-.3L11 13.34V21c0 .55.45 1 1 1s1-.45 1-1v-7.66l5.42 5.42c.2.2.45.3.71.3s.51-.1.71-.3c.39-.39.39-1.02 0-1.41L14.41 12h7.66c.55 0 1-.45 1-1s-.45-1-1-1h-7.66l-5.42-5.42c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0L13 8.66V1c0-.55-.45-1-1-1z" />
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-[13px] font-bold">Zapier Automation</h3>
                                  <p className="text-[10px] text-muted-foreground">Webhooks & Triggers</p>
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
                                <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600">
                                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.96 2c-2.43 0-4.06 1.24-4.06 3.71 0 3.66 5.02 3.08 5.02 4.67 0 .54-.45.79-1.23.79-1.58 0-3.35-.68-3.35-.68l-.9 3.96s1.96.81 4.14.81c2.59 0 5.38-1.15 5.38-3.94 0-3.87-5.02-3.2-5.02-4.64 0-.47.4-.72 1.13-.72.99 0 2.52.36 2.52.36l.88-3.98s-1.82-.38-3.53-.38z"/>
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
