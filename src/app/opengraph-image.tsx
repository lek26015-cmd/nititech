import { renderOg, ogSize } from '@/lib/og';

export const alt = 'NITI.TECH — ความรู้กฎหมายเทคโนโลยีไทย';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOg({ kicker: 'กฎหมายเทคโนโลยีไทย · BY LAWSLANE', title: 'ถอดรหัสกฎหมายเทคโนโลยี ให้คนทำงานดิจิทัลใช้ได้จริง', sub: 'PDPA · ไซเบอร์ · AI · ธุรกิจดิจิทัล' });
}
