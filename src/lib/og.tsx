import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// ภาพแชร์ (OG) ธีมเดียวกับเว็บ — satori ใช้ woff2 ไม่ได้ จึงใช้ LINE Seed แบบ .ttf
export const ogSize = { width: 1200, height: 630 };

// path ตายตัว เพื่อให้ bundler ติดตามไฟล์ได้ (ไม่ดึงทั้งโปรเจกต์)
const png = (b: Buffer) => `data:image/png;base64,${b.toString('base64')}`;

export async function renderOg({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  const [bd, rg, wm, em] = await Promise.all([
    readFile(join(process.cwd(), 'src/fonts/LINESeedSansTH_Bd.ttf')),
    readFile(join(process.cwd(), 'src/fonts/LINESeedSansTH_Rg.ttf')),
    readFile(join(process.cwd(), 'public/logo/wordmark-duo.png')),
    readFile(join(process.cwd(), 'src/app/og-emblem.png')),
  ]);
  const wordmark = png(wm), emblem = png(em);
  const size = title.length > 60 ? 50 : title.length > 36 ? 58 : 68;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0A0B0E', color: '#F5F6F8', fontFamily: 'LINE Seed', position: 'relative' }}>
        <div style={{ position: 'absolute', right: -120, top: -120, width: 520, height: 520, borderRadius: 9999, background: 'rgba(212,175,55,0.14)', filter: 'blur(90px)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '64px 0 56px 72px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmark} height={44} width={176} alt="" />
          <div style={{ display: 'flex', marginTop: 48, fontSize: 26, color: '#D4AF37' }}>{kicker}</div>
          <div style={{ display: 'flex', marginTop: 18, fontSize: size, fontWeight: 700, lineHeight: 1.3, maxWidth: 760 }}>{title}</div>
          <div style={{ display: 'flex', marginTop: 'auto', alignItems: 'center', gap: 16, fontSize: 24, color: '#8E93A0' }}>
            {sub && <span>{sub}</span>}
            <span style={{ color: '#00F0FF' }}>nititech.lawslane.com</span>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={emblem} width={360} height={360} alt="" style={{ alignSelf: 'center', marginRight: 40, opacity: 0.9 }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'LINE Seed', data: rg, weight: 400, style: 'normal' },
        { name: 'LINE Seed', data: bd, weight: 700, style: 'normal' },
      ],
    },
  );
}
