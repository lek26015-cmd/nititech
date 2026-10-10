import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, ShieldCheck, Timer, Network, ArrowUpRight } from 'lucide-react';
import { allArticles, categories, findArticle, toCard } from '@/content/topics';
import { radar } from '@/content/radar';
import { useCases, riskLabel } from '@/content/matrix';
import { UPDATED } from '@/content/types';
import { ArticleCard } from '@/components/article-card';
import { RadarList } from '@/components/radar-list';
import { SectionHead } from '@/components/site';
import { CodeRain, CountUp, Scramble } from '@/components/fx';
import { SITE_URL, SITE_NAME, SITE_DESC, LAWSLANE_URL, lawyerUrl } from '@/lib/site';

const FEATURED = ['pdpa-basics', 'deepfake-law', 'online-scam-victim'];
const featured = FEATURED.map(findArticle).filter((a) => a !== undefined);
const more = allArticles.filter((a) => !FEATURED.includes(a.slug)).slice(0, 8);

const tools = [
  { href: '/tools/pdpa-check', icon: ShieldCheck, code: 'TOOL_01', title: 'เช็กความพร้อม PDPA', desc: 'แบบประเมิน 12 ข้อ ได้รายการสิ่งที่ต้องทำต่อทันที' },
  { href: '/tools/breach-clock', icon: Timer, code: 'TOOL_02', title: 'นาฬิกาแจ้งเหตุข้อมูลรั่ว', desc: 'คำนวณเส้นตาย 72 ชั่วโมง พร้อมลำดับงานรับมือ' },
  { href: '/matrix', icon: Network, code: 'TOOL_03', title: 'แผนผังกฎหมายตามกรณีใช้งาน', desc: 'AI แชตบอต สแกนใบหน้า คริปโต ต้องดูกฎหมายอะไร' },
];

const homeLd = [{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'th',
  description: SITE_DESC,
  publisher: { '@type': 'Organization', name: 'Lawslane', url: LAWSLANE_URL },
  potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/knowledge?q={q}`, 'query-input': 'required name=q' },
}, {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/emblem-gold.png`,
  description: SITE_DESC,
  parentOrganization: { '@type': 'Organization', name: 'Lawslane', url: LAWSLANE_URL },
}];

