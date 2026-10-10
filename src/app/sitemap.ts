import type { MetadataRoute } from 'next';
import { allArticles, categories } from '@/content/topics';
import { UPDATED } from '@/content/types';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [['', 1], ['/knowledge', 0.9], ['/radar', 0.8], ['/matrix', 0.7], ['/guide/launch-checklist', 0.9], ['/tools/pdpa-check', 0.8], ['/tools/breach-clock', 0.7], ['/about', 0.3]];
  return [
    ...pages.map(([p, priority]) => ({ url: `${SITE_URL}${p}`, lastModified: UPDATED, changeFrequency: 'weekly' as const, priority })),
    ...categories.map((c) => ({ url: `${SITE_URL}/category/${c.id}`, lastModified: UPDATED, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...allArticles.map((a) => ({ url: `${SITE_URL}/knowledge/${a.slug}`, lastModified: UPDATED, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ];
}
