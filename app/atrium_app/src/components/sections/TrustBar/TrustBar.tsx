import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './TrustBar.module.css';

const trustItems = [
  { number: 340, suffix: '+', label: 'Businesses managed' },
  { number: 4.9, suffix: ' / 5', label: 'Average rating', decimals: 1 },
  { number: 6, suffix: '', label: 'Saved per week, avg.' },
  { number: 3, suffix: '', label: 'Gym \u00B7 Salon \u00B7 Restaurant' },
];

export const TrustBar: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const barRef = useRef<HTMLElement>(null);

  useScrollReveal(barRef, { y: 12, opacity: 0, duration: 0.4 });

  return (
    <section
      ref={barRef}
      id="pricing"
      className={styles.trustBar}
      style={shouldReduce ? {} : { opacity: 0 }}
    >
      <div className={styles.inner}>
        {trustItems.map((item) => (
          <div key={item.label} className={styles.item}>
            <span className={styles.number}>
              <AnimatedCounter
                target={item.number}
                suffix={item.suffix}
                decimals={item.decimals || 0}
              />
            </span>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;
