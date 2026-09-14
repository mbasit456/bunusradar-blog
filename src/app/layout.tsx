import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: {
    default: 'GravityPulse - Insights on Technology, AI, & Future Business',
    template: '%s | GravityPulse',
  },
  description: 'A modern, automated multi-category publication exploring Artificial Intelligence, Software Engineering, Digital Growth, and Future Systems.',
  keywords: ['AI', 'Technology', 'Productivity', 'Business Growth', 'Software Engineering', 'Next.js', 'Vercel'],
  authors: [{ name: 'GravityPulse Editorial' }],
  creator: 'GravityPulse',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    title: 'GravityPulse - Insights on Technology, AI, & Future Business',
    description: 'A modern, automated multi-category publication exploring Artificial Intelligence, Software Engineering, Digital Growth, and Future Systems.',
    siteName: 'GravityPulse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GravityPulse - Technology, AI, & Future Business',
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
