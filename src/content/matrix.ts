// ตารางกรณีใช้งาน x กฎหมายที่เกี่ยวข้อง — ให้ข้อมูลระดับ "ต้องดู" ไม่ใช่คำวินิจฉัย
export type Risk = 'high' | 'medium' | 'watch';

export interface UseCase {
  id: string;
  title: string;
  scenario: string;
  risk: Risk;
  laws: { law: string; point: string }[];
  articles: string[];
}

export const riskLabel: Record<Risk, string> = { high: 'ความเสี่ยงสูง', medium: 'ต้องเตรียมการ', watch: 'เฝ้าระวัง' };

export const useCases: UseCase[] = [
  {
    id: 'llm-chatbot', title: 'แชตบอต AI รับเรื่องลูกค้า', risk: 'medium',
    scenario: 'ใช้โมเดลภาษาขนาดใหญ่ตอบคำถามลูกค้า ลูกค้าพิมพ์ชื่อ เบอร์ หรือปัญหาสุขภาพเข้ามาในแชต',
    laws: [
      { law: 'PDPA ม.23, 24, 26', point: 'แจ้ง Privacy Notice ก่อนเริ่มแชต ข้อมูลสุขภาพที่ลูกค้าพิมพ์เป็นข้อมูลอ่อนไหว' },
      { law: 'PDPA ม.28–29', point: 'ผู้ให้บริการโมเดลอยู่ต่างประเทศ = ส่งข้อมูลออกนอกประเทศ' },
      { law: 'EU AI Act (ถ้ามีลูกค้า EU)', point: 'ต้องแจ้งผู้ใช้ว่ากำลังคุยกับ AI' },
    ],
    articles: ['lawful-basis-consent', 'cross-border-transfer', 'eu-ai-act-thai-business'],
  },
  {
    id: 'face-recognition', title: 'สแกนใบหน้าเข้าออฟฟิศ / ยืนยันตัวตน', risk: 'high',
    scenario: 'ใช้ระบบจดจำใบหน้าบันทึกเวลาเข้างานหรือ eKYC เปิดบัญชีลูกค้า',
    laws: [
      { law: 'PDPA ม.26', point: 'ข้อมูลชีวภาพ = ข้อมูลอ่อนไหว ต้องได้รับความยินยอมโดยชัดแจ้ง หรือเข้าข้อยกเว้น' },
      { law: 'PDPA ม.37', point: 'ต้องมีมาตรการความปลอดภัยสูง ข้อมูลรั่วต้องแจ้งใน 72 ชม.' },
      { law: 'PDPA ม.41', point: 'ประมวลผลข้อมูลอ่อนไหวเป็นกิจกรรมหลักอาจต้องตั้ง DPO' },
    ],
    articles: ['lawful-basis-consent', 'data-breach-72-hours', 'dpo-ropa'],
  },
  {
    id: 'genai-content', title: 'ใช้ Generative AI ผลิตคอนเทนต์ให้ลูกค้า', risk: 'medium',
    scenario: 'เอเจนซีใช้ AI สร้างภาพ เสียง และข้อความโฆษณา บางชิ้นใช้หน้าหรือเสียงคนจริง',
    laws: [
      { law: 'พ.ร.บ.ลิขสิทธิ์ ม.6, 10', point: 'ความเป็นเจ้าของงานที่ AI สร้างยังไม่แน่นอน ต้องกำหนดในสัญญา' },
      { law: 'PDPA', point: 'หน้าและเสียงคนจริงเป็นข้อมูลส่วนบุคคล ต้องมีความยินยอมเป็นหนังสือ' },
      { law: 'พ.ร.บ.คอมพิวเตอร์ ม.16', point: 'ภาพตัดต่อที่ทำให้ผู้อื่นเสียหายเป็นความผิดอาญา' },
    ],
    articles: ['ai-copyright-thailand', 'deepfake-law'],
  },
  {
    id: 'marketplace', title: 'เปิดมาร์เก็ตเพลส / แอปตัวกลาง', risk: 'medium',
    scenario: 'แพลตฟอร์มให้ร้านค้าและผู้ซื้อทำธุรกรรมกัน เก็บค่าคอมมิชชัน',
    laws: [
      { law: 'พ.ร.ฎ.แพลตฟอร์มดิจิทัล 2565', point: 'แจ้ง ETDA และเปิดเผยเงื่อนไข ค่าธรรมเนียม การจัดอันดับ' },
      { law: 'พ.ร.บ.คอมพิวเตอร์ ม.15', point: 'ต้องมีระบบแจ้งเตือนและนำเนื้อหาผิดกฎหมายออก' },
      { law: 'พ.ร.บ.ข้อสัญญาไม่เป็นธรรม', point: 'เงื่อนไขกับผู้บริโภคต้องเป็นธรรม' },
    ],
    articles: ['digital-platform-decree', 'online-contract-terms', 'computer-crime-act-sharing'],
  },
  {
    id: 'crypto-payment', title: 'รับชำระค่าสินค้าด้วยคริปโต / ออกโทเคน', risk: 'high',
    scenario: 'สตาร์ตอัปออก Utility Token ระดมทุน และให้ลูกค้าจ่ายค่าบริการด้วยเหรียญ',
    laws: [
      { law: 'พ.ร.ก.สินทรัพย์ดิจิทัล 2561', point: 'เสนอขายโทเคนต่อประชาชนต้องผ่าน ICO Portal ที่ได้รับอนุญาต' },
      { law: 'ประกาศ ก.ล.ต.', point: 'ผู้ประกอบธุรกิจถูกห้ามสนับสนุนการใช้คริปโตชำระค่าสินค้า' },
      { law: 'พ.ร.ก.อาชญากรรมเทคโนโลยี', point: 'ต้องระวังบัญชีม้าและการฟอกเงินผ่านกระเป๋าเงิน' },
    ],
    articles: ['digital-assets-license', 'mule-accounts'],
  },
  {
    id: 'cloud-saas', title: 'ระบบ SaaS เก็บข้อมูลบนคลาวด์ต่างประเทศ', risk: 'watch',
    scenario: 'ซอฟต์แวร์ HR/CRM ให้ลูกค้าองค์กรไทย ฐานข้อมูลอยู่ใน region สิงคโปร์หรือสหรัฐฯ',
    laws: [
      { law: 'PDPA ม.28–29, 40', point: 'คุณเป็นผู้ประมวลผลข้อมูล ต้องมี DPA และมาตรการส่งข้อมูลข้ามแดน' },
      { law: 'พ.ร.บ.ไซเบอร์ 2562', point: 'ถ้าลูกค้าเป็น CII จะถูกกำหนดมาตรฐานความปลอดภัยผ่านสัญญา' },
      { law: 'พ.ร.บ.คอมพิวเตอร์ ม.26', point: 'ผู้ให้บริการต้องเก็บข้อมูลจราจรอย่างน้อย 90 วัน' },
    ],
    articles: ['cross-border-transfer', 'cybersecurity-act', 'unauthorized-access-hacking'],
  },
];
