"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, BookOpen, Heart, Shield, Users, Trophy, GraduationCap, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Image 
          src="/images/hero_bg.png" 
          alt="Vidya Sagar Sishu Niketan Campus" 
          fill
          priority
          className="hero-img"
        />
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge badge-primary mb-3">Admissions Open 2026-27</span>
          <h1 className="hero-title">Welcome to Vidya Sagar Sishu Niketan</h1>
          <p className="hero-subtitle">Nurturing young minds to achieve academic excellence and build strong character in a safe, vibrant environment.</p>
          <div className="flex justify-center gap-2 mt-4">
            <Link href="/about" className="btn btn-primary">
              Learn More
            </Link>
            <Link href="/admissions" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
              Apply Now
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Welcome Message */}
      <section className={`section ${styles.welcomeSection}`}>
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 gap-4 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className={styles.welcomeText} variants={fadeInUp}>
              <h2 className="mb-2">Message from the Principal</h2>
              <p className="mb-3">
                At Vidya Sagar Sishu Niketan, we believe that education is not just about academic success, but about shaping the character and future of our children. Our dedicated faculty ensures that every student receives personalized attention in a nurturing and safe environment.
              </p>
              <p className="mb-4">
                We are proud of our rich cultural heritage and strive to blend traditional values with modern educational practices. I welcome you to explore our campus and become a part of our growing family.
              </p>
              <div className={styles.principalInfo}>
                <strong>Dr. Rajeshwari Sharma</strong>
                <span>Principal</span>
              </div>
            </motion.div>
            <motion.div className={styles.welcomeImgWrapper} variants={fadeInUp}>
              <div className={styles.imgDecor}></div>
              <Image 
                src="/images/principal.png" 
                alt="Principal Dr. Rajeshwari Sharma" 
                width={500}
                height={500}
                className={styles.welcomeImg}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-light">
        <div className="container">
          <motion.div 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Why Choose Us</h2>
            <p className="text-muted mt-2">Providing a foundation for lifelong learning</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-4 gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div className="card text-center" variants={fadeInUp}>
              <div className="card-icon mx-auto">
                <BookOpen size={32} />
              </div>
              <h3 className="mb-2" style={{fontSize: '1.25rem'}}>Holistic Education</h3>
              <p className="text-muted">Balancing academics, sports, and cultural activities for all-round development.</p>
            </motion.div>
            <motion.div className="card text-center" variants={fadeInUp}>
              <div className="card-icon mx-auto">
                <Award size={32} />
              </div>
              <h3 className="mb-2" style={{fontSize: '1.25rem'}}>Experienced Faculty</h3>
              <p className="text-muted">Highly qualified teachers dedicated to nurturing every student's potential.</p>
            </motion.div>
            <motion.div className="card text-center" variants={fadeInUp}>
              <div className="card-icon mx-auto">
                <Shield size={32} />
              </div>
              <h3 className="mb-2" style={{fontSize: '1.25rem'}}>Safe Environment</h3>
              <p className="text-muted">Secure campus with modern facilities to ensure peace of mind for parents.</p>
            </motion.div>
            <motion.div className="card text-center" variants={fadeInUp}>
              <div className="card-icon mx-auto">
                <Heart size={32} />
              </div>
              <h3 className="mb-2" style={{fontSize: '1.25rem'}}>Strong Values</h3>
              <p className="text-muted">Instilling discipline, respect, and deep cultural roots in our students.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section section-dark">
        <div className="container">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <Trophy size={48} className="mb-2 mx-auto" style={{color: 'var(--primary-color)'}} />
              <h2 className="mb-1" style={{fontSize: '3rem'}}>30+</h2>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>Years of Excellence</p>
            </div>
            <div>
              <Users size={48} className="mb-2 mx-auto" style={{color: 'var(--primary-color)'}} />
              <h2 className="mb-1" style={{fontSize: '3rem'}}>1200+</h2>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>Happy Students</p>
            </div>
            <div>
              <GraduationCap size={48} className="mb-2 mx-auto" style={{color: 'var(--primary-color)'}} />
              <h2 className="mb-1" style={{fontSize: '3rem'}}>80+</h2>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>Dedicated Teachers</p>
            </div>
            <div>
              <BookOpen size={48} className="mb-2 mx-auto" style={{color: 'var(--primary-color)'}} />
              <h2 className="mb-1" style={{fontSize: '3rem'}}>100%</h2>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>Passing Result</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events / Notices Highlights */}
      <section className="section section-light">
        <div className="container">
          <div className="flex justify-between items-center mb-4">
            <h2 className="mb-0">Upcoming Events & Notices</h2>
            <Link href="/news" className="btn btn-outline" style={{padding: '0.5rem 1rem'}}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.noticeCard}>
                <div className={styles.noticeDate}>
                  <span className={styles.dateDay}>15</span>
                  <span className={styles.dateMonth}>Aug</span>
                </div>
                <div className={styles.noticeContent}>
                  <h4>Independence Day Celebration</h4>
                  <p>Join us in celebrating the spirit of freedom at our school campus starting at 8:00 AM.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.ctaSection}>
        <div className="container text-center">
          <h2 className="mb-2" style={{color: 'white'}}>Start the Admission Journey Today</h2>
          <p className="mb-4" style={{color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 2rem'}}>
            Give your child the best foundation for a successful future. Admissions are now open for the upcoming academic session.
          </p>
          <Link href="/admissions" className="btn btn-primary" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>
            Apply for Admission
          </Link>
        </div>
      </section>
    </>
  );
}
