import { useState, useRef } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { VerticalPanel } from './VerticalPanel';
import styles from './Verticals.module.css';

type TabType = 'gym' | 'salon' | 'restaurant';

const tabs: { key: TabType; label: string }[] = [
  { key: 'gym', label: 'Gym' },
  { key: 'salon', label: 'Salon' },
  { key: 'restaurant', label: 'Restaurant' },
];

export const Verticals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('gym');
  const shouldReduce = useReducedMotion();
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useScrollReveal(eyebrowRef, { y: 12, opacity: 0, duration: 0.4 });
  useScrollReveal(headlineRef, { y: 12, opacity: 0, duration: 0.4, delay: 0.05 });

  return (
    <section className={styles.verticals}>
      <div className={styles.inner}>
        <p
          ref={eyebrowRef}
          className={styles.eyebrow}
          style={shouldReduce ? {} : { opacity: 0 }}
        >
          Three businesses. One platform.
        </p>

        <h2
          ref={headlineRef}
          className={styles.headline}
          style={shouldReduce ? {} : { opacity: 0 }}
        >
          Built specifically for each one.
        </h2>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <VerticalPanel tab={activeTab} />
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Verticals;
