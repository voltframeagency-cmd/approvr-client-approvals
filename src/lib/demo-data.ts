import type { Project, Deliverable, Comment, ActivityItem, Notification, ClientViewEvent, WorkspaceMember } from '@/lib/mock-data';

// ── Scaler Demo: "Torres Creative" — Jamie Torres ──────────────
const scalerProjects: Project[] = [
  { id: 's1', name: 'Spring Campaign Assets', clientName: 'Bloom Boutique', clientEmail: 'hello@bloomboutique.co', status: 'in_review', deadline: '2026-04-12', description: 'Social media and email graphics for Spring 2026 campaign.', createdAt: '2026-03-18', deliverableCount: 3, approvedCount: 1, lastViewedByClient: '2026-03-27T10:15:00', lastClientActivity: '2026-03-27T14:30:00' },
  { id: 's2', name: 'Logo & Brand Kit', clientName: 'Oakwood Coffee', clientEmail: 'dan@oakwoodcoffee.com', status: 'changes_requested', deadline: '2026-03-26', description: 'Brand identity package for new coffee shop launch.', createdAt: '2026-03-10', deliverableCount: 4, approvedCount: 1, lastViewedByClient: '2026-03-24T08:00:00', lastClientActivity: '2026-03-24T08:00:00', isOverdue: true },
  { id: 's3', name: 'Event Flyer Design', clientName: 'Spark Events', clientEmail: 'lisa@sparkevents.io', status: 'approved', deadline: '2026-03-25', description: 'Promotional flyers for upcoming charity gala.', createdAt: '2026-03-05', deliverableCount: 2, approvedCount: 2, lastViewedByClient: '2026-03-23T16:00:00', lastClientActivity: '2026-03-23T16:00:00' },
  { id: 's4', name: 'Product Packaging', clientName: 'NaturGlow', clientEmail: 'team@naturglow.com', status: 'draft', deadline: '2026-05-01', description: 'Eco-friendly packaging design for skincare line.', createdAt: '2026-03-25', deliverableCount: 2, approvedCount: 0 },
];

const scalerDeliverables: Deliverable[] = [
  { id: 'sd1', projectId: 's1', title: 'Instagram Post Set', fileName: 'ig-posts-v2.png', fileType: 'png', version: 2, status: 'approved', submittedAt: '2026-03-22T14:30:00', versions: [
    { version: 1, submittedAt: '2026-03-20T09:00:00', submittedBy: 'Jamie Torres', note: 'Initial set of 6 posts.', changeSummary: 'First draft upload.', openCount: 1, reviewRound: 1 },
    { version: 2, submittedAt: '2026-03-22T14:30:00', submittedBy: 'Jamie Torres', note: 'Adjusted brand colors per feedback.', changeSummary: 'Color corrections and font swap.', resolvedCount: 1, openCount: 0, reviewRound: 2 },
  ]},
  { id: 'sd2', projectId: 's1', title: 'Email Header Banner', fileName: 'email-banner-v1.png', fileType: 'png', version: 1, status: 'in_review', submittedAt: '2026-03-25T10:00:00', versions: [
    { version: 1, submittedAt: '2026-03-25T10:00:00', submittedBy: 'Jamie Torres', changeSummary: 'Initial email header design.', openCount: 0, reviewRound: 1 },
  ]},
  { id: 'sd3', projectId: 's2', title: 'Primary Logo', fileName: 'logo-oakwood-v2.svg', fileType: 'svg', version: 2, status: 'changes_requested', submittedAt: '2026-03-20T11:00:00', versions: [
    { version: 1, submittedAt: '2026-03-14T09:00:00', submittedBy: 'Jamie Torres', changeSummary: 'First concept.', openCount: 2, reviewRound: 1 },
    { version: 2, submittedAt: '2026-03-20T11:00:00', submittedBy: 'Jamie Torres', note: 'Simplified icon, warmer palette.', changeSummary: 'Reduced complexity, shifted to earthy tones.', resolvedCount: 1, openCount: 1, reviewRound: 2 },
  ]},
];

