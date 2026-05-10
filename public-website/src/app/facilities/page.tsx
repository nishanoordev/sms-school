import React from 'react';
import Image from 'next/image';
import { BookMarked, MonitorPlay, Dumbbell, Bus, PlusSquare, Utensils, ShieldAlert, Palette } from 'lucide-react';
import styles from './page.module.css';

export default function Facilities() {
  const facilities = [
    {
      title: "Library",
      icon: <BookMarked size={32} />,
      desc: "Our library is a treasure trove of knowledge with over 10,000 books ranging from academic texts to fiction, biographies, and encyclopedias. It's a quiet space designed to foster a love for reading.",
      img: "/images/library.png"
    },
    {
      title: "Smart Classrooms",
      icon: <MonitorPlay size={32} />,
      desc: "All our classrooms are equipped with digital smart boards, enabling teachers to use multimedia content to make lessons more engaging and interactive for the students."
    },
    {
      title: "Computer & Science Labs",
      icon: <MonitorPlay size={32} />,
      desc: "State-of-the-art computer lab with latest systems and internet access. Fully equipped Physics, Chemistry, and Biology labs to encourage hands-on practical learning."
    },
    {
      title: "Sports Grounds",
      icon: <Dumbbell size={32} />,
      desc: "A sprawling campus with facilities for football, cricket, and athletics, along with dedicated courts for badminton and basketball to ensure physical well-being."
    },
    {
      title: "Medical Room",
      icon: <PlusSquare size={32} />,
      desc: "A well-equipped infirmary with a trained nurse available during school hours to provide immediate first aid and attend to any health-related emergencies."
    },
    {
      title: "Transport Facility",
      icon: <Bus size={32} />,
      desc: "A fleet of safe, well-maintained school buses with trained drivers and conductors, covering all major routes in and around the city to ensure safe commute for students."
    },
    {
      title: "Canteen / Mid-Day Meal",
      icon: <Utensils size={32} />,
      desc: "A hygienic canteen that provides nutritious and wholesome meals. We ensure all food is prepared under strict quality control standards."
    },
    {
      title: "Campus Security",
      icon: <ShieldAlert size={32} />,
      desc: "The entire campus is monitored by 24/7 CCTV surveillance. Access is strictly controlled by trained security personnel to ensure the safety of all students."
    }
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Campus Facilities</h1>
          <p className="page-subtitle">A conducive environment equipped with modern amenities to support holistic development</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 gap-4">
            {facilities.map((fac, idx) => (
              <div key={idx} className={styles.facilityCard}>
                {fac.img && (
                  <div className={styles.facilityImg}>
                    <Image src={fac.img} alt={fac.title} fill className={styles.img} />
                  </div>
                )}
                {!fac.img && (
                  <div className={styles.facilityImgPlaceholder}>
                    <Palette size={48} color="var(--border-color)" />
                  </div>
                )}
                <div className={styles.facilityContent}>
                  <div className={styles.facilityIcon}>{fac.icon}</div>
                  <h3 className="mb-1">{fac.title}</h3>
                  <p className="text-muted">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
