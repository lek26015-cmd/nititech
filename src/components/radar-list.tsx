import Link from 'next/link';
import { radar, statusLabel, type RadarItem, type RadarStatus } from '@/content/radar';
import { findArticle } from '@/content/topics';

const tone: Record<RadarStatus, string> = {
  'in-force': 'border-cyan/40 text-cyan',
  phased: 'border-gold/50 text-gold',
  draft: 'border-amber/50 text-amber',
  foreign: 'border-white/20 text-ink-2',
};

export function StatusChip({ s }: { s: RadarStatus }) {
  return (
    <span className={`label inline-flex items-center gap-1.5 rounded-sm border bg-black/50 px-2 py-1 ${tone[s]}`}>
      <span className={`inline-block h-1 w-1 rounded-full bg-current ${s === 'draft' ? 'animate-pulse' : ''}`} />{statusLabel[s]}
    </span>
  );
}

export function RadarRow({ r, compact = false }: { r: RadarItem; compact?: boolean }) {
  const first = findArticle(r.articles[0]);
  return (
    <li className="relative border-l border-line pl-6">
      <span className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${r.status === 'draft' ? 'bg-amber shadow-amber' : r.status === 'foreign' ? 'bg-ink-3' : 'bg-cyan shadow-cyan'}`} />
      <div className="flex flex-wrap items-center gap-2">
        <StatusChip s={r.status} />
        <span className="code text-ink-3">{r.when}</span>
      </div>
      <p className="mt-2 font-semibold leading-snug">{compact ? r.short : r.name}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-2">{r.note}</p>
      {!compact && <p className="code mt-2 text-ink-3">REGULATOR // {r.regulator}</p>}
      {first && <Link href={`/knowledge/${first.slug}`} className="link-ghost mt-2">→ อ่านสรุป</Link>}
    </li>
  );
}

export function RadarList({ limit, compact }: { limit?: number; compact?: boolean }) {
  return (
    <ol className="space-y-7">
      {radar.slice(0, limit).map((r) => <RadarRow key={r.id} r={r} compact={compact} />)}
    </ol>
  );
}
