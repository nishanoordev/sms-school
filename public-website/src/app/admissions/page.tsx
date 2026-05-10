"use client";

import React, { useState } from 'react';
import { FileText, Calendar, CheckCircle, Download, FilePlus, UserPlus, FileQuestion } from 'lucide-react';
import styles from './page.module.css';

export default function Admissions() {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    classApplying: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        parentName: '', email: '', phone: '', childName: '', classApplying: '', message: ''
      });
    }, 1500);
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Admissions</h1>
          <p className="page-subtitle">Join the Vidya Sagar Sishu Niketan family and give your child the best start</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Admission Info */}
            <div>
              <h2 className="mb-4">Admission Process</h2>
              
              <div className={styles.processSteps}>
                <div className={styles.step}>
                  <div className={styles.stepIcon}><FileQuestion size={24} /></div>
                  <div>
                    <h4>1. Enquiry</h4>
                    <p className="text-muted">Fill out the enquiry form online or visit our school office.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepIcon}><UserPlus size={24} /></div>
                  <div>
                    <h4>2. Campus Visit & Interaction</h4>
                    <p className="text-muted">A brief interaction session with the Principal/Teachers to understand the child's needs.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepIcon}><FilePlus size={24} /></div>
                  <div>
                    <h4>3. Application Submission</h4>
                    <p className="text-muted">Submit the formal application form along with necessary documents.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepIcon}><CheckCircle size={24} /></div>
                  <div>
                    <h4>4. Admission Confirmation</h4>
                    <p className="text-muted">Pay the admission fees to secure the seat for your child.</p>
                  </div>
                </div>
              </div>

              <div className="card mt-4">
                <h3 className="mb-3 flex items-center gap-2"><FileText size={24} color="var(--primary-color)" /> Required Documents</h3>
                <ul className={styles.docList}>
                  <li>Birth Certificate (Original + Copy)</li>
                  <li>3 Passport size photographs of the child</li>
                  <li>1 Passport size photograph of each parent</li>
                  <li>Aadhar Card copy of child and parents</li>
                  <li>Transfer Certificate (if applicable)</li>
                  <li>Previous year report card (for Class II onwards)</li>
                </ul>
              </div>
            </div>

            {/* Admission Form */}
            <div>
              <div className={styles.formCard}>
                <h2 className="mb-1 text-center">Admission Enquiry</h2>
                <p className="text-center text-muted mb-4">Fill out the form below and our admission counselor will contact you.</p>
                
                {formStatus === 'success' ? (
                  <div className={styles.successMessage}>
                    <CheckCircle size={48} color="var(--secondary-color)" className="mx-auto mb-2" />
                    <h3>Thank You!</h3>
                    <p>Your enquiry has been submitted successfully. We will get back to you shortly.</p>
                    <button className="btn btn-outline mt-3" onClick={() => setFormStatus('idle')}>Submit Another Enquiry</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Parent/Guardian Name *</label>
                      <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="form-group">
                        <label className="form-label">Child's Name *</label>
                        <input type="text" name="childName" value={formData.childName} onChange={handleChange} className="form-control" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Applying for Class *</label>
                        <select name="classApplying" value={formData.classApplying} onChange={handleChange} className="form-control" required>
                          <option value="">Select Class</option>
                          <option value="Nursery">Nursery</option>
                          <option value="KG">KG</option>
                          <option value="Class 1">Class I</option>
                          <option value="Class 2">Class II</option>
                          <option value="Class 3">Class III</option>
                          <option value="Class 4">Class IV</option>
                          <option value="Class 5">Class V</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Any Message/Query</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} className="form-control"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={formStatus === 'submitting'}>
                      {formStatus === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="section section-light">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <h2 className="mb-3">Important Dates for 2026-27</h2>
              <table className={styles.datesTable}>
                <tbody>
                  <tr>
                    <td><strong>Online Form Availability</strong></td>
                    <td>1st October 2025</td>
                  </tr>
                  <tr>
                    <td><strong>Last Date for Submission</strong></td>
                    <td>15th December 2025</td>
                  </tr>
                  <tr>
                    <td><strong>Interaction Dates</strong></td>
                    <td>Jan 5th - 10th 2026</td>
                  </tr>
                  <tr>
                    <td><strong>Final List Publication</strong></td>
                    <td>25th January 2026</td>
                  </tr>
                  <tr>
                    <td><strong>Session Begins</strong></td>
                    <td>1st April 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-center">
              <div className="card" style={{ display: 'inline-block', padding: '3rem' }}>
                <Download size={48} color="var(--primary-color)" className="mx-auto mb-2" />
                <h3 className="mb-2">Download Prospectus</h3>
                <p className="text-muted mb-3">Get detailed information about fee structure, uniforms, and school policies.</p>
                <button className="btn btn-outline">Download PDF (2.4 MB)</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
