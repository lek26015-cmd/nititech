'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

type Ans = 'yes' | 'no' | 'na';
interface Q { id: string; group: string; text: string; fix: string; href: string }

const questions: Q[] = [
  { id: 'map', group: 'รู้จักข้อมูลของตัวเอง', text: 'รู้ว่าเก็บข้อมูลส่วนบุคคลอะไร จากช่องทางไหน และเก็บไว้ที่ไหนบ้าง', fix: 'ทำแผนผังข้อมูลแยกตามแผนก แล้วต่อยอดเป็น RoPA', href: '/knowledge/dpo-ropa' },
  { id: 'ropa', group: 'รู้จักข้อมูลของตัวเอง', text: 'มีบันทึกรายการกิจกรรมการประมวลผล (RoPA) ที่อัปเดตอยู่', fix: 'จัดทำ RoPA ระบุวัตถุประสงค์ ฐานกฎหมาย ระยะเวลาเก็บ ผู้รับข้อมูล', href: '/knowledge/dpo-ropa' },
  { id: 'basis', group: 'ฐานทางกฎหมาย', text: 'แต่ละกิจกรรมมีฐานทางกฎหมายชัดเจน ไม่ได้ขอความยินยอมไปหมดทุกเรื่อง', fix: 'ทบทวนว่ากิจกรรมใดใช้ฐานสัญญา หน้าที่ตามกฎหมาย หรือประโยชน์โดยชอบด้วยกฎหมายได้', href: '/knowledge/lawful-basis-consent' },
  { id: 'sensitive', group: 'ฐานทางกฎหมาย', text: 'ข้อมูลอ่อนไหว (สุขภาพ ใบหน้า ลายนิ้วมือ ศาสนา ฯลฯ) ได้รับความยินยอมโดยชัดแจ้ง หรือเข้าข้อยกเว้น', fix: 'แยกแบบฟอร์มขอความยินยอมสำหรับข้อมูลอ่อนไหว และลดการเก็บที่ไม่จำเป็น', href: '/knowledge/lawful-basis-consent' },
  { id: 'notice', group: 'ความโปร่งใส', text: 'มี Privacy Notice แจ้งก่อนหรือขณะเก็บข้อมูล ทั้งลูกค้าและพนักงาน', fix: 'เขียน Privacy Notice แยกกลุ่ม (ลูกค้า พนักงาน ผู้สมัครงาน ผู้มาติดต่อ)', href: '/knowledge/pdpa-basics' },
  { id: 'cookie', group: 'ความโปร่งใส', text: 'เว็บไซต์ไม่โหลดคุกกี้วิเคราะห์/โฆษณาก่อนผู้ใช้กดยินยอม และมีปุ่มปฏิเสธที่หาง่าย', fix: 'ตั้งค่า Consent Management ให้บล็อกสคริปต์จนกว่าจะได้รับความยินยอม', href: '/knowledge/cookie-consent' },
  { id: 'rights', group: 'สิทธิเจ้าของข้อมูล', text: 'มีช่องทางและขั้นตอนรับคำขอใช้สิทธิ ตอบได้ภายใน 30 วัน', fix: 'กำหนดผู้รับผิดชอบ แบบฟอร์ม วิธียืนยันตัวตน และทะเบียนคำขอ', href: '/knowledge/data-subject-rights' },
  { id: 'dpa', group: 'คู่ค้าและการส่งต่อ', text: 'มีสัญญาประมวลผลข้อมูล (DPA) กับผู้ให้บริการที่เข้าถึงข้อมูล เช่น คลาวด์ CRM ระบบส่งอีเมล', fix: 'ไล่รายชื่อผู้ให้บริการและเพิ่มข้อสัญญาคุ้มครองข้อมูล', href: '/knowledge/pdpa-basics' },
  { id: 'xborder', group: 'คู่ค้าและการส่งต่อ', text: 'รู้ว่าข้อมูลถูกส่งหรือเก็บในต่างประเทศที่ใด และมีมาตรการรองรับ', fix: 'ตรวจ region ของบริการทุกตัว และใช้ข้อสัญญามาตรฐานหรือมาตรการที่เหมาะสม', href: '/knowledge/cross-border-transfer' },
  { id: 'security', group: 'ความปลอดภัย', text: 'จำกัดสิทธิเข้าถึงตามหน้าที่ เปิดใช้ 2FA และสำรองข้อมูล', fix: 'กำหนดนโยบายสิทธิการเข้าถึง เปิด MFA ทุกบัญชีสำคัญ และทดสอบการกู้คืน', href: '/knowledge/data-breach-72-hours' },
  { id: 'breach', group: 'ความปลอดภัย', text: 'มีแผนรับมือเหตุข้อมูลรั่ว รู้ว่าใครต้องแจ้ง สคส. ภายใน 72 ชั่วโมง', fix: 'เขียน Incident Response Plan และซ้อมอย่างน้อยปีละครั้ง', href: '/tools/breach-clock' },
  { id: 'retention', group: 'ความปลอดภัย', text: 'กำหนดระยะเวลาเก็บข้อมูล และลบหรือทำให้ระบุตัวไม่ได้เมื่อครบกำหนด', fix: 'กำหนด Retention Policy ตามประเภทข้อมูลและตั้งรอบลบอัตโนมัติ', href: '/knowledge/dpo-ropa' },
];

