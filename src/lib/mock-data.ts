export type ProjectStatus = 'draft' | 'in_review' | 'changes_requested' | 'approved';
export type DeliverableStatus = 'draft' | 'in_review' | 'changes_requested' | 'approved';

export interface Project {
  id: string;
  name: string;
  clientName: string;
  clientEmail: string;
  status: ProjectStatus;
  deadline: string;
  description: string;
  createdAt: string;
  deliverableCount: number;
  approvedCount: number;
  lastViewedByClient?: string;
  lastClientActivity?: string;
  isOverdue?: boolean;
}

export interface DeliverableVersion {
  version: number;
  submittedAt: string;
  submittedBy: string;
  note?: string;
  changeSummary?: string; // "What Changed" narrative
  resolvedCount?: number;
  openCount?: number;
  reviewRound?: number;
}

export interface Deliverable {
  id: string;
  projectId: string;
  title: string;
  fileName: string;
  fileType: string;
  version: number;
  status: DeliverableStatus;
  submittedAt: string;
  fileUrl?: string;
  versions?: DeliverableVersion[];
}

export interface Comment {
  id: string;
  deliverableId: string;
  versionNumber: number; // Version-aware comments
  authorName: string;
  authorType: 'agency' | 'client';
  body: string;
  createdAt: string;
  resolved?: boolean;
}

export interface ActivityItem {
  id: string;
  projectId?: string;
  projectName: string;
  action: string;
  actor: string;
  createdAt: string;
  type: 'approval' | 'comment' | 'upload' | 'status_change' | 'invite' | 'view';
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  type: 'approval' | 'comment' | 'upload' | 'reminder';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  projectId?: string;
  projectName?: string;
  deliverableId?: string;
  deliverableName?: string;
  version?: number;
  archived?: boolean;
}

export const mockProjects: Project[] = [
  { id: '1', name: 'Q1 Brand Refresh', clientName: 'Acme Corp', clientEmail: 'sarah@acme.co', status: 'in_review', deadline: '2026-04-10', description: 'Complete brand identity refresh including logo, color palette, and brand guidelines.', createdAt: '2026-03-15', deliverableCount: 4, approvedCount: 2, lastViewedByClient: '2026-03-25T09:15:00', lastClientActivity: '2026-03-25T14:30:00' },
  { id: '2', name: 'Website Redesign', clientName: 'TechStart Inc', clientEmail: 'mike@techstart.io', status: 'changes_requested', deadline: '2026-03-24', description: 'Full website redesign with new landing page, about page, and product pages.', createdAt: '2026-03-10', deliverableCount: 6, approvedCount: 1, lastViewedByClient: '2026-03-20T14:00:00', lastClientActivity: '2026-03-20T14:00:00', isOverdue: true },
  { id: '3', name: 'Social Media Campaign', clientName: 'Bloom Studio', clientEmail: 'anna@bloom.co', status: 'approved', deadline: '2026-03-30', description: 'Spring campaign assets for Instagram, LinkedIn, and Twitter.', createdAt: '2026-03-01', deliverableCount: 8, approvedCount: 8, lastViewedByClient: '2026-03-19T16:00:00', lastClientActivity: '2026-03-19T16:00:00' },
  { id: '4', name: 'Product Launch Kit', clientName: 'Nova Labs', clientEmail: 'team@novalabs.dev', status: 'draft', deadline: '2026-05-15', description: 'Launch materials including press kit, product shots, and landing page.', createdAt: '2026-03-22', deliverableCount: 3, approvedCount: 0 },
  { id: '5', name: 'Annual Report Design', clientName: 'GreenPath Foundation', clientEmail: 'info@greenpath.org', status: 'in_review', deadline: '2026-03-28', description: '2025 annual report with data visualizations and impact stories.', createdAt: '2026-03-18', deliverableCount: 5, approvedCount: 3, lastViewedByClient: '2026-03-22T11:00:00', lastClientActivity: '2026-03-22T11:00:00', isOverdue: true },
];

