import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // โฟลเดอร์แม่มี lockfile อื่น — ระบุ root ของโปรเจกต์นี้
  turbopack: { root: __dirname },
  async redirects() {
    const canonical = process.env.NEXT_PUBLIC_SITE_URL;
    return [
      // ลิงก์ *.vercel.app ของ production พาไปโดเมนหลัก (กันเนื้อหาซ้ำ) — เฉพาะเมื่อตั้งโดเมนหลักแล้ว
      ...(canonical && !canonical.includes('localhost')
        ? [{ source: '/:path*', has: [{ type: 'host' as const, value: 'nititech.vercel.app' }], destination: `${canonical}/:path*`, permanent: true }]
        : []),
    ];
  },
};

export default nextConfig;
