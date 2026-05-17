import React, { useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import styles from './DemoModal.module.css';

export interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={overlayRef}
          className={styles.overlay}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Demo video"
        >
          <m.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              ref={closeButtonRef}
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close demo video"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className={styles.videoContainer}>
              {/* TODO: Replace with actual demo video embed */}
              <div className={styles.placeholder}>
                <AtriumMarkStatic />
                <p>Demo video coming soon</p>
                <span>Watch the 2-minute product walkthrough</span>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

// Static SVG mark for the modal placeholder (no framer-motion dependency)
const AtriumMarkStatic: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 72 72" fill="none" aria-hidden="true" style={{ display: 'block', opacity: 0.2 }}>
    <rect x="0" y="0" width="19" height="19" fill="#D4856A" />
    <rect x="53" y="0" width="19" height="19" fill="#D4856A" />
    <rect x="0" y="53" width="19" height="19" fill="#D4856A" />
    <rect x="53" y="53" width="19" height="19" fill="#D4856A" />
    <rect x="23" y="23" width="26" height="26" stroke="#D4856A" strokeWidth="2.2" />
  </svg>
);

export default DemoModal;