export default function Home() {
  const inForce = radar.filter((r) => r.status === 'in-force').length;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeLd) }} />

      {/* HERO */}
      <section className="grid-bg grid-bg-live relative overflow-hidden border-b border-line">
        <CodeRain className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="fx-scanline" aria-hidden />
        <div className="fx-drift pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="fx-drift pointer-events-none absolute -bottom-40 left-1/3 h-[360px] w-[360px] rounded-full bg-cyan/[0.08] blur-[120px] [animation-delay:-9s]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-10 md:py-20 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div>
            <p className="label fx-in fx-caret text-gold">THAI TECH LAW // KNOWLEDGE HUB</p>
            <h1 className="fx-in mt-5 font-serif [--d:120ms] text-[40px] font-light leading-[1.15] tracking-tight md:text-[64px] md:leading-[1.1]">
              ถอดรหัส<Scramble text="กฎหมายเทคโนโลยี" delay={500} className="text-gold-bright drop-shadow-[0_0_24px_rgba(242,202,80,0.35)]" />
              <br className="hidden md:block" /> ให้คนทำงานดิจิทัลใช้ได้จริง
            </h1>
            <p className="fx-in mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 [--d:260ms]">
              PDPA อาชญากรรมไซเบอร์ AI ลิขสิทธิ์ แพลตฟอร์มดิจิทัล และคริปโต อธิบายด้วยภาษาคน พร้อมเลขมาตราอ้างอิงและเครื่องมือเช็กความพร้อม
            </p>
            <form action="/knowledge" className="fx-in relative mt-8 max-w-2xl [--d:380ms]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" size={18} />
              <input name="q" className="field !py-4 pl-11 pr-28" placeholder="ค้นหา เช่น คุกกี้ Deepfake บัญชีม้า มาตรา 16" aria-label="ค้นหาความรู้" />
              <button className="btn-gold absolute right-1.5 top-1/2 -translate-y-1/2 !py-2.5">ค้นหา</button>
            </form>
            <div className="fx-in mt-5 flex flex-wrap gap-3 [--d:480ms]">
              <Link href="/knowledge" className="btn-term">เปิดคลังความรู้ <ArrowRight size={16} /></Link>
              <Link href="/tools/pdpa-check" className="btn-term">เช็กความพร้อม PDPA</Link>
            </div>
          </div>

          <div className="glass-2 fx-orbit fx-in relative p-5 shadow-aureum [--d:300ms]">
            <div className="flex items-center justify-between">
              <p className="index fx-caret">JURIS // NITI-TH</p>
              <p className="label flex items-center gap-1.5 text-cyan"><span className="dot" /> อัปเดตแล้ว</p>
            </div>
            <div className="relative mx-auto mt-2 h-28 w-28 sm:h-56 sm:w-56">
              <div className="fx-radar" aria-hidden />
              <div className="absolute inset-[6%] rounded-full border border-cyan/20" aria-hidden />
              <div className="absolute inset-[22%] rounded-full border border-dashed border-gold/20" aria-hidden />
              <Image src="/logo/emblem-gold.png" alt="เทพีแห่งความยุติธรรมในวงจรดิจิทัล สัญลักษณ์ NITI.TECH" width={224} height={224} priority className="fx-float relative h-full w-full object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.35)]" />
            </div>
            <div className="mt-4 grid grid-cols-3 divide-x divide-line border-t border-line pt-4 text-center">
              <div><p className="font-serif text-3xl font-light text-gold-bright"><CountUp to={allArticles.length} /></p><p className="mt-1 text-xs text-ink-2">บทความ</p></div>
              <div><p className="font-serif text-3xl font-light text-gold-bright"><CountUp to={inForce} /></p><p className="mt-1 text-xs text-ink-2">กฎหมายที่มีผล</p></div>
              <div><p className="font-serif text-3xl font-light text-gold-bright"><CountUp to={useCases.length} /></p><p className="mt-1 text-xs text-ink-2">กรณีใช้งาน</p></div>
            </div>
            <p className="code mt-4 text-center text-ink-3">อัปเดตล่าสุด {new Date(UPDATED).toLocaleDateString('th-TH', { dateStyle: 'long' })}</p>
          </div>
        </div>

        {/* แถบหมวด */}
        <div className="relative border-t border-line">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-4 md:px-10">
            {categories.map((c) => (
              <Link key={c.id} href={`/category/${c.id}`} className="chip shrink-0 !text-[11px] transition hover:border-gold hover:text-ink">
                {c.title} <span className="text-gold">{c.articles.length}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* แถบข่าววิ่งสถานะกฎหมาย */}
        <div className="relative overflow-hidden border-t border-line bg-black/40 py-2.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="fx-marquee flex w-max gap-10 whitespace-nowrap">
            {[...radar, ...radar].map((r, i) => (
              <Link key={i} href="/radar" className="code flex items-center gap-2 text-ink-2 hover:text-ink" aria-hidden={i >= radar.length} tabIndex={i >= radar.length ? -1 : undefined}>
                <span className={`h-1.5 w-1.5 rounded-full ${r.status === 'draft' ? 'bg-amber' : r.status === 'foreign' ? 'bg-ink-3' : 'bg-cyan'}`} />
                <span className="text-gold">{r.short}</span> {r.when}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-10">
        {/* บทความเด่น */}
        <section className="pt-16" data-reveal>
          <SectionHead
            index="DISPATCH // CORE INQUIRY"
            title="บทวิเคราะห์กฎหมายเทคโนโลยีเด่น"
            action={<Link href="/knowledge" className="link-ghost">→ ดูทั้งหมด (EXPLORE ARCHIVE)</Link>}
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3" data-stagger>
            {featured.map((a) => <ArticleCard key={a.slug} a={toCard(a)} big />)}
          </div>
        </section>

        {/* Radar + Tools */}
        <section className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" data-stagger>
          <div className="glass p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="label text-gold">REGULATORY_TRACKER</p>
                <h2 className="mt-2 text-2xl font-semibold">Legislative Radar</h2>
                <p className="text-sm text-ink-2">สถานะกฎหมายและร่างกฎหมายที่ต้องจับตา</p>
              </div>
              <span className="chip"><span className="dot !bg-amber" /> ติดตามต่อเนื่อง</span>
            </div>
            <div className="mt-6"><RadarList limit={4} compact /></div>
            <Link href="/radar" className="link-ghost mt-6">→ ดูสถานะกฎหมายทั้งหมด ({radar.length})</Link>
          </div>

          <div>
            <p className="label text-gold">TOOLKITS // FREE</p>
            <h2 className="mt-2 text-2xl font-semibold">เครื่องมือสำหรับธุรกิจ</h2>
            <p className="text-sm text-ink-2">ใช้ฟรี ประมวลผลในเบราว์เซอร์ ไม่เก็บข้อมูลของคุณ</p>
            <div className="mt-6 space-y-3" data-stagger>
              {tools.map((t) => (
                <Link key={t.href} href={t.href} className="glass group flex items-center gap-4 p-4 transition hover:border-cyan hover:shadow-cyan">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded border border-line-2 bg-black/40 text-gold"><t.icon size={20} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="index block">{t.code}</span>
                    <span className="block font-semibold">{t.title}</span>
                    <span className="block text-sm text-ink-2">{t.desc}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-ink-3 transition group-hover:translate-x-1 group-hover:text-cyan" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Matrix teaser */}
        <section className="mt-16">
          <SectionHead
            index="TAXONOMY // USE-CASE MAPPING"
            title="ทำโปรเจกต์นี้ ต้องดูกฎหมายอะไร"
            desc="กรณีใช้งานเทคโนโลยียอดนิยม จับคู่กับกฎหมายที่เกี่ยวข้องในหน้าเดียว"
            action={<Link href="/matrix" className="link-ghost">→ ดูแผนผังทั้งหมด</Link>}
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3" data-stagger>
            {useCases.slice(0, 3).map((u, i) => (
              <Link key={u.id} href="/matrix" className="glass group p-5 transition hover:border-line-2">
                <div className="flex items-center justify-between">
                  <p className="index">CASE // {String(i + 1).padStart(2, '0')}</p>
                  <p className={`label ${u.risk === 'high' ? 'text-amber' : u.risk === 'medium' ? 'text-gold' : 'text-cyan'}`}>{riskLabel[u.risk]}</p>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{u.title}</h3>
                <ul className="mt-3 space-y-1">
                  {u.laws.map((l) => <li key={l.law} className="code text-ink-2">§ {l.law}</li>)}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {/* บทความอื่น */}
        <section className="mt-16">
          <SectionHead index="INDEX // LATEST" title="อ่านต่อในคลังความรู้" />
          <ol className="mt-6 grid gap-x-10 border-t border-line md:grid-cols-2" data-stagger>
            {more.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link href={`/knowledge/${a.slug}`} className="group flex gap-4 py-4">
                  <span className="code w-16 shrink-0 pt-0.5 text-gold">{toCard(a).ref}</span>
                  <span className="leading-snug text-ink/90 transition group-hover:text-gold-bright">{a.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="glass-2 fx-orbit relative mt-20 overflow-hidden p-8 text-center shadow-aureum md:p-14" data-reveal>
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[600px] -translate-x-1/2 rounded-full bg-gold/10 blur-[100px]" />
          <p className="chip relative mx-auto">ADVISORY // LAWSLANE NETWORK</p>
          <h2 className="relative mx-auto mt-5 max-w-3xl font-serif text-3xl font-light leading-tight md:text-5xl">
            เรื่องจริงซับซ้อนกว่าบทความ <span className="text-gold-bright">คุยกับทนาย</span>ที่เข้าใจเทคโนโลยี
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-ink-2">
            ทนายความบน Lawslane ผ่านการยืนยันตัวตนและใบอนุญาต ช่วยได้ตั้งแต่ร่างสัญญา SaaS ตรวจ PDPA ไปจนถึงคดีหมิ่นประมาทออนไลน์และมิจฉาชีพ
          </p>
          <a href={lawyerUrl} className="btn-gold relative mt-7">ค้นหาทนายบน Lawslane <ArrowUpRight size={16} /></a>
        </section>
      </div>
    </>
  );
}
