import { useState, useEffect, useCallback } from 'react';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const STORAGE_KEY = 'approvr_onboarding';

const defaultSteps: OnboardingStep[] = [
  { id: 'create_project', title: 'Create your first project', description: 'Set up a project with a client name and deadline.', completed: false },
  { id: 'upload_deliverable', title: 'Upload a deliverable', description: 'Add a file for your client to review.', completed: false },
  { id: 'share_link', title: 'Share the client link', description: 'Copy and send the portal link to your client.', completed: false },
  { id: 'first_approval', title: 'Get your first approval', description: 'Your client approves a deliverable!', completed: false },
];

export function useOnboarding() {
  const [steps, setSteps] = useState<OnboardingStep[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultSteps;
  });

  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY}_dismissed`) === 'true';
    } catch {
      return false;
    }
  });

  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return !localStorage.getItem(`${STORAGE_KEY}_welcomed`);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
  }, [steps]);

  const completeStep = useCallback((stepId: string) => {
    setSteps(prev => prev.map(s => s.id === stepId ? { ...s, completed: true } : s));
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    localStorage.setItem(`${STORAGE_KEY}_dismissed`, 'true');
  }, []);

  const dismissWelcome = useCallback(() => {
    setShowWelcome(false);
    localStorage.setItem(`${STORAGE_KEY}_welcomed`, 'true');
  }, []);

  const completedCount = steps.filter(s => s.completed).length;
  const isComplete = completedCount === steps.length;
  const progress = (completedCount / steps.length) * 100;

  return {
    steps,
    completeStep,
    dismissed,
    dismiss,
    showWelcome,
    dismissWelcome,
    completedCount,
    isComplete,
    progress,
    isVisible: !dismissed && !isComplete,
  };
}
