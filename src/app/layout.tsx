import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header, Footer } from '@/components/site';
import { SITE_URL, SITE_NAME, SITE_DESC } from '@/lib/site';

// LINE Seed Sans TH ทั้งเว็บ (ไฟล์ชุดเดียวกับสิทธิคนทำงาน)
const lineSeed = localFont({
  src: [
    { path: '../fonts/LINESeedSansTH_W_Rg.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/LINESeedSansTH_W_Bd.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/LINESeedSansTH_W_XBd.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-line',
  display: 'swap',
});

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
    <html lang="th" className={lineSeed.variable}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
