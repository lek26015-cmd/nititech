'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** ตัวกลางของเอฟเฟกต์ทั้งเว็บ: เผยเมื่อเลื่อนถึง, สปอตไลต์บนการ์ด, แสงตามเคอร์เซอร์ */
export function FxRoot() {
  const pathname = usePathname();
  const glow = useRef<HTMLDivElement>(null);

  // เผยเนื้อหาเมื่อเลื่อนถึง — สแกนใหม่เมื่อเปลี่ยนหน้า และเมื่อมีองค์ประกอบใหม่ (เช่น ผลค้นหา/สลับหมวด)
  useEffect(() => {
    const show = (el: Element) => {
      if (el.hasAttribute('data-stagger')) {
        el.setAttribute('data-shown', '1');
        [...el.children].forEach((c, i) => { (c as HTMLElement).style.setProperty('--d', `${Math.min(i, 8) * 90}ms`); c.classList.add('in'); });
      } else el.classList.add('in');
    };
    const io = reduced() ? null : new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { show(e.target); io?.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.in), [data-stagger]').forEach((el) => {
        if (el.hasAttribute('data-stagger') && seen.has(el)) {
          // กลุ่มที่เผยแล้ว แต่มีลูกใหม่เพิ่มเข้ามา: เผยทันที
          if (el.getAttribute('data-shown')) [...el.children].forEach((c) => c.classList.add('in'));
          return;
        }
        seen.add(el);
        if (io) io.observe(el); else show(el);
      });
    };
    let queued = false;
    const mark = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; scan(); });
    });
    scan();
    mark.observe(document.body, { childList: true, subtree: true });
    return () => { io?.disconnect(); mark.disconnect(); };
  }, [pathname]);

  // สปอตไลต์บนการ์ด + แสงตามเคอร์เซอร์ (เฉพาะเมาส์)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, gx = x, gy = y, raf = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const card = (e.target as Element)?.closest?.('.glass, .glass-2') as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    const loop = () => {
      gx += (x - gx) * 0.12; gy += (y - gy) * 0.12;
      if (glow.current) glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', onMove, { passive: true });
    if (!reduced()) raf = requestAnimationFrame(loop);
    return () => { removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return <div ref={glow} aria-hidden className="fx-cursor hidden [@media(pointer:fine)]:block motion-reduce:!hidden" />;
}

const GLYPHS = '01<>/_#§$%&*+=?ABCDEFXYZ';

/** ข้อความ "ถอดรหัส": สุ่มอักษรแล้วค่อย ๆ คลายเป็นข้อความจริงทีละตัว — HTML จาก server เป็นข้อความจริงเสมอ (ดีต่อ SEO) */
export function Scramble({ text, className, delay = 300, speed = 38 }: { text: string; className?: string; delay?: number; speed?: number }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (reduced()) return;
    const seg = typeof Intl !== 'undefined' && 'Segmenter' in Intl
      ? [...new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(text)].map((s) => s.segment)
      : [...text];
    let frame = 0, t: ReturnType<typeof setTimeout>;
    const total = seg.length + 10;
    const tick = () => {
      frame++;
      const done = Math.max(0, frame - 10);
      setOut(seg.map((ch, i) => (i < done || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''));
      if (frame < total) t = setTimeout(tick, speed);
      else setOut(text);
    };
    t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [text, delay, speed]);
  // จองพื้นที่ด้วยข้อความจริง (ล่องหน) แล้ววางตัวสุ่มทับ — บรรทัดไม่กระโดดระหว่างถอดรหัส
  return (
    <span className={`relative inline-block ${className ?? ''}`}>
      <span className={out === text ? '' : 'invisible'}>{text}</span>
      {out !== text && <span aria-hidden className="absolute inset-0 overflow-hidden whitespace-nowrap">{out}</span>}
    </span>
  );
}

/** ตัวเลขนับขึ้นเมื่อเห็นบนจอ */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reduced() || !ref.current) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / 1400);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className={className}>{n}</span>;
}

/** ฝนรหัสแบบ Matrix ผสมสัญลักษณ์กฎหมาย — วาดบน canvas พื้นหลัง hero */
export function CodeRain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || reduced()) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const chars = '01§¶ม.๑๒๓๔๕๖๗๘๙PDPA{}<>/AI#';
    const fs = 14;
    let cols = 0, drops: number[] = [], raf = 0, last = 0, visible = true;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = cv.offsetWidth * dpr; cv.height = cv.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(cv.offsetWidth / fs);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
    };
    resize();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || now - last < 55) return;
      last = now;
      ctx.fillStyle = 'rgba(10,11,14,0.16)';
      ctx.fillRect(0, 0, cv.offsetWidth, cv.offsetHeight);
      ctx.font = `${fs}px ui-monospace, monospace`;
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * fs;
        const ch = chars[(Math.random() * chars.length) | 0];
        ctx.fillStyle = Math.random() > 0.97 ? '#F2CA50' : i % 7 === 0 ? 'rgba(212,175,55,0.55)' : 'rgba(0,240,255,0.45)';
        ctx.fillText(ch, i * fs, y);
        if (y > cv.offsetHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };
    raf = requestAnimationFrame(draw);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);
    addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className={className} />;
}

/** แถบความคืบหน้าการอ่าน (หน้าบทความ) */
export function ReadProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px]">
      <div ref={ref} className="h-full origin-left bg-gradient-to-r from-gold via-gold-bright to-cyan shadow-cyan" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
