'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useStepper } from './hooks/useStepper';
import { StepPrompt } from './StepPrompt';
import { ProgressDots } from './ProgressDots';
import {
  FieldName,
  FieldEmail,
  FieldPhone,
  FieldNote,
  FieldConsent
} from './fields';
import { toE164 } from './utils/formatPhone';
import { submitLead } from './utils/api';
import { FormData, SubmissionPayload } from './types';

interface AscendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AscendModal({ isOpen, onClose }: AscendModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  
  const {
    currentStep,
    currentStepConfig,
    formData,
    errors,
    isLastStep,
    isFirstStep,
    totalSteps,
    updateField,
    goNext,
    goBack,
    validateCurrent,
    reset
  } = useStepper();

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      setSubmissionError(null);
    }
  }, [isOpen, reset]);

  const handleNext = useCallback(async () => {
    if (isLastStep) {
      // Submit form
      if (honeypot) return; // Anti-spam check
      
      if (!validateCurrent()) return;
      
      setIsSubmitting(true);
      setSubmissionError(null);
      
      try {
        // Format phone number
        const formattedPhone = formData.phone_raw ? (toE164(formData.phone_raw) || '') : '';
        
        // Prepare submission payload
        const payload: SubmissionPayload = {
          name: formData.name || '',
          email: formData.email || '',
          phone: formattedPhone,
          phone_raw: formData.phone_raw || '',
          note: formData.note || '',
          consent_communications: formData.consent_communications || false,
          timestamp: new Date().toISOString(),
          source: 'website_form',
          // Add UTM parameters if available
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined
        };
        
        const result = await submitLead(payload);
        
        if (!result.success) {
          setSubmissionError(result.error || 'Something went wrong. Please try again.');
          setIsSubmitting(false);
        }
        // If successful, submitLead handles the redirect
      } catch (error) {
        console.error('Submission error:', error);
        setSubmissionError('Something went wrong. Please try again.');
        setIsSubmitting(false);
      }
    } else {
      goNext();
    }
  }, [isLastStep, honeypot, validateCurrent, formData, goNext]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && !isFirstStep) {
      goBack();
    }
  }, [isOpen, onClose, isFirstStep, goBack]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const renderField = () => {
    if (!currentStepConfig) return null;
    
    const fieldProps = {
      value: formData[currentStepConfig.key] as any,
      onChange: (value: any) => updateField(currentStepConfig.key, value),
      onEnter: handleNext,
      error: errors[currentStepConfig.key],
      placeholder: currentStepConfig.placeholder
    };

    switch (currentStepConfig.key) {
      case 'name':
        return <FieldName {...fieldProps} />;
      case 'email':
        return <FieldEmail {...fieldProps} />;
      case 'phone_raw':
        return <FieldPhone {...fieldProps} hint={currentStepConfig.hint} />;
      case 'note':
        return <FieldNote {...fieldProps} />;
      case 'consent_communications':
        return <FieldConsent 
          value={formData.consent_communications || false}
          onChange={(value) => updateField('consent_communications', value)}
          error={errors.consent_communications}
        />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="min-h-screen flex flex-col justify-center px-6 py-12">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-black/40 hover:text-black transition-colors"
          aria-label="Close form"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="max-w-4xl mx-auto w-full">
          {/* Progress */}
          <div className="mb-16">
            <ProgressDots current={currentStep} total={totalSteps} />
          </div>

          {/* Question prompt */}
          {currentStepConfig && (
            <StepPrompt 
              prompt={currentStepConfig.prompt} 
              stepNumber={currentStep + 1}
            />
          )}

          {/* Field */}
          {renderField()}

          {/* Error message */}
          {submissionError && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{submissionError}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-16 flex justify-between items-center max-w-2xl mx-auto">
            {!isFirstStep ? (
              <button
                onClick={goBack}
                className="text-black/40 hover:text-black transition-colors flex items-center space-x-2"
                disabled={isSubmitting}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                isSubmitting 
                  ? 'bg-black/20 text-black/40 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit' : 'Continue'}
            </button>
          </div>

          {/* Optional field indicator */}
          {currentStepConfig?.optional && (
            <p className="text-center mt-4 text-black/40 text-sm">
              Press Enter to skip
            </p>
          )}
        </div>
      </div>

      {/* Honeypot field (hidden) */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}