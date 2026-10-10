import type { MetadataRoute } from 'next';
import { allArticles, categories } from '@/content/topics';
import { UPDATED } from '@/content/types';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/knowledge', '/radar', '/matrix', '/tools/pdpa-check', '/tools/breach-clock', '/about'];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: UPDATED })),
    ...categories.map((c) => ({ url: `${SITE_URL}/category/${c.id}`, lastModified: UPDATED })),
    ...allArticles.map((a) => ({ url: `${SITE_URL}/knowledge/${a.slug}`, lastModified: UPDATED })),
  ];
}
