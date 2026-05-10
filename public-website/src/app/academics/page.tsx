import React from 'react';
import { BookOpen, Calendar, Trophy, Puzzle, Monitor, Languages, Calculator, FlaskConical, Globe } from 'lucide-react';
import styles from './page.module.css';

export default function Academics() {
  const subjects = [
    { icon: <Languages />, name: "Languages", desc: "English, Bengali, Hindi" },
    { icon: <Calculator />, name: "Mathematics", desc: "Algebra, Geometry, Arithmetic" },
    { icon: <FlaskConical />, name: "Sciences", desc: "Physics, Chemistry, Biology" },
    { icon: <Globe />, name: "Social Studies", desc: "History, Geography, Civics" },
    { icon: <Monitor />, name: "Computer Science", desc: "Programming, ICT" },
    { icon: <Puzzle />, name: "Arts & Crafts", desc: "Drawing, Painting, Origami" }
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Academics</h1>
          <p className="page-subtitle">A comprehensive curriculum designed to foster intellectual growth and curiosity</p>
        </div>
      </div>

      {/* Curriculum Overview */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <h2 className="mb-3">Our Curriculum Approach</h2>
              <p className="mb-2">
                At Vidya Sagar Sishu Niketan, we follow the WBBSE curriculum integrated with modern pedagogical techniques. We believe in an activity-based, experiential learning model that shifts the focus from rote memorization to understanding and application.
              </p>
              <ul className={styles.featureList}>
                <li><BookOpen size={20} className={styles.featureIcon} /> <span>Child-centric learning methodology</span></li>
                <li><BookOpen size={20} className={styles.featureIcon} /> <span>Integration of technology in classrooms</span></li>
                <li><BookOpen size={20} className={styles.featureIcon} /> <span>Continuous and comprehensive evaluation</span></li>
                <li><BookOpen size={20} className={styles.featureIcon} /> <span>Focus on critical thinking and problem-solving</span></li>
              </ul>
            </div>
            <div className={styles.tableWrapper}>
              <h3 className="mb-2">Classes Offered</h3>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Classes</th>
                    <th>Age Group</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pre-Primary</td>
                    <td>Nursery - KG</td>
                    <td>3 - 5 Years</td>
                  </tr>
                  <tr>
                    <td>Primary</td>
                    <td>Class I - IV</td>
                    <td>6 - 9 Years</td>
                  </tr>
                  <tr>
                    <td>Middle School</td>
                    <td>Class V - VIII</td>
                    <td>10 - 13 Years</td>
                  </tr>
                  <tr>
                    <td>Secondary</td>
                    <td>Class IX - X</td>
                    <td>14 - 15 Years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>Subjects Taught</h2>
            <p className="text-muted mt-2">Core subjects for holistic academic development</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {subjects.map((sub, idx) => (
              <div key={idx} className={`card ${styles.subjectCard}`}>
                <div className={styles.subjectIcon}>{sub.icon}</div>
                <div className={styles.subjectInfo}>
                  <h4>{sub.name}</h4>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>{sub.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar & Achievements */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={32} color="var(--primary-color)" />
                <h2 className="mb-0">Academic Timeline</h2>
              </div>
              <div className={styles.timeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <h4>April</h4>
                  <p className="text-muted">New Academic Session Begins</p>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <h4>September</h4>
                  <p className="text-muted">Half-Yearly Examinations</p>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <h4>December</h4>
                  <p className="text-muted">Annual Sports & Cultural Fest</p>
                </div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineDot}></div>
                  <h4>March</h4>
                  <p className="text-muted">Final Examinations</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={32} color="var(--primary-color)" />
                <h2 className="mb-0">Recent Achievements</h2>
              </div>
              <div className={styles.achievementList}>
                <div className={styles.achievementCard}>
                  <div className={styles.achievementYear}>2025</div>
                  <div className={styles.achievementContent}>
                    <h4>100% Board Pass Rate</h4>
                    <p className="text-muted">All our Class X students cleared the board exams with first division marks.</p>
                  </div>
                </div>
                <div className={styles.achievementCard}>
                  <div className={styles.achievementYear}>2025</div>
                  <div className={styles.achievementContent}>
                    <h4>District Science Fair Winner</h4>
                    <p className="text-muted">Our middle school team won 1st prize for their sustainable energy project.</p>
                  </div>
                </div>
                <div className={styles.achievementCard}>
                  <div className={styles.achievementYear}>2024</div>
                  <div className={styles.achievementContent}>
                    <h4>State Level Athletics</h4>
                    <p className="text-muted">Two gold medals secured in the under-14 category for 100m sprint.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
