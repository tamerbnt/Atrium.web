import React, { useState } from 'react';
import styles from './ScreenshotFrame.module.css';

export interface ScreenshotFrameProps {
  src: string;
  alt: string;
  title?: string;
  loading?: 'eager' | 'lazy';
  className?: string;
  showTitlebar?: boolean;
}

export const ScreenshotFrame: React.FC<ScreenshotFrameProps> = ({
  src,
  alt,
  title = 'Atrium \u2014 Atlas Training Center',
  loading = 'lazy',
  className = '',
  showTitlebar = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`${styles.frame} ${className}`}>
      {showTitlebar && (
        <div className={styles.titlebar}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ backgroundColor: '#5A3520' }} />
            <span className={styles.dot} style={{ backgroundColor: '#3A2E28' }} />
            <span className={styles.dot} style={{ backgroundColor: '#3A2E28' }} />
          </div>
          <span className={styles.title}>{title}</span>
        </div>
      )}
      <div className={styles.imageContainer}>
        {!loaded && !error && <div className={styles.skeleton} />}
        {error ? (
          <div className={styles.fallback}>
            <svg width="32" height="32" viewBox="0 0 72 72" fill="none" style={{ opacity: 0.2 }}>
              <rect x="0" y="0" width="19" height="19" fill="var(--color-mark-dark)" />
              <rect x="53" y="0" width="19" height="19" fill="var(--color-mark-dark)" />
              <rect x="0" y="53" width="19" height="19" fill="var(--color-mark-dark)" />
              <rect x="53" y="53" width="19" height="19" fill="var(--color-mark-dark)" />
              <rect x="23" y="23" width="26" height="26" stroke="var(--color-mark-dark)" strokeWidth="3" />
            </svg>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading={loading}
            className={styles.image}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        )}
      </div>
    </div>
  );
};

export default ScreenshotFrame;
