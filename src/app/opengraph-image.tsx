import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'NITI.TECH — Thai Tech Law Knowledge Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  const emblem = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), 'src/app/og-emblem.png')).toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', background: '#0A0B0E', color: '#F5F6F8', padding: 80, gap: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#D4AF37' }}>THAI TECH LAW // KNOWLEDGE HUB</div>
          <div style={{ fontSize: 110, fontWeight: 700, marginTop: 24, display: 'flex' }}>
            NITI<span style={{ color: '#D4AF37' }}>.T</span>ECH
          </div>
          <div style={{ fontSize: 32, color: '#8E93A0', marginTop: 16 }}>PDPA · Cyber Crime · AI & IP · Digital Business</div>
          <div style={{ fontSize: 22, color: '#00F0FF', marginTop: 40 }}>nititech.lawslane.com</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={emblem} width={420} height={420} alt="" />
      </div>
    ),
    size,
  );
}
