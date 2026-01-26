import { useState, useEffect, useRef } from 'react';

interface CounterOptions {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

export const useCounterAnimation = (
  isInView: boolean,
  options: CounterOptions
) => {
  const { end, duration = 2000, delay = 0, suffix = '', prefix = '' } = options;
  const [count, setCount] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const hasAnimated = useRef(false);

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
      // Ease-out cubic: accelerates fast, decelerates at the end
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = Math.floor(easeOut * end);
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        setShowSuffix(true);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration, delay]);

  return {
    displayValue: `${prefix}${count}${showSuffix ? suffix : ''}`,
    isComplete: showSuffix
  };
};
