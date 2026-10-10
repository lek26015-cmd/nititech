// เนื้อหาให้ความรู้ทั่วไปด้านกฎหมายเทคโนโลยีไทย — ควรให้ทนายตรวจทานก่อนเผยแพร่จริง
// เรื่องที่ยังเป็นร่างหรือเปลี่ยนเร็ว (กฎหมาย AI, EU AI Act, เกณฑ์ ETDA) ให้ระบุสถานะและวันอัปเดตเสมอ
import type { Article, Category } from './types';
import { pdpa } from './articles/pdpa';
import { cyber } from './articles/cyber';
import { ai } from './articles/ai';
import { digital } from './articles/digital';
import { build } from './articles/build';
import { license } from './articles/license';
import { data } from './articles/data';
import { shorts } from './shorts';
import { lawslane } from '../lib/site';

const toLawyers = { href: lawslane.lawyers, label: 'ค้นหาทนายความบน Lawslane', desc: 'ทนายที่ผ่านการยืนยันตัวตนและใบอนุญาต ช่วยแจ้งความ ฟ้องคดี และเจรจา' };
const RKJ = { name: 'ราชกิจจานุเบกษา (ตัวบทกฎหมายฉบับทางการ)', href: 'https://ratchakitcha.soc.go.th' };
const ETDA = { name: 'สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA)', href: 'https://www.etda.or.th' };
const toAi = { href: lawslane.ai, label: 'ถาม Lawslane AI ผู้ช่วยกฎหมาย', desc: 'เล่าสถานการณ์ของคุณเป็นภาษาปกติ แล้วให้ AI อธิบายกฎหมายที่เกี่ยวข้องพร้อมตัวบทอ้างอิง' };

export type { Article, Category };

const pick = (slugs: string[]) => slugs.map((s) => digital.find((a) => a.slug === s)!);

const DBD = { name: 'กรมพัฒนาธุรกิจการค้า (จดทะเบียนพาณิชย์อิเล็กทรอนิกส์)', href: 'https://www.dbd.go.th' };
const BOT = { name: 'ธนาคารแห่งประเทศไทย', href: 'https://www.bot.or.th' };

export const categories: Category[] = [
  { id: 'build', image: '/images/lidar.jpg', code: 'BUILD_SAFE', short: 'สร้างระบบ', lawslane: { href: lawslane.lawyers, label: 'ให้ทนายตรวจระบบก่อนเปิดตัว', desc: 'ทนายด้านเทคโนโลยีบน Lawslane ช่วยร่าง Terms, Privacy Notice, สัญญาจ้างพัฒนา และ DPA' }, sources: [{ name: 'สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)', href: 'https://www.pdpc.or.th' }, ETDA, RKJ], title: 'สร้างระบบให้ถูกกฎหมาย', blurb: 'Privacy by Design ความปลอดภัย Open Source สัญญาจ้างพัฒนา Terms และข้อกำหนดของ App Store', articles: build },
  { id: 'license', image: '/images/delivery.jpg', code: 'LICENSE', short: 'ใบอนุญาต', lawslane: { href: lawslane.lawyers, label: 'ปรึกษาทนายเรื่องใบอนุญาตธุรกิจ', desc: 'ประเมินว่าโมเดลธุรกิจของคุณต้องขออนุญาตหน่วยงานใด ก่อนลงทุนพัฒนา' }, sources: [DBD, BOT, { name: 'สำนักงาน ก.ล.ต.', href: 'https://www.sec.or.th' }, RKJ], title: 'ใบอนุญาตก่อนเปิดระบบ', blurb: 'ระบบชำระเงิน สินเชื่อ ระดมทุน การแพทย์ทางไกล แอปเรียกรถ โทรคมนาคม โดรน ชิงโชค และภาษีบริการดิจิทัล', articles: license },
  { id: 'data', image: '/images/crossborder.jpg', code: 'DATA_CONSENT', short: 'เก็บข้อมูล', lawslane: toAi, sources: [{ name: 'สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)', href: 'https://www.pdpc.or.th' }, RKJ], title: 'ขอสิทธิ์เก็บข้อมูล', blurb: 'หน้าขอความยินยอม ตำแหน่งและกล้อง บัตรประชาชน กล้องวงจรปิด ติดตามพนักงาน ข้อมูลเด็ก ข้อมูลสุขภาพ และการตลาด', articles: data },
  { id: 'pdpa', image: '/images/crossborder.jpg', code: 'PDPA', short: 'PDPA', lawslane: toAi, sources: [{ name: 'สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)', href: 'https://www.pdpc.or.th' }, RKJ], title: 'ข้อมูลส่วนบุคคล (PDPA)', blurb: 'ฐานทางกฎหมาย ความยินยอม คุกกี้ เหตุข้อมูลรั่ว DPO และการส่งข้อมูลไปต่างประเทศ', articles: pdpa },
  { id: 'cyber', image: '/images/fiber.jpg', code: 'CYBER_CRIME', short: 'ไซเบอร์', lawslane: toLawyers, sources: [{ name: 'แจ้งความออนไลน์ สำนักงานตำรวจแห่งชาติ', href: 'https://www.thaipoliceonline.go.th' }, RKJ], title: 'อาชญากรรมไซเบอร์และโซเชียล', blurb: 'พ.ร.บ.คอมพิวเตอร์ หมิ่นประมาทออนไลน์ มิจฉาชีพ บัญชีม้า และการเจาะระบบ', articles: cyber },
  { id: 'ai', image: '/images/courtroom.jpg', code: 'AI_IP', short: 'AI & ลิขสิทธิ์', lawslane: toAi, sources: [ETDA, { name: 'กรมทรัพย์สินทางปัญญา', href: 'https://www.ipthailand.go.th' }, RKJ], title: 'AI และทรัพย์สินทางปัญญา', blurb: 'ลิขสิทธิ์งาน AI ข้อมูลเทรนโมเดล Deepfake ร่างกฎหมาย AI ไทย และ EU AI Act', articles: ai },
  { id: 'digital', image: '/images/smartcontract.jpg', code: 'DIGITAL_BIZ', short: 'ธุรกิจดิจิทัล', sources: [ETDA, { name: 'สำนักงานคณะกรรมการคุ้มครองผู้บริโภค (สคบ.)', href: 'https://www.ocpb.go.th' }, RKJ], lawslane: { href: lawslane.ai, label: 'ให้ Lawslane AI ช่วยอ่านสัญญาก่อนเซ็น', desc: 'ตรวจข้อสัญญาที่ควรระวัง และร่างหนังสือเบื้องต้นได้ด้วยตัวเอง' }, title: 'ธุรกิจดิจิทัลและสัญญาออนไลน์', blurb: 'ลายมือชื่ออิเล็กทรอนิกส์ แพลตฟอร์มดิจิทัล ETDA เงื่อนไขการใช้บริการ', articles: pick(['e-signature-validity', 'digital-platform-decree', 'online-contract-terms']) },
  { id: 'fintech', image: '/images/blockchain.jpg', code: 'FINTECH_SEC', short: 'คริปโต & ไซเบอร์', lawslane: toLawyers, sources: [{ name: 'สำนักงาน ก.ล.ต.', href: 'https://www.sec.or.th' }, { name: 'สำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ (สกมช.)', href: 'https://www.ncsa.or.th' }, RKJ], title: 'สินทรัพย์ดิจิทัลและความมั่นคงไซเบอร์', blurb: 'ใบอนุญาตคริปโต ICO และหน้าที่ของหน่วยงานโครงสร้างพื้นฐานสำคัญ', articles: pick(['digital-assets-license', 'cybersecurity-act']) },
];

