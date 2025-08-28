import React from 'react';

interface ProgressDotsProps {
  current: number;
  total: number;
}

export function ProgressDots({ current, total }: ProgressDotsProps) {
  return (
    <div className="flex space-x-2" aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`transition-all duration-300 ${
            index === current 
              ? 'w-8 h-2 bg-black rounded-full'
              : index < current
              ? 'w-2 h-2 bg-black/60 rounded-full'
              : 'w-2 h-2 bg-black/20 rounded-full'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}