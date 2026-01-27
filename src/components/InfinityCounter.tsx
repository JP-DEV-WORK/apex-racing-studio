import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface InfinityCounterProps {
  isInView: boolean;
  duration?: number;
  className?: string;
}

const InfinityCounter = ({
  isInView,
  duration = 2000,
  className = '',
}: InfinityCounterProps) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'transforming' | 'complete'>('counting');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    
    hasAnimated.current = true;
    
    const countDuration = duration * 0.7; // 70% for counting
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / countDuration, 1);
      
      // Ease-out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * 8);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(8);
        setPhase('transforming');
        
        // After rotation completes, set to complete
        setTimeout(() => {
          setPhase('complete');
        }, duration * 0.3); // 30% for transformation
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, duration]);

  return (
    <span className={`inline-block ${className}`}>
      {phase === 'complete' ? (
        <span>∞</span>
      ) : (
        <motion.span
          className="inline-block"
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: phase === 'transforming' ? 90 : 0,
            scaleX: phase === 'transforming' ? 1.1 : 1,
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] // Custom ease-out
          }}
          style={{ 
            display: 'inline-block',
            transformOrigin: 'center center',
          }}
        >
          {count}
        </motion.span>
      )}
    </span>
  );
};

export default InfinityCounter;
