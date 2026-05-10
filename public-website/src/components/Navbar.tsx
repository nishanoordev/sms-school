"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <BookOpen size={24} color="white" />
          </div>
          <div className={styles.logoText}>
            <span className={styles.schoolName}>Vidya Sagar Sishu Niketan</span>
            <span className={styles.tagline}>Nurturing Young Minds</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/login" className="btn btn-outline" style={{ marginLeft: '1rem', marginRight: '0.5rem', padding: '0.5rem 1rem' }}>
            Portal Login
          </Link>
          <Link href="/admissions" className={`btn btn-primary ${styles.applyBtn}`}>
            Apply Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`${styles.mobileNav} ${isOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.path}
            className={`${styles.mobileNavLink} ${pathname === link.path ? styles.active : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link 
          href="/login" 
          className="btn btn-outline"
          style={{ marginTop: '1rem', width: '100%' }}
          onClick={() => setIsOpen(false)}
        >
          Portal Login
        </Link>
        <Link 
          href="/admissions" 
          className="btn btn-primary"
          style={{ marginTop: '0.5rem', width: '100%' }}
          onClick={() => setIsOpen(false)}
        >
          Apply Now
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
