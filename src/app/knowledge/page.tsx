import type { Metadata } from 'next';
import { categories, toCard, allArticles } from '@/content/topics';
import { KnowledgeSearch, type KCategory } from '@/components/knowledge-search';

export const metadata: Metadata = {
  title: 'คลังความรู้กฎหมายเทคโนโลยี',
  description: 'รวมบทความกฎหมายเทคโนโลยีไทย PDPA พ.ร.บ.คอมพิวเตอร์ AI ลิขสิทธิ์ แพลตฟอร์มดิจิทัล สินทรัพย์ดิจิทัล ค้นหาตามคำหรือเลขมาตราได้',
  alternates: { canonical: '/knowledge' },
};

const data: KCategory[] = categories.map((c) => ({
  id: c.id, code: c.code, title: c.title, blurb: c.blurb,
  articles: allArticles.filter((a) => a.category.id === c.id).map((a) => ({
    ...toCard(a),
    laws: a.laws ?? [],
    text: [a.title, a.summary, ...(a.laws ?? []), ...a.points.flatMap((p) => [p.heading, p.body]), ...(a.faq ?? []).flatMap((f) => [f.q, f.a])].join(' ').toLowerCase(),
  })),
}));

export default function Knowledge() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-10">
        <p className="label text-gold">ARCHIVE // KNOWLEDGE_BASE</p>
        <h1 className="mt-3 font-serif text-4xl font-light leading-tight md:text-5xl">คลังความรู้กฎหมายเทคโนโลยี</h1>
        <p className="mt-3 max-w-2xl text-ink-2">{allArticles.length} บทความใน {categories.length} หมวด เขียนให้คนทั่วไป ผู้ประกอบการ และทีมเทคโนโลยีอ่านเข้าใจ พร้อมเลขมาตราที่อ้างอิง</p>
        <KnowledgeSearch categories={data} />
      </div>
    </div>
  );
}
