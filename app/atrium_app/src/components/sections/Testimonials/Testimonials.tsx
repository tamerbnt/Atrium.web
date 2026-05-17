import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: 'For the first time I can see on Monday morning exactly what happened last week \u2014 which trainer performed, which session filled, which product didn\'t move. I used to need an accountant to tell me that.',
    name: 'Yacine Benali',
    business: 'Atlas Training Center',
    initials: 'YB',
  },
  {
    quote: 'Before Atrium I had four different apps open every morning. Now I open one. My commission calculations used to take an hour every Sunday. Now they\'re just there.',
    name: 'Samia Meziane',
    business: 'Maison Meziane Salon',
    initials: 'SM',
  },
  {
    quote: 'I can tell in thirty seconds if tonight is going to be a good night. Not at the end of the shift. When I arrive. That changes how I manage my team completely.',
    name: 'Karim Ould-Abbas',
    business: 'Dar Ould-Abbas Restaurant',
    initials: 'KO',
  },
];

export const Testimonials: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useScrollReveal(headlineRef, { y: 12, opacity: 0, duration: 0.4 });
  useScrollReveal(gridRef, { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 });

  return (
    <section className={styles.testimonials}>
      <div className={styles.inner}>
        <h2
          ref={headlineRef}
          className={styles.headline}
          style={shouldReduce ? {} : { opacity: 0 }}
        >
          From business owners, not sales decks.
        </h2>

        <div
          ref={gridRef}
          className={styles.grid}
          style={shouldReduce ? {} : { opacity: 0 }}
        >
          {testimonials.map((t) => (
            <div key={t.name} className={styles.card}>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <span>{t.initials}</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.business}>{t.business}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
