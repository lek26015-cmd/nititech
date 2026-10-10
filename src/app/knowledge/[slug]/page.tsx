import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { allArticles, findArticle, readingMinutes, refOf, toCard } from '@/content/topics';
import { UPDATED } from '@/content/types';
import { ArticleCard } from '@/components/article-card';
import { LawyerCta, Disclaimer } from '@/components/site';
import { SITE_URL, SITE_NAME, breadcrumbLd } from '@/lib/site';

export function generateStaticParams() {
  return allArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = findArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: `/knowledge/${a.slug}` },
    openGraph: { type: 'article', title: a.title, description: a.summary, siteName: SITE_NAME, locale: 'th_TH' },
  };
}

function Body({ text }: { text: string }) {
  return (
    <div className="prose-niti">
      {text.split('\n\n').map((block, i) => {
        const lines = block.split('\n');
        const items = lines.filter((l) => l.startsWith('- '));
        if (items.length === 0) return <p key={i} className="whitespace-pre-line">{block}</p>;
        const lead = lines.filter((l) => !l.startsWith('- '));
        return (
          <div key={i}>
            {lead.length > 0 && <p>{lead.join('\n')}</p>}
            <ul>{items.map((l, j) => <li key={j}>{l.slice(2)}</li>)}</ul>
          </div>
        );
      })}
    </div>
  );
}

const thaiDate = (d: string) => new Date(d).toLocaleDateString('th-TH', { dateStyle: 'long' });

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = findArticle(slug);
  if (!a) notFound();
  const related = (a.related ?? []).map(findArticle).filter((x) => x !== undefined);

  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.summary, inLanguage: 'th', isAccessibleForFree: true,
      datePublished: UPDATED, dateModified: UPDATED, articleSection: a.category.title, keywords: (a.laws ?? []).join(', '),
      mainEntityOfPage: `${SITE_URL}/knowledge/${a.slug}`,
      author: { '@type': 'Organization', name: SITE_NAME }, publisher: { '@type': 'Organization', name: SITE_NAME },
    },
    breadcrumbLd([{ name: 'หน้าแรก', path: '/' }, { name: 'คลังความรู้', path: '/knowledge' }, { name: a.category.title, path: `/category/${a.category.id}` }, { name: a.title, path: `/knowledge/${a.slug}` }]),
  ];
  if (a.faq?.length) {
    jsonLd.push({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }

  return (
    <div className="grid-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 md:px-10">
          <nav aria-label="breadcrumb" className="code flex flex-wrap gap-2 text-ink-3">
            <Link href="/" className="hover:text-gold">HOME</Link>/<Link href="/knowledge" className="hover:text-gold">ARCHIVE</Link>/
            <Link href={`/category/${a.category.id}`} className="hover:text-gold">{a.category.code}</Link>/<span className="text-ink-2">{refOf(a)}</span>
          </nav>
          <h1 className="mt-5 max-w-4xl font-serif text-[32px] font-light leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">{a.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">{a.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="chip"><span className="dot" />{a.category.title}</span>
            <span className="chip">{readingMinutes(a)} MIN READ</span>
            <span className="chip">UPDATED {UPDATED}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="order-2 lg:order-1">
          <div className="space-y-4 lg:sticky lg:top-24">
            <nav aria-label="ในบทความนี้" className="glass p-4">
              <p className="index">INDEX // ในบทความนี้</p>
              <ol className="mt-3 space-y-2 text-sm">
                {a.points.map((p, i) => (
                  <li key={p.heading} className="flex gap-2">
                    <span className="code text-gold">{String(i + 1).padStart(2, '0')}</span>
                    <a href={`#sec-${i + 1}`} className="text-ink-2 hover:text-ink">{p.heading}</a>
                  </li>
                ))}
                {a.faq && a.faq.length > 0 && (
                  <li className="flex gap-2"><span className="code text-gold">Q&A</span><a href="#faq" className="text-ink-2 hover:text-ink">คำถามที่พบบ่อย</a></li>
                )}
              </ol>
            </nav>
            <div className="glass p-4 text-sm">
              <p className="index">AUDIENCE</p>
              <p className="mt-2 text-ink-2">{a.audience}</p>
            </div>
          </div>
        </aside>

        <article className="order-1 min-w-0 max-w-3xl lg:order-2">
          <div className="space-y-10">
            {a.points.map((p, i) => (
              <section key={p.heading} id={`sec-${i + 1}`} className="scroll-mt-24">
                <p className="index">SEC // {String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-1 text-xl font-semibold leading-snug md:text-2xl">{p.heading}</h2>
                <Body text={p.body} />
              </section>
            ))}
          </div>

          {a.tool && (
            <Link href={a.tool.href} className="btn-term mt-10">{a.tool.label} <ArrowRight size={16} /></Link>
          )}

          {a.faq && a.faq.length > 0 && (
            <section id="faq" className="mt-12 scroll-mt-24">
              <p className="index">Q&A // FAQ</p>
              <h2 className="mt-1 text-xl font-semibold">คำถามที่พบบ่อย</h2>
              <div className="glass mt-4 divide-y divide-line">
                {a.faq.map((f) => (
                  <details key={f.q} className="group p-4">
                    <summary className="cursor-pointer list-none font-medium marker:hidden">
                      <span className="mr-2 font-mono text-cyan group-open:text-gold">{'>'}</span>{f.q}
                    </summary>
                    <p className="mt-2 pl-5 leading-relaxed text-ink-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {a.laws && a.laws.length > 0 && (
            <section className="mt-10 rounded border border-gold/30 bg-gold/[0.04] p-5">
              <p className="label text-gold">STATUTE_REF // กฎหมายที่อ้างอิง</p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/85">
                {a.laws.map((l) => <li key={l} className="flex gap-2"><span className="text-gold">§</span>{l}</li>)}
              </ul>
              <p className="code mt-4 text-ink-3">ข้อมูล ณ วันที่ {thaiDate(UPDATED)}</p>
            </section>
          )}

          <div className="mt-8 space-y-4"><Disclaimer /><LawyerCta /></div>

          {related.length > 0 && (
            <section className="mt-14">
              <p className="index">CROSS_REF // อ่านต่อ</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((r) => <ArticleCard key={r.slug} a={toCard(r)} />)}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
