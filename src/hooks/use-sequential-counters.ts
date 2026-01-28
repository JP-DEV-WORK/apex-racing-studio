import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSequentialCountersOptions {
  totalCounters: number;
  isInView: boolean;
  delayBetween?: number; // delay between counters finishing and next starting
}

export const useSequentialCounters = ({
  totalCounters,
  isInView,
  delayBetween = 250,
}: UseSequentialCountersOptions) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const hasStarted = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start the sequence when section comes into view
  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      setActiveIndex(0);
    }
  }, [isInView]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCounterComplete = useCallback((index: number) => {
    // Only advance if this is the currently active counter
    if (index === activeIndex && index < totalCounters - 1) {
      timeoutRef.current = setTimeout(() => {
        setActiveIndex(index + 1);
      }, delayBetween);
    }
  }, [activeIndex, totalCounters, delayBetween]);

  const isCounterActive = useCallback((index: number) => {
    return activeIndex >= index;
  }, [activeIndex]);

  const shouldCounterStart = useCallback((index: number) => {
    return activeIndex === index;
  }, [activeIndex]);

  return {
    activeIndex,
    isCounterActive,
    shouldCounterStart,
    handleCounterComplete,
  };
};
