import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid-bg">
      <div className="mx-auto max-w-3xl px-4 py-28 text-center">
        <p className="code text-amber">ERR_404 // RECORD_NOT_FOUND</p>
        <h1 className="mt-4 font-serif text-4xl font-light">ไม่พบหน้าที่คุณค้นหา</h1>
        <p className="mt-3 text-ink-2">หน้านี้อาจถูกย้ายหรือไม่มีอยู่ ลองค้นหาในคลังความรู้</p>
        <Link href="/knowledge" className="btn-gold mt-8">ไปที่คลังความรู้</Link>
      </div>
    </div>
  );
}
