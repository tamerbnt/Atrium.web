import React from 'react';
import { AtriumMark } from '../../ui/AtriumMark';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          {/* Col 1 — Brand */}
          <div className={styles.brandCol}>
            <div className={styles.brandLockup}>
              <AtriumMark size={20} context="dark" />
              <span className={styles.brandWordmark}>ATRIUM</span>
            </div>
            <div className={styles.stoaLockup}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                style={{ display: 'block' }}
              >
                <rect x="0" y="22" width="8" height="10" fill="#1C3D37" />
                <rect x="12" y="12" width="8" height="20" fill="#1C3D37" />
                <rect x="24" y="22" width="8" height="10" fill="#1C3D37" />
                <rect x="0" y="0" width="32" height="5" fill="#1C3D37" />
              </svg>
              <span className={styles.stoaText}>
                Stoa <span className={styles.stoaStudio}>STUDIO</span>
              </span>
            </div>
            <p className={styles.tagline}>
              <em>We build tools that think clearly.</em>
            </p>
          </div>

          {/* Col 2 — Links */}
          <div className={styles.linksCol}>
            <a
              href="#features"
              className={styles.footerLink}
              onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
            >
              Features
            </a>
            <a
              href="#pricing"
              className={styles.footerLink}
              onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}
            >
              Pricing
            </a>
            <a href="#" className={styles.footerLink} onClick={(e) => e.preventDefault()}>
              Release notes
            </a>
            <a href="#" className={styles.footerLink} onClick={(e) => e.preventDefault()}>
              Privacy policy
            </a>
          </div>

          {/* Col 3 — Download */}
          <div className={styles.downloadCol}>
            <span className={styles.downloadLabel}>Download Atrium</span>
            <div className={styles.downloadLinks}>
              <a
                href="/downloads/atrium-latest.dmg"
                className={styles.downloadLink}
                onClick={(e) => e.preventDefault()}
              >
                Download for macOS
              </a>
              <a
                href="/downloads/atrium-latest.exe"
                className={styles.downloadLink}
                onClick={(e) => e.preventDefault()}
              >
                Download for Windows
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>&copy; 2025 Stoa Studio. Atrium is a product of Stoa Studio.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
