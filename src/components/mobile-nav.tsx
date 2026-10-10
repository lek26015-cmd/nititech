'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function MobileNav({ items, lawyerUrl }: { items: { href: string; label: string }[]; lawyerUrl: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ml-auto md:hidden">
      <button type="button" aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={open} onClick={() => setOpen(!open)} className="rounded border border-line-2 p-2 text-ink">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-line bg-void/95 px-4 pb-5 backdrop-blur-xl">
          <nav className="flex flex-col divide-y divide-line">
            {items.map((n, i) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 text-ink">
                <span className="index">[{String(i + 1).padStart(2, '0')}]</span>{n.label}
              </Link>
            ))}
          </nav>
          <a href={lawyerUrl} className="btn-gold mt-3 w-full">ปรึกษาทนายบน Lawslane</a>
        </div>
      )}
    </div>
  );
}
