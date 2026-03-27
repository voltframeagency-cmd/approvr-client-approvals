import { mockFounderBeta } from '@/lib/mock-data';
import { useMemo } from 'react';

export const useFounderBeta = () => {
  const meta = mockFounderBeta;

  const projectLimit = 3;
  const eventLimit = 10;

  const isProjectLimitReached = meta.lifetimeProjectsCreated >= projectLimit;
  const isEventLimitReached = meta.lifetimeApprovalEvents >= eventLimit;
  
  const daysRemaining = useMemo(() => {
    const now = new Date();
    const expiry = new Date(meta.betaExpiresAt);
    const diff = expiry.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, [meta.betaExpiresAt]);

  const isExpired = daysRemaining <= 0;

  return {
    ...meta,
    projectLimit,
    eventLimit,
    isProjectLimitReached,
    isEventLimitReached,
    daysRemaining,
    isExpired,
    canCreateProject: !isProjectLimitReached && !isExpired,
    canAddEvent: !isEventLimitReached && !isExpired,
  };
};
