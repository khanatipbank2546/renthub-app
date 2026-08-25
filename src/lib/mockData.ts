// ============================================================
// lib/mockData.ts — ข้อมูลจำลองห้องพักฉบับละเอียด
// ============================================================

export interface PropertyItem {
  id: string
  title: string
  type: string
  price: number
  depositMonths: number
  minContractMonths: number
  electricRate: string
  waterRate: string
  commonFee: string
  area: number
  bed: number
  bath: number
  floor: number
  district: string
  subdistrict: string
  province: string
  addressLine: string
  transit: string
  petAllowed: boolean
  verified: boolean
  images: string[]
  tags: string[]
  description: string
  aiSummary: string
  landlord: {
    name: string
    avatar: string
    verified: boolean
    phone: string
    responseRate: string
    responseTime: string
  }
}

export const MOCK_PROPERTIES: Record<string, PropertyItem> = {
  '1': {
    id: '1',
    title: 'Lumpini Suite Asok — 1 Bed 35 ตร.ม. วิวสระว่ายน้ำ',
    type: 'คอนโดเช่า',
    price: 18500,
    depositMonths: 2,
    minContractMonths: 12,
    electricRate: 'ตามบิลการไฟฟ้า (ไม่มีบวกเพิ่ม)',
    waterRate: '18 บาท / หน่วย',
    commonFee: 'ฟรี (รวมในค่าเช่าแล้ว)',
    area: 35,
    bed: 1,
    bath: 1,
    floor: 15,
    district: 'คลองเตย',
    subdistrict: 'คลองเตยเหนือ',
    province: 'กรุงเทพมหานคร',
    addressLine: 'สุขุมวิท ซอย 12 แขวงคลองเตยเหนือ',
    transit: 'BTS อโศก (280 ม.)',
    petAllowed: true,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['แอร์', 'เครื่องซักผ้า', 'สระว่ายน้ำ', 'ฟิตเนส', 'เฟอร์นิเจอร์ Built-in', 'ตู้เย็น', 'ไมโครเวฟ', 'ระเบียง'],
    description: 'ห้องสตูดิโอ 1 ห้องนอน ตกแต่งสไตล์โมเดิร์น เฟอร์นิเจอร์ Built-in ครบชุด วิวสระว่ายน้ำชั้น 15 ลมพัดเย็นสบาย เครื่องใช้ไฟฟ้าครบทุกอย่าง หิ้วกระเป๋าใบเดียวเข้าอยู่ได้ทันที ใกล้ BTS อโศก และ Terminal 21 เดินเพียง 3-5 นาทีเท่านั้น ที่สำคัญนิติบุคคลอนุญาตให้เลี้ยงสัตว์ขนาดเล็กได้ครับ',
    aiSummary: 'ห้องสวยแต่งครบพร้อมเข้าอยู่ทันที วิวสระว่ายน้ำชั้น 15 จุดเด่นคือทำเลติด BTS อโศก เพียง 280 ม. เดินทางสะดวกมาก และเป็นหนึ่งในไม่กี่คอนโดในย่านนี้ที่ Pet-Friendly เลี้ยงสัตว์ได้',
    landlord: {
      name: 'คุณ กนกพร สมิธ',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
      phone: '089-762-xxxx',
      responseRate: '100%',
      responseTime: 'ภายใน 15 นาที',
    }
  },
  '2': {
    id: '2',
    title: 'หอพัก Premium ม.เกษตรศาสตร์ เฟส 2',
    type: 'หอพัก',
    price: 4800,
    depositMonths: 1,
    minContractMonths: 6,
    electricRate: '7 บาท / หน่วย',
    waterRate: 'เหมาจ่าย 100 บาท / เดือน',
    commonFee: 'ฟรี',
    area: 24,
    bed: 0,
    bath: 1,
    floor: 4,
    district: 'จตุจักร',
    subdistrict: 'ลาดยาว',
    province: 'กรุงเทพมหานคร',
    addressLine: 'งามวงศ์วาน ซอย 52',
    transit: 'ม.เกษตรศาสตร์ (ประตู 1)',
    petAllowed: false,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c457f?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['WiFi ฟรี', 'แอร์', 'เครื่องทำน้ำอุ่น', 'คีย์การ์ด', 'เตียง 5 ฟุต', 'โต๊ะอ่านหนังสือ', 'ตู้เสื้อผ้า'],
    description: 'หอพักปรับปรุงใหม่ ใกล้ประตู 1 ม.เกษตรศาสตร์ บรรยากาศเงียบสงบ เหมาะสำหรับนักศึกษา มีระบบรักษาความปลอดภัย คีย์การ์ดเข้าออก กล้องวงจรปิดทุกชั้น มีอินเทอร์เน็ตความเร็วสูงฟรีทุกห้อง',
    aiSummary: 'หอพักราคาประหยัด คุ้มค่ามากสำหรับนักศึกษา ม.เกษตรศาสตร์ เดินทางไปเรียนได้สบาย มีโต๊ะอ่านหนังสือพร้อมแอร์และ WiFi ครบครัน',
    landlord: {
      name: 'อาจารย์ ประเสริฐ หอพัก',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      phone: '081-445-xxxx',
      responseRate: '98%',
      responseTime: 'ภายใน 30 นาที',
    }
  },
  '3': {
    id: '3',
    title: 'The Line Ratchathewi Studio ชั้น 18',
    type: 'คอนโดเช่า',
    price: 12500,
    depositMonths: 2,
    minContractMonths: 12,
    electricRate: 'ตามบิลการไฟฟ้า',
    waterRate: '18 บาท / หน่วย',
    commonFee: 'รวมในค่าเช่าแล้ว',
    area: 28,
    bed: 0,
    bath: 1,
    floor: 18,
    district: 'ราชเทวี',
    subdistrict: 'ถนนเพชรบุรี',
    province: 'กรุงเทพมหานคร',
    addressLine: 'ถนนพญาไท แขวงถนนเพชรบุรี',
    transit: 'BTS ราชเทวี (50 ม.)',
    petAllowed: false,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['ติด BTS', 'เฟอร์ฯ ครบ', 'ไมโครเวฟ', 'วิวเมือง', 'สระว่ายน้ำลอยฟ้า', 'ฟิตเนส 24 ชม.', 'Digital Door Lock'],
    description: 'คอนโดหรูทำเลใจกลางเมือง ติดบันได BTS ราชเทวี เพียง 50 เมตร เดินทางไปสยามพารากอน จุฬาลงกรณ์มหาวิทยาลัย หรือแอร์พอร์ตลิงก์พญาไทได้สะดวกรวดเร็ว ห้องสตูดิโอเพดานสูง ชั้น 18 วิวเมืองสวยงาม',
    aiSummary: 'ทำเล Super Prime ติดบันได BTS ราชเทวี ก้าวเดียวถึงรถไฟฟ้า เหมาะสำหรับคนทำงานใจกลางเมือง สยาม สีลม หรือนิสิตจุฬาฯ',
    landlord: {
      name: 'คุณ ธนภัทร เรียลเอสเตท',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
      phone: '095-214-xxxx',
      responseRate: '100%',
      responseTime: 'ภายใน 5 นาที',
    }
  },
  '4': {
    id: '4',
    title: 'บ้านเดี่ยว 2 ชั้น สาทร-นราธิวาส สวนร่มรื่น',
    type: 'บ้านเช่า',
    price: 45000,
    depositMonths: 2,
    minContractMonths: 12,
    electricRate: 'ตามบิลการไฟฟ้า',
    waterRate: 'ตามบิลการประปา',
    commonFee: 'ไม่มี',
    area: 160,
    bed: 3,
    bath: 3,
    floor: 2,
    district: 'สาทร',
    subdistrict: 'ทุ่งมหาเมฆ',
    province: 'กรุงเทพมหานคร',
    addressLine: 'นราธิวาสราชนครินทร์ ซอย 14',
    transit: 'BRT ถนนจันทน์ (400 ม.)',
    petAllowed: true,
    verified: false,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['จอดรถ 2 คัน', 'เลี้ยงหมาได้', 'ครัวไทย', 'สวนส่วนตัว', 'เครื่องปรับอากาศ 4 ตัว', 'ปั๊มน้ำ+แท็งก์'],
    description: 'บ้านเดี่ยว 2 ชั้น สภาพดีมาก รีโนเวทใหม่ พร้อมสวนรอบบ้าน จอดรถในร่มได้ 2 คัน บรรยากาศเป็นส่วนตัว ทำเลใจกลางเมืองย่านสาทร เดินทางเข้าสู่ CBD สีลม พระราม 3 สะดวกมาก เลี้ยงสัตว์ได้ทุกสายพันธุ์',
    aiSummary: 'บ้านเดี่ยวใจกลางสาทร หายากมาก พื้นที่กว้างขวาง 160 ตร.ม. สวนร่มรื่น จอดรถได้ 2 คัน และอนุญาตให้เลี้ยงสุนัข/แมวได้อิสระ',
    landlord: {
      name: 'คุณ วรพงษ์ เจริญทรัพย์',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      verified: false,
      phone: '086-555-xxxx',
      responseRate: '95%',
      responseTime: 'ภายใน 1 ชั่วโมง',
    }
  },
  '5': {
    id: '5',
    title: 'Kave Town Shift ห้องมุมแต่งสไตล์มินิมอล',
    type: 'คอนโดเช่า',
    price: 9500,
    depositMonths: 2,
    minContractMonths: 12,
    electricRate: 'ตามบิลการไฟฟ้า',
    waterRate: '18 บาท / หน่วย',
    commonFee: 'รวมในค่าเช่าแล้ว',
    area: 30,
    bed: 1,
    bath: 1,
    floor: 6,
    district: 'คลองหนึ่ง',
    subdistrict: 'คลองหนึ่ง',
    province: 'ปทุมธานี',
    addressLine: 'ถนนพหลโยธิน ติด ม.กรุงเทพ',
    transit: 'ม.กรุงเทพ รังสิต (300 ม.)',
    petAllowed: true,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['ห้องใหม่', 'Smart TV', 'สระว่ายน้ำ', 'Co-Working', 'ฟิตเนส 2 ชั้น', 'Shuttle Bus'],
    description: 'คอนโดวัยรุ่นสุดฮิต ติด ม.กรุงเทพ รังสิต ส่วนกลางอลังการ สระว่ายน้ำยาว 50 เมตร ห้อง Co-Working Space เปิด 24 ชม. ห้องพักตำแหน่งมุม ผนังติดเพื่อนห้องเดียว เงียบสงบ เป็นส่วนตัว',
    aiSummary: 'คอนโดฮิตที่สุดสำหรับนักศึกษา ม.กรุงเทพ ส่วนกลางจัดเต็ม Co-working 24 ชม. ห้องมุมแต่งครบพร้อมสมาร์ททีวี',
    landlord: {
      name: 'คุณ เมทินี ทาวน์',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      verified: true,
      phone: '091-888-xxxx',
      responseRate: '100%',
      responseTime: 'ภายใน 10 นาที',
    }
  },
  '6': {
    id: '6',
    title: 'หอพักสตรี รามคำแหง 24 แยก 14',
    type: 'หอพัก',
    price: 3200,
    depositMonths: 1,
    minContractMonths: 6,
    electricRate: '8 บาท / หน่วย',
    waterRate: '17 บาท / หน่วย',
    commonFee: 'ฟรี',
    area: 20,
    bed: 0,
    bath: 1,
    floor: 3,
    district: 'บางกะปิ',
    subdistrict: 'หัวหมาก',
    province: 'กรุงเทพมหานคร',
    addressLine: 'รามคำแหง 24 แยก 14 แขวงหัวหมาก',
    transit: 'ม.รามคำแหง (เดิน 5 นาที)',
    petAllowed: false,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['กล้อง CCTV', 'พัดลม/แอร์', 'ระเบียงตากผ้า', 'แม่บ้านดูแล', 'ประตูสแกนลายนิ้วมือ'],
    description: 'หอพักสตรีโดยเฉพาะ ปลอดภัย 100% ประตูสแกนลายนิ้วมือ มีกล้องวงจรปิดทุกชั้น มีแม่บ้านดูแลความสะอาดพื้นที่ส่วนกลางทุกวัน ใกล้มหาวิทยาลัยรามคำแหง และสนามกีฬาหัวหมาก',
    aiSummary: 'หอพักสตรีปลอดภัยสูงสุด สแกนลายนิ้วมือ เดินไป ม.รามคำแหง ได้ใน 5 นาที ค่าเช่าสบายกระเป๋า',
    landlord: {
      name: 'คุณ ป้าสมพร หอพักหญิง',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      verified: true,
      phone: '082-333-xxxx',
      responseRate: '90%',
      responseTime: 'ภายใน 1 ชั่วโมง',
    }
  }
}
