export interface PlanLimits {
  maxProjects: number | null; // null = unlimited
  maxTeamMembers: number;
  maxStorageGB: number;
  extraMemberCost: number | null; // $/mo per extra member, null = not available
}

export interface PlanFeatures {
  clientPortal: boolean;
  customBranding: boolean;
  approvalReceipts: boolean;
  clientActivityTracking: boolean;
  emailNotifications: boolean;
  versionHistory: boolean;
  whiteLabelPortal: boolean;
  onboardingChecklists: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
}

export interface PlanConfig {
  id: 'scaler' | 'studio';
  name: string;
  price: number;
  limits: PlanLimits;
  features: PlanFeatures;
}

export const planConfigs: Record<'scaler' | 'studio', PlanConfig> = {
  scaler: {
    id: 'scaler',
    name: 'The Scaler',
    price: 39,
    limits: {
      maxProjects: 10,
      maxTeamMembers: 3,
      maxStorageGB: 25,
      extraMemberCost: null,
    },
    features: {
      clientPortal: true,
      customBranding: true,
      approvalReceipts: true,
      clientActivityTracking: true,
      emailNotifications: true,
      versionHistory: false,
      whiteLabelPortal: false,
      onboardingChecklists: false,
      apiAccess: false,
      prioritySupport: false,
    },
  },
  studio: {
    id: 'studio',
    name: 'The Studio',
    price: 79,
    limits: {
      maxProjects: null,
      maxTeamMembers: 10,
      maxStorageGB: 100,
      extraMemberCost: 12,
    },
    features: {
      clientPortal: true,
      customBranding: true,
      approvalReceipts: true,
      clientActivityTracking: true,
      emailNotifications: true,
      versionHistory: true,
      whiteLabelPortal: true,
      onboardingChecklists: true,
      apiAccess: true,
      prioritySupport: true,
    },
  },
};

export const featureLabels: Record<keyof PlanFeatures, string> = {
  clientPortal: 'Client Approval Portal',
  customBranding: 'Custom Branding',
  approvalReceipts: 'Approval Receipts',
  clientActivityTracking: 'Client Activity Tracking',
  emailNotifications: 'Email Notifications',
  versionHistory: 'Version History & Change Logs',
  whiteLabelPortal: 'White-Label Portal',
  onboardingChecklists: 'Client Onboarding Checklists',
  apiAccess: 'Full API Access',
  prioritySupport: 'Priority Support',
};

export const studioOnlyFeatures: (keyof PlanFeatures)[] = [
  'versionHistory',
  'whiteLabelPortal',
  'onboardingChecklists',
  'apiAccess',
  'prioritySupport',
];
