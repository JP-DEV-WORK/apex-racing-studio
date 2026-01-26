import { useCounterAnimation } from '@/hooks/use-counter-animation';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  isInView: boolean;
  className?: string;
}

const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  delay = 0,
  isInView,
  className = '',
}: AnimatedCounterProps) => {
  const { displayValue } = useCounterAnimation(isInView, {
    end,
    duration,
    delay,
    suffix,
    prefix,
  });

  return <span className={className}>{displayValue}</span>;
};

export default AnimatedCounter;
