import type { Metadata } from 'next';
import Link from 'next/link';
import { findArticle, shortOf } from '@/content/topics';
import { Disclaimer, LawyerCta } from '@/components/site';
import { AdSlot } from '@/components/ads';
import { SITE_URL, breadcrumbLd } from '@/lib/site';

export const metadata: Metadata = {
  title: 'เช็กลิสต์กฎหมายก่อนเปิดระบบ แอป หรือเว็บไซต์',
  description: 'ไล่ทีละขั้นตั้งแต่ไอเดียจนถึงหลังเปิดตัว: ใบอนุญาต ชื่อแบรนด์ ออกแบบข้อมูลตาม PDPA ความปลอดภัย Terms คุกกี้ และแผนรับมือข้อมูลรั่ว พร้อมลิงก์บทความทุกข้อ',
  alternates: { canonical: '/guide/launch-checklist' },
};

const steps: { phase: string; title: string; items: { text: string; slug: string }[] }[] = [
  {
    phase: 'PHASE_01', title: 'ก่อนเขียนโค้ด: โมเดลธุรกิจผิดกฎหมายไหม ต้องขออนุญาตอะไร',
    items: [
      { text: 'ตรวจว่าธุรกิจต้องมีใบอนุญาตเฉพาะหรือไม่ (เงิน สุขภาพ ขนส่ง โทรคมนาคม ประกัน ชิงโชค)', slug: 'license-map-tech-business' },
      { text: 'ถ้ารับเงินแทนร้านค้าหรือมีกระเป๋าเงิน ตรวจกฎหมายระบบการชำระเงิน', slug: 'payment-system-license' },
      { text: 'ถ้าเป็นแพลตฟอร์มตัวกลาง ตรวจหน้าที่แจ้ง ETDA', slug: 'digital-platform-decree' },
      { text: 'จดเครื่องหมายการค้าชื่อแอปและแบรนด์', slug: 'trademark-app-name' },
    ],
  },
  {
    phase: 'PHASE_02', title: 'ออกแบบระบบ: เก็บข้อมูลเท่าที่จำเป็นและมีฐานทางกฎหมาย',
    items: [
      { text: 'ทำแผนที่ข้อมูลและเช็กลิสต์ Privacy by Design', slug: 'privacy-by-design-checklist' },
      { text: 'กำหนดฐานทางกฎหมายของแต่ละกิจกรรม แยกส่วนที่ต้องขอความยินยอม', slug: 'lawful-basis-consent' },
      { text: 'ออกแบบหน้าขอความยินยอมและศูนย์ตั้งค่าความเป็นส่วนตัว', slug: 'consent-flow-design' },
      { text: 'ถ้ามีข้อมูลอ่อนไหว ติดตามตำแหน่ง หรือใช้ AI ตัดสินใจ ทำ DPIA', slug: 'dpia-high-risk' },
      { text: 'กำหนดระยะเวลาเก็บและระบบลบข้อมูล', slug: 'data-retention-deletion' },
    ],
  },
  {
    phase: 'PHASE_03', title: 'ระหว่างพัฒนา: ความปลอดภัย โค้ด และผู้ให้บริการภายนอก',
    items: [
      { text: 'ทำมาตรฐานความปลอดภัยขั้นต่ำ: hash รหัสผ่าน เข้ารหัส MFA audit log', slug: 'security-measures-pdpa' },
      { text: 'ตรวจสัญญาอนุญาตของ Open Source ทุกตัว', slug: 'open-source-license-compliance' },
      { text: 'ถ้าจ้างคนอื่นพัฒนา ทำสัญญาให้ได้ซอร์สโค้ดและบัญชีทั้งหมด', slug: 'software-dev-contract-ip' },
      { text: 'ข้อมูลอยู่บนคลาวด์ต่างประเทศ จัดการเรื่องส่งข้อมูลข้ามแดน', slug: 'cross-border-transfer' },
      { text: 'ใส่ฟีเจอร์ AI: ตั้งค่าไม่ให้นำข้อมูลไปเทรน และแจ้งผู้ใช้', slug: 'ai-feature-in-product' },
    ],
  },
  {
    phase: 'PHASE_04', title: 'ก่อนเปิดตัว: เอกสาร เงื่อนไข และสโตร์',
    items: [
      { text: 'เขียน Terms of Service และ Privacy Notice แยกกัน', slug: 'app-terms-privacy-notice' },
      { text: 'ตั้งคุกกี้แบนเนอร์และเครื่องมือติดตามให้รอความยินยอม', slug: 'analytics-tracking-sdk' },
      { text: 'กรอกฉลากความเป็นส่วนตัวและทำปุ่มลบบัญชีให้ผ่าน App Store/Google Play', slug: 'app-store-privacy-requirements' },
      { text: 'จดทะเบียนพาณิชย์อิเล็กทรอนิกส์', slug: 'ecommerce-registration-dbd' },
      { text: 'ตรวจ UX ไม่ให้เป็น Dark Patterns', slug: 'dark-patterns-consumer' },
    ],
  },
  {
    phase: 'PHASE_05', title: 'หลังเปิดตัว: ดูแลต่อเนื่อง',
    items: [
      { text: 'มีขั้นตอนรับคำขอใช้สิทธิของเจ้าของข้อมูลภายใน 30 วัน', slug: 'data-subject-rights' },
      { text: 'มีแผนรับมือเหตุข้อมูลรั่วและแจ้ง สคส. ภายใน 72 ชั่วโมง', slug: 'data-breach-72-hours' },
      { text: 'ถ้าผู้ใช้โพสต์เนื้อหาได้ ต้องมีระบบแจ้งลบ', slug: 'ugc-platform-takedown' },
      { text: 'ประกาศนโยบายรับแจ้งช่องโหว่', slug: 'vulnerability-disclosure' },
      { text: 'มีขั้นตอนตอบคำขอข้อมูลจากเจ้าหน้าที่', slug: 'government-data-requests' },
    ],
  },
];

