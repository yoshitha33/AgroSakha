import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "",
  onComplete = () => {} 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay + (currentIndex === 0 ? 0 : speed));

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [currentIndex, text, speed, delay, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <span className="animate-pulse text-yellow-300">|</span>
      )}
    </span>
  );
};

export default TypewriterEffect;
