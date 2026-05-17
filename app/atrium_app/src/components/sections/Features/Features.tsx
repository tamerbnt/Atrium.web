import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import styles from './Features.module.css';

const FEATURES = [
  {
    id: 'clients',
    tag: 'Clients',
    headline: 'See who\'s staying.\nKnow who\'s leaving.',
    body: 'A real-time client panel shows attendance trends, booking frequency, and churn signals. You see the problem before you lose the client -- not in a monthly report.',
    screenshot: '/assets/screenshots/atrium-clients.png',
    screenshotAlt: 'Atrium client management view showing client list with status indicators and visit trends',
  },
  {
    id: 'analytics',
    tag: 'Analytics',
    headline: 'Your best week,\nevery week.',
    body: 'Revenue, traffic, product performance -- all live, all in one dashboard. Not exported to a spreadsheet. Not sent in a weekly email. Right there when you open the app.',
    screenshot: '/assets/screenshots/atrium-analytics.png',
    screenshotAlt: 'Atrium analytics dashboard showing weekly revenue bar chart and key performance metrics',
  },
  {
    id: 'staff',
    tag: 'Staff',
    headline: 'Who\'s your best\nperformer? Now you know.',
    body: 'Staff attendance, shift tracking, and performance scoring -- managed alongside everything else. No separate HR tool, no manual calculations.',
    screenshot: '/assets/screenshots/atrium-staff.png',
    screenshotAlt: 'Atrium staff performance view showing three staff members with horizontal performance bars',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    if (shouldReduce) {
      // Reduced motion: no pinning, show all three features stacked
      return;
    }

    // Total scroll distance: 3 viewport heights (one per feature)
    const totalDistance = window.innerHeight * 3;

    // Pin the sticky container
    const pin = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalDistance}`,
      pin: sticky,
      pinSpacing: true,
      anticipatePin: 1,
    });

    // Create a trigger for each feature transition
    const triggers = FEATURES.map((_, i) => {
      if (i === 0) return null;

      return ScrollTrigger.create({
        trigger: section,
        start: `top+=${i * window.innerHeight} top`,
        end: `top+=${(i + 1) * window.innerHeight} top`,
        onEnter: () => setActiveIndex(i),
        onLeaveBack: () => setActiveIndex(i - 1),
      });
    }).filter(Boolean);

    // Animate progress bar
    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${totalDistance}`,
            scrub: true,
          },
        }
      );
    }

    return () => {
      pin.kill();
      triggers.forEach((t) => t?.kill());
    };
  }, [shouldReduce]);

  const active = FEATURES[activeIndex];

  // Reduced motion: render all features stacked
  if (shouldReduce) {
    return (
      <section id="features" className={styles.featuresFallback}>
        <div className={styles.fallbackInner}>
          <h2 className={styles.sectionHeadline}>
            Everything in one place. Nothing approximated.
          </h2>
          {FEATURES.map((f) => (
            <div key={f.id} className={styles.fallbackItem}>
              <div className={styles.fallbackText}>
                <span className={styles.tag}>{f.tag}</span>
                <h3 className={styles.featureHeadline}>{f.headline.replace('\n', ' ')}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
              <div className={styles.screenshotFrame}>
                <div className={styles.titlebar} aria-hidden="true">
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
                <img src={f.screenshot} alt={f.screenshotAlt} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="features" className={styles.featuresSection}>
      <div ref={stickyRef} className={styles.stickyContainer}>

        {/* Section headline -- visible at top, fades as features activate */}
        <p className={styles.sectionEyebrow}>
          Everything in one place. Nothing approximated.
        </p>

        {/* Progress bar -- shows scroll position through the three features */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div ref={progressBarRef} className={styles.progressBar} />
        </div>

        {/* Feature dot indicators */}
        <div className={styles.featureDots} role="tablist" aria-label="Features">
          {FEATURES.map((f, i) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={`Feature: ${f.tag}`}
              className={`${styles.dot_indicator} ${activeIndex === i ? styles.dotActive : ''}`}
            />
          ))}
        </div>

        <div className={styles.featureLayout}>

          {/* Left: Text content -- AnimatePresence handles cross-fade */}
          <div className={styles.featureText}>
            <AnimatePresence mode="wait">
              <m.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <span className={styles.tag}>{active.tag}</span>
                <h2 className={styles.featureHeadline}>
                  {active.headline.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < active.headline.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <p className={styles.featureBody}>{active.body}</p>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Right: Screenshot -- AnimatePresence cross-fades between screenshots */}
          <div className={styles.featureScreenshot}>
            <AnimatePresence mode="wait">
              <m.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className={styles.screenshotFrame}
              >
                <div className={styles.titlebar} aria-hidden="true">
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.titlebarText}>
                    Atrium -- Atlas Training Center
                  </span>
                </div>
                <img
                  src={active.screenshot}
                  alt={active.screenshotAlt}
                  loading="lazy"
                  style={{ width: '100%', display: 'block' }}
                />
              </m.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Features;
