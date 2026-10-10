import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allArticles, categories, toCard } from '@/content/topics';
import { ArticleCard } from '@/components/article-card';
import { LawyerCta } from '@/components/site';
import { breadcrumbLd } from '@/lib/site';

export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = categories.find((x) => x.id === id);
  if (!c) return {};
  return { title: c.title, description: c.blurb, alternates: { canonical: `/category/${c.id}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = categories.find((x) => x.id === id);
  if (!c) notFound();
  const list = allArticles.filter((a) => a.category.id === c.id);
  const ld = breadcrumbLd([{ name: 'หน้าแรก', path: '/' }, { name: 'คลังความรู้', path: '/knowledge' }, { name: c.title, path: `/category/${c.id}` }]);

  return (
    <div className="grid-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-10">
        <nav className="code text-ink-3"><Link href="/knowledge" className="hover:text-gold">คลังความรู้</Link> / {c.short}</nav>
        <h1 className="mt-4 font-serif text-4xl font-light md:text-5xl">{c.title}</h1>
        <p className="mt-3 max-w-2xl text-ink-2">{c.blurb}</p>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {categories.map((x) => (
            <Link key={x.id} href={`/category/${x.id}`} className={`shrink-0 rounded border px-3 py-1.5 text-sm ${x.id === c.id ? 'border-gold bg-gold text-void' : 'border-line-2 text-ink-2 hover:text-ink'}`}>{x.title}</Link>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => <ArticleCard key={a.slug} a={toCard(a)} />)}
        </div>
        <div className="mt-12 max-w-3xl"><LawyerCta /></div>
      </div>
    </div>
  );
}
