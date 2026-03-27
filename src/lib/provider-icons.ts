import { ScrollText, Receipt, CreditCard, Calendar, Download, Rocket, ExternalLink } from 'lucide-react';
import type { NextStepProviderType } from './mock-data';

export const providerIcons: Record<NextStepProviderType, typeof ScrollText> = {
  contract: ScrollText,
  invoice: Receipt,
  payment: CreditCard,
  booking: Calendar,
  delivery: Download,
  onboarding: Rocket,
  custom: ExternalLink,
};
