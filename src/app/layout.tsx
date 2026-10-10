import type { Metadata, Viewport } from 'next';
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono, IBM_Plex_Sans_Thai, Noto_Serif_Thai } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/site';
import { SITE_URL, SITE_NAME, SITE_DESC } from '@/lib/site';

// ฟอนต์ละตินตามดีไซน์ (Newsreader / Plus Jakarta Sans / JetBrains Mono) + ฟอนต์ไทยคู่กัน
const newsreader = Newsreader({ subsets: ['latin'], weight: ['300', '400'], style: ['normal', 'italic'], variable: '--font-newsreader', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-jakarta', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono', display: 'swap' });
const thai = IBM_Plex_Sans_Thai({ subsets: ['thai'], weight: ['400', '500', '600', '700'], variable: '--font-thai', display: 'swap' });
const thaiSerif = Noto_Serif_Thai({ subsets: ['thai'], weight: ['300', '400', '500'], variable: '--font-thai-serif', display: 'swap' });

export const viewport: Viewport = { themeColor: '#0A0B0E', colorScheme: 'dark' };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'NITI.TECH — กฎหมายเทคโนโลยีไทย เข้าใจง่าย ใช้ได้จริง', template: '%s | NITI.TECH' },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: SITE_NAME, locale: 'th_TH', title: 'NITI.TECH — กฎหมายเทคโนโลยีไทย', description: SITE_DESC },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={[newsreader.variable, jakarta.variable, mono.variable, thai.variable, thaiSerif.variable].join(' ')}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