const scalerComments: Comment[] = [
  { id: 'sc1', deliverableId: 'sd1', versionNumber: 1, authorName: 'Mia Chen', authorType: 'client', body: 'Love these! Can we adjust the accent color to match our updated brand guide?', createdAt: '2026-03-21T10:30:00', resolved: true },
  { id: 'sc2', deliverableId: 'sd3', versionNumber: 2, authorName: 'Dan Oakley', authorType: 'client', body: 'Getting closer — the icon feels right but the wordmark needs more weight.', createdAt: '2026-03-22T09:00:00', resolved: false },
];

const scalerActivity: ActivityItem[] = [
  { id: 'sa1', projectId: 's1', projectName: 'Spring Campaign Assets', action: 'approved Instagram Post Set', actor: 'Mia Chen', createdAt: '2026-03-27T14:30:00', type: 'approval' },
  { id: 'sa2', projectId: 's2', projectName: 'Logo & Brand Kit', action: 'requested changes on Primary Logo', actor: 'Dan Oakley', createdAt: '2026-03-24T08:00:00', type: 'status_change' },
  { id: 'sa3', projectId: 's1', projectName: 'Spring Campaign Assets', action: 'viewed the project portal', actor: 'Mia Chen', createdAt: '2026-03-27T10:15:00', type: 'view' },
  { id: 'sa4', projectId: 's3', projectName: 'Event Flyer Design', action: 'approved all deliverables', actor: 'Lisa Park', createdAt: '2026-03-23T16:00:00', type: 'approval' },
  { id: 'sa5', projectId: 's4', projectName: 'Product Packaging', action: 'created the project', actor: 'Jamie Torres', createdAt: '2026-03-25T11:00:00', type: 'upload' },
];

const scalerNotifications: Notification[] = [
  { id: 'sn1', title: 'Deliverable Approved', body: 'Mia Chen approved Instagram Post Set v2.', read: false, createdAt: new Date().toISOString(), type: 'approval', urgency: 'high', projectId: 's1', projectName: 'Spring Campaign Assets', deliverableId: 'sd1', deliverableName: 'Instagram Post Set', version: 2 },
  { id: 'sn2', title: 'Changes Requested', body: 'Dan Oakley wants adjustments to the wordmark.', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), type: 'comment', urgency: 'medium', projectId: 's2', projectName: 'Logo & Brand Kit', deliverableId: 'sd3', deliverableName: 'Primary Logo', version: 2 },
  { id: 'sn3', title: 'Review Overdue', body: 'Logo & Brand Kit deadline has passed.', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), type: 'reminder', urgency: 'critical', projectId: 's2', projectName: 'Logo & Brand Kit' },
];

const scalerClientViewEvents: ClientViewEvent[] = [
  { id: 'scv1', projectId: 's1', projectName: 'Spring Campaign Assets', deliverableId: 'sd1', deliverableTitle: 'Instagram Post Set', clientName: 'Mia Chen', viewedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(), durationSeconds: 180, device: 'desktop' },
  { id: 'scv2', projectId: 's2', projectName: 'Logo & Brand Kit', deliverableId: 'sd3', deliverableTitle: 'Primary Logo', clientName: 'Dan Oakley', viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), durationSeconds: 95, device: 'mobile' },
];

const scalerMembers: WorkspaceMember[] = [
  { id: 'sm1', name: 'Jamie Torres', email: 'jamie@torrescreative.com', role: 'owner' },
  { id: 'sm2', name: 'Sam Lee', email: 'sam@torrescreative.com', role: 'member' },
];