const howTo = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'เช็กลิสต์กฎหมายก่อนเปิดระบบ แอป หรือเว็บไซต์', inLanguage: 'th',
  step: steps.map((s, i) => ({
    '@type': 'HowToStep', position: i + 1, name: s.title,
    itemListElement: s.items.map((it) => ({ '@type': 'HowToDirection', text: it.text })),
    url: `${SITE_URL}/guide/launch-checklist#${s.phase.toLowerCase()}`,
  })),
};

export default function LaunchChecklist() {
  const total = steps.reduce((n, s) => n + s.items.length, 0);
  return (
    <div className="grid-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([howTo, breadcrumbLd([{ name: 'หน้าแรก', path: '/' }, { name: 'เช็กลิสต์ก่อนเปิดระบบ', path: '/guide/launch-checklist' }])]) }} />
      <div className="mx-auto max-w-5xl px-4 py-14 md:px-10">
        <p className="label fx-caret text-gold">GUIDE // LAUNCH_CHECKLIST</p>
        <h1 className="fx-in mt-3 font-serif text-4xl font-light md:text-5xl">เช็กลิสต์กฎหมายก่อนเปิดระบบ</h1>
        <p className="mt-3 max-w-2xl text-ink-2">{total} ข้อใน {steps.length} ช่วง ตั้งแต่ไอเดียจนถึงหลังเปิดตัว แต่ละข้อลิงก์ไปบทความที่อธิบายวิธีทำ ใช้ได้ทั้งแอป เว็บไซต์ SaaS และแพลตฟอร์ม</p>

        <ol className="mt-12 space-y-10">
          {steps.map((s, i) => (
            <li key={s.phase} id={s.phase.toLowerCase()} className="relative scroll-mt-24 border-l border-line pl-8" data-reveal>
              <span className="fx-ping absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-gold shadow-aureum" />
              <p className="code text-gold">{s.phase}</p>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">{i + 1}. {s.title}</h2>
              <ul className="mt-4 space-y-2" data-stagger>
                {s.items.map((it) => {
                  const a = findArticle(it.slug);
                  return (
                    <li key={it.slug} className="glass flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="flex gap-3 text-sm leading-relaxed"><span className="mt-1 h-3 w-3 shrink-0 rounded-sm border border-line-2" />{it.text}</span>
                      {a && <Link href={`/knowledge/${a.slug}`} className="link-ghost shrink-0 pl-6 sm:pl-0">→ {shortOf(a)}</Link>}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>

        <AdSlot placement="tool" />
        <div className="mt-14 grid gap-4">
          <Disclaimer>เช็กลิสต์นี้ครอบคลุมประเด็นที่พบบ่อย ธุรกิจเฉพาะทางอาจมีกฎหมายเพิ่มเติม ควรให้ทนายตรวจโมเดลธุรกิจก่อนลงทุนพัฒนา</Disclaimer>
          <LawyerCta text="อยากให้ทนายตรวจระบบทั้งชุดก่อนเปิดตัว? ปรึกษาทนายด้านเทคโนโลยีบน Lawslane" />
        </div>
      </div>
    </div>
  );
}
