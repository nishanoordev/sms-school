"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Users, ChevronRight, GraduationCap } from 'lucide-react';
import styles from './page.module.css';

export default function Login() {
  return (
    <div className={`page-wrapper ${styles.loginPage}`}>
      <div className="page-header">
        <div className="container">
          <motion.h1 
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Portal Access
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Select your portal to log in to the school management system.
          </motion.p>
        </div>
      </div>

      <section className="section section-light">
        <div className="container">
          <div className={styles.portalGrid}>
            {/* Staff Portal */}
            <motion.div 
              className={styles.portalCard}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Users size={32} />
                </div>
                <h2>Staff & Admin</h2>
              </div>
              <p>Access the core school management system for attendance, grading, and administrative tasks.</p>
              
              <a href="/portal/" className={`btn btn-primary ${styles.loginBtn}`}>
                Proceed to Staff Login <ChevronRight size={18} />
              </a>
            </motion.div>

            {/* Student Portal */}
            <motion.div 
              className={styles.portalCard}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper} style={{ backgroundColor: 'var(--secondary-light)', color: 'var(--secondary-dark)' }}>
                  <GraduationCap size={32} />
                </div>
                <h2>Student Portal</h2>
              </div>
              <p>Access your dashboard to view assignments, attendance records, exam results, and notices.</p>
              
              <a href="/portal/student" className={`btn btn-secondary ${styles.loginBtn}`}>
                Proceed to Student Login <ChevronRight size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