// ── Studio Demo: "Rivera Design Studio" — Alex Rivera ──────────
const studioProjects: Project[] = [
  { id: 'st1', name: 'Q1 Brand Refresh', clientName: 'Acme Corp', clientEmail: 'sarah@acme.co', status: 'in_review', deadline: '2026-04-10', description: 'Complete brand identity refresh including logo, color palette, and brand guidelines.', createdAt: '2026-03-15', deliverableCount: 4, approvedCount: 2, lastViewedByClient: '2026-03-25T09:15:00', lastClientActivity: '2026-03-25T14:30:00' },
  { id: 'st2', name: 'Website Redesign', clientName: 'TechStart Inc', clientEmail: 'mike@techstart.io', status: 'changes_requested', deadline: '2026-03-24', description: 'Full website redesign with new landing page, about page, and product pages.', createdAt: '2026-03-10', deliverableCount: 6, approvedCount: 1, lastViewedByClient: '2026-03-20T14:00:00', lastClientActivity: '2026-03-20T14:00:00', isOverdue: true },
  { id: 'st3', name: 'Social Media Campaign', clientName: 'Bloom Studio', clientEmail: 'anna@bloom.co', status: 'approved', deadline: '2026-03-30', description: 'Spring campaign assets for Instagram, LinkedIn, and Twitter.', createdAt: '2026-03-01', deliverableCount: 8, approvedCount: 8, lastViewedByClient: '2026-03-19T16:00:00', lastClientActivity: '2026-03-19T16:00:00' },
  { id: 'st4', name: 'Product Launch Kit', clientName: 'Nova Labs', clientEmail: 'team@novalabs.dev', status: 'draft', deadline: '2026-05-15', description: 'Launch materials including press kit, product shots, and landing page.', createdAt: '2026-03-22', deliverableCount: 3, approvedCount: 0 },
  { id: 'st5', name: 'Annual Report Design', clientName: 'GreenPath Foundation', clientEmail: 'info@greenpath.org', status: 'in_review', deadline: '2026-03-28', description: '2025 annual report with data visualizations and impact stories.', createdAt: '2026-03-18', deliverableCount: 5, approvedCount: 3, lastViewedByClient: '2026-03-22T11:00:00', lastClientActivity: '2026-03-22T11:00:00', isOverdue: true },
  { id: 'st6', name: 'App UI Kit', clientName: 'FinFlow', clientEmail: 'design@finflow.com', status: 'in_review', deadline: '2026-04-20', description: 'Mobile app UI components and design system for fintech platform.', createdAt: '2026-03-20', deliverableCount: 12, approvedCount: 7, lastViewedByClient: '2026-03-26T15:00:00', lastClientActivity: '2026-03-26T15:00:00' },
  { id: 'st7', name: 'Brand Guidelines', clientName: 'Horizon Real Estate', clientEmail: 'brand@horizonre.com', status: 'approved', deadline: '2026-03-22', description: 'Comprehensive brand book with usage rules and templates.', createdAt: '2026-02-28', deliverableCount: 3, approvedCount: 3 },
];

const studioDeliverables: Deliverable[] = [
  { id: 'std1', projectId: 'st1', title: 'Primary Logo', fileName: 'logo-primary-v3.svg', fileType: 'svg', version: 3, status: 'approved', submittedAt: '2026-03-20T14:30:00', versions: [
    { version: 1, submittedAt: '2026-03-16T09:00:00', submittedBy: 'Alex Rivera', note: 'Initial concept.', changeSummary: 'First draft upload.', openCount: 2, reviewRound: 1 },
    { version: 2, submittedAt: '2026-03-18T11:20:00', submittedBy: 'Alex Rivera', note: 'Refined proportions.', changeSummary: 'Simplified paths, adjusted kerning.', resolvedCount: 2, openCount: 1, reviewRound: 2 },
    { version: 3, submittedAt: '2026-03-20T14:30:00', submittedBy: 'Alex Rivera', note: 'Final export.', changeSummary: 'Finalized color application and SVG optimization.', resolvedCount: 1, openCount: 0, reviewRound: 3 },
  ]},
  { id: 'std2', projectId: 'st1', title: 'Color Palette', fileName: 'color-palette-v2.pdf', fileType: 'pdf', version: 2, status: 'approved', submittedAt: '2026-03-21T10:00:00', versions: [
    { version: 1, submittedAt: '2026-03-17T15:00:00', submittedBy: 'Alex Rivera', changeSummary: 'Initial palette.', openCount: 1, reviewRound: 1 },
    { version: 2, submittedAt: '2026-03-21T10:00:00', submittedBy: 'Alex Rivera', note: 'Added secondary palette.', changeSummary: 'Expanded and added accessibility-tested tones.', resolvedCount: 1, openCount: 0, reviewRound: 2 },
  ]},
  { id: 'std3', projectId: 'st1', title: 'Typography Guide', fileName: 'typography-guide-v2.pdf', fileType: 'pdf', version: 2, status: 'in_review', submittedAt: '2026-03-25', versions: [
    { version: 1, submittedAt: '2026-03-23', submittedBy: 'Alex Rivera', changeSummary: 'First draft.', openCount: 2, reviewRound: 1 },
    { version: 2, submittedAt: '2026-03-25', submittedBy: 'Alex Rivera', changeSummary: 'Adjusted weights for mobile readability.', resolvedCount: 1, openCount: 1, reviewRound: 2 },
  ]},
  { id: 'std4', projectId: 'st2', title: 'Homepage Mockup', fileName: 'homepage-v2.fig', fileType: 'fig', version: 2, status: 'changes_requested', submittedAt: '2026-03-18', versions: [
    { version: 1, submittedAt: '2026-03-14', submittedBy: 'Alex Rivera', changeSummary: 'Initial layout.', openCount: 3, reviewRound: 1 },
    { version: 2, submittedAt: '2026-03-18', submittedBy: 'Alex Rivera', note: 'Updated hero section.', changeSummary: 'Revised hero spacing and CTA contrast.', resolvedCount: 1, openCount: 2, reviewRound: 2 },
  ]},
];