export const mockDeliverables: Deliverable[] = [
  { 
    id: 'd1', 
    projectId: '1', 
    title: 'Primary Logo', 
    fileName: 'logo-primary-v3.svg', 
    fileType: 'svg', 
    version: 3, 
    status: 'approved', 
    submittedAt: '2026-03-20T14:30:00', 
    versions: [
      { 
        version: 1, 
        submittedAt: '2026-03-16T09:00:00', 
        submittedBy: 'Alex Rivera',
        note: 'Initial concept based on moodboard.',
        changeSummary: 'First draft upload.',
        openCount: 2,
        reviewRound: 1
      }, 
      { 
        version: 2, 
        submittedAt: '2026-03-18T11:20:00', 
        submittedBy: 'Alex Rivera',
        note: 'Refined proportions and simplified geometry.',
        changeSummary: 'Simplified paths, adjusted kerning on typography.',
        resolvedCount: 2,
        openCount: 1,
        reviewRound: 2
      }, 
      { 
        version: 3, 
        submittedAt: '2026-03-20T14:30:00', 
        submittedBy: 'Alex Rivera',
        note: 'Final color application and export.',
        changeSummary: 'Finalized color palette application and SVG optimization.',
        resolvedCount: 1,
        openCount: 0,
        reviewRound: 3
      }
    ] 
  },
  { 
    id: 'd2', 
    projectId: '1', 
    title: 'Color Palette', 
    fileName: 'color-palette-v2.pdf', 
    fileType: 'pdf', 
    version: 2, 
    status: 'approved', 
    submittedAt: '2026-03-21T10:00:00', 
    versions: [
      { 
        version: 1, 
        submittedAt: '2026-03-17T15:00:00',
        submittedBy: 'Alex Rivera',
        note: 'Exploration of warm vs cool tones.',
        changeSummary: 'Initial palette upload.',
        openCount: 1,
        reviewRound: 1
      }, 
      { 
        version: 2, 
        submittedAt: '2026-03-21T10:00:00',
        submittedBy: 'Alex Rivera',
        note: 'Added secondary palette for digital use.',
        changeSummary: 'Expanded primary colors and added accessibility-tested secondary tones.',
        resolvedCount: 1,
        openCount: 0,
        reviewRound: 2
      }
    ] 
  },
  { id: 'd3', projectId: '1', title: 'Typography Guide', fileName: 'typography-guide-v2.pdf', fileType: 'pdf', version: 2, status: 'in_review', submittedAt: '2026-03-25', versions: [{ version: 1, submittedAt: '2026-03-23', submittedBy: 'Alex Rivera', changeSummary: 'First draft.', openCount: 2, reviewRound: 1 }, { version: 2, submittedAt: '2026-03-25', submittedBy: 'Alex Rivera', changeSummary: 'Adjusted weights based on mobile readability feedback.', resolvedCount: 1, openCount: 1, reviewRound: 2 }] },
  { id: 'd4', projectId: '1', title: 'Brand Guidelines Doc', fileName: 'brand-guidelines-v1.pdf', fileType: 'pdf', version: 1, status: 'in_review', submittedAt: '2026-03-24', versions: [{ version: 1, submittedAt: '2026-03-24', submittedBy: 'Alex Rivera', changeSummary: 'Initial guidelines assembly.', openCount: 0, reviewRound: 1 }] },
  { id: 'd5', projectId: '2', title: 'Homepage Mockup', fileName: 'homepage-v2.fig', fileType: 'fig', version: 2, status: 'changes_requested', submittedAt: '2026-03-18', versions: [{ version: 1, submittedAt: '2026-03-14', submittedBy: 'Alex Rivera', changeSummary: 'Initial layout.', openCount: 3, reviewRound: 1 }, { version: 2, submittedAt: '2026-03-18', submittedBy: 'Alex Rivera', note: 'Updated hero section with more white space.', changeSummary: 'Revised hero spacing and increased contrast for call-to-actions.', resolvedCount: 1, openCount: 2, reviewRound: 2 }] },
  { id: 'd6', projectId: '2', title: 'About Page', fileName: 'about-v1.fig', fileType: 'fig', version: 1, status: 'in_review', submittedAt: '2026-03-19', versions: [{ version: 1, submittedAt: '2026-03-19', submittedBy: 'Alex Rivera', changeSummary: 'Initial design.', openCount: 0, reviewRound: 1 }] },
];

export const mockComments: Comment[] = [
  { id: 'c1', deliverableId: 'd3', versionNumber: 1, authorName: 'Sarah Chen', authorType: 'client', body: 'Love the direction! Can we try a slightly heavier weight for the body text? It feels a bit thin on mobile.', createdAt: '2026-03-24T10:30:00', resolved: true },
  { id: 'c2', deliverableId: 'd3', versionNumber: 2, authorName: 'Alex Rivera', authorType: 'agency', body: 'Great catch — I\'ve updated to 400 weight for body in this latest version.', createdAt: '2026-03-25T11:15:00', resolved: false },
  { id: 'c6', deliverableId: 'd1', versionNumber: 3, authorName: 'Sarah Chen', authorType: 'client', body: 'Perfect — love the final version. Approved!', createdAt: '2026-03-20T16:00:00', resolved: true },
  { id: 'c7', deliverableId: 'd3', versionNumber: 1, authorName: 'Sarah Chen', authorType: 'client', body: 'Also, is this font license included or do we buy it separately?', createdAt: '2026-03-24T12:00:00', resolved: false },
];

