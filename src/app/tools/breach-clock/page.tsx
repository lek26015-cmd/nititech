import type { Metadata } from 'next';
import Link from 'next/link';
import { BreachClock } from '@/components/breach-clock';
import { Disclaimer, LawyerCta } from '@/components/site';
import { AdSlot } from '@/components/ads';

export const metadata: Metadata = {
  title: 'นาฬิกาแจ้งเหตุข้อมูลรั่ว 72 ชั่วโมง (PDPA มาตรา 37)',
  description: 'คำนวณเส้นตายแจ้งเหตุละเมิดข้อมูลส่วนบุคคลต่อ สคส. ภายใน 72 ชั่วโมง พร้อมลำดับงานรับมือที่ควรทำในแต่ละช่วงเวลา',
  alternates: { canonical: '/tools/breach-clock' },
};

export default function Page() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-10">
        <p className="label text-amber">INCIDENT // BREACH_CLOCK</p>
        <h1 className="fx-in mt-3 font-serif text-4xl font-light md:text-5xl">นาฬิกาแจ้งเหตุข้อมูลรั่ว 72 ชั่วโมง</h1>
        <p className="mt-3 max-w-2xl text-ink-2">
          PDPA มาตรา 37(4) กำหนดให้แจ้ง สคส. โดยไม่ชักช้าภายใน 72 ชั่วโมงนับแต่ทราบเหตุ ใส่เวลาที่ทราบเหตุเพื่อดูเส้นตายและลำดับงาน
          — อ่านรายละเอียดใน <Link href="/knowledge/data-breach-72-hours" className="text-gold underline-offset-4 hover:underline">บทความขั้นตอนแจ้งเหตุ</Link>
        </p>
        <div className="mt-10"><BreachClock /></div>
        <AdSlot placement="tool" />
        <div className="mt-12 grid max-w-4xl gap-4">
          <Disclaimer>เครื่องมือนี้ช่วยคำนวณเวลาเท่านั้น การตัดสินว่าต้องแจ้งหรือไม่ขึ้นกับการประเมินความเสี่ยงของแต่ละเหตุ</Disclaimer>
          <LawyerCta text="กำลังเผชิญเหตุข้อมูลรั่ว? ปรึกษาทนายทันทีเพื่อเตรียมการแจ้งเหตุและลดความเสี่ยงคดี" />
        </div>
      </div>
    </div>
  );
}
