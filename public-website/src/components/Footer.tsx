import React from 'react';
import Link from 'next/link';
import { BookOpen, MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerCol}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <BookOpen size={24} color="white" />
            </div>
            <div className={styles.logoText}>
              <span className={styles.schoolName}>Vidya Sagar<br/>Sishu Niketan</span>
            </div>
          </Link>
          <p className={styles.footerDesc}>
            Nurturing young minds to build a brighter future. Committed to academic excellence and holistic development since 1995.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h3 className={styles.footerHeading}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/academics">Academics</Link></li>
            <li><Link href="/admissions">Admissions</Link></li>
            <li><Link href="/facilities">Facilities</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h3 className={styles.footerHeading}>Important</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/news">Notice Board</Link></li>
            <li><Link href="/news">School Events</Link></li>
            <li><Link href="#">Fee Structure</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h3 className={styles.footerHeading}>Contact Us</h3>
          <ul className={styles.contactInfo}>
            <li>
              <MapPin size={18} className={styles.contactIcon} />
              <span>123 Vidya Marg, Education City, State 400001</span>
            </li>
            <li>
              <Phone size={18} className={styles.contactIcon} />
              <span>+91 98765 43210<br/>+91 11 2345 6789</span>
            </li>
            <li>
              <Mail size={18} className={styles.contactIcon} />
              <span>info@vssn.edu.in</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Vidya Sagar Sishu Niketan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
