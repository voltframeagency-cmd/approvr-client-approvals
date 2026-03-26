import { ScrollText, Receipt, CreditCard, Calendar, Download, Rocket, ExternalLink } from 'lucide-react';
import type { NextStepProviderType } from './mock-data';

export const providerIcons: Record<NextStepProviderType, typeof ScrollText> = {
  contract_link: ScrollText,
  invoice_link: Receipt,
  payment_link: CreditCard,
  booking_link: Calendar,
  file_delivery_link: Download,
  onboarding_link: Rocket,
  custom_url: ExternalLink,
};