export const mockActivity: ActivityItem[] = [
  { id: 'a1', projectId: '1', projectName: 'Q1 Brand Refresh', action: 'approved the Color Palette', actor: 'Sarah Chen', createdAt: '2026-03-25T14:30:00', type: 'approval' },
  { id: 'a2', projectId: '1', projectName: 'Q1 Brand Refresh', action: 'commented on Typography Guide', actor: 'Sarah Chen', createdAt: '2026-03-24T10:30:00', type: 'comment' },
  { id: 'a7', projectId: '1', projectName: 'Q1 Brand Refresh', action: 'viewed the project portal', actor: 'Sarah Chen', createdAt: '2026-03-25T09:15:00', type: 'view' },
  { id: 'a3', projectId: '2', projectName: 'Website Redesign', action: 'requested changes on Homepage Mockup', actor: 'Mike Johnson', createdAt: '2026-03-20T14:00:00', type: 'status_change' },
  { id: 'a4', projectId: '3', projectName: 'Social Media Campaign', action: 'approved all deliverables', actor: 'Anna Bloom', createdAt: '2026-03-19T16:00:00', type: 'approval' },
  { id: 'a5', projectId: '4', projectName: 'Product Launch Kit', action: 'uploaded 3 new deliverables', actor: 'Alex Rivera', createdAt: '2026-03-22T11:00:00', type: 'upload' },
  { id: 'a6', projectId: '5', projectName: 'Annual Report Design', action: 'invited client for review', actor: 'Alex Rivera', createdAt: '2026-03-18T09:00:00', type: 'invite' },
];

export const mockNotifications: Notification[] = [
  { 
    id: 'n1', 
    title: 'Deliverable Approved', 
    body: 'Sarah Chen approved the final version.', 
    read: false, 
    createdAt: new Date().toISOString(), 
    type: 'approval',
    urgency: 'high',
    projectId: '1',
    projectName: 'Q1 Brand Refresh',
    deliverableId: 'd1',
    deliverableName: 'Primary Logo',
    version: 3
  },
  { 
    id: 'n2', 
    title: 'New Client Comment', 
    body: '"Can we try a slightly heavier weight?"', 
    read: false, 
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    type: 'comment',
    urgency: 'medium',
    projectId: '1',
    projectName: 'Q1 Brand Refresh',
    deliverableId: 'd3',
    deliverableName: 'Typography Guide',
    version: 1
  },
  { 
    id: 'n6', 
    title: 'Review Overdue', 
    body: 'Client has not viewed the latest Annual Report version.', 
    read: false, 
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    type: 'reminder',
    urgency: 'critical',
    projectId: '5',
    projectName: 'Annual Report Design',
    deliverableId: 'd7',
    deliverableName: 'Financial Slides',
    version: 1
  },
  { 
    id: 'n3', 
    title: 'Revisions Requested', 
    body: 'Mike Johnson requested changes on Homepage.', 
    read: true, 
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // Yesterday
    type: 'comment',
    urgency: 'medium',
    projectId: '2',
    projectName: 'Website Redesign',
    deliverableId: 'd5',
    deliverableName: 'Homepage Mockup',
    version: 2
  },
  { 
    id: 'n4', 
    title: 'Deadline Approaching', 
    body: 'Project deadline is in 48 hours.', 
    read: false, 
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // Yesterday
    type: 'reminder',
    urgency: 'high',
    projectId: '5',
    projectName: 'Annual Report Design'
  },
  { 
    id: 'n5', 
    title: 'New Internal Comment', 
    body: 'Jordan Smith mentioned you in a comment.', 
    read: true, 
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    type: 'comment',
    urgency: 'low',
    projectId: '1',
    projectName: 'Q1 Brand Refresh'
  },
];

export type NextStepProviderType = 'contract' | 'invoice' | 'payment' | 'booking' | 'delivery' | 'onboarding' | 'custom';

export interface NextStepAction {
  id: string;
  label: string;
  url: string;
  providerType: NextStepProviderType;
  displayCondition: 'on_approval' | 'always';
  scope: 'workspace' | 'project';
  projectId?: string;
}

