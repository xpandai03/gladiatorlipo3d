import { useState, useCallback } from 'react';
import { FormData, StepConfig } from '../types';
import { validateStep } from '../utils/validators';

export const steps: StepConfig[] = [
  {
    key: 'name',
    prompt: "What's your name?",
    placeholder: 'Jane Doe',
    type: 'text'
  },
  {
    key: 'email',
    prompt: "What's your email?",
    placeholder: 'name@email.com',
    type: 'email'
  },
  {
    key: 'phone_raw',
    prompt: "What's your phone number?",
    hint: 'Enter country code (e.g., +1 ...)',
    placeholder: '+1 (323) 555-0199',
    type: 'tel'
  },
  {
    key: 'note',
    prompt: 'Anything specific you want us to know before your Gladiator Lipo consultation?',
    placeholder: 'Goals, areas of focus, timing, etc. (optional)',
    optional: true,
    type: 'textarea'
  },
  {
    key: 'consent_communications',
    prompt: 'One last thing—can we contact you about your consultation?',
    type: 'checkbox'
  }
];

export function useStepper(initialData: Partial<FormData> = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  
  const currentStepConfig = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  
  const updateField = useCallback((key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
    // Clear error when user types
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }, [errors]);
  
  const validateCurrent = useCallback(() => {
    if (!currentStepConfig) return true;
    
    const value = formData[currentStepConfig.key];
    
    // Skip validation for optional fields that are empty
    if (currentStepConfig.optional && (!value || value === '')) {
      return true;
    }
    
    const validation = validateStep(currentStepConfig.key, value);
    
    if (!validation.valid) {
      setErrors(prev => ({
        ...prev,
        [currentStepConfig.key]: validation.error || 'Invalid input'
      }));
      return false;
    }
    
    return true;
  }, [currentStepConfig, formData]);
  
  const goNext = useCallback(() => {
    if (validateCurrent() && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      return true;
    }
    return false;
  }, [currentStep, validateCurrent]);
  
  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      return true;
    }
    return false;
  }, [currentStep]);
  
  const reset = useCallback(() => {
    setCurrentStep(0);
    setFormData({});
    setErrors({});
    setIsDirty(false);
  }, []);
  
  return {
    currentStep,
    currentStepConfig,
    formData,
    errors,
    isDirty,
    isLastStep,
    isFirstStep,
    totalSteps: steps.length,
    updateField,
    goNext,
    goBack,
    validateCurrent,
    reset
  };
}