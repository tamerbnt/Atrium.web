import React, { useEffect, useRef } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScreenshotFrame } from '../../ui/ScreenshotFrame';
import styles from './Verticals.module.css';

export interface VerticalPanelProps {
  tab: 'gym' | 'salon' | 'restaurant';
}

const verticalData = {
  gym: {
    headline: 'Every member. Every session. Every dinar.',
    body: 'Track memberships, fill classes, monitor which trainer retains members and which loses them. Know your busiest hour before it happens.',
    screenshot: '/assets/screenshots/atrium-gym.png',
    screenshotAlt: 'Atrium gym dashboard showing class schedule, membership breakdown, trainer leaderboard, and busiest hour chart',
    title: 'Atrium \u2014 Atlas Training Center',
  },
  salon: {
    headline: 'Your calendar, your staff, your margin.',
    body: 'Appointments, stylist commissions, product inventory, and client history \u2014 the full picture of a salon, not just bookings.',
    screenshot: '/assets/screenshots/atrium-salon.png',
    screenshotAlt: 'Atrium salon dashboard showing appointment calendar, stylist commission summary, and product inventory alerts',
    title: 'Atrium \u2014 Maison Meziane Salon',
  },
  restaurant: {
    headline: 'Every table. Every cover. Every shift.',
    body: 'Table occupancy, revenue per cover, reservation management, and kitchen-to-floor staffing \u2014 the numbers that run a profitable restaurant.',
    screenshot: '/assets/screenshots/atrium-restaurant.png',
    screenshotAlt: 'Atrium restaurant dashboard showing floor plan with table statuses, covers per hour chart, and revenue breakdown',
    title: 'Atrium \u2014 Dar Ould-Abbas Restaurant',
  },
};

export const VerticalPanel: React.FC<VerticalPanelProps> = ({ tab }) => {
  const shouldReduce = useReducedMotion();
  const data = verticalData[tab];
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgColRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(el,
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        }
      }
    );
  }, [tab]);

  return (
    <m.div
      ref={sectionRef}
      className={styles.panel}
      initial={shouldReduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={shouldReduce ? {} : { opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <div className={styles.textCol}>
        <h3 className={styles.panelHeadline}>{data.headline}</h3>
        <p className={styles.panelBody}>{data.body}</p>
      </div>
      <div ref={imgColRef} className={styles.imgCol}>
        <ScreenshotFrame
          src={data.screenshot}
          alt={data.screenshotAlt}
          title={data.title}
          loading="lazy"
        />
      </div>
    </m.div>
  );
};

export default VerticalPanel;
