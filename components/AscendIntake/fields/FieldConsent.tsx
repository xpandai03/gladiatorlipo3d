import React from 'react';

interface FieldConsentProps {
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

export function FieldConsent({ value, onChange, error }: FieldConsentProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <label className="flex items-start cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
            aria-invalid={!!error}
            aria-describedby={error ? 'consent-error' : 'consent-label'}
          />
          <div className={`w-6 h-6 rounded border-2 transition-all duration-200 ${
            value 
              ? 'bg-black border-black' 
              : 'border-black/30 group-hover:border-black/50'
          }`}>
            {value && (
              <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span id="consent-label" className="ml-3 text-lg md:text-xl font-light text-black/80 select-none">
          Yes, contact me about my consultation and special offers
        </span>
      </label>
      {error && (
        <p id="consent-error" className="mt-4 text-red-500 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}