import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Vidya Sagar Sishu Niketan | Nurturing Young Minds',
  description: 'Vidya Sagar Sishu Niketan is a premier educational institution committed to academic excellence and holistic development. Explore our campus, curriculum, and admissions process.',
  keywords: 'Vidya Sagar Sishu Niketan, School, Education, Admissions, Best School',
  openGraph: {
    title: 'Vidya Sagar Sishu Niketan',
    description: 'Nurturing Young Minds since 1995. Explore our admissions, facilities, and academic excellence.',
    type: 'website',
    locale: 'en_IN',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
