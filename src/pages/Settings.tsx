import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Palette, 
  Zap, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Users, 
  CreditCard,
  Settings as SettingsIcon,
  CheckCircle2,
  Clock,
  History,
  Mail,
  HelpCircle,
  Eye,
  Globe,
  MailWarning
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  mockNextStepActions, 
  providerTypeLabels, 
  mockWorkspace, 
  mockMembers,
  mockFounderBeta,
  Workspace,
  NextStepAction,
  NextStepProviderType
} from '@/lib/mock-data';
import { providerIcons } from '@/lib/provider-icons';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

const Settings = () => {
  const { toast: uiToast } = useToast();
  const [activeTab, setActiveTab] = useState<'general' | 'branding' | 'review' | 'notifications' | 'actions' | 'team' | 'usage'>('general');
  const [workspace, setWorkspace] = useState<Workspace>(mockWorkspace);
  const [workspaceActions, setWorkspaceActions] = useState<NextStepAction[]>(
    mockNextStepActions.filter(a => a.scope === 'workspace')
  );
  const [showAddAction, setShowAddAction] = useState(false);
  const [newAction, setNewAction] = useState<{ label: string; url: string }>({ label: '', url: '' });

  const handleSave = (section: string) => {
    // Simulate API call
    console.log(`Saving ${section}:`, workspace);
    
    // UI Feedback
    uiToast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated successfully.`,
    });

    toast.success(`${section} updated`);
  };

  const handleUpdateWorkspace = (path: string, value: any) => {
    setWorkspace(prev => {
      const keys = path.split('.');
      if (keys.length === 1) {
        return { ...prev, [path]: value };
      }
      
      const [parent, child] = keys;
      return {
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Workspace] as any),
          [child]: value
        }
      };
    });
  };

  const addAction = () => {
    if (!newAction.label || !newAction.url) {
      toast.error("Please fill in both label and URL");
      return;
    }

    const action: NextStepAction = {
      id: Math.random().toString(36).substr(2, 9),
      label: newAction.label,
      url: newAction.url,
      providerType: detectProvider(newAction.url),
      displayCondition: 'on_approval',
      scope: 'workspace'
    };

    setWorkspaceActions(prev => [action, ...prev]);
    setNewAction({ label: '', url: '' });
    setShowAddAction(false);
    toast.success("Template added to workspace");
  };

  const deleteAction = (id: string) => {
    setWorkspaceActions(prev => prev.filter(a => a.id !== id));
    toast.success("Template removed");
  };

  const detectProvider = (url: string): NextStepProviderType => {
    const lowUrl = url.toLowerCase();
    if (lowUrl.includes('calendly.com')) return 'booking';
    if (lowUrl.includes('stripe.com') || lowUrl.includes('invoice')) return 'payment';
    if (lowUrl.includes('docusign.com') || lowUrl.includes('contract')) return 'contract';
    if (lowUrl.includes('drive.google.com') || lowUrl.includes('dropbox')) return 'delivery';
    return 'custom';
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'review', label: 'Review Flow', icon: ShieldCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'actions', label: 'Next Steps', icon: Zap },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'usage', label: 'Plan & Usage', icon: CreditCard },
  ];

  return (
    <div className="space-y-5 sm:space-y-8 max-w-5xl overflow-hidden">
      <div className="flex flex-col gap-0.5 sm:gap-1">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-bold tracking-tight"
        >
          Workspace Control Center
        </motion.h1>
        <p className="text-muted-foreground text-[13px] sm:text-[14px]">
          Define how Approvr behaves across every project and client portal.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 sm:gap-8">
        {/* Sidebar Navigation - horizontal scroll on mobile, vertical on desktop */}
        <aside className="lg:w-64 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 lg:gap-3 px-3 py-2 lg:py-2.5 rounded-xl text-[12px] lg:text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 lg:w-full",
                  activeTab === tab.id 
                    ? "bg-primary/[0.06] text-primary shadow-sm" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <tab.icon className={cn("h-3.5 w-3.5 lg:h-4 lg:w-4", activeTab === tab.id ? "text-primary" : "text-muted-foreground")} />
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="font-semibold text-[15px] sm:text-base">Workspace Identity</h2>
                      <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5 sm:mt-1">Foundational details for your workspace presence.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-[11px] sm:text-[12px] uppercase tracking-wider text-muted-foreground/80">Workspace Name</Label>
                        <Input 
                          value={workspace.name} 
                          onChange={(e) => handleUpdateWorkspace('name', e.target.value)}
                          className="h-9 sm:h-10 text-[13px]" 
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-[11px] sm:text-[12px] uppercase tracking-wider text-muted-foreground/80">Agency Name (Public)</Label>
                        <Input 
                          value={workspace.agencyName} 
                          onChange={(e) => handleUpdateWorkspace('agencyName', e.target.value)}
                          className="h-9 sm:h-10 text-[13px]" 
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-[11px] sm:text-[12px] uppercase tracking-wider text-muted-foreground/80">Support Email</Label>
                        <Input 
                          value={workspace.supportEmail} 
                          onChange={(e) => handleUpdateWorkspace('supportEmail', e.target.value)}
                          className="h-9 sm:h-10 text-[13px]" 
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-[11px] sm:text-[12px] uppercase tracking-wider text-muted-foreground/80">Default Timezone</Label>
                        <select 
                          value={workspace.timezone}
                          onChange={(e) => handleUpdateWorkspace('timezone', e.target.value)}
                          className="flex h-9 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[13px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Asia/Dubai">Dubai (GST)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                      <Label className="text-[11px] sm:text-[12px] uppercase tracking-wider text-muted-foreground/80">Agency Short Description</Label>
                      <Textarea 
                        value={workspace.brandDescription} 
                        onChange={(e) => handleUpdateWorkspace('brandDescription', e.target.value)}
                        className="resize-none text-[13px] h-20"
                        placeholder="e.g. A boutique design studio focused on high-end digital brands..."
                      />
                      <p className="text-[11px] text-muted-foreground italic">This appears in emails and portal headers when appropriate.</p>
                    </div>

                    <div className="pt-3 sm:pt-4 flex justify-end">
                      <Button onClick={() => handleSave('Identity')} className="h-9 px-6 text-[13px] w-full sm:w-auto">Save Changes</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-5">
                      <div>
                        <h2 className="font-semibold text-base">Portal Brand Identity</h2>
                        <p className="text-[13px] text-muted-foreground mt-1">How clients perceive your agency within Approvr.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[12px] uppercase tracking-wider text-muted-foreground/80">Agency Logo</Label>
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-xl border border-dashed flex items-center justify-center text-[11px] text-muted-foreground bg-muted/30">
                              Logo
                            </div>
                            <Button variant="outline" size="sm" className="h-9 px-4 text-xs">Update Logo</Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[12px] uppercase tracking-wider text-muted-foreground/80">Accent Color</Label>
                          <div className="flex items-center gap-3">
                            <input 
                              type="color" 
                              value={workspace.accentColor} 
                              onChange={(e) => handleUpdateWorkspace('accentColor', e.target.value)}
                              className="h-9 w-9 rounded-lg border cursor-pointer overflow-hidden p-0" 
                            />
                            <Input 
                              value={workspace.accentColor} 
                              onChange={(e) => handleUpdateWorkspace('accentColor', e.target.value)}
                              className="max-w-[120px] h-9 font-mono text-xs" 
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[12px] uppercase tracking-wider text-muted-foreground/80">Welcome Message</Label>
                          <Textarea 
                            value={workspace.portalWelcomeMessage} 
                            onChange={(e) => handleUpdateWorkspace('portalWelcomeMessage', e.target.value)}
                            className="resize-none text-[13px] h-24" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[12px] uppercase tracking-wider text-muted-foreground/80">Footer Attribution</Label>
                          <Input 
                            value={workspace.portalFooterText} 
                            onChange={(e) => handleUpdateWorkspace('portalFooterText', e.target.value)}
                            className="h-9 text-[13px]" 
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[12px] uppercase tracking-wider text-muted-foreground/80">Support/Help URL</Label>
                          <Input 
                            value={workspace.portalHelpUrl} 
                            onChange={(e) => handleUpdateWorkspace('portalHelpUrl', e.target.value)}
                            placeholder="https://..." className="h-9 text-[13px]" 
                          />
                        </div>
                      </div>

                      <div className="pt-3 sm:pt-4">
                        <Button onClick={() => handleSave('Branding')} className="w-full h-9 text-xs">Save Branding</Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="card-elevated p-4 sm:p-6 bg-muted/[0.02]">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-4 flex items-center gap-2">
                           <Eye className="h-3 w-3" /> Live Preview
                        </h3>
                        <div className="aspect-[4/3] rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col">
                          <div className="h-10 border-b flex items-center px-4 justify-between bg-muted/5">
                            <div className="h-4 w-12 bg-muted/30 rounded" />
                            <div className="flex gap-1.5">
                              <div className="h-4 w-8 bg-muted/30 rounded" />
                              <div className="h-4 w-8 bg-muted/30 rounded" />
                            </div>
                          </div>
                          <div className="p-4 space-y-3 flex-1 overflow-hidden">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                                  <div className="h-3 w-3 rounded-full transition-colors duration-300" style={{ backgroundColor: workspace.accentColor }} />
                                </div>
                                <div className="h-3 w-24 bg-muted/20 rounded font-bold text-[10px] flex items-center px-1">
                                  {workspace.agencyName || 'AGENCY'}
                                </div>
                              </div>
                              <div className="h-2 w-full bg-muted/10 rounded" />
                              <div className="h-2 w-2/3 bg-muted/10 rounded" />
                            </div>

                            <div className="pt-4">
                              <div className="h-32 rounded-lg border-2 border-dashed border-muted/20 flex flex-col items-center justify-center gap-2">
                                <div className="h-8 w-24 rounded bg-primary/10 animate-pulse" style={{ backgroundColor: `${workspace.accentColor}15` }} />
                                <div className="h-2 w-16 bg-muted/20 rounded" />
                              </div>
                            </div>
                          </div>
                          <div className="h-8 border-t bg-muted/5 flex items-center justify-center px-4">
                             <div className="text-[8px] text-muted-foreground/50 truncate max-w-full italic">
                               {workspace.portalFooterText || 'Agency Portal Footer'}
                             </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground text-center mt-3">Live mockup of your client-facing portal aesthetic.</p>
                      </div>

                      <div className="card-elevated p-4 sm:p-5 space-y-3 sm:space-y-4">
                        <h3 className="text-[13px] font-medium flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-success" /> Success Sentiment
                        </h3>
                        <div className="space-y-2">
                          <Label className="text-[11px] text-muted-foreground">Post-Approval Message</Label>
                          <Textarea 
                            value={workspace.portalSuccessMessage} 
                            onChange={(e) => handleUpdateWorkspace('portalSuccessMessage', e.target.value)}
                            className="resize-none text-xs h-20 bg-muted/5" 
                            placeholder="Message shown after final project sign-off..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Review Flow Tab */}
              {activeTab === 'review' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="font-semibold text-[15px] sm:text-base">Operational Review Defaults</h2>
                      <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5 sm:mt-1">Define consistent operating rules across all client portals.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">Interaction Labels</h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label className="text-[12px]">Approval Button Text</Label>
                            <Input 
                              value={workspace.reviewDefaults.approveLabel} 
                              onChange={(e) => handleUpdateWorkspace('reviewDefaults.approveLabel', e.target.value)}
                              className="h-10 text-[13px]" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[12px]">Revision Button Text</Label>
                            <Input 
                              value={workspace.reviewDefaults.requestChangesLabel} 
                              onChange={(e) => handleUpdateWorkspace('reviewDefaults.requestChangesLabel', e.target.value)}
                              className="h-10 text-[13px]" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">Portal Behavior</h3>
                        <div className="space-y-4 pt-1">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-[13px]">Auto-collapse Resolved</Label>
                              <p className="text-[11px] text-muted-foreground">Hide resolved comments by default.</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={workspace.reviewDefaults.autoCollapseResolved} 
                              onChange={(e) => handleUpdateWorkspace('reviewDefaults.autoCollapseResolved', e.target.checked)}
                              className="accent-primary h-4 w-4" 
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-[13px]">Client Resolve Permission</Label>
                              <p className="text-[11px] text-muted-foreground">Clients can mark comments as resolved.</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={workspace.reviewDefaults.clientCanResolve} 
                              onChange={(e) => handleUpdateWorkspace('reviewDefaults.clientCanResolve', e.target.checked)}
                              className="accent-primary h-4 w-4" 
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-[13px]">Show Version History</Label>
                              <p className="text-[11px] text-muted-foreground">Allow clients to browse previous versions.</p>
                            </div>
                            <input 
                              type="checkbox" 
                              checked={workspace.reviewDefaults.showHistoryByDefault} 
                              onChange={(e) => handleUpdateWorkspace('reviewDefaults.showHistoryByDefault', e.target.checked)}
                              className="accent-primary h-4 w-4" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 sm:pt-6 border-t flex justify-end">
                      <Button onClick={() => handleSave('Review Flow')} className="h-9 px-6 text-[13px] w-full sm:w-auto">Save Flow Patterns</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="font-semibold text-[15px] sm:text-base">Operational Intelligence</h2>
                      <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5 sm:mt-1">Configure automated reminders and team alertness settings.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" /> Client Reminder Defaults
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-muted/20 p-3 sm:p-4 rounded-xl border border-dashed">
                           <div className="space-y-0.5 sm:space-y-1 flex-1">
                            <Label className="text-[13px]">Inactivity Reminder Trigger</Label>
                            <p className="text-[11px] text-muted-foreground">Clients receive a "Gentle Nudge" if inactive for X days.</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              value={workspace.notificationDefaults.reminderCadenceDays} 
                              onChange={(e) => handleUpdateWorkspace('notificationDefaults.reminderCadenceDays', parseInt(e.target.value))}
                              className="w-16 h-9 text-center" 
                            />
                            <span className="text-[13px] text-muted-foreground">Days</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                          <MailWarning className="h-3.5 w-3.5" /> Team Alert Rulebox
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                          {[
                            { label: 'New Client Comment', flag: 'notifyOnComment' },
                            { label: 'Deliverable Approved', flag: 'notifyOnApproval' },
                            { label: 'Revisions Requested', flag: 'notifyOnChangesRequested' },
                          ].map((rule) => (
                            <div key={rule.label} className="flex items-center justify-between p-3 sm:p-3.5 border rounded-xl hover:bg-muted/30 transition-colors">
                              <span className="text-[13px]">{rule.label}</span>
                              <input 
                                type="checkbox" 
                                checked={(workspace.notificationDefaults as any)[rule.flag]} 
                                onChange={(e) => handleUpdateWorkspace(`notificationDefaults.${rule.flag}`, e.target.checked)}
                                className="accent-primary h-4 w-4" 
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 flex justify-end">
                      <Button onClick={() => handleSave('Notifications')} className="h-9 px-6 text-[13px] w-full sm:w-auto">Save Rules</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions Tab (Next Steps) */}
              {activeTab === 'actions' && (
                 <div className="space-y-6">
                 <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-5">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                     <div>
                       <h2 className="font-semibold text-[15px] sm:text-base flex items-center gap-2">
                         Default Next Step Actions
                       </h2>
                       <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-1 sm:mt-1.5">
                         These actions appear in all client portals after approval.
                       </p>
                     </div>
                     <Button variant="outline" size="sm" className="gap-1 text-xs flex-shrink-0 w-full sm:w-auto" onClick={() => setShowAddAction(!showAddAction)}>
                       <Plus className="h-3 w-3" /> Add Template
                     </Button>
                   </div>
           
                   {showAddAction && (
                     <motion.div
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       className="border rounded-xl p-4 space-y-3 bg-muted/20"
                     >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         <div className="space-y-1.5">
                           <Label className="text-[12px]">Label</Label>
                           <Input 
                             placeholder="e.g. Pay now" 
                             value={newAction.label}
                             onChange={(e) => setNewAction(prev => ({ ...prev, label: e.target.value }))}
                             className="text-[13px]" 
                           />
                         </div>
                         <div className="space-y-1.5">
                           <Label className="text-[12px]">Destination URL</Label>
                           <Input 
                             placeholder="https://..." 
                             value={newAction.url}
                             onChange={(e) => setNewAction(prev => ({ ...prev, url: e.target.value }))}
                             className="text-[13px]" 
                           />
                         </div>
                       </div>
                       <div className="flex gap-2 justify-end">
                         <Button variant="outline" size="sm" onClick={() => setShowAddAction(false)}>Cancel</Button>
                         <Button size="sm" onClick={addAction}>Save Template</Button>
                       </div>
                     </motion.div>
                   )}
           
                   <div className="space-y-2">
                     {workspaceActions.map(action => {
                       const Icon = providerIcons[action.providerType];
                       return (
                         <div key={action.id} className="flex items-center gap-2.5 sm:gap-3 rounded-xl border p-3 sm:p-3.5 hover:shadow-sm transition-all">
                           <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                             <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                           </div>
                           <div className="flex-1 min-w-0">
                             <p className="text-[12px] sm:text-[13px] font-medium">{action.label}</p>
                             <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate flex items-center gap-1">
                               <ExternalLink className="h-2.5 w-2.5" />
                               {action.url}
                             </p>
                           </div>
                           <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full hidden sm:inline">{providerTypeLabels[action.providerType]}</span>
                           <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                             <Trash2 className="h-3.5 w-3.5" />
                           </button>
                         </div>
                       );
                     })}
                   </div>
                 </div>
               </div>
              )}

              {/* Team Tab */}
              {activeTab === 'team' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div>
                        <h2 className="font-semibold text-[15px] sm:text-base">Team Management</h2>
                        <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5 sm:mt-1">Manage collaborators and permissions.</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full sm:w-auto">
                        <Plus className="h-3.5 w-3.5" /> Invite Member
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {mockMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border hover:bg-muted/10 transition-colors">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary text-xs sm:text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] sm:text-[13px] font-medium">{member.name}</p>
                            <p className="text-[10px] sm:text-[11px] text-muted-foreground truncate">{member.email}</p>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-6">
                            <span className={cn(
                              "text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-1.5 sm:px-2 py-0.5 rounded-full",
                              member.role === 'owner' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                            )}>
                              {member.role}
                            </span>
                            <button className="p-1 sm:p-1.5 text-muted-foreground hover:text-foreground">
                              <SettingsIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-base">Portal Access Security</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[13px]">Magic Link Expiration</Label>
                          <p className="text-[11px] text-muted-foreground">Access tokens expire after these many days.</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number" 
                            value={workspace.securityDefaults.magicLinkExpirationDays} 
                            onChange={(e) => handleUpdateWorkspace('securityDefaults.magicLinkExpirationDays', parseInt(e.target.value))}
                            className="w-16 h-9 text-center" 
                          />
                          <span className="text-[13px] text-muted-foreground">Days</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-[13px]">Require Email Verification</Label>
                          <p className="text-[11px] text-muted-foreground">Force clients to verify their email before viewing portals.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={workspace.securityDefaults.requireEmailVerification} 
                          onChange={(e) => handleUpdateWorkspace('securityDefaults.requireEmailVerification', e.target.checked)}
                          className="accent-primary h-4 w-4" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pr-6 pb-6">
                     <Button onClick={() => handleSave('Security')} variant="secondary" className="h-9 px-6 text-[13px]">Update Security Rules</Button>
                  </div>
                </div>
              )}

              {/* Usage Tab */}
              {activeTab === 'usage' && (
                 <div className="space-y-4 sm:space-y-6">
                  <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div>
                      <h2 className="font-semibold text-[15px] sm:text-base">Plan & Usage Intelligence</h2>
                      <p className="text-[12px] sm:text-[13px] text-muted-foreground mt-0.5 sm:mt-1">Transparency on your Founder Beta status and usage counters.</p>
                    </div>

                    <div className="bg-primary/[0.03] p-4 sm:p-6 rounded-2xl border border-primary/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4">
                        <Zap className="h-24 w-24 text-primary/[0.03] rotate-12" />
                      </div>
                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-primary px-2 py-0.5 rounded bg-primary/10">FOUNDER BETA</span>
                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" /> Expires {mockFounderBeta.betaExpiresAt}
                            </span>
                          </div>
                          <p className="text-[13px] text-muted-foreground max-w-sm pt-1">
                            You're on our early-believer lifetime plan. High-touch support and unlimited future "Revision Intelligence" modules are included.
                          </p>
                        </div>
                        <Button className="h-9 sm:h-10 px-6 font-semibold w-full sm:w-auto">Contact Founder</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                      <div className="p-3.5 sm:p-5 rounded-2xl border bg-card">
                        <Label className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Projects Created</Label>
                        <div className="mt-3 sm:mt-4 flex items-end justify-between">
                          <div>
                            <span className="text-2xl sm:text-3xl font-bold">{mockFounderBeta.lifetimeProjectsCreated}</span>
                            <span className="text-muted-foreground text-[14px] ml-1">/ 10</span>
                          </div>
                          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '50%' }} />
                          </div>
                        </div>
                      </div>
                      <div className="p-3.5 sm:p-5 rounded-2xl border bg-card">
                        <Label className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Approval Events</Label>
                        <div className="mt-3 sm:mt-4 flex items-end justify-between">
                          <div>
                            <span className="text-2xl sm:text-3xl font-bold">{mockFounderBeta.lifetimeApprovalEvents}</span>
                            <span className="text-muted-foreground text-[14px] ml-1">/ 50</span>
                          </div>
                          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-success" style={{ width: '16%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                       <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 mb-4 flex items-center gap-2">
                          <History className="h-3.5 w-3.5" /> Recent Usage Audit
                        </h3>
                        <div className="space-y-3">
                          {[
                            { event: 'Project Created', detail: 'Q1 Brand Refresh', date: '2 days ago' },
                            { event: 'Deliverable Approved', detail: 'Primary Logo Design', date: '1 week ago' },
                            { event: 'Client Invited', detail: 'sarah@acme.co', date: '1 week ago' },
                          ].map((audit) => (
                            <div key={audit.detail} className="flex items-center justify-between text-[12px] py-1 border-b border-muted last:border-0 pb-3 last:pb-0">
                               <div className="flex flex-col gap-0.5">
                                 <span className="font-medium">{audit.event}</span>
                                 <span className="text-muted-foreground">{audit.detail}</span>
                               </div>
                               <span className="text-muted-foreground italic px-2 py-0.5 rounded bg-muted/50">{audit.date}</span>
                            </div>
                          ))}
                        </div>
                    </div>
                  </div>
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
