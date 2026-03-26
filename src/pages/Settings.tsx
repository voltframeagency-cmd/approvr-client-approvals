import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette } from 'lucide-react';

const Settings = () => (
  <div className="space-y-8 animate-fade-in max-w-2xl">
    <h1 className="text-2xl font-bold">Workspace settings</h1>

    <div className="rounded-xl border bg-card p-6 space-y-5">
      <h2 className="font-semibold text-lg">General</h2>
      <div className="space-y-2">
        <Label>Workspace name</Label>
        <Input defaultValue="Rivera Design Co" />
      </div>
    </div>

    <div className="rounded-xl border bg-card p-6 space-y-5">
      <h2 className="font-semibold text-lg flex items-center gap-2">
        <Palette className="h-5 w-5" /> Client portal branding
      </h2>
      <div className="space-y-2">
        <Label>Logo</Label>
        <div className="h-20 w-20 rounded-xl border border-dashed flex items-center justify-center text-xs text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
          Upload
        </div>
      </div>
      <div className="space-y-2">
        <Label>Accent color</Label>
        <div className="flex items-center gap-3">
          <input type="color" defaultValue="#0d9488" className="h-10 w-10 rounded-lg border cursor-pointer" />
          <Input defaultValue="#0d9488" className="max-w-[140px] font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Welcome message</Label>
        <Textarea defaultValue="Welcome! Review the deliverables below and leave your feedback. When everything looks good, hit Approve." className="resize-none" />
      </div>
      <Button>Save branding</Button>
    </div>
  </div>
);

export default Settings;
