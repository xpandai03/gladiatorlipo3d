import React from 'react';
import { useTypewriter } from './hooks/useTypewriter';

interface StepPromptProps {
  prompt: string;
  stepNumber: number;
}

export function StepPrompt({ prompt, stepNumber }: StepPromptProps) {
  const { displayText, showCursor } = useTypewriter(prompt, 30, 300);
  
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-5xl font-light text-black leading-tight">
        <span className="text-black/40 text-2xl md:text-3xl mr-3">{stepNumber}.</span>
        {displayText}
        {showCursor && <span className="animate-pulse">|</span>}
      </h2>
    </div>
  );
}