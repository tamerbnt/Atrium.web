import React, { useRef, useState, useEffect } from 'react';
import { useInView, useReducedMotion, animate, useMotionValue } from 'framer-motion';

export interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  decimals = 0,
}) => {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduce) {
      setDisplay(target);
      return;
    }

    const controls = animate(motionValue, target, {
      duration: 0.8,
      ease: 'easeOut',
    });

    const unsubscribe = motionValue.on('change', (v: number) => {
      setDisplay(v);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, target, shouldReduce, motionValue]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return <span ref={ref}>{formatted}{suffix}</span>;
};

export default AnimatedCounter;
