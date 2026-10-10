export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9020').replace(/\/$/, '');
export const SITE_NAME = 'NITI.TECH';
export const SITE_DESC =
  'ความรู้กฎหมายเทคโนโลยีไทยฉบับเข้าใจง่าย: PDPA อาชญากรรมไซเบอร์ AI ลิขสิทธิ์ แพลตฟอร์มดิจิทัล สินทรัพย์ดิจิทัล พร้อมเครื่องมือเช็กความพร้อม PDPA และสถานะกฎหมายล่าสุด';

// ลิงก์ไป Lawslane ต้องเป็น URL ปลายทางจริง (www + /th) — lawslane.com/xxx ต้อง redirect 307 → 308 ก่อนถึงหน้า
// ไม่ใส่ UTM เพื่อให้เป็นลิงก์สะอาดตรงกับ canonical ของ Lawslane (ยอด referral ยังเห็นจาก referrer)
export const LAWSLANE_URL = 'https://www.lawslane.com/th';
export const lawslane = {
  home: LAWSLANE_URL,
  lawyers: `${LAWSLANE_URL}/lawyers`,
  ai: `${LAWSLANE_URL}/ai`,
  forms: `${LAWSLANE_URL}/forms`,
  articles: `${LAWSLANE_URL}/articles`,
};
export const lawyerUrl = lawslane.lawyers;

/** JSON-LD: ลำดับหน้า (breadcrumb) */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}
