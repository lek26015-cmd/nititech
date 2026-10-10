export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9020').replace(/\/$/, '');
export const SITE_NAME = 'NITI.TECH';
export const SITE_DESC =
  'ความรู้กฎหมายเทคโนโลยีไทยฉบับเข้าใจง่าย: PDPA อาชญากรรมไซเบอร์ AI ลิขสิทธิ์ แพลตฟอร์มดิจิทัล สินทรัพย์ดิจิทัล พร้อมเครื่องมือเช็กความพร้อม PDPA และสถานะกฎหมายล่าสุด';

export const LAWSLANE_URL = 'https://lawslane.com';
export const lawyerUrl = `${LAWSLANE_URL}/lawyers?utm_source=nititech&utm_medium=cta`;

/** JSON-LD: ลำดับหน้า (breadcrumb) */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
  };
}