const studioComments: Comment[] = [
  { id: 'stc1', deliverableId: 'std3', versionNumber: 1, authorName: 'Sarah Chen', authorType: 'client', body: 'Love the direction! Can we try a slightly heavier weight for the body text?', createdAt: '2026-03-24T10:30:00', resolved: true },
  { id: 'stc2', deliverableId: 'std3', versionNumber: 2, authorName: 'Alex Rivera', authorType: 'agency', body: 'Great catch — updated to 400 weight for body.', createdAt: '2026-03-25T11:15:00', resolved: false },
  { id: 'stc3', deliverableId: 'std1', versionNumber: 3, authorName: 'Sarah Chen', authorType: 'client', body: 'Perfect — approved!', createdAt: '2026-03-20T16:00:00', resolved: true },
];

const studioActivity: ActivityItem[] = [
  { id: 'sta1', projectId: 'st1', projectName: 'Q1 Brand Refresh', action: 'approved the Color Palette', actor: 'Sarah Chen', createdAt: '2026-03-25T14:30:00', type: 'approval' },
  { id: 'sta2', projectId: 'st1', projectName: 'Q1 Brand Refresh', action: 'commented on Typography Guide', actor: 'Sarah Chen', createdAt: '2026-03-24T10:30:00', type: 'comment' },
  { id: 'sta3', projectId: 'st6', projectName: 'App UI Kit', action: 'approved 3 components', actor: 'FinFlow Design Lead', createdAt: '2026-03-26T15:00:00', type: 'approval' },
  { id: 'sta4', projectId: 'st2', projectName: 'Website Redesign', action: 'requested changes on Homepage', actor: 'Mike Johnson', createdAt: '2026-03-20T14:00:00', type: 'status_change' },
  { id: 'sta5', projectId: 'st3', projectName: 'Social Media Campaign', action: 'approved all deliverables', actor: 'Anna Bloom', createdAt: '2026-03-19T16:00:00', type: 'approval' },
  { id: 'sta6', projectId: 'st4', projectName: 'Product Launch Kit', action: 'uploaded 3 new deliverables', actor: 'Alex Rivera', createdAt: '2026-03-22T11:00:00', type: 'upload' },
  { id: 'sta7', projectId: 'st5', projectName: 'Annual Report Design', action: 'invited client for review', actor: 'Jordan Smith', createdAt: '2026-03-18T09:00:00', type: 'invite' },
];

