import React, { useState, useCallback } from 'react';
import styles from './DownloadButton.module.css';

export interface DownloadButtonProps {
  os: 'macos' | 'windows';
  variant: 'primary' | 'secondary' | 'detected' | 'undetected';
  href: string;
  onClick?: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  os,
  variant,
  href,
  onClick,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const label = os === 'macos' ? 'Download for macOS' : 'Download for Windows';
  const ariaLabel = os === 'macos' ? 'Download Atrium for macOS' : 'Download Atrium for Windows';
  const fileMeta = os === 'macos'
    ? 'v1.0.0 \u00B7 52 MB \u00B7 Requires macOS 12 or later'
    : 'v1.0.0 \u00B7 48 MB \u00B7 Requires Windows 10 or later';

  const handleClick = useCallback(
    (_e: React.MouseEvent) => {
      if (isDownloading) return;
      setIsDownloading(true);
      if (onClick) onClick();
      setTimeout(() => setIsDownloading(false), 2000);
    },
    [isDownloading, onClick]
  );

  if (variant === 'secondary') {
    return (
      <a
        href={href}
        className={styles.btnSecondary}
        onClick={handleClick}
        aria-label={ariaLabel}
      >
        {isDownloading ? 'Downloading...' : label}
      </a>
    );
  }

  if (variant === 'undetected') {
    return (
      <div className={styles.undetectedContainer}>
        <a
          href={href}
          className={styles.btnUndetected}
          onClick={handleClick}
          aria-label={ariaLabel}
        >
          {isDownloading ? 'Downloading...' : label}
        </a>
        <span className={styles.fileMeta}>{fileMeta}</span>
      </div>
    );
  }

  // primary or detected (both use primary style)
  return (
    <div className={styles.primaryContainer}>
      <a
        href={href}
        className={styles.btnPrimary}
        onClick={handleClick}
        aria-label={ariaLabel}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className={styles.arrowIcon}
        >
          <path
            d="M7 1v8m0 0l-3-3m3 3l3-3M1 10.5v1.5a1 1 0 001 1h10a1 1 0 001-1v-1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {isDownloading ? 'Downloading...' : label}
      </a>
      <span className={styles.fileMeta}>{fileMeta}</span>
    </div>
  );
};

export default DownloadButton;
