import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Zap, Plus, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { mockNextStepActions, providerTypeLabels, type NextStepAction } from '@/lib/mock-data';
import { providerIcons } from '@/lib/provider-icons';

const Settings = () => {
  const workspaceActions = mockNextStepActions.filter(a => a.scope === 'workspace');
  const [showAddAction, setShowAddAction] = useState(false);

  return (
    <div className="space-y-8 max-w-2xl">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold"
      >
        Workspace settings
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-elevated p-6 space-y-5"
      >
        <h2 className="font-semibold text-base">General</h2>
        <div className="space-y-2">
          <Label className="text-[13px]">Workspace name</Label>
          <Input defaultValue="Rivera Design Co" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card-elevated p-6 space-y-5"
      >
        <h2 className="font-semibold text-base flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/[0.08] flex items-center justify-center">
            <Palette className="h-4 w-4 text-primary" />
          </div>
          Client portal branding
        </h2>
        <div className="space-y-2">
          <Label className="text-[13px]">Logo</Label>
          <div className="h-20 w-20 rounded-xl border-2 border-dashed flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:bg-muted/30 hover:border-primary/30 transition-all duration-200">
            Upload
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-[13px]">Accent color</Label>
          <div className="flex items-center gap-3">
            <input type="color" defaultValue="#0d9488" className="h-10 w-10 rounded-lg border cursor-pointer" />
            <Input defaultValue="#0d9488" className="max-w-[140px] font-mono text-sm" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-[13px]">Welcome message</Label>
          <Textarea defaultValue="Welcome! Review the deliverables below and leave your feedback. When everything looks good, hit Approve." className="resize-none text-[13px]" />
        </div>
        <Button>Save branding</Button>
      </motion.div>

      {/* Next Step Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-elevated p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-base flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/[0.08] flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              Default next step actions
            </h2>
            <p className="text-[13px] text-muted-foreground mt-1.5 ml-10">
              These actions appear in all client portals after approval. Override per-project in project settings.
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-1 text-xs flex-shrink-0" onClick={() => setShowAddAction(!showAddAction)}>
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>

        {showAddAction && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border rounded-xl p-4 space-y-3 bg-muted/20"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[12px]">Label</Label>
                <Input placeholder="e.g. Pay now" className="text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px]">Destination URL</Label>
                <Input placeholder="https://..." className="text-[13px]" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[12px]">Provider type</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[13px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {Object.entries(providerTypeLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[12px]">Show when</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[13px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="on_approval">After approval</option>
                  <option value="always">Always</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowAddAction(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setShowAddAction(false)}>Add action</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-2">
          {workspaceActions.map(action => {
            const Icon = providerIcons[action.providerType];
            return (
              <div key={action.id} className="flex items-center gap-3 rounded-xl border p-3.5">
                <div className="h-9 w-9 rounded-lg bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium">{action.label}</p>
                  <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                    <ExternalLink className="h-2.5 w-2.5" />
                    {action.url}
                  </p>
                </div>
                <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{providerTypeLabels[action.providerType]}</span>
                <button className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
          {workspaceActions.length === 0 && (
            <div className="text-center py-8">
              <Zap className="h-6 w-6 mx-auto mb-2 text-muted-foreground/20" />
              <p className="text-[13px] text-muted-foreground">No default actions configured</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
