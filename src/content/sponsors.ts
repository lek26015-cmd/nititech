// ตำแหน่งโฆษณาและแบนเนอร์ที่ขายตรง (Direct Sponsor)
// เพิ่มผู้ลงโฆษณา: วางไฟล์ภาพใน public/sponsors/ แล้วเพิ่มรายการใน `sponsors` ด้านล่าง → commit/push
// ลำดับการแสดงในแต่ละช่อง: แบนเนอร์ขายตรงที่อยู่ในช่วงวันที่ → Google AdSense (ถ้าตั้งค่าและผู้ใช้ยินยอม) → ป้าย "ลงโฆษณากับเรา"

export type Placement = 'home-top' | 'home-mid' | 'article-mid' | 'article-end' | 'sidebar' | 'listing' | 'tool';

export const placements: Record<Placement, { name: string; where: string; desktop: string; mobile: string; adsenseEnv: string }> = {
  'home-top': { name: 'Leaderboard หน้าแรก', where: 'ใต้ส่วนบนสุดของหน้าแรก เห็นทันทีที่เข้าเว็บ', desktop: '970×90 หรือ 728×90', mobile: '320×100', adsenseEnv: 'NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP' },
  'home-mid': { name: 'แบนเนอร์กลางหน้าแรก', where: 'ระหว่างส่วนสถานะกฎหมายและแผนผังกฎหมาย', desktop: '970×250', mobile: '300×250', adsenseEnv: 'NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID' },
  'article-mid': { name: 'กลางบทความ', where: 'หลังหัวข้อที่ 2 ของทุกบทความ', desktop: '728×90', mobile: '300×250', adsenseEnv: 'NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_MID' },
  'article-end': { name: 'ท้ายบทความ', where: 'หลังจบเนื้อหาของทุกบทความ', desktop: '728×90', mobile: '300×250', adsenseEnv: 'NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE_END' },
  sidebar: { name: 'แถบข้างบทความ', where: 'คอลัมน์ข้างบทความ (เฉพาะจอใหญ่) ติดตามขณะเลื่อน', desktop: '300×250 หรือ 300×600', mobile: '— (ไม่แสดงบนมือถือ)', adsenseEnv: 'NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR' },
  listing: { name: 'ในหน้าคลังความรู้และหมวด', where: 'ระหว่างรายการบทความ', desktop: '970×90 หรือ 728×90', mobile: '320×100', adsenseEnv: 'NEXT_PUBLIC_ADSENSE_SLOT_LISTING' },
  tool: { name: 'หน้าเครื่องมือ', where: 'หน้าเช็กความพร้อม PDPA นาฬิกาข้อมูลรั่ว และเช็กลิสต์เปิดระบบ', desktop: '728×90', mobile: '320×100', adsenseEnv: 'NEXT_PUBLIC_ADSENSE_SLOT_TOOL' },
};

export interface Sponsor {
  placement: Placement;
  /** ชื่อแบรนด์ (แสดงใน alt และป้าย) */
  name: string;
  href: string;
  /** ภาพสำหรับจอใหญ่ เช่น /sponsors/acme-728x90.png */
  image: string;
  /** ภาพสำหรับมือถือ (ไม่ใส่ = ใช้ภาพเดียวกัน) */
  imageMobile?: string;
  width: number;
  height: number;
  /** ช่วงวันแสดง (YYYY-MM-DD, รวมวันสุดท้าย) */
  start: string;
  end: string;
}

/** ผู้ลงโฆษณาที่ซื้อพื้นที่ตรง — ตัวอย่าง:
 * { placement: 'home-top', name: 'Acme Legal Cloud', href: 'https://acme.example', image: '/sponsors/acme-970x90.png',
 *   imageMobile: '/sponsors/acme-320x100.png', width: 970, height: 90, start: '2026-11-01', end: '2026-11-30' },
 */
export const sponsors: Sponsor[] = [];

/** ป้ายของหน้า "ลงโฆษณา" — ติดต่อผ่านอีเมลที่ตั้งใน env หรือหน้าช่วยเหลือของ Lawslane */
export const ADS_CONTACT = process.env.NEXT_PUBLIC_ADS_CONTACT || 'https://www.lawslane.com/th/help';
