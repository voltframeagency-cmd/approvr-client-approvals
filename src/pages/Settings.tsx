import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => (
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
  </div>
);

export default Settings;
