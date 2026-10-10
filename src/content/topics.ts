// เนื้อหาให้ความรู้ทั่วไปด้านกฎหมายเทคโนโลยีไทย — ควรให้ทนายตรวจทานก่อนเผยแพร่จริง
// เรื่องที่ยังเป็นร่างหรือเปลี่ยนเร็ว (กฎหมาย AI, EU AI Act, เกณฑ์ ETDA) ให้ระบุสถานะและวันอัปเดตเสมอ
import type { Article, Category } from './types';
import { pdpa } from './articles/pdpa';
import { cyber } from './articles/cyber';
import { ai } from './articles/ai';
import { digital } from './articles/digital';

export type { Article, Category };

const pick = (slugs: string[]) => slugs.map((s) => digital.find((a) => a.slug === s)!);

export const categories: Category[] = [
  { id: 'pdpa', code: 'PDPA', title: 'ข้อมูลส่วนบุคคล (PDPA)', blurb: 'ฐานทางกฎหมาย ความยินยอม คุกกี้ เหตุข้อมูลรั่ว DPO และการส่งข้อมูลไปต่างประเทศ', articles: pdpa },
  { id: 'cyber', code: 'CYBER_CRIME', title: 'อาชญากรรมไซเบอร์และโซเชียล', blurb: 'พ.ร.บ.คอมพิวเตอร์ หมิ่นประมาทออนไลน์ มิจฉาชีพ บัญชีม้า และการเจาะระบบ', articles: cyber },
  { id: 'ai', code: 'AI_IP', title: 'AI และทรัพย์สินทางปัญญา', blurb: 'ลิขสิทธิ์งาน AI ข้อมูลเทรนโมเดล Deepfake ร่างกฎหมาย AI ไทย และ EU AI Act', articles: ai },
  { id: 'digital', code: 'DIGITAL_BIZ', title: 'ธุรกิจดิจิทัลและสัญญาออนไลน์', blurb: 'ลายมือชื่ออิเล็กทรอนิกส์ แพลตฟอร์มดิจิทัล ETDA เงื่อนไขการใช้บริการ', articles: pick(['e-signature-validity', 'digital-platform-decree', 'online-contract-terms']) },
  { id: 'fintech', code: 'FINTECH_SEC', title: 'สินทรัพย์ดิจิทัลและความมั่นคงไซเบอร์', blurb: 'ใบอนุญาตคริปโต ICO และหน้าที่ของหน่วยงานโครงสร้างพื้นฐานสำคัญ', articles: pick(['digital-assets-license', 'cybersecurity-act']) },
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

export const toCard = (a: FullArticle) => ({
  slug: a.slug, title: a.title, summary: a.summary, category: a.category.code, categoryId: a.category.id, minutes: readingMinutes(a), ref: refOf(a),
});
export const findArticle = (slug: string) => allArticles.find((a) => a.slug === slug);
