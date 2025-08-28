import React from 'react';

interface FieldNoteProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  error?: string;
  placeholder?: string;
}

export function FieldNote({ value, onChange, onEnter, error, placeholder }: FieldNoteProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      onEnter();
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus
        rows={4}
        className="w-full bg-transparent border-0 border-b-2 border-black/20 focus:border-black outline-none text-xl md:text-2xl font-light text-black pb-2 placeholder:text-black/30 transition-colors duration-200 resize-none"
        aria-label="Additional notes"
        aria-invalid={!!error}
        aria-describedby={error ? 'note-error' : 'note-hint'}
      />
      <p id="note-hint" className="mt-4 text-black/40 text-sm">
        Press ⌘+Enter to continue
      </p>
      {error && (
        <p id="note-error" className="mt-4 text-red-500 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}