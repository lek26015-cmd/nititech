import type { Metadata } from 'next';
import Link from 'next/link';
import { LAWSLANE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'เกี่ยวกับ NITI.TECH และนโยบายความเป็นส่วนตัว',
  description: 'NITI.TECH เป็นพื้นที่ความรู้กฎหมายเทคโนโลยีไทยโดย Lawslane เว็บไซต์ไม่เก็บข้อมูลส่วนบุคคลของผู้อ่าน เครื่องมือทุกตัวประมวลผลในเบราว์เซอร์',
  alternates: { canonical: '/about' },
};

const blocks = [
  {
    code: 'SEC // 01', title: 'NITI.TECH คืออะไร',
    body: 'NITI.TECH (นิติ + เทค) เป็นพื้นที่ความรู้กฎหมายเทคโนโลยีไทยสำหรับคนทั่วไป ผู้ประกอบการ และทีมเทคโนโลยี ดำเนินการโดย Lawslane แพลตฟอร์มเชื่อมต่อผู้ใช้กับทนายความที่ผ่านการยืนยันตัวตน',
  },
  {
    code: 'SEC // 02', title: 'ข้อจำกัดของเนื้อหา',
    body: 'บทความเป็นข้อมูลทั่วไปเพื่อการศึกษา สรุปจากตัวบทกฎหมายและประกาศที่เผยแพร่ต่อสาธารณะ ณ วันที่ระบุ ไม่ใช่คำปรึกษาทางกฎหมายสำหรับกรณีเฉพาะ กฎหมายลำดับรองและร่างกฎหมายเปลี่ยนแปลงได้ หากพบข้อผิดพลาดโปรดแจ้งผ่าน Lawslane',
  },
  {
    code: 'SEC // 03', title: 'นโยบายความเป็นส่วนตัว',
    body: 'เว็บไซต์นี้ไม่มีระบบสมาชิก ไม่มีแบบฟอร์มเก็บข้อมูล และไม่ใช้คุกกี้เพื่อการโฆษณาหรือการติดตาม เครื่องมือ "เช็กความพร้อม PDPA" และ "นาฬิกาแจ้งเหตุข้อมูลรั่ว" ประมวลผลในเบราว์เซอร์ของคุณทั้งหมด ไม่มีการส่งคำตอบกลับมาที่เซิร์ฟเวอร์ ผู้ให้บริการโฮสติ้งอาจบันทึกข้อมูลทางเทคนิคพื้นฐาน (เช่น IP และเวลาเข้าถึง) เพื่อความปลอดภัยของระบบตามปกติ หากในอนาคตมีการเพิ่มระบบวิเคราะห์หรือคุกกี้ที่ไม่จำเป็น จะขอความยินยอมก่อนเสมอ',
  },
  {
    code: 'SEC // 04', title: 'ติดต่อ',
    body: 'ต้องการปรึกษาทนายความหรือแจ้งข้อผิดพลาดในเนื้อหา ติดต่อผ่าน Lawslane',
  },
];

export default function About() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-3xl px-4 py-14">
        <p className="label text-gold">ABOUT // PRIVACY_CENTER</p>
        <h1 className="mt-3 font-serif text-4xl font-light md:text-5xl">เกี่ยวกับเราและความเป็นส่วนตัว</h1>
        <div className="mt-10 space-y-4">
          {blocks.map((b) => (
            <section key={b.code} className="glass p-6">
              <p className="index">{b.code}</p>
              <h2 className="mt-1 text-lg font-semibold">{b.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-2">{b.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={LAWSLANE_URL} className="btn-gold">ไปที่ Lawslane</a>
          <Link href="/knowledge" className="btn-term">กลับไปคลังความรู้</Link>
        </div>
      </div>
    </div>
  );
}
