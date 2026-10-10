'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { ArticleCard, type CardArticle } from './article-card';
import { AdSlot } from './ads';

export interface KArticle extends CardArticle { laws: string[]; text: string }
export interface KCategory { id: string; code: string; title: string; blurb: string; articles: KArticle[] }

const chips = ['PDPA', 'คุกกี้', 'ข้อมูลรั่ว', 'Deepfake', 'ลิขสิทธิ์ AI', 'บัญชีม้า', 'มาตรา 14', 'ลายเซ็นอิเล็กทรอนิกส์'];

// "ม.14" / "มาตรา 14" ให้ค้นเจอเหมือนกัน
const norm = (s: string) => s.toLowerCase().replace(/ม\.\s*/g, 'มาตรา ').replace(/\s+/g, ' ').trim();

// ตัวเลขต้องตรงทั้งจำนวน: "16" ไม่ไปเจอ "160" หรือ "116"
const matcher = (w: string) => {
  const esc = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`${/^\d/.test(w) ? '(?<!\\d)' : ''}${esc}${/\d$/.test(w) ? '(?!\\d)' : ''}`);
  return (t: string) => re.test(t);
};

export function KnowledgeSearch({ categories }: { categories: KCategory[] }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  useEffect(() => {
    const init = new URLSearchParams(window.location.search).get('q');
    if (init) setQ(init);
  }, []);
  const term = norm(q);
  const scoped = useMemo(() => categories.filter((c) => cat === 'all' || c.id === cat), [categories, cat]);

  const results = useMemo(() => {
    if (!term) return [];
    const words = term.split(' ').filter(Boolean).map(matcher);
    return scoped
      .flatMap((c) => c.articles)
      .map((a) => {
        const title = norm(a.title);
        const laws = norm(a.laws.join(' '));
        const summary = norm(a.summary);
        const text = norm(a.text);
        if (!words.every((m) => m(text))) return { a, score: 0 };
        let score = 0;
        for (const m of words) {
          if (m(title)) score += 5;
          if (m(laws)) score += 4;
          if (m(summary)) score += 2;
          score += 1;
        }
        return { a, score };
      })
      .filter((x) => x.score > 0)
      .sort((x, y) => y.score - x.score)
      .map((x) => x.a);
  }, [scoped, term]);

  return (
    <>
      <div className="relative mt-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" size={18} />
        <input
          className="field !py-3.5 pl-11"
          placeholder="ค้นหา เช่น คุกกี้ ข้อมูลรั่ว Deepfake มาตรา 14"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="ค้นหาความรู้กฎหมายเทคโนโลยี"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button key={c} type="button" onClick={() => setQ(c)} className="chip transition hover:border-cyan hover:text-ink">{c}</button>
        ))}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="กรองตามหมวดหมู่">
        {[{ id: 'all', title: 'ทั้งหมด' }, ...categories].map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`shrink-0 rounded border px-3 py-1.5 text-sm transition ${cat === c.id ? 'border-gold bg-gold text-void' : 'border-line-2 text-ink-2 hover:text-ink'}`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {term ? (
        <section className="mt-10" aria-live="polite">
                    <h2 className="mt-1 text-lg font-semibold">พบ {results.length} บทความ</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((a) => <ArticleCard key={a.slug} a={a} />)}
          </div>
          {results.length === 0 && <p className="glass mt-3 p-5 text-ink-2">ไม่พบบทความที่ตรงกัน ลองใช้คำอื่น หรือเลือกหมวดหมู่ด้านบน</p>}
        </section>
      ) : (
        scoped.map((c, idx) => (
          <div key={c.id}>
          {idx === 2 && <AdSlot placement="listing" />}
          <section id={c.id} className="mt-12 scroll-mt-24">
            <p className="label text-gold">{c.code}</p>
            <h2 className="mt-1 text-xl font-semibold"><Link href={`/category/${c.id}`} className="hover:text-gold-bright">{c.title}</Link></h2>
            <p className="mt-1 text-sm text-ink-2">{c.blurb}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {c.articles.map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </section>
          </div>
        ))
      )}
    </>
  );
}