const groups = [...new Set(questions.map((q) => q.group))];

export function PdpaCheck() {
  const [ans, setAns] = useState<Record<string, Ans>>({});
  const counted = questions.filter((q) => ans[q.id] && ans[q.id] !== 'na');
  const yes = counted.filter((q) => ans[q.id] === 'yes').length;
  const answered = Object.keys(ans).length;
  const pct = counted.length ? Math.round((yes / counted.length) * 100) : 0;
  const gaps = questions.filter((q) => ans[q.id] === 'no');
  const level = pct >= 85 ? { t: 'พร้อมดี', c: 'text-cyan' } : pct >= 50 ? { t: 'ยังมีช่องว่างสำคัญ', c: 'text-gold' } : { t: 'ความเสี่ยงสูง', c: 'text-amber' };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-8">
        {groups.map((g, gi) => (
          <section key={g}>
            <p className="index">MODULE_{String(gi + 1).padStart(2, '0')} // {g}</p>
            <div className="mt-3 space-y-3">
              {questions.filter((q) => q.group === g).map((q) => (
                <div key={q.id} className="glass flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-relaxed">{q.text}</p>
                  <div className="flex shrink-0 gap-1" role="radiogroup" aria-label={q.text}>
                    {([['yes', 'มีแล้ว'], ['no', 'ยังไม่มี'], ['na', 'ไม่เกี่ยว']] as const).map(([v, label]) => (
                      <button
                        key={v}
                        type="button"
                        role="radio"
                        aria-checked={ans[q.id] === v}
                        onClick={() => setAns({ ...ans, [q.id]: v })}
                        className={`rounded-sm border px-3 py-1.5 text-xs transition ${
                          ans[q.id] === v
                            ? v === 'yes' ? 'border-gold bg-gold text-void' : v === 'no' ? 'border-amber bg-amber/20 text-amber' : 'border-line-2 bg-white/10 text-ink'
                            : 'border-line-2 text-ink-2 hover:border-cyan hover:text-ink'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="glass-2 p-5 shadow-aureum" aria-live="polite">
          <p className="index">READINESS_SCORE</p>
          <p className="mt-2 font-serif text-6xl font-light text-gold-bright">{pct}<span className="text-2xl text-ink-2">%</span></p>
          <p className={`mt-1 text-sm font-semibold ${answered ? level.c : 'text-ink-3'}`}>{answered ? level.t : 'ตอบคำถามเพื่อดูผล'}</p>
          <div className="mt-4 h-1.5 w-full bg-white/10"><div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} /></div>
          <p className="code mt-2 text-ink-3">ANSWERED {answered}/{questions.length}</p>
          <p className="mt-4 text-xs leading-relaxed text-ink-3">คำตอบประมวลผลในเบราว์เซอร์ของคุณเท่านั้น ไม่มีการส่งหรือบันทึกไว้ที่ใด</p>
        </div>
        {gaps.length > 0 && (
          <div className="glass mt-4 p-5">
            <p className="index">ACTION_ITEMS // {gaps.length}</p>
            <ul className="mt-3 space-y-3">
              {gaps.map((q) => (
                <li key={q.id} className="text-sm">
                  <p className="leading-relaxed text-ink/85">{q.fix}</p>
                  <Link href={q.href} className="link-ghost mt-1">→ อ่านวิธีทำ</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {answered === questions.length && gaps.length === 0 && (
          <p className="glass mt-4 flex items-center gap-2 p-4 text-sm text-cyan"><Check size={16} /> ครบทุกข้อ อย่าลืมทบทวนทุกปีหรือเมื่อมีระบบใหม่</p>
        )}
      </aside>
    </div>
  );
}
