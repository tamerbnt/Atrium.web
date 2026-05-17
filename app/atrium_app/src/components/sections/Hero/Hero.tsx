import React, { useState, Suspense, lazy } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { useOSDetection } from '../../../hooks/useOSDetection';
import { SplitHeadline } from '../../ui/SplitHeadline/SplitHeadline';
import { ScreenshotFrame } from '../../ui/ScreenshotFrame';
import { FloatingStatCard } from './FloatingStatCard';
import styles from './Hero.module.css';

interface HeroProps {
  onWatchDemo: () => void;
}

// Lazy load Spline to avoid blocking hero render
const SplineScene = lazy(() => import('@splinetool/react-spline'));

function SplineFallback() {
  return (
    <div className={styles.splineFallback}>
      <svg width="80" height="80" viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <rect x="0" y="0" width="19" height="19" fill="#D4856A" />
        <rect x="53" y="0" width="19" height="19" fill="#D4856A" />
        <rect x="0" y="53" width="19" height="19" fill="#D4856A" />
        <rect x="53" y="53" width="19" height="19" fill="#D4856A" />
        <rect x="23" y="23" width="26" height="26" stroke="#D4856A" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

function HeroSpline() {
  return (
    <div className={styles.splineContainer} aria-hidden="true">
      <Suspense fallback={<SplineFallback />}>
        <SplineScene
          scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
          className={styles.splineCanvas}
        />
      </Suspense>
    </div>
  );
}

export const Hero: React.FC<HeroProps> = ({ onWatchDemo }) => {
  const shouldReduce = useReducedMotion();
  const os = useOSDetection();
  const [isDownloading, setIsDownloading] = useState(false);

  const primaryOS = os === 'windows' ? 'windows' : 'macos';
  const secondaryOS = primaryOS === 'macos' ? 'windows' : 'macos';
  const primaryLabel = primaryOS === 'macos' ? 'Download for macOS' : 'Download for Windows';
  const secondaryLabel = secondaryOS === 'macos' ? 'Also available for macOS' : 'Also available for Windows';
  const primaryHref = primaryOS === 'macos' ? '/downloads/atrium-latest.dmg' : '/downloads/atrium-latest.exe';
  const secondaryHref = secondaryOS === 'macos' ? '/downloads/atrium-latest.dmg' : '/downloads/atrium-latest.exe';
  const primaryAria = `Download Atrium for ${primaryOS === 'macos' ? 'macOS' : 'Windows'}`;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const splineVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const screenshotVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const handleDownload = (e: React.MouseEvent) => {
    if (isDownloading) {
      e.preventDefault();
      return;
    }
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Atmospheric bloom -- behind everything */}
      <div className={styles.atmosphericBloom} aria-hidden="true">
        <div className={styles.bloom1} />
        <div className={styles.bloom2} />
        <div className={styles.bloom3} />
      </div>

      {/* All existing hero content -- unchanged, just needs position: relative and z-index: 1 */}
      <div className={`${styles.content} ${styles.heroContent}`}>
        <m.div
          variants={containerVariants}
          initial={shouldReduce ? false : 'hidden'}
          animate="visible"
        >
          {/* Spline 3D mark -- first in stagger */}
          <m.div variants={splineVariants}>
            <HeroSpline />
          </m.div>

          <m.p className={styles.eyebrow} variants={itemVariants}>
            Operations management for every business type
          </m.p>

          {/* SplitHeadline replaces m.h1 -- handles its own animation */}
          <SplitHeadline
            text="Know exactly where your business stands."
            delay={400}
          />

          <m.p className={styles.subheadline} variants={itemVariants}>
            One platform. Gyms, salons, and restaurants. Real-time data, deep operations, nothing hidden.
          </m.p>

          <m.div className={styles.ctaGroup} variants={itemVariants}>
            <a
              href={primaryHref}
              className={styles.primaryBtn}
              onClick={handleDownload}
              aria-label={primaryAria}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v8m0 0l-3-3m3 3l3-3M1 10.5v1.5a1 1 0 001 1h10a1 1 0 001-1v-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isDownloading ? 'Downloading...' : primaryLabel}
            </a>
            <button className={styles.secondaryBtn} onClick={onWatchDemo}>
              Watch 2-min demo
            </button>
          </m.div>

          <m.p className={styles.meta} variants={itemVariants}>
            <a href={secondaryHref} className={styles.metaLink} onClick={handleDownload}>
              {secondaryLabel}
            </a>
            {' \u00B7 '}
            Free 30-day trial
            {' \u00B7 '}
            No credit card required
          </m.p>

          <m.div className={styles.screenshotWrapper} variants={screenshotVariants}>
            {/* Perspective tilt parent */}
            <div className={styles.perspectiveWrap}>
              <m.div
                className={styles.tiltWrap}
                initial={shouldReduce ? false : { rotateX: 12 }}
                animate={{ rotateX: 4 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ScreenshotFrame
                  src="/assets/screenshots/atrium-hero.png"
                  alt="Atrium dashboard showing revenue charts, client list, and staff performance for Atlas Training Center"
                  loading="eager"
                  title="Atrium \u2014 Atlas Training Center"
                />
              </m.div>
            </div>

            {/* Floating stat cards */}
            <FloatingStatCard
              label="\u2191 12% Revenue"
              positionStyle={{ top: '10%', left: '-5%' }}
              index={0}
            />
            <FloatingStatCard
              label="147 Active clients"
              positionStyle={{ top: '38%', right: '-5%' }}
              index={1}
            />
            <FloatingStatCard
              label="6 hrs saved / week"
              positionStyle={{ bottom: '15%', right: '-4%' }}
              index={2}
            />
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