export const allArticles = categories.flatMap((c) => c.articles.map((a) => ({ ...a, category: c })));
export type FullArticle = (typeof allArticles)[number];

/** เวลาอ่านโดยประมาณ (ภาษาไทย ~500 ตัวอักษร/นาที) */
export function readingMinutes(a: Article): number {
  const chars = [a.summary, ...a.points.flatMap((p) => [p.heading, p.body]), ...(a.faq ?? []).flatMap((f) => [f.q, f.a])].join('').length;
  return Math.max(1, Math.round(chars / 500));
}

/** รหัสอ้างอิงบนการ์ด เช่น PDPA-03 */
export const refOf = (a: FullArticle) => `${a.category.code.split('_')[0]}-${String(a.category.articles.findIndex((x) => x.slug === a.slug) + 1).padStart(2, '0')}`;

/** ภาพเฉพาะบทความ (ไม่มี = ใช้ภาพหมวด) */
const articleImages: Record<string, string> = {
  'cross-border-transfer': '/images/crossborder.jpg',
  'ride-hailing-delivery-license': '/images/delivery.jpg',
  'digital-assets-license': '/images/blockchain.jpg',
  'e-signature-validity': '/images/smartcontract.jpg',
  'software-dev-contract-ip': '/images/smartcontract.jpg',
  'ai-feature-in-product': '/images/courtroom.jpg',
  'payment-system-license': '/images/blockchain.jpg',
  'unauthorized-access-hacking': '/images/fiber.jpg',
  'security-measures-pdpa': '/images/fiber.jpg',
};
export const imageOf = (a: FullArticle) => articleImages[a.slug] ?? a.category.image;

export const toCard = (a: FullArticle) => ({
  slug: a.slug, image: imageOf(a), title: a.title, summary: a.summary, category: a.category.short, categoryId: a.category.id, minutes: readingMinutes(a), ref: refOf(a),
});
/** ชื่อสั้นของบทความ (ไม่มีให้ใช้ส่วนก่อน ":" ของชื่อเต็ม) */
export const shortOf = (a: Article) => shorts[a.slug] ?? a.title.split(':')[0];
export const findArticle = (slug: string) => allArticles.find((a) => a.slug === slug);

/** ชื่อสำหรับ <title> และภาพแชร์: ชื่อเต็มยาวเกิน ~60 ตัวอักษรให้ใช้ส่วนก่อน ":" ซึ่งเป็นคำค้นหลัก */
export const metaTitleOf = (a: Article) => (a.title.length <= 60 ? a.title : a.title.split(':')[0].trim());
