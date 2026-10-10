import type { Metadata } from 'next';
import Link from 'next/link';
import { radar, statusLabel, type RadarStatus } from '@/content/radar';
import { UPDATED } from '@/content/types';
import { findArticle, shortOf } from '@/content/topics';
import { StatusChip } from '@/components/radar-list';
import { Disclaimer, LawyerCta } from '@/components/site';

export const metadata: Metadata = {
  title: 'สถานะกฎหมายเทคโนโลยีไทย (Legislative Radar)',
  description: 'ติดตามสถานะกฎหมายเทคโนโลยีที่มีผลบังคับใช้และร่างกฎหมาย: PDPA พ.ร.บ.คอมพิวเตอร์ พ.ร.ก.อาชญากรรมเทคโนโลยี แพลตฟอร์มดิจิทัล ร่างกฎหมาย AI และ EU AI Act',
  alternates: { canonical: '/radar' },
};

const order: RadarStatus[] = ['draft', 'foreign', 'in-force'];

export default function Radar() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-10">
        <p className="label text-gold">REGULATORY_TRACKER // LEGISLATIVE RADAR</p>
        <h1 className="mt-3 font-serif text-4xl font-light md:text-5xl">สถานะกฎหมายเทคโนโลยี</h1>
        <p className="mt-3 max-w-2xl text-ink-2">กฎหมายหลักที่ธุรกิจและผู้ใช้เทคโนโลยีในไทยต้องรู้ แยกตามสถานะ พร้อมหน่วยงานที่กำกับและบทความสรุป</p>
        <p className="chip mt-5"><span className="dot" /> อัปเดต {new Date(UPDATED).toLocaleDateString('th-TH', { dateStyle: 'long' })}</p>

        {order.map((s) => {
          const items = radar.filter((r) => r.status === s);
          if (!items.length) return null;
          return (
            <section key={s} className="mt-12">
              <h2 className="flex items-center gap-3 text-xl font-semibold">{statusLabel[s]} <span className="code text-ink-3">{items.length}</span></h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {items.map((r) => (
                  <article key={r.id} className="glass flex flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <StatusChip s={r.status} />
                      <p className="code text-right text-ink-3">{r.when}</p>
                    </div>
                    <h3 className="mt-3 font-semibold leading-snug">{r.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{r.note}</p>
                    <p className="code mt-3 text-ink-3">หน่วยงานกำกับ: {r.regulator}</p>
                    <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-4">
                      {r.articles.map(findArticle).filter((a) => a !== undefined).map((a) => (
                        <Link key={a.slug} href={`/knowledge/${a.slug}`} className="link-ghost">→ {shortOf(a)}</Link>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <div className="mt-12 grid max-w-4xl gap-4">
          <Disclaimer>สถานะและวันที่สรุปจากข้อมูลที่เผยแพร่ต่อสาธารณะ ณ วันที่อัปเดต กฎหมายลำดับรองและร่างกฎหมายเปลี่ยนแปลงได้ ตรวจสอบราชกิจจานุเบกษาและเว็บไซต์หน่วยงานก่อนใช้อ้างอิง</Disclaimer>
          <LawyerCta text="ต้องการประเมินว่ากฎหมายใหม่กระทบธุรกิจของคุณอย่างไร? ปรึกษาทนายด้านเทคโนโลยีบน Lawslane" />
        </div>
      </div>
    </div>
  );
}
