import { statusConfig } from '@/lib/mock-data';

export const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] || statusConfig.draft;
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
};
