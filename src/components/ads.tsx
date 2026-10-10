'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Megaphone } from 'lucide-react';
import { placements, sponsors, type Placement } from '@/content/sponsors';

const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // เช่น ca-pub-xxxxxxxxxxxxxxxx
// env ฝั่ง client ต้องอ้างชื่อตรง ๆ (Next แทนค่าตอน build)
const SLOTS: Record<Placement, string | undefined> = {
  'home-top': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP,
  'home-mid': process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID,
  'article-mid': process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MID,
  'article-end': process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_END,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  listing: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LISTING,
  tool: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOOL,
};
const KEY = 'nititech-ads-consent';
const EVT = 'nititech-consent';

function readConsent(): 'yes' | 'no' | null {
  try { const v = localStorage.getItem(KEY); return v === 'yes' || v === 'no' ? v : null; } catch { return null; }
}

function useConsent() {
  const [c, setC] = useState<'yes' | 'no' | null | undefined>(undefined);
  useEffect(() => {
    setC(readConsent());
    const on = () => setC(readConsent());
    addEventListener(EVT, on);
    return () => removeEventListener(EVT, on);
  }, []);
  return c;
}

/** เปิดหน้าตั้งค่าคุกกี้โฆษณาอีกครั้ง (ใช้ในหน้าเกี่ยวกับเรา) */
export function resetAdsConsent() {
  try { localStorage.removeItem(KEY); } catch {}
  dispatchEvent(new Event(EVT));
}

/** โหลดสคริปต์ AdSense เฉพาะเมื่อผู้ใช้ยินยอม + แบนเนอร์ขอความยินยอม (แสดงเมื่อเปิดใช้ AdSense แล้วเท่านั้น) */
export function AdsProvider() {
  const consent = useConsent();
  if (!CLIENT || consent === undefined) return null;
  const choose = (v: 'yes' | 'no') => {
    try { localStorage.setItem(KEY, v); } catch {}
    dispatchEvent(new Event(EVT));
  };
  return (
    <>
      {consent === 'yes' && (
        <Script async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`} />
      )}
      {consent === null && (
        <div role="dialog" aria-label="การใช้คุกกี้โฆษณา" className="fixed inset-x-0 bottom-0 z-50 border-t border-line-2 bg-void-2/95 p-4 backdrop-blur-xl print:hidden">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm leading-relaxed text-ink-2">
              <span className="label mr-2 text-gold">COOKIES</span>
              เว็บไซต์นี้แสดงโฆษณาจาก Google ซึ่งอาจใช้คุกกี้เพื่อปรับโฆษณาให้ตรงความสนใจ คุณเลือกได้ว่าจะยินยอมหรือไม่ เนื้อหาทั้งหมดใช้ได้เหมือนเดิม <Link href="/about" className="text-gold underline-offset-4 hover:underline">อ่านนโยบาย</Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button type="button" className="btn-term !py-2" onClick={() => choose('no')}>ไม่ยินยอม</button>
              <button type="button" className="btn-gold !py-2" onClick={() => choose('yes')}>ยินยอม</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const today = () => new Date().toISOString().slice(0, 10);

/** ช่องโฆษณา: แบนเนอร์ขายตรง → AdSense → ป้ายลงโฆษณากับเรา */
export function AdSlot({ placement, className = '' }: { placement: Placement; className?: string }) {
  const consent = useConsent();
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => setNow(today()), []);
  const sponsor = now ? sponsors.find((s) => s.placement === placement && s.start <= now && now <= s.end) : undefined;
  const slot = SLOTS[placement];
  const adsense = !sponsor && !!CLIENT && !!slot && consent === 'yes';
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adsense) return;
    try { ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ||= []).push({}); } catch {}
  }, [adsense]);

  const tall = placement === 'sidebar' || placement === 'home-mid';
  return (
    <aside aria-label="โฆษณา" className={`my-8 ${className}`}>
      <p className="label mb-1.5 flex items-center justify-between text-ink-3">
        <span>{sponsor ? 'ผู้สนับสนุน' : 'โฆษณา'}</span>
        <Link href="/advertise" className="hover:text-gold">ลงโฆษณา →</Link>
      </p>
      {sponsor ? (
        <a href={sponsor.href} target="_blank" rel="sponsored noopener" className="block overflow-hidden rounded border border-line transition hover:border-gold hover:shadow-aureum">
          <picture>
            {sponsor.imageMobile && <source media="(max-width: 640px)" srcSet={sponsor.imageMobile} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sponsor.image} alt={`${sponsor.name} (ผู้สนับสนุน)`} width={sponsor.width} height={sponsor.height} loading="lazy" className="h-auto w-full" />
          </picture>
        </a>
      ) : adsense ? (
        <ins ref={ref} className="adsbygoogle block" style={{ display: 'block' }} data-ad-client={CLIENT} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
      ) : (
        <Link href="/advertise" className={`group grid place-items-center rounded border border-dashed border-line-2 bg-white/[0.015] px-4 text-center transition hover:border-gold hover:bg-gold/[0.04] ${tall ? 'min-h-[220px]' : 'min-h-[96px]'}`}>
          <span className="flex flex-col items-center gap-1.5 py-5">
            <Megaphone size={18} className="text-gold transition group-hover:scale-110" />
            <span className="text-sm text-ink">พื้นที่โฆษณาว่าง · {placements[placement].name}</span>
            <span className="code text-ink-3">ให้แบรนด์ของคุณอยู่ตรงนี้ → ลงโฆษณากับ NITI.TECH</span>
          </span>
        </Link>
      )}
    </aside>
  );
}

/** ปุ่มเปลี่ยนการตั้งค่าคุกกี้โฆษณา (แสดงเฉพาะเมื่อเปิดใช้ AdSense) */
export function AdsConsentButton() {
  if (!CLIENT) return null;
  return <button type="button" onClick={resetAdsConsent} className="btn-term mt-4 !py-2">ตั้งค่าคุกกี้โฆษณาใหม่</button>;
}
