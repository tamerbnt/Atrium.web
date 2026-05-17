import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { AtriumMark } from '../../ui/AtriumMark';
import { useOSDetection } from '../../../hooks/useOSDetection';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import styles from './FinalCTA.module.css';

export const FinalCTA: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const os = useOSDetection();
  const ctaRef = useRef<HTMLElement>(null);

  useScrollReveal(ctaRef, { y: 20, opacity: 0, duration: 0.6 });

  const macMeta = 'v1.0.0 \u00B7 52 MB \u00B7 Requires macOS 12 or later';
  const winMeta = 'v1.0.0 \u00B7 48 MB \u00B7 Requires Windows 10 or later';

  return (
    <section
      ref={ctaRef}
      className={styles.finalCta}
      style={shouldReduce ? {} : { opacity: 0 }}
    >
      <div className={styles.inner}>
        <AtriumMark size={48} context="dark" />

        <h2 className={styles.headline}>Run your business with full visibility.</h2>

        <p className={styles.sub}>Download Atrium and try it free for 30 days.</p>

        <div className={styles.buttonGroup}>
          {os === 'macos' && (
            <>
              <a href="/downloads/atrium-latest.dmg" className={styles.btnPrimary} aria-label="Download Atrium for macOS">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1v8m0 0l-3-3m3 3l3-3M1 10.5v1.5a1 1 0 001 1h10a1 1 0 001-1v-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download for macOS
              </a>
              <a href="/downloads/atrium-latest.exe" className={styles.btnSecondary} aria-label="Download Atrium for Windows">
                Download for Windows
              </a>
            </>
          )}

          {os === 'windows' && (
            <>
              <a href="/downloads/atrium-latest.exe" className={styles.btnPrimary} aria-label="Download Atrium for Windows">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1v8m0 0l-3-3m3 3l3-3M1 10.5v1.5a1 1 0 001 1h10a1 1 0 001-1v-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download for Windows
              </a>
              <a href="/downloads/atrium-latest.dmg" className={styles.btnSecondary} aria-label="Download Atrium for macOS">
                Download for macOS
              </a>
            </>
          )}

          {os === 'other' && (
            <>
              <a href="/downloads/atrium-latest.dmg" className={styles.btnUndetected} aria-label="Download Atrium for macOS">
                Download for macOS
              </a>
              <a href="/downloads/atrium-latest.exe" className={styles.btnUndetected} aria-label="Download Atrium for Windows">
                Download for Windows
              </a>
            </>
          )}
        </div>

        {os === 'other' && (
          <p className={styles.otherHelp}>
            Not sure which to download? macOS uses .dmg, Windows uses .exe
          </p>
        )}

        <p className={styles.pricing}>
          Free 30-day trial &middot; Pro from $29 / month &middot; No credit card required
        </p>

        <p className={styles.trust}>
          Clean install. No ads. No tracking. Uninstall any time.
        </p>

        {os === 'macos' && (
          <p className={styles.fileMeta}>{macMeta}</p>
        )}
        {os === 'windows' && (
          <p className={styles.fileMeta}>{winMeta}</p>
        )}
        {os === 'other' && (
          <div className={styles.fileMetaGroup}>
            <p className={styles.fileMeta}>{macMeta}</p>
            <p className={styles.fileMeta}>{winMeta}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalCTA;