export const mockNextStepActions: NextStepAction[] = [
  { id: 'ns1', label: 'Open contract link', url: 'https://docusign.com/sign/abc123', providerType: 'contract', displayCondition: 'on_approval', scope: 'workspace' },
  { id: 'ns2', label: 'Pay now', url: 'https://invoice.stripe.com/i/acct_123', providerType: 'payment', displayCondition: 'on_approval', scope: 'workspace' },
  { id: 'ns3', label: 'Book next call', url: 'https://calendly.com/rivera-design/30min', providerType: 'booking', displayCondition: 'on_approval', scope: 'workspace' },
  { id: 'ns4', label: 'Download final files', url: 'https://drive.google.com/drive/folders/abc', providerType: 'delivery', displayCondition: 'on_approval', scope: 'project', projectId: '1' },
];

export const providerTypeLabels: Record<NextStepProviderType, string> = {
  contract: 'Contract',
  invoice: 'Invoice',
  payment: 'Payment',
  booking: 'Booking',
  delivery: 'File Delivery',
  onboarding: 'Onboarding',
  custom: 'Custom Link',
};

export interface FounderBetaMetadata {
  isFounderBeta: boolean;
  betaExpiresAt: string;
  lifetimeProjectsCreated: number;
  lifetimeApprovalEvents: number;
  readOnlyAfterExpiry: boolean;
}

export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  avatarUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  agencyName: string;
  supportEmail: string;
  timezone: string;
  defaultLanguage: string;
  brandDescription: string;
  logoUrl?: string;
  accentColor: string;
  portalWelcomeMessage: string;
  portalFooterText: string;
  portalHelpUrl: string;
  portalSuccessMessage: string;
  reviewDefaults: {
    approveLabel: string;
    requestChangesLabel: string;
    autoCollapseResolved: boolean;
    clientCanResolve: boolean;
    showHistoryByDefault: boolean;
  };
  notificationDefaults: {
    reminderCadenceDays: number;
    notifyOnComment: boolean;
    notifyOnApproval: boolean;
    notifyOnChangesRequested: boolean;
  };
  securityDefaults: {
    magicLinkExpirationDays: number;
    requireEmailVerification: boolean;
  };
}

export const mockWorkspace: Workspace = {
  id: 'w1',
  name: 'Rivera Design Co',
  agencyName: 'Rivera Design Studio',
  supportEmail: 'support@riveradesign.co',
  timezone: 'America/New_York',
  defaultLanguage: 'en',
  brandDescription: 'Boutique brand identity and high-end digital design for modern startups.',
  accentColor: '#0d9488',
  portalWelcomeMessage: 'Welcome! Review the deliverables below and leave your feedback. When everything looks good, hit Approve.',
  portalFooterText: '© 2026 Rivera Design Studio. All rights reserved.',
  portalHelpUrl: 'https://support.riveradesign.co',
  portalSuccessMessage: 'Thank you! Your approval has been recorded. We will reach out with the next steps shortly.',
  reviewDefaults: {
    approveLabel: 'Approve Deliverable',
    requestChangesLabel: 'Request Revisions',
    autoCollapseResolved: true,
    clientCanResolve: false,
    showHistoryByDefault: true,
  },
  notificationDefaults: {
    reminderCadenceDays: 3,
    notifyOnComment: true,
    notifyOnApproval: true,
    notifyOnChangesRequested: true,
  },
  securityDefaults: {
    magicLinkExpirationDays: 7,
    requireEmailVerification: false,
  },
};

export const mockMembers: WorkspaceMember[] = [
  { id: 'm1', name: 'Alex Rivera', email: 'alex@riveradesign.co', role: 'owner' },
  { id: 'm2', name: 'Jordan Smith', email: 'jordan@riveradesign.co', role: 'admin' },
  { id: 'm3', name: 'Taylor Wong', email: 'taylor@riveradesign.co', role: 'member' },
];

export const mockFounderBeta: FounderBetaMetadata = {
  isFounderBeta: true,
  betaExpiresAt: '2026-04-26', // 30 days from now (simulated)
  lifetimeProjectsCreated: 5, // Already over 3 for demo purposes
  lifetimeApprovalEvents: 8,
  readOnlyAfterExpiry: true,
};

export const statusConfig: Record<string, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  in_review: { label: 'Pending Review', className: 'bg-info/10 text-info' },
  changes_requested: { label: 'Feedback Received', className: 'bg-warning/10 text-warning' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success' },
};
