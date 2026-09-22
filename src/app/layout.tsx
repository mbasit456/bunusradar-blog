import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bunusradar.site'),
  title: {
    default: 'BunusRadar - Insights on Technology, AI, & Digital Growth',
    template: '%s | BunusRadar',
  },
  description: 'A modern, high-velocity digital publication exploring Artificial Intelligence, Software Engineering, Digital Business Models, and Future Trends.',
  keywords: ['AI', 'Technology', 'Productivity', 'Business Growth', 'Software Engineering', 'BunusRadar'],
  authors: [{ name: 'BunusRadar Editorial' }],
  creator: 'BunusRadar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bunusradar.site',
    title: 'BunusRadar - Insights on Technology, AI, & Digital Growth',
    description: 'A modern, high-velocity digital publication exploring Artificial Intelligence, Software Engineering, Digital Business Models, and Future Trends.',
    siteName: 'BunusRadar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BunusRadar - Technology, AI, & Future Business',
    description: 'A modern, high-velocity digital publication exploring Artificial Intelligence, Software Engineering, Digital Business Models, and Future Trends.',
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
