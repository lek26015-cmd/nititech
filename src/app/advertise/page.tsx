import type { Metadata } from 'next';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { placements, ADS_CONTACT } from '@/content/sponsors';
import { allArticles } from '@/content/topics';

export const metadata: Metadata = {
  title: 'ลงโฆษณากับ NITI.TECH',
  description: 'เข้าถึงผู้ประกอบการ นักพัฒนา และทีมกฎหมายที่สนใจกฎหมายเทคโนโลยี ซื้อพื้นที่แบนเนอร์บนหน้าแรก บทความ และเครื่องมือของ NITI.TECH',
  alternates: { canonical: '/advertise' },
};

const audience = [
  'ผู้ก่อตั้งสตาร์ตอัปและเจ้าของธุรกิจออนไลน์',
  'นักพัฒนา CTO และทีมผลิตภัณฑ์',
  'DPO ฝ่ายกฎหมาย และฝ่าย Compliance',
  'นักการตลาดดิจิทัลและทีม Growth',
];
const fits = ['ซอฟต์แวร์และ SaaS สำหรับธุรกิจ', 'บริการด้าน PDPA ความปลอดภัยไซเบอร์ และ Cloud', 'สำนักงานกฎหมาย บัญชี และที่ปรึกษา', 'คอร์สเรียน งานสัมมนา และอีเวนต์เทค'];
const refuse = ['การพนันและเว็บเสี่ยงโชคที่ไม่ได้รับอนุญาต', 'สินเชื่อหรือแอปเงินกู้ที่ไม่ได้รับอนุญาต', 'คริปโต/การลงทุนที่ไม่ได้รับอนุญาตจาก ก.ล.ต.', 'สินค้าสุขภาพที่อวดอ้างเกินจริง', 'บริการที่ขัดต่อกฎหมายหรือเก็บข้อมูลโดยไม่ชอบ'];

export default function Advertise() {
  const contactIsMail = ADS_CONTACT.startsWith('mailto:');
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-10">
        <p className="label fx-caret text-gold">ADVERTISE // SPONSOR_SLOTS</p>
        <h1 className="fx-in mt-3 font-serif text-4xl font-light md:text-5xl">ลงโฆษณากับ NITI.TECH</h1>
        <p className="mt-3 max-w-2xl text-ink-2">
          แบนเนอร์ของคุณจะอยู่ข้างเนื้อหากฎหมายเทคโนโลยี {allArticles.length} บทความ และเครื่องมือที่ธุรกิจใช้ตรวจความพร้อมก่อนเปิดระบบ เข้าถึงคนที่กำลังตัดสินใจเรื่องระบบ ข้อมูล และกฎหมาย
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={ADS_CONTACT} target={contactIsMail ? undefined : '_blank'} rel={contactIsMail ? undefined : 'noopener'} className="btn-gold">ติดต่อซื้อพื้นที่โฆษณา <ArrowUpRight size={16} /></a>
        </div>

        <section className="mt-14 grid gap-6 md:grid-cols-2" data-stagger>
          <div className="glass p-6">
            <p className="index">AUDIENCE // ผู้อ่านของเรา</p>
            <ul className="mt-3 space-y-2 text-sm">{audience.map((a) => <li key={a} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-cyan" />{a}</li>)}</ul>
          </div>
          <div className="glass p-6">
            <p className="index">FIT // เหมาะกับแบรนด์</p>
            <ul className="mt-3 space-y-2 text-sm">{fits.map((a) => <li key={a} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-gold" />{a}</li>)}</ul>
          </div>
        </section>

        <section className="mt-14">
          <p className="label text-gold">INVENTORY // ตำแหน่งโฆษณา</p>
          <h2 className="mt-2 text-2xl font-semibold">ตำแหน่งและขนาดแบนเนอร์</h2>
          <div className="glass mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-line text-ink-3">
                <tr><th className="label p-4">ตำแหน่ง</th><th className="label p-4">อยู่ตรงไหน</th><th className="label p-4">จอใหญ่</th><th className="label p-4">มือถือ</th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {Object.entries(placements).map(([id, p]) => (
                  <tr key={id}>
                    <td className="p-4 font-semibold">{p.name}</td>
                    <td className="p-4 text-ink-2">{p.where}</td>
                    <td className="code p-4 text-cyan">{p.desktop}</td>
                    <td className="code p-4 text-ink-2">{p.mobile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-3">ไฟล์ PNG, JPG, WebP หรือ GIF ไม่เคลื่อนไหวเร็วเกินไป ขนาดไม่เกิน 300KB ต่อภาพ ส่งภาพจอใหญ่และมือถือแยกกันเพื่อความคมชัด</p>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="glass p-6">
            <p className="index">POLICY // แนวทาง</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              <li>แบนเนอร์ทุกชิ้นติดป้าย "ผู้สนับสนุน" ชัดเจน และลิงก์แบบ sponsored ตามแนวทางของ Google</li>
              <li>โฆษณาแยกจากเนื้อหาบทความ ผู้ลงโฆษณาไม่มีสิทธิ์แก้ไขหรือกำหนดเนื้อหา</li>
              <li>เราขอสงวนสิทธิ์ปฏิเสธโฆษณาที่ไม่เหมาะสมกับผู้อ่าน</li>
              <li>ไม่ติดตามหรือส่งข้อมูลส่วนบุคคลของผู้อ่านให้ผู้ลงโฆษณา</li>
            </ul>
          </div>
          <div className="glass p-6">
            <p className="index">REFUSED // ไม่รับโฆษณา</p>
            <ul className="mt-3 space-y-2 text-sm">{refuse.map((a) => <li key={a} className="flex gap-2"><X size={16} className="mt-0.5 shrink-0 text-amber" />{a}</li>)}</ul>
          </div>
        </section>

        <section className="glass-2 fx-orbit mt-14 p-8 text-center" data-reveal>
          <h2 className="font-serif text-3xl font-light">สนใจลงโฆษณา?</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-2">แจ้งชื่อแบรนด์ ตำแหน่งที่สนใจ และช่วงเวลาที่ต้องการ ทีมงานจะติดต่อกลับพร้อมราคาและจำนวนผู้เข้าชม</p>
          <a href={ADS_CONTACT} target={contactIsMail ? undefined : '_blank'} rel={contactIsMail ? undefined : 'noopener'} className="btn-gold mt-6">ติดต่อทีมงาน <ArrowUpRight size={16} /></a>
        </section>
      </div>
    </div>
  );
}
