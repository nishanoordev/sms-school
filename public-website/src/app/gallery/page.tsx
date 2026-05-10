"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import styles from './page.module.css';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const categories = ['All', 'Campus', 'Events', 'Sports', 'Classrooms'];

  const photos = [
    { id: 1, src: '/images/hero_bg.png', category: 'Campus', alt: 'School Building' },
    { id: 2, src: '/images/library.png', category: 'Campus', alt: 'Library' },
    { id: 3, src: '/images/hero_bg.png', category: 'Events', alt: 'Annual Day' },
    { id: 4, src: '/images/library.png', category: 'Classrooms', alt: 'Smart Class' },
    { id: 5, src: '/images/hero_bg.png', category: 'Sports', alt: 'Sports Meet' },
    { id: 6, src: '/images/principal.png', category: 'Events', alt: 'Awards Ceremony' },
  ];

  const filteredPhotos = filter === 'All' ? photos : photos.filter(p => p.category === filter);

  const openLightbox = (src: string) => {
    setCurrentImg(src);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Gallery</h1>
          <p className="page-subtitle">A glimpse into the vibrant life at Vidya Sagar Sishu Niketan</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className={styles.filterContainer}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className={styles.photoGrid}>
            {filteredPhotos.map(photo => (
              <div 
                key={photo.id} 
                className={styles.photoItem}
                onClick={() => openLightbox(photo.src)}
              >
                <div className={styles.photoWrapper}>
                  <Image src={photo.src} alt={photo.alt} fill className={styles.img} />
                  <div className={styles.photoOverlay}>
                    <span>View Image</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>Video Tour</h2>
            <p className="text-muted mt-2">Experience our campus virtually</p>
          </div>
          <div className={styles.videoContainer}>
            <div className={styles.videoWrapper}>
              <Image src="/images/hero_bg.png" alt="Video Thumbnail" fill className={styles.img} />
              <div className={styles.videoOverlay}>
                <button className={styles.playBtn}>
                  <Play size={40} fill="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className={styles.lightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox}>
            <X size={40} color="white" />
          </button>
          <div className={styles.lightboxContent}>
            <Image src={currentImg} alt="Expanded view" width={1200} height={800} className={styles.lightboxImg} />
          </div>
        </div>
      )}
    </div>
  );
}
