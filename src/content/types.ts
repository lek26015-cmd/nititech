export interface Article {
  slug: string;
  title: string;
  /** ใช้เป็น meta description (ประมาณ 120–160 ตัวอักษร) */
  summary: string;
  audience: string;
  /** มาตราที่อ้างอิง แสดงท้ายบทความ */
  laws?: string[];
  /** body: แยกย่อหน้าด้วยบรรทัดว่าง, บรรทัดที่ขึ้นต้นด้วย "- " เป็นรายการ */
  points: { heading: string; body: string }[];
  faq?: { q: string; a: string }[];
  related?: string[];
  tool?: { href: string; label: string };
}

export interface Category {
  id: string;
  /** รหัสสั้นแบบ mono เช่น PDPA, CYBER */
  code: string;
  /** ชื่อหมวดแบบสั้น ใช้บนการ์ด */
  short: string;
  /** ภาพประกอบหมวด (public/images) */
  image: string;
  /** ลิงก์ไปบริการที่ตรงหมวดบน Lawslane */
  lawslane: { href: string; label: string; desc: string };
  /** แหล่งข้อมูลทางการของหน่วยงานรัฐ */
  sources: { name: string; href: string }[];
  title: string;
  blurb: string;
  articles: Article[];
}

export const UPDATED = '2026-10-11';
