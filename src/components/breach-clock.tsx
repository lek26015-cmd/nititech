'use client';
import { useEffect, useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');
const toLocalInput = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
const fmt = (d: Date) => d.toLocaleString('th-TH', { dateStyle: 'full', timeStyle: 'short' });

const steps = [
  { h: 0, t: 'ระงับเหตุ ตัดการเข้าถึง เปลี่ยนรหัสผ่านและคีย์ที่อาจหลุด' },
  { h: 0, t: 'เก็บหลักฐาน log และ snapshot ห้ามลบหรือแก้ข้อมูลต้นทาง' },
  { h: 6, t: 'ประเมินขอบเขต: ประเภทข้อมูล จำนวนคน ข้อมูลอ่อนไหว การเข้ารหัส' },
  { h: 24, t: 'ประเมินความเสี่ยงต่อสิทธิเสรีภาพ ตัดสินใจว่าต้องแจ้ง สคส. และเจ้าของข้อมูลหรือไม่' },
  { h: 48, t: 'เตรียมแบบแจ้งเหตุ: ลักษณะเหตุ ผลกระทบ มาตรการเยียวยา ผู้ติดต่อ' },
  { h: 72, t: 'เส้นตายแจ้ง สคส. (ถ้าข้อมูลยังไม่ครบ แจ้งเท่าที่มีก่อนแล้วส่งเพิ่ม)' },
];

export function BreachClock() {
  const [known, setKnown] = useState('');
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const d = new Date();
    setNow(d);
    setKnown(toLocalInput(d));
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const start = known ? new Date(known) : null;
  const valid = start && !Number.isNaN(start.getTime());
  const deadline = valid ? new Date(start.getTime() + 72 * 3600 * 1000) : null;
  const left = deadline && now ? deadline.getTime() - now.getTime() : 0;
  const overdue = left < 0;
  const abs = Math.abs(left);
  const h = Math.floor(abs / 3600000), m = Math.floor((abs % 3600000) / 60000), s = Math.floor((abs % 60000) / 1000);
  const elapsedH = valid && now ? (now.getTime() - start.getTime()) / 3600000 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="glass-2 p-6">
        <label htmlFor="known" className="index">INPUT // เวลาที่ "ทราบเหตุ"</label>
        <input id="known" type="datetime-local" className="field mt-3 font-mono" value={known} onChange={(e) => setKnown(e.target.value)} />
        <p className="mt-2 text-xs text-ink-3">นับจากเวลาที่องค์กรทราบว่ามีการละเมิดข้อมูลส่วนบุคคล ไม่ใช่เวลาที่เหตุเกิด</p>

        {deadline && (
          <div className="mt-8" aria-live="polite">
            <p className="index">{overdue ? 'OVERDUE // เกินกำหนดมาแล้ว' : 'T-MINUS // เหลือเวลา'}</p>
            <p className={`mt-2 font-mono text-5xl font-medium tabular-nums tracking-tight md:text-6xl ${overdue ? 'text-amber' : 'text-cyan'}`}>
              {pad(h)}:{pad(m)}:{pad(s)}
            </p>
            <p className="mt-4 text-sm text-ink-2">เส้นตายแจ้ง สคส.</p>
            <p className="font-semibold text-gold-bright">{fmt(deadline)}</p>
            {overdue && <p className="mt-3 text-sm text-amber-soft">ยังต้องแจ้งโดยเร็วที่สุด พร้อมเหตุผลของความล่าช้า และควรปรึกษาทนายทันที</p>}
          </div>
        )}
      </div>

      <div className="glass p-6">
        <p className="index">TELEMETRY_RAIL // ลำดับงานแนะนำ</p>
        <ol className="mt-5 space-y-5">
          {steps.map((st, i) => {
            const done = elapsedH >= st.h && valid;
            const at = valid ? new Date(start.getTime() + st.h * 3600000) : null;
            return (
              <li key={i} className="relative border-l border-line pl-5">
                <span className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ${done ? 'bg-amber shadow-amber' : 'bg-ink-3'}`} />
                <p className="code text-ink-3">T+{pad(st.h)}H{at ? ` · ${at.toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}` : ''}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">{st.t}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