const studioNotifications: Notification[] = [
  { id: 'stn1', title: 'Deliverable Approved', body: 'Sarah Chen approved the final logo version.', read: false, createdAt: new Date().toISOString(), type: 'approval', urgency: 'high', projectId: 'st1', projectName: 'Q1 Brand Refresh', deliverableId: 'std1', deliverableName: 'Primary Logo', version: 3 },
  { id: 'stn2', title: 'New Client Comment', body: '"Can we try a slightly heavier weight?"', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), type: 'comment', urgency: 'medium', projectId: 'st1', projectName: 'Q1 Brand Refresh', deliverableId: 'std3', deliverableName: 'Typography Guide', version: 1 },
  { id: 'stn3', title: 'Review Overdue', body: 'Annual Report has not been reviewed.', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), type: 'reminder', urgency: 'critical', projectId: 'st5', projectName: 'Annual Report Design' },
  { id: 'stn4', title: 'Revisions Requested', body: 'Mike Johnson requested changes on Homepage.', read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), type: 'comment', urgency: 'medium', projectId: 'st2', projectName: 'Website Redesign', deliverableId: 'std4', deliverableName: 'Homepage Mockup', version: 2 },
  { id: 'stn5', title: 'App UI Kit Progress', body: 'FinFlow approved 3 more components.', read: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), type: 'approval', urgency: 'medium', projectId: 'st6', projectName: 'App UI Kit' },
];

const studioClientViewEvents: ClientViewEvent[] = [
  { id: 'stcv1', projectId: 'st1', projectName: 'Q1 Brand Refresh', deliverableId: 'std1', deliverableTitle: 'Primary Logo', clientName: 'Sarah Chen', viewedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), durationSeconds: 240, device: 'desktop' },
  { id: 'stcv2', projectId: 'st1', projectName: 'Q1 Brand Refresh', deliverableId: 'std3', deliverableTitle: 'Typography Guide', clientName: 'Sarah Chen', viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), durationSeconds: 180, device: 'desktop' },
  { id: 'stcv3', projectId: 'st2', projectName: 'Website Redesign', deliverableId: 'std4', deliverableTitle: 'Homepage Mockup', clientName: 'Mike Johnson', viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), durationSeconds: 95, device: 'mobile' },
  { id: 'stcv4', projectId: 'st6', projectName: 'App UI Kit', deliverableId: 'std1', deliverableTitle: 'Navigation Bar', clientName: 'FinFlow Design Lead', viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), durationSeconds: 310, device: 'desktop' },
];

const studioMembers: WorkspaceMember[] = [
  { id: 'stm1', name: 'Alex Rivera', email: 'alex@riveradesign.co', role: 'owner' },
  { id: 'stm2', name: 'Jordan Smith', email: 'jordan@riveradesign.co', role: 'admin' },
  { id: 'stm3', name: 'Taylor Wong', email: 'taylor@riveradesign.co', role: 'member' },
  { id: 'stm4', name: 'Casey Lin', email: 'casey@riveradesign.co', role: 'member' },
  { id: 'stm5', name: 'Morgan Park', email: 'morgan@riveradesign.co', role: 'member' },
];

// ── Usage stats per plan ────────────────────────────────────────
export interface DemoUsageStats {
  projectsUsed: number;
  storageUsedGB: number;
  teamMembersUsed: number;
  approvalEvents: number;
}

const scalerUsage: DemoUsageStats = {
  projectsUsed: 4,
  storageUsedGB: 8.2,
  teamMembersUsed: 2,
  approvalEvents: 12,
};

const studioUsage: DemoUsageStats = {
  projectsUsed: 7,
  storageUsedGB: 34.7,
  teamMembersUsed: 5,
  approvalEvents: 47,
};

// ── Export by plan ──────────────────────────────────────────────
export interface DemoDataSet {
  projects: Project[];
  deliverables: Deliverable[];
  comments: Comment[];
  activity: ActivityItem[];
  notifications: Notification[];
  clientViewEvents: ClientViewEvent[];
  members: WorkspaceMember[];
  usage: DemoUsageStats;
}

export const demoDataSets: Record<'scaler' | 'studio', DemoDataSet> = {
  scaler: {
    projects: scalerProjects,
    deliverables: scalerDeliverables,
    comments: scalerComments,
    activity: scalerActivity,
    notifications: scalerNotifications,
    clientViewEvents: scalerClientViewEvents,
    members: scalerMembers,
    usage: scalerUsage,
  },
  studio: {
    projects: studioProjects,
    deliverables: studioDeliverables,
    comments: studioComments,
    activity: studioActivity,
    notifications: studioNotifications,
    clientViewEvents: studioClientViewEvents,
    members: studioMembers,
    usage: studioUsage,
  },
};
