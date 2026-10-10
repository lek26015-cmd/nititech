import { renderOg, ogSize } from '@/lib/og';
import { allArticles, findArticle, metaTitleOf, readingMinutes } from '@/content/topics';

export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'NITI.TECH';

export function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = findArticle(slug);
  if (!a) return renderOg({ kicker: 'NITI.TECH', title: 'กฎหมายเทคโนโลยีไทย' });
  return renderOg({ kicker: a.category.title, title: metaTitleOf(a), sub: `อ่าน ${readingMinutes(a)} นาที ·` });
}
