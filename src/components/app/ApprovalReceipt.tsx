import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle2, FileText, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Project, type Deliverable } from '@/lib/mock-data';

interface ApprovalReceiptProps {
  project: Project;
  deliverables: Deliverable[];
  trigger?: React.ReactNode;
}

export const ApprovalReceipt = ({ project, deliverables, trigger }: ApprovalReceiptProps) => {
  const [open, setOpen] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  
  const approvedDeliverables = deliverables.filter(d => d.status === 'approved');
  const hasApprovals = approvedDeliverables.length > 0;

  const handleDownload = () => {
    if (!receiptRef.current) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Approval Receipt - ${project.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 48px; color: #1a1a2e; line-height: 1.6; }
          .header { border-bottom: 2px solid #0d9488; padding-bottom: 24px; margin-bottom: 32px; }
          .logo { font-size: 24px; font-weight: 800; letter-spacing: -0.03em; }
          .logo span { color: #0d9488; }
          .subtitle { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #666; margin-top: 4px; font-weight: 700; }
          .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; padding: 20px; background: #f8fafb; border-radius: 8px; }
          .meta-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; font-weight: 700; }
          .meta-value { font-size: 14px; font-weight: 600; margin-top: 2px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
          .table th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #666; font-weight: 700; padding: 12px 16px; border-bottom: 1px solid #e5e7eb; }
          .table td { padding: 14px 16px; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
          .status { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
          .status-approved { background: #ecfdf5; color: #059669; }
          .status-pending { background: #fef3c7; color: #d97706; }
          .footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #999; }
          .timestamp { font-size: 11px; color: #666; font-weight: 600; }
          @media print { body { padding: 24px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Approv<span>r</span></div>
          <div class="subtitle">Approval Receipt · Official Record</div>
        </div>
        <div class="meta">
          <div><div class="meta-label">Project</div><div class="meta-value">${project.name}</div></div>
          <div><div class="meta-label">Client</div><div class="meta-value">${project.clientName}</div></div>
          <div><div class="meta-label">Generated</div><div class="meta-value">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div></div>
          <div><div class="meta-label">Deadline</div><div class="meta-value">${new Date(project.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div></div>
        </div>
        <table class="table">
          <thead><tr><th>Deliverable</th><th>Version</th><th>Status</th><th>Submitted</th></tr></thead>
          <tbody>
            ${deliverables.map(d => `
              <tr>
                <td><strong>${d.title}</strong><br/><span style="color:#999;font-size:11px">${d.fileName}</span></td>
                <td>v${d.version}</td>
                <td><span class="status ${d.status === 'approved' ? 'status-approved' : 'status-pending'}">${d.status === 'approved' ? 'Approved' : d.status.replace('_', ' ')}</span></td>
                <td class="timestamp">${new Date(d.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin-bottom:32px;text-align:center;">
          <strong style="color:#059669">${approvedDeliverables.length} of ${deliverables.length} deliverables approved</strong>
        </div>
        <div class="footer">
          <p>This document is a timestamped record of approval activity. It is not a legal contract or e-signature.</p>
          <p style="margin-top:8px">Generated by Approvr · ${new Date().toISOString()}</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="h-8 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-lg" disabled={!hasApprovals}>
            <Download className="h-3 w-3 mr-1.5" /> Download Summary
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Approval Receipt
          </DialogTitle>
        </DialogHeader>
        <div ref={receiptRef} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Project</p>
              <p className="text-[13px] font-bold text-foreground mt-0.5">{project.name}</p>
            </div>
            <div className="p-3 rounded-xl bg-muted/50">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Client</p>
              <p className="text-[13px] font-bold text-foreground mt-0.5">{project.clientName}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            {deliverables.map(d => (
              <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card">
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  d.status === 'approved' ? "bg-emerald-500/10" : "bg-muted"
                )}>
                  {d.status === 'approved' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-foreground truncate">{d.title}</p>
                  <p className="text-[10px] text-muted-foreground">v{d.version} · {d.fileName}</p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-wider",
                    d.status === 'approved' ? "bg-emerald-500/10 text-emerald-600 border-none" : "bg-muted text-muted-foreground border-none"
                  )}
                >
                  {d.status === 'approved' ? 'Approved' : d.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-center">
            <p className="text-[13px] font-bold text-emerald-600">
              {approvedDeliverables.length} of {deliverables.length} approved
            </p>
          </div>
          
          <Button onClick={handleDownload} className="w-full gap-2 rounded-xl font-bold">
            <Download className="h-4 w-4" />
            Download as PDF
          </Button>
          
          <p className="text-[10px] text-muted-foreground text-center italic">
            This is a timestamped record, not a legal contract.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
