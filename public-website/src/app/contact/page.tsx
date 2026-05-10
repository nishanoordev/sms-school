"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">We would love to hear from you. Get in touch with us for any queries.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4">Get In Touch</h2>
              <p className="text-muted mb-4">
                Whether you have a question about admissions, fee structure, or anything else, our team is ready to answer all your questions.
              </p>
              
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>School Address</h4>
                    <p className="text-muted">123 Vidya Marg, Education City<br />State 400001, India</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Phone Number</h4>
                    <p className="text-muted">+91 98765 43210<br />+91 11 2345 6789</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email Address</h4>
                    <p className="text-muted">info@vssn.edu.in<br />admissions@vssn.edu.in</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4>Office Hours</h4>
                    <p className="text-muted">Monday - Friday: 8:00 AM - 4:00 PM<br />Saturday: 8:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className={styles.formCard}>
                <h3 className="mb-3">Send us a Message</h3>
                
                {formStatus === 'success' ? (
                  <div className="text-center py-4">
                    <CheckCircle size={60} color="var(--secondary-color)" className="mx-auto mb-3" />
                    <h3 className="mb-2">Message Sent!</h3>
                    <p className="text-muted mb-4">Thank you for reaching out. We will get back to you as soon as possible.</p>
                    <button className="btn btn-outline" onClick={() => setFormStatus('idle')}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="form-group">
                        <label className="form-label">Your Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject *</label>
                        <select name="subject" value={formData.subject} onChange={handleChange} className="form-control" required>
                          <option value="">Select a Subject</option>
                          <option value="Admission">Admission Enquiry</option>
                          <option value="General">General Information</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Careers">Careers / Job Application</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Your Message *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows={5} required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={formStatus === 'submitting'} style={{ width: '100%' }}>
                      {formStatus === 'submitting' ? 'Sending...' : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className={styles.mapSection}>
        {/* Placeholder for map - in a real app this would be an iframe */}
        <div className={styles.mapPlaceholder}>
          <div className="text-center">
            <MapPin size={48} color="var(--primary-color)" className="mx-auto mb-2" />
            <h3>Google Maps Embed</h3>
            <p>Interactive map showing the school location</p>
          </div>
        </div>
      </section>
    </div>
  );
}
