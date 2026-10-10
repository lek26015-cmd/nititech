// สถานะกฎหมายเทคโนโลยี — ตรวจทานทุกครั้งที่อัปเดต UPDATED และอย่าใส่วันที่ที่ไม่แน่ใจ
export type RadarStatus = 'in-force' | 'phased' | 'draft' | 'foreign';

export interface RadarItem {
  id: string;
  name: string;
  short: string;
  status: RadarStatus;
  /** ข้อความวันที่/ช่วงเวลาที่มั่นใจได้ */
  when: string;
  note: string;
  regulator: string;
  articles: string[];
}

export const statusLabel: Record<RadarStatus, string> = {
  'in-force': 'มีผลบังคับใช้',
  phased: 'ทยอยบังคับใช้',
  draft: 'ร่าง / รับฟังความคิดเห็น',
  foreign: 'กฎหมายต่างประเทศที่กระทบไทย',
};

export const radar: RadarItem[] = [
  {
    id: 'ai-draft', name: 'ร่างหลักการกฎหมายว่าด้วยปัญญาประดิษฐ์', short: 'ร่างกฎหมาย AI', status: 'draft',
    when: 'เปิดรับฟังความคิดเห็นปี 2568', regulator: 'สพธอ. (ETDA) / กระทรวงดิจิทัลฯ',
    note: 'กำกับตามระดับความเสี่ยง ยังไม่เป็นกฎหมาย รายละเอียดอาจเปลี่ยนก่อนเข้าสภา',
    articles: ['thai-ai-law-draft'],
  },
  {
    id: 'eu-ai-act', name: 'EU Artificial Intelligence Act (Regulation 2024/1689)', short: 'EU AI Act', status: 'foreign',
    when: 'มีผล 1 ส.ค. 2024 · บทบัญญัติส่วนใหญ่ 2 ส.ค. 2026', regulator: 'European AI Office / หน่วยงานรัฐสมาชิก',
    note: 'กระทบธุรกิจไทยที่ให้บริการ AI ใน EU มีข้อเสนอ Digital Omnibus ที่อาจเลื่อนบางหน้าที่',
    articles: ['eu-ai-act-thai-business'],
  },
  {
    id: 'tech-crime', name: 'พ.ร.ก.มาตรการป้องกันและปราบปรามอาชญากรรมทางเทคโนโลยี พ.ศ. 2566 (แก้ไข 2568)', short: 'พ.ร.ก.อาชญากรรมเทคโนโลยี', status: 'in-force',
    when: 'ฉบับแรก 2566 · ฉบับที่ 2 พ.ศ. 2568', regulator: 'กระทรวงดิจิทัลฯ / ธปท. / กสทช. / สำนักงานตำรวจแห่งชาติ',
    note: 'ระงับธุรกรรมเร่งด่วน โทษบัญชีม้า-ซิมม้า และความรับผิดร่วมของผู้ให้บริการ',
    articles: ['online-scam-victim', 'mule-accounts'],
  },
  {
    id: 'pdpa', name: 'พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562', short: 'PDPA', status: 'in-force',
    when: 'บังคับใช้เต็มรูปแบบ 1 มิ.ย. 2565', regulator: 'สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)',
    note: 'มีประกาศลำดับรองต่อเนื่อง และเริ่มลงโทษปรับทางปกครองกับองค์กรแล้ว',
    articles: ['pdpa-basics', 'data-breach-72-hours', 'cross-border-transfer'],
  },
  {
    id: 'dps', name: 'พ.ร.ฎ.ว่าด้วยการควบคุมดูแลธุรกิจบริการแพลตฟอร์มดิจิทัลที่ต้องแจ้งให้ทราบ พ.ศ. 2565', short: 'พ.ร.ฎ.แพลตฟอร์มดิจิทัล', status: 'in-force',
    when: 'มีผลปี 2566', regulator: 'สพธอ. (ETDA)',
    note: 'แพลตฟอร์มตัวกลางที่ให้บริการในไทยต้องแจ้งการประกอบธุรกิจและเปิดเผยเงื่อนไข',
    articles: ['digital-platform-decree'],
  },
  {
    id: 'cyber-sec', name: 'พ.ร.บ.การรักษาความมั่นคงปลอดภัยไซเบอร์ พ.ศ. 2562', short: 'พ.ร.บ.ไซเบอร์', status: 'in-force',
    when: 'ประกาศใช้ 2562', regulator: 'สำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ (สกมช.)',
    note: 'หน้าที่ของหน่วยงานโครงสร้างพื้นฐานสำคัญทางสารสนเทศ (CII)',
    articles: ['cybersecurity-act'],
  },
  {
    id: 'cca', name: 'พ.ร.บ.ว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์ พ.ศ. 2550 (แก้ไข 2560)', short: 'พ.ร.บ.คอมพิวเตอร์', status: 'in-force',
    when: 'ฉบับแก้ไขมีผล 2560', regulator: 'กระทรวงดิจิทัลฯ / ตำรวจ',
    note: 'ข้อมูลเท็จ ภาพตัดต่อ การเข้าถึงระบบโดยมิชอบ และหน้าที่เก็บ log ของผู้ให้บริการ',
    articles: ['computer-crime-act-sharing', 'unauthorized-access-hacking'],
  },
  {
    id: 'digital-asset', name: 'พ.ร.ก.การประกอบธุรกิจสินทรัพย์ดิจิทัล พ.ศ. 2561', short: 'พ.ร.ก.สินทรัพย์ดิจิทัล', status: 'in-force',
    when: 'ประกาศใช้ 2561', regulator: 'สำนักงาน ก.ล.ต.',
    note: 'ใบอนุญาต Exchange/Broker/Dealer/ICO Portal/Custodial Wallet',
    articles: ['digital-assets-license'],
  },
  {
    id: 'eta', name: 'พ.ร.บ.ว่าด้วยธุรกรรมทางอิเล็กทรอนิกส์ พ.ศ. 2544 และที่แก้ไขเพิ่มเติม', short: 'พ.ร.บ.ธุรกรรมอิเล็กทรอนิกส์', status: 'in-force',
    when: 'ประกาศใช้ 2544 · แก้ไขหลายครั้ง', regulator: 'สพธอ. (ETDA)',
    note: 'ผลทางกฎหมายของข้อมูลและลายมือชื่ออิเล็กทรอนิกส์',
    articles: ['e-signature-validity'],
  },
];
