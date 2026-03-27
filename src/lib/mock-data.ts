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
  reminderSentAt?: string;
  reminderCount?: number;
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
  versions?: { version: number; submittedAt: string; note?: string }[];
}

export interface Comment {
  id: string;
  deliverableId: string;
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
}

export const mockProjects: Project[] = [
  { id: '1', name: 'Q1 Brand Refresh', clientName: 'Acme Corp', clientEmail: 'sarah@acme.co', status: 'in_review', deadline: '2026-04-10', description: 'Complete brand identity refresh including logo, color palette, and brand guidelines.', createdAt: '2026-03-15', deliverableCount: 4, approvedCount: 2, lastViewedByClient: '2026-03-25T09:15:00', lastClientActivity: '2026-03-25T14:30:00' },
  { id: '2', name: 'Website Redesign', clientName: 'TechStart Inc', clientEmail: 'mike@techstart.io', status: 'changes_requested', deadline: '2026-03-24', description: 'Full website redesign with new landing page, about page, and product pages.', createdAt: '2026-03-10', deliverableCount: 6, approvedCount: 1, lastViewedByClient: '2026-03-20T14:00:00', lastClientActivity: '2026-03-20T14:00:00', isOverdue: true },
  { id: '3', name: 'Social Media Campaign', clientName: 'Bloom Studio', clientEmail: 'anna@bloom.co', status: 'approved', deadline: '2026-03-30', description: 'Spring campaign assets for Instagram, LinkedIn, and Twitter.', createdAt: '2026-03-01', deliverableCount: 8, approvedCount: 8, lastViewedByClient: '2026-03-19T16:00:00', lastClientActivity: '2026-03-19T16:00:00' },
  { id: '4', name: 'Product Launch Kit', clientName: 'Nova Labs', clientEmail: 'team@novalabs.dev', status: 'draft', deadline: '2026-05-15', description: 'Launch materials including press kit, product shots, and landing page.', createdAt: '2026-03-22', deliverableCount: 3, approvedCount: 0 },
  { id: '5', name: 'Annual Report Design', clientName: 'GreenPath Foundation', clientEmail: 'info@greenpath.org', status: 'in_review', deadline: '2026-03-28', description: '2025 annual report with data visualizations and impact stories.', createdAt: '2026-03-18', deliverableCount: 5, approvedCount: 3, lastViewedByClient: '2026-03-22T11:00:00', lastClientActivity: '2026-03-22T11:00:00', isOverdue: true },
];

export const mockDeliverables: Deliverable[] = [
  { id: 'd1', projectId: '1', title: 'Primary Logo', fileName: 'logo-primary-v3.svg', fileType: 'svg', version: 3, status: 'approved', submittedAt: '2026-03-20', versions: [{ version: 1, submittedAt: '2026-03-16', note: 'Initial concept' }, { version: 2, submittedAt: '2026-03-18', note: 'Refined proportions' }, { version: 3, submittedAt: '2026-03-20', note: 'Final with tweaks' }] },
  { id: 'd2', projectId: '1', title: 'Color Palette', fileName: 'color-palette-v2.pdf', fileType: 'pdf', version: 2, status: 'approved', submittedAt: '2026-03-21', versions: [{ version: 1, submittedAt: '2026-03-17' }, { version: 2, submittedAt: '2026-03-21', note: 'Added secondary palette' }] },
  { id: 'd3', projectId: '1', title: 'Typography Guide', fileName: 'typography-guide-v1.pdf', fileType: 'pdf', version: 1, status: 'in_review', submittedAt: '2026-03-23', versions: [{ version: 1, submittedAt: '2026-03-23' }] },
  { id: 'd4', projectId: '1', title: 'Brand Guidelines Doc', fileName: 'brand-guidelines-v1.pdf', fileType: 'pdf', version: 1, status: 'in_review', submittedAt: '2026-03-24', versions: [{ version: 1, submittedAt: '2026-03-24' }] },
  { id: 'd5', projectId: '2', title: 'Homepage Mockup', fileName: 'homepage-v2.fig', fileType: 'fig', version: 2, status: 'changes_requested', submittedAt: '2026-03-18', versions: [{ version: 1, submittedAt: '2026-03-14' }, { version: 2, submittedAt: '2026-03-18', note: 'Updated hero section' }] },
  { id: 'd6', projectId: '2', title: 'About Page', fileName: 'about-v1.fig', fileType: 'fig', version: 1, status: 'in_review', submittedAt: '2026-03-19', versions: [{ version: 1, submittedAt: '2026-03-19' }] },
];

