// ads.txt สำหรับ Google AdSense — สร้างจาก NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-xxx → pub-xxx)
export const dynamic = 'force-static';

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const body = client ? `google.com, ${client.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n` : '# ยังไม่ได้เปิดใช้ Google AdSense\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
