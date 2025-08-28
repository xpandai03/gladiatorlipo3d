import React from 'react';

interface FieldNameProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  error?: string;
  placeholder?: string;
}

export function FieldName({ value, onChange, onEnter, error, placeholder }: FieldNameProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onEnter();
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus
        className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black outline-none text-2xl md:text-3xl font-light text-black pb-2 placeholder:text-black/30 transition-colors duration-200"
        aria-label="Your name"
        aria-invalid={!!error}
        aria-describedby={error ? 'name-error' : undefined}
      />
      {error && (
        <p id="name-error" className="mt-4 text-red-500 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}