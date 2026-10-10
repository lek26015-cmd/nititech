import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allArticles, categories, toCard } from '@/content/topics';
import { ArticleCard } from '@/components/article-card';
import { LawyerCta } from '@/components/site';
import { AdSlot } from '@/components/ads';
import { SITE_URL, breadcrumbLd } from '@/lib/site';

export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = categories.find((x) => x.id === id);
  if (!c) return {};
  return { title: `${c.title} — รวมบทความ`, description: `${c.blurb} สรุปเข้าใจง่ายพร้อมเลขมาตราอ้างอิง`, alternates: { canonical: `/category/${c.id}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = categories.find((x) => x.id === id);
  if (!c) notFound();
  const list = allArticles.filter((a) => a.category.id === c.id);
  const ld = [
    breadcrumbLd([{ name: 'หน้าแรก', path: '/' }, { name: 'คลังความรู้', path: '/knowledge' }, { name: c.title, path: `/category/${c.id}` }]),
    {
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.title, description: c.blurb, inLanguage: 'th', url: `${SITE_URL}/category/${c.id}`,
      mainEntity: { '@type': 'ItemList', itemListElement: list.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/knowledge/${a.slug}`, name: a.title })) },
    },
  ];

  return (
    <div className="grid-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0" aria-hidden>
          <Image src={c.image} alt="" fill priority sizes="100vw" className="object-cover object-right-bottom opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-void/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-10 md:py-20">
          <nav className="code text-ink-3"><Link href="/knowledge" className="hover:text-gold">คลังความรู้</Link> / {c.short}</nav>
          <h1 className="fx-in mt-4 font-serif text-4xl font-light md:text-5xl">{c.title}</h1>
          <p className="mt-3 max-w-xl text-ink-2">{c.blurb}</p>
          <p className="chip mt-5"><span className="dot" />{list.length} บทความ</p>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 md:px-10">
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {categories.map((x) => (
            <Link key={x.id} href={`/category/${x.id}`} className={`shrink-0 rounded border px-3 py-1.5 text-sm ${x.id === c.id ? 'border-gold bg-gold text-void' : 'border-line-2 text-ink-2 hover:text-ink'}`}>{x.title}</Link>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {list.map((a) => <ArticleCard key={a.slug} a={toCard(a)} />)}
        </div>
        <AdSlot placement="listing" />
        <div className="mt-4 max-w-3xl"><LawyerCta /></div>
      </div>
    </div>
  );
}
