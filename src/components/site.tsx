import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/content/topics';
import { lawyerUrl, lawslane } from '@/lib/site';
import { MobileNav } from './mobile-nav';

export const nav = [
  { href: '/knowledge', label: 'คลังความรู้' },
  { href: '/radar', label: 'สถานะกฎหมาย' },
  { href: '/matrix', label: 'แผนผังกฎหมาย' },
  { href: '/tools/pdpa-check', label: 'เช็ก PDPA' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 md:px-10">
        <Link href="/" aria-label="NITI.TECH หน้าแรก" className="group flex shrink-0 items-center gap-4">
          <Image src="/logo/wordmark-duo.png" alt="NITI.TECH" width={128} height={32} priority className="h-6 w-auto transition group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.35)] md:h-7" />
          <span className="hidden h-8 w-px bg-line-2 sm:block" />
          <span className="hidden leading-tight sm:block">
            <span className="block text-[13px] text-ink">กฎหมายเทคโนโลยี</span>
            <span className="label block text-gold">by Lawslane</span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-7 text-sm text-ink-2 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition hover:text-ink">{n.label}</Link>
          ))}
        </nav>
        <a href={lawyerUrl} className="btn-gold ml-auto hidden !px-4 !py-2 md:ml-0 md:inline-flex">ปรึกษาทนาย</a>
        <MobileNav items={nav} lawyerUrl={lawyerUrl} />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-void-2/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Image src="/logo/wordmark-duo.png" alt="NITI.TECH" width={128} height={32} className="h-8 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-2">
            พื้นที่ความรู้กฎหมายเทคโนโลยีไทย ข้อมูลส่วนบุคคล อาชญากรรมไซเบอร์ AI และธุรกิจดิจิทัล จัดทำโดย <a href={lawslane.home} className="text-gold hover:underline">Lawslane</a> แพลตฟอร์มปรึกษาทนายความออนไลน์
          </p>
          <p className="mt-4 chip"><span className="dot" /> STATUS // LIVE</p>
        </div>
        <div>
          <p className="index">หมวดความรู้</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {categories.map((c) => (
              <li key={c.id}><Link href={`/category/${c.id}`} className="hover:text-gold">{c.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="index">เครื่องมือ</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            <li><Link href="/tools/pdpa-check" className="hover:text-gold">เช็กความพร้อม PDPA</Link></li>
            <li><Link href="/tools/breach-clock" className="hover:text-gold">นาฬิกาแจ้งเหตุข้อมูลรั่ว 72 ชม.</Link></li>
            <li><Link href="/radar" className="hover:text-gold">สถานะกฎหมายเทคโนโลยี</Link></li>
            <li><Link href="/matrix" className="hover:text-gold">แผนผังกฎหมายตามกรณีใช้งาน</Link></li>
            <li><Link href="/about" className="hover:text-gold">เกี่ยวกับเราและนโยบายความเป็นส่วนตัว</Link></li>
          </ul>
        </div>
        <div>
          <p className="index">จาก Lawslane</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            <li><a href={lawslane.lawyers} className="hover:text-gold">ค้นหาทนายความ</a></li>
            <li><a href={lawslane.ai} className="hover:text-gold">Lawslane AI ผู้ช่วยกฎหมาย</a></li>
            <li><a href={lawslane.forms} className="hover:text-gold">แบบฟอร์มกฎหมาย</a></li>
            <li><a href={lawslane.articles} className="hover:text-gold">บทความกฎหมาย</a></li>
          </ul>
        </div>
      </div>
      <div className="rule">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-ink-3 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="code">© {new Date().getFullYear()} NITI.TECH // BY LAWSLANE</p>
          <p className="max-w-2xl text-xs leading-relaxed">
            ข้อมูลในเว็บไซต์นี้เป็นความรู้ทั่วไปเพื่อการศึกษา ไม่ใช่คำปรึกษาทางกฎหมาย ข้อเท็จจริงแต่ละกรณีต่างกัน หากเป็นเรื่องสำคัญควรปรึกษาทนายความ
          </p>
        </div>
      </div>
    </footer>
  );
}

export function LawyerCta({ text = 'เรื่องของคุณซับซ้อนหรือมีความเสี่ยงทางกฎหมาย? ให้ทนายความที่ผ่านการยืนยันตัวตนบน Lawslane ช่วยดูให้' }: { text?: string }) {
  return (
    <div className="glass-2 relative overflow-hidden p-6 shadow-aureum">
      <p className="index">ADVISORY // LAWSLANE</p>
      <p className="mt-2 font-serif text-xl leading-snug text-ink">{text}</p>
      <a href={lawyerUrl} className="btn-gold mt-5">ปรึกษาทนายบน Lawslane <ArrowUpRight size={16} /></a>
    </div>
  );
}

export function Disclaimer({ children }: { children?: React.ReactNode }) {
  return (
    <p className="rounded border border-amber/30 bg-amber/[0.06] px-4 py-3 text-sm leading-relaxed text-amber-soft">
      {children ?? 'เนื้อหานี้เป็นข้อมูลทั่วไปเพื่อการศึกษา ไม่ใช่คำแนะนำทางกฎหมายสำหรับกรณีของคุณ กฎหมายและประกาศลำดับรองอาจเปลี่ยนแปลง โปรดตรวจสอบฉบับล่าสุด'}
    </p>
  );
}

/** หัวข้อส่วนแบบมี index เช่น "DISPATCH // CORE INQUIRY" */
export function SectionHead({ index, title, desc, action }: { index: string; title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="label fx-caret text-gold">{index}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-[32px] md:leading-10">{title}</h2>
        {desc && <p className="mt-2 max-w-2xl text-sm text-ink-2">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
