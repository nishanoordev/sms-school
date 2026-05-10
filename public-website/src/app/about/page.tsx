"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, ShieldCheck, Heart, Award } from 'lucide-react';
import styles from './page.module.css';

export default function About() {
  return (
    <div className={styles.aboutPage}>
      {/* Page Header */}
      <motion.div 
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.pageSubtitle}>Discover the history, mission, and vision of Vidya Sagar Sishu Niketan</p>
        </div>
      </motion.div>

      {/* Our Story */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <h2 className="mb-3">Our Story</h2>
              <p className="mb-2">
                Founded in 1995, Vidya Sagar Sishu Niketan started with a simple vision: to provide quality education that is accessible, holistic, and rooted in our cultural values. Named after the great scholar and social reformer Ishwar Chandra Vidyasagar, our institution embodies his ideals of knowledge, compassion, and progress.
              </p>
              <p className="mb-2">
                Over the past decades, we have grown from a small primary school with just 50 students to a full-fledged educational institution catering to over 1,200 students. Our journey is a testament to the trust placed in us by the community and the relentless dedication of our faculty.
              </p>
              <div className={styles.statBox}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>1995</span>
                  <span className={styles.statLabel}>Year Established</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>WBBSE</span>
                  <span className={styles.statLabel}>Board Affiliation</span>
                </div>
              </div>
            </div>
            <div className={styles.storyImage}>
              <div className="img-placeholder" style={{ minHeight: '400px' }}>
                <span className="text-muted">School Building Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section section-light">
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.div 
              className={`card ${styles.visionCard}`}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className={styles.visionIcon}>
                <Lightbulb size={40} />
              </div>
              <h2 className="mb-3">Our Vision</h2>
              <p>
                To be a premier institution of learning that nurtures intellectually capable, emotionally resilient, and socially responsible citizens who will contribute meaningfully to the world.
              </p>
            </motion.div>
            <motion.div 
              className={`card ${styles.visionCard}`}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className={styles.visionIcon}>
                <Target size={40} />
              </div>
              <h2 className="mb-3">Our Mission</h2>
              <p>
                To provide a stimulating learning environment with a technological orientation, which maximizes individual potential and ensures that students of all ability levels are well equipped to meet the challenges of education, work, and life.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Core Values</h2>
            <p className="text-muted mt-2">The guiding principles that shape our community</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="card text-center">
              <ShieldCheck size={36} className="mx-auto mb-2" style={{ color: 'var(--primary-color)' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Integrity</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Doing the right thing, always.</p>
            </div>
            <div className="card text-center">
              <Award size={36} className="mx-auto mb-2" style={{ color: 'var(--primary-color)' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Excellence</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Striving for the highest standards.</p>
            </div>
            <div className="card text-center">
              <Users size={36} className="mx-auto mb-2" style={{ color: 'var(--primary-color)' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Inclusivity</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Embracing diversity and respecting all.</p>
            </div>
            <div className="card text-center">
              <Heart size={36} className="mx-auto mb-2" style={{ color: 'var(--primary-color)' }} />
              <h3 style={{ fontSize: '1.25rem' }}>Compassion</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Caring for our community and environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Committee */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>Management Committee</h2>
            <p className="text-muted mt-2">The visionaries guiding our institution</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Mr. Alok Banerjee", role: "President" },
              { name: "Dr. Rajeshwari Sharma", role: "Secretary / Principal" },
              { name: "Mrs. Sunita Das", role: "Vice President" }
            ].map((member, idx) => (
              <div key={idx} className={styles.memberCard}>
                <div className={styles.memberAvatar}>
                  <Users size={48} color="var(--text-muted)" />
                </div>
                <h3 className="mb-1" style={{ fontSize: '1.25rem' }}>{member.name}</h3>
                <p className="text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
