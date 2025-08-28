import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50, startDelay: number = 200) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    setShowCursor(true);
    
    let index = 0;
    let timeout: NodeJS.Timeout;
    
    // Start delay before typing
    timeout = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          // Keep cursor blinking after complete
          setTimeout(() => {
            setShowCursor(false);
          }, 1000);
        }
      }, speed);
      
      return () => clearInterval(typeInterval);
    }, startDelay);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay]);
  
  return { displayText, isComplete, showCursor };
}