import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bonusradar.site'),
  title: {
    default: 'BonusRadar - Insights on Technology, AI, & Digital Growth',
    template: '%s | BonusRadar',
  },
  description: 'A modern, automated multi-category publication exploring Artificial Intelligence, Software Engineering, Digital Growth, and Future Systems.',
  keywords: ['AI', 'Technology', 'Productivity', 'Business Growth', 'Software Engineering', 'BonusRadar'],
  authors: [{ name: 'BonusRadar Editorial' }],
  creator: 'BonusRadar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bonusradar.site',
    title: 'BonusRadar - Insights on Technology, AI, & Digital Growth',
    description: 'A modern, automated multi-category publication exploring Artificial Intelligence, Software Engineering, Digital Growth, and Future Systems.',
    siteName: 'BonusRadar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BonusRadar - Technology, AI, & Future Business',
    description: 'A modern, automated multi-category publication exploring Artificial Intelligence, Software Engineering, Digital Growth, and Future Systems.',
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased selection:bg-blue-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
