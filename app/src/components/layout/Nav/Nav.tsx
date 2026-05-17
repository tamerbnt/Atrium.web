import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useScrolled } from '../../../hooks/useScrolled';
import { AtriumMark } from '../../ui/AtriumMark';
import styles from './Nav.module.css';

export const Nav: React.FC = () => {
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Close menu on escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, closeMenu]);

  // Focus trap
  useEffect(() => {
    if (!menuOpen || !firstLinkRef.current || !lastLinkRef.current) return;
    firstLinkRef.current.focus();
  }, [menuOpen]);

  const handleFirstTab = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && e.shiftKey && menuOpen) {
      e.preventDefault();
      lastLinkRef.current?.focus();
    }
  };

  const handleLastTab = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !e.shiftKey && menuOpen) {
      e.preventDefault();
      firstLinkRef.current?.focus();
    }
  };

  const scrollTo = useCallback((id: string) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [closeMenu]);

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          <a
            href="#hero"
            className={styles.brand}
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
          >
            <AtriumMark size={20} context="dark" />
            <span className={styles.wordmark}>ATRIUM</span>
          </a>

          {/* Desktop nav */}
          <div className={styles.desktopLinks}>
            <a
              href="#features"
              className={styles.link}
              onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
            >
              Features
            </a>
            <a
              href="#pricing"
              className={styles.link}
              onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}
            >
              Pricing
            </a>
            <a
              href="#hero"
              className={styles.downloadBtn}
              onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
            >
              Download
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOpen : ''}`}
        onClick={closeMenu}
      >
        <div className={styles.mobileContent} onClick={(e) => e.stopPropagation()}>
          <a
            ref={firstLinkRef}
            href="#features"
            className={styles.mobileLink}
            onClick={(e) => { e.preventDefault(); scrollTo('features'); }}
            onKeyDown={handleFirstTab}
            style={{ transitionDelay: menuOpen ? '80ms' : '0ms' }}
          >
            Features
          </a>
          <a
            href="#pricing"
            className={styles.mobileLink}
            onClick={(e) => { e.preventDefault(); scrollTo('pricing'); }}
            style={{ transitionDelay: menuOpen ? '160ms' : '0ms' }}
          >
            Pricing
          </a>
          <a
            ref={lastLinkRef}
            href="#hero"
            className={styles.mobileLink}
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
            onKeyDown={handleLastTab}
            style={{ transitionDelay: menuOpen ? '240ms' : '0ms' }}
          >
            Download
          </a>
        </div>
      </div>
    </>
  );
};

export default Nav;