export const mockComments: Comment[] = [
  { id: 'c1', deliverableId: 'd3', authorName: 'Sarah Chen', authorType: 'client', body: 'Love the direction! Can we try a slightly heavier weight for the body text? It feels a bit thin on mobile.', createdAt: '2026-03-24T10:30:00', resolved: false },
  { id: 'c2', deliverableId: 'd3', authorName: 'Alex Rivera', authorType: 'agency', body: 'Great catch — I\'ll update to 400 weight for body and send a new version by tomorrow.', createdAt: '2026-03-24T11:15:00', resolved: false },
  { id: 'c3', deliverableId: 'd5', authorName: 'Mike Johnson', authorType: 'client', body: 'The hero section needs more contrast. Also, can we swap the stock photo for something more authentic?', createdAt: '2026-03-20T14:00:00', resolved: false },
  { id: 'c4', deliverableId: 'd5', authorName: 'Alex Rivera', authorType: 'agency', body: 'Absolutely. I\'ll source some custom photography and increase the contrast ratio. Will have V3 ready by Friday.', createdAt: '2026-03-20T15:30:00', resolved: false },
  { id: 'c5', deliverableId: 'd4', authorName: 'Sarah Chen', authorType: 'client', body: 'This looks comprehensive! Just one question — should we include social media templates in this doc?', createdAt: '2026-03-25T09:00:00', resolved: false },
  { id: 'c6', deliverableId: 'd1', authorName: 'Sarah Chen', authorType: 'client', body: 'Perfect — love the final version. Approved!', createdAt: '2026-03-20T16:00:00', resolved: true },
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
  { id: 'n1', title: 'New approval', body: 'Sarah Chen approved the Color Palette for Q1 Brand Refresh', read: false, createdAt: '2026-03-25T14:30:00', type: 'approval' },
  { id: 'n2', title: 'New comment', body: 'Sarah Chen commented on Typography Guide', read: false, createdAt: '2026-03-24T10:30:00', type: 'comment' },
  { id: 'n3', title: 'Changes requested', body: 'Mike Johnson requested changes on Homepage Mockup', read: true, createdAt: '2026-03-20T14:00:00', type: 'comment' },
  { id: 'n4', title: 'Deadline approaching', body: 'Annual Report Design deadline is in 2 days', read: false, createdAt: '2026-03-26T09:00:00', type: 'reminder' },
  { id: 'n5', title: 'Review overdue', body: 'Website Redesign is past its deadline with pending changes', read: false, createdAt: '2026-03-26T08:00:00', type: 'reminder' },
];

export type NextStepProviderType = 'contract_link' | 'invoice_link' | 'payment_link' | 'booking_link' | 'file_delivery_link' | 'onboarding_link' | 'custom_url';

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
  { id: 'ns1', label: 'Open contract link', url: 'https://docusign.com/sign/abc123', providerType: 'contract_link', displayCondition: 'on_approval', scope: 'workspace' },
  { id: 'ns2', label: 'Pay now', url: 'https://invoice.stripe.com/i/acct_123', providerType: 'payment_link', displayCondition: 'on_approval', scope: 'workspace' },
  { id: 'ns3', label: 'Book next call', url: 'https://calendly.com/rivera-design/30min', providerType: 'booking_link', displayCondition: 'on_approval', scope: 'workspace' },
  { id: 'ns4', label: 'Download final files', url: 'https://drive.google.com/drive/folders/abc', providerType: 'file_delivery_link', displayCondition: 'on_approval', scope: 'project', projectId: '1' },
];

export const providerTypeLabels: Record<NextStepProviderType, string> = {
  contract_link: 'Contract',
  invoice_link: 'Invoice',
  payment_link: 'Payment',
  booking_link: 'Booking',
  file_delivery_link: 'File delivery',
  onboarding_link: 'Onboarding',
  custom_url: 'Custom link',
};

export interface FounderBetaMetadata {
  isFounderBeta: boolean;
  betaExpiresAt: string;
  lifetimeProjectsCreated: number;
  lifetimeApprovalEvents: number;
  readOnlyAfterExpiry: boolean;
}

export const mockFounderBeta: FounderBetaMetadata = {
  isFounderBeta: true,
  betaExpiresAt: '2026-04-26', // 30 days from now (simulated)
  lifetimeProjectsCreated: 5, // Already over 3 for demo purposes
  lifetimeApprovalEvents: 8,
  readOnlyAfterExpiry: true,
};

export const statusConfig: Record<string, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  in_review: { label: 'In Review', className: 'bg-info/10 text-info' },
  changes_requested: { label: 'Changes Requested', className: 'bg-warning/10 text-warning' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success' },
};
