import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './context/LanguageContext';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Car Cleaning Eindhoven — Premium Autodetailing Sinds 1981',
  description:
    'De nummer 1 in premium autodetailing in Eindhoven. Interieur, exterieur en glas coating door vakspecialisten. Al meer dan 40 jaar de standaard in luxe autodetailing.',
  keywords: ['autodetailing', 'eindhoven', 'car cleaning', 'glas coating', 'polijsten', 'premium'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body className={`${geist.variable} font-sans antialiased bg-black`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
