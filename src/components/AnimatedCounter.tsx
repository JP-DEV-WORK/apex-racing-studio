import { useCounterAnimation } from '@/hooks/use-counter-animation';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  isInView: boolean;
  className?: string;
  onComplete?: () => void;
}

const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  duration = 3000,
  delay = 0,
  isInView,
  className = '',
  onComplete,
}: AnimatedCounterProps) => {
  const { displayValue } = useCounterAnimation(isInView, {
    end,
    duration,
    delay,
    suffix,
    prefix,
    onComplete,
  });

  return <span className={className}>{displayValue}</span>;
};

export default AnimatedCounter;
