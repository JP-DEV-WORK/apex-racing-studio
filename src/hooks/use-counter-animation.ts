import { useState, useEffect, useRef } from 'react';

interface CounterOptions {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  onComplete?: () => void;
}

export const useCounterAnimation = (
  isInView: boolean,
  options: CounterOptions
) => {
  const { end, duration = 3000, delay = 0, suffix = '', prefix = '', onComplete } = options;
  const [count, setCount] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const hasAnimated = useRef(false);
  const INTERNAL_PRECISION = 30;

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    
    hasAnimated.current = true;
    
    const startTime = performance.now() + delay;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }
      
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress;
      const internalSteps = end * INTERNAL_PRECISION;

      
      const rawValue = eased * internalSteps;
      const currentValue = Math.floor((rawValue / internalSteps) * end);

      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        setShowSuffix(true);
        onComplete?.();
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration, delay, onComplete]);

  return {
    displayValue: `${prefix}${count}${showSuffix ? suffix : ''}`,
    isComplete: showSuffix
  };
};
