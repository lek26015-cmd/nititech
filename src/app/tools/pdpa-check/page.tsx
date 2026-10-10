import type { Metadata } from 'next';
import { PdpaCheck } from '@/components/pdpa-check';
import { Disclaimer, LawyerCta } from '@/components/site';
import { AdSlot } from '@/components/ads';

export const metadata: Metadata = {
  title: 'เช็กความพร้อม PDPA ของธุรกิจ (ฟรี ไม่เก็บข้อมูล)',
  description: 'แบบประเมินตนเอง 12 ข้อ เช็กว่าธุรกิจของคุณทำตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคลครบหรือยัง พร้อมรายการสิ่งที่ต้องทำต่อ',
  alternates: { canonical: '/tools/pdpa-check' },
};

export default function Page() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-10">
        <p className="label text-gold">TOOL // PDPA_READINESS</p>
        <h1 className="fx-in mt-3 font-serif text-4xl font-light md:text-5xl">เช็กความพร้อม PDPA</h1>
        <p className="mt-3 max-w-2xl text-ink-2">ตอบ 12 ข้อ ใช้เวลาไม่ถึง 3 นาที เพื่อดูว่าธุรกิจของคุณยังขาดอะไร และควรเริ่มแก้ตรงไหนก่อน</p>
        <div className="mt-10"><PdpaCheck /></div>
        <AdSlot placement="tool" />
        <div className="mt-12 grid max-w-4xl gap-4">
          <Disclaimer>แบบประเมินนี้เป็นการตรวจเบื้องต้น ไม่ใช่การตรวจสอบ (Audit) หรือคำรับรองว่าปฏิบัติตามกฎหมายครบถ้วน</Disclaimer>
          <LawyerCta text="อยากให้ทนายช่วยร่าง Privacy Notice, DPA หรือตรวจระบบ PDPA ทั้งองค์กร?" />
        </div>
      </div>
    </div>
  );
}
