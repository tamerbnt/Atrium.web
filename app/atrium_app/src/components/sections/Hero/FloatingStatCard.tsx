import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import styles from './Hero.module.css';

export interface FloatingStatCardProps {
  label: string;
  positionStyle: React.CSSProperties;
  index: number;
}

export const FloatingStatCard: React.FC<FloatingStatCardProps> = ({
  label,
  positionStyle,
  index,
}) => {
  const shouldReduce = useReducedMotion();

  return (
    <m.div
      className={styles.statCard}
      style={positionStyle}
      initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: shouldReduce ? 0 : [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.4, delay: 0.8 + index * 0.15 },
        scale: { duration: 0.4, delay: 0.8 + index * 0.15 },
        y: {
          type: 'tween',
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.2 + index * 0.8,
          repeatDelay: 0,
        },
      }}
    >
      {label}
    </m.div>
  );
};

export default FloatingStatCard;
