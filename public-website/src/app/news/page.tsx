import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Download, FileText, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

export default function NewsNotices() {
  const notices = [
    { id: 1, date: "15 Aug 2025", title: "Independence Day Celebration", desc: "Flag hoisting at 8:00 AM followed by cultural programs." },
    { id: 2, date: "10 Aug 2025", title: "Half-Yearly Exam Routine", desc: "Download the complete routine for classes I to X." },
    { id: 3, date: "05 Aug 2025", title: "Parent Teacher Meeting", desc: "PTM for Classes Nursery to IV will be held on Saturday." },
    { id: 4, date: "28 Jul 2025", title: "School Magazine Contributions", desc: "Students can submit their articles and drawings to class teachers." },
    { id: 5, date: "20 Jul 2025", title: "Inter-School Debate Competition", desc: "Selection trials for Class IX and X students." },
  ];

  const news = [
    { id: 1, date: "August 12, 2025", title: "VSSN Students Win District Science Fair", img: "/images/hero_bg.png", excerpt: "Our middle school students secured the first position at the annual district science fair with their project on renewable energy." },
    { id: 2, date: "July 25, 2025", title: "Annual Sports Meet 2025 Highlights", img: "/images/library.png", excerpt: "A spectacular display of athleticism and team spirit marked the Annual Sports Meet. Red House emerged as the overall champion." },
    { id: 3, date: "July 10, 2025", title: "New Computer Lab Inauguration", img: "/images/hero_bg.png", excerpt: "The school has upgraded its computer lab with 40 new systems and interactive learning software to boost digital literacy." },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">News & Notices</h1>
          <p className="page-subtitle">Stay updated with the latest announcements, events, and achievements</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 gap-4">
            {/* Notice Board */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={32} color="var(--primary-color)" />
                <h2 className="mb-0">Notice Board</h2>
              </div>
              <div className={styles.noticeList}>
                {notices.map((notice) => (
                  <div key={notice.id} className={styles.noticeCard}>
                    <div className={styles.noticeDate}>
                      <span className={styles.dateText}>{notice.date.split(' ')[0]}</span>
                      <span className={styles.monthText}>{notice.date.split(' ')[1]}</span>
                    </div>
                    <div className={styles.noticeContent}>
                      <h4>{notice.title}</h4>
                      <p className="text-muted">{notice.desc}</p>
                    </div>
                    <button className={styles.downloadBtn}>
                      <Download size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline mt-3">View All Notices</button>
            </div>

            {/* Upcoming Events / Calendar */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={32} color="var(--primary-color)" />
                <h2 className="mb-0">Upcoming Events</h2>
              </div>
              <div className={styles.eventsWrapper}>
                <table className={styles.eventsTable}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Participants</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>15 Aug 2025</strong></td>
                      <td>Independence Day</td>
                      <td>All Students</td>
                    </tr>
                    <tr>
                      <td><strong>28 Aug 2025</strong></td>
                      <td>Inter-House Debate</td>
                      <td>Classes VIII-X</td>
                    </tr>
                    <tr>
                      <td><strong>05 Sep 2025</strong></td>
                      <td>Teachers' Day Celebration</td>
                      <td>Classes IX-X</td>
                    </tr>
                    <tr>
                      <td><strong>10 Sep 2025</strong></td>
                      <td>Half-Yearly Exams Begin</td>
                      <td>Classes I-X</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School News/Blog */}
      <section className="section section-light">
        <div className="container">
          <div className="section-title">
            <h2>School News</h2>
            <p className="text-muted mt-2">Stories and highlights from our campus</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {news.map((item) => (
              <div key={item.id} className={styles.newsCard}>
                <div className={styles.newsImgWrapper}>
                  <Image src={item.img} alt={item.title} fill className={styles.img} />
                </div>
                <div className={styles.newsContent}>
                  <div className={styles.newsMeta}>
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className={styles.newsTitle}>{item.title}</h3>
                  <p className={styles.newsExcerpt}>{item.excerpt}</p>
                  <Link href="#" className={styles.readMore}>
                    Read More <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
