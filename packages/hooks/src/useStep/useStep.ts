import { useState, useCallback } from 'react';

export interface UseStepReturn {
  currentStep: number;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  canGoToPrevStep: boolean;
  canGoToNextStep: boolean;
}

/**
 * Hook for managing multi-step wizard state
 * @param maxStep - Maximum number of steps
 * @returns Object with current step and navigation functions
 */
export function useStep(maxStep: number): UseStepReturn {
  const [currentStep, setCurrentStep] = useState(0);

  const canGoToPrevStep = currentStep > 0;
  const canGoToNextStep = currentStep < maxStep - 1;

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, maxStep - 1));
  }, [maxStep]);

  const goToPrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < maxStep) {
        setCurrentStep(step);
      }
    },
    [maxStep]
  );

  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  return {
    currentStep,
    goToNextStep,
    goToPrevStep,
    goToStep,
    reset,
    canGoToPrevStep,
    canGoToNextStep,
  };
}
