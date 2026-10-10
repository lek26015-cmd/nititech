import type { Metadata } from 'next';
import Link from 'next/link';
import { useCases, riskLabel, type Risk } from '@/content/matrix';
import { findArticle, shortOf } from '@/content/topics';
import { Disclaimer, LawyerCta } from '@/components/site';

export const metadata: Metadata = {
  title: 'แผนผังกฎหมายตามกรณีใช้งานเทคโนโลยี',
  description: 'แชตบอต AI สแกนใบหน้า Generative AI มาร์เก็ตเพลส คริปโต และคลาวด์ต่างประเทศ ต้องดูกฎหมายอะไรบ้าง สรุปเป็นตารางเดียว',
  alternates: { canonical: '/matrix' },
};

const tone: Record<Risk, string> = {
  high: 'border-amber/60 bg-amber/10 text-amber',
  medium: 'border-gold/50 bg-gold/10 text-gold',
  watch: 'border-cyan/40 bg-cyan/10 text-cyan',
};

export default function Matrix() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-10">
        <p className="label text-gold">TAXONOMY // USE-CASE MAPPING</p>
        <h1 className="mt-3 font-serif text-4xl font-light md:text-5xl">แผนผังกฎหมายตามกรณีใช้งาน</h1>
        <p className="mt-3 max-w-2xl text-ink-2">
          โปรเจกต์เทคโนโลยีหนึ่งชิ้นมักโดนกฎหมายหลายฉบับพร้อมกัน ตารางนี้ช่วยให้เห็นภาพรวมว่าต้องเช็กอะไรบ้างก่อนเริ่ม
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((u, i) => (
            <article key={u.id} className="glass flex flex-col p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="index">CASE // {String(i + 1).padStart(2, '0')}</p>
                <span className={`label rounded-sm border px-2 py-1 ${tone[u.risk]}`}>{riskLabel[u.risk]}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold leading-snug">{u.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{u.scenario}</p>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {u.laws.map((l) => (
                  <li key={l.law} className="py-3">
                    <p className="code text-cyan">{l.law}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/85">{l.point}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2 pt-4">
                {u.articles.map(findArticle).filter((a) => a !== undefined).map((a) => (
                  <Link key={a.slug} href={`/knowledge/${a.slug}`} className="link-ghost w-fit">→ {shortOf(a)}</Link>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid max-w-4xl gap-4">
          <Disclaimer>ตารางนี้ช่วยชี้ประเด็นที่ควรตรวจ ไม่ได้ครอบคลุมทุกกฎหมายหรือทุกข้อเท็จจริง โครงการจริงควรให้ทนายประเมินความเสี่ยงเฉพาะกรณี</Disclaimer>
          <LawyerCta text="กำลังจะเปิดตัวผลิตภัณฑ์ใหม่? ให้ทนายตรวจความเสี่ยงทางกฎหมายก่อนขึ้นระบบจริง" />
        </div>
      </div>
    </div>
  );
}
