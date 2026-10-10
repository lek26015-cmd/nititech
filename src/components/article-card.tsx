import Link from 'next/link';
import { Clock } from 'lucide-react';

export interface CardArticle { slug: string; title: string; summary: string; category: string; categoryId: string; minutes: number; ref: string }

export function ArticleCard({ a, big = false }: { a: CardArticle; big?: boolean }) {
  return (
    <Link href={`/knowledge/${a.slug}`} className="glass group flex flex-col p-5 transition hover:border-line-2 hover:shadow-aureum">
      <div className="flex items-center justify-between gap-3">
        <span className="chip">{a.category}</span>
        <span className="index">{a.ref}</span>
      </div>
      <h3 className={`mt-4 font-semibold leading-snug text-ink transition group-hover:text-gold-bright ${big ? 'text-xl' : 'text-[17px]'}`}>{a.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-2">{a.summary}</p>
      <p className="mt-auto flex text-xs items-center gap-1.5 pt-4 text-ink-3"><Clock size={12} /> อ่าน {a.minutes} นาที</p>
    </Link>
  );
}
