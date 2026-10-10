import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

export interface CardArticle { slug: string; title: string; summary: string; category: string; categoryId: string; minutes: number; ref: string; image: string }

/** การ์ดบทความแบบภาพนำ (ตาม mockup) — ข้อความสั้น: ชื่อเรื่อง + สรุป 2 บรรทัด */
export function ArticleCard({ a, big = false }: { a: CardArticle; big?: boolean }) {
  return (
    <Link href={`/knowledge/${a.slug}`} className="glass group flex flex-col overflow-hidden transition hover:border-line-2 hover:shadow-aureum">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        <Image src={a.image} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-void/40" />
        <span className="chip absolute left-3 top-3 !bg-black/70 backdrop-blur">{a.category}</span>
        <span className="index absolute right-3 top-3 rounded-sm bg-black/60 px-1.5 py-0.5 !text-ink-2">{a.ref}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className={`font-semibold leading-snug text-ink transition group-hover:text-gold-bright ${big ? 'text-lg' : 'text-base'}`}>{a.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-2">{a.summary}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-ink-3"><Clock size={12} /> อ่าน {a.minutes} นาที</p>
      </div>
    </Link>
  );
}
