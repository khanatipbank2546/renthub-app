'use client'

// ============================================================
// app/(protected)/listings/new/page.tsx
// หน้าฟอร์มลงประกาศห้องพักใหม่ (Real Estate Listing Creation Flow)
// ============================================================
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Home,
  ArrowLeft,
  Upload,
  CheckCircle2,
  DollarSign,
  MapPin,
  Sparkles,
  Info,
  Building,
  Image as ImageIcon,
  Loader2,
  Trash2,
  Eye,
  PawPrint
} from 'lucide-react'

// รายการสถานีรถไฟฟ้ายอดนิยม
const TRANSIT_OPTIONS = [
  'BTS อโศก (280 ม.)',
  'BTS พร้อมพงษ์ (450 ม.)',
  'BTS ทองหล่อ (600 ม.)',
  'BTS อารีย์ (350 ม.)',
  'BTS สยาม (200 ม.)',
  'MRT พระราม 9 (300 ม.)',
  'MRT สุทธิสาร (150 ม.)',
  'MRT ลาดพร้าว (400 ม.)',
  'MRT ห้วยขวาง (250 ม.)',
  'ใกล้มหาวิทยาลัยเกษตรศาสตร์',
  'ใกล้มหาวิทยาลัยรามคำแหง',
  'ใกล้มหาวิทยาลัยธรรมศาสตร์ รังสิต',
]

export default function NewListingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // ─── Form States ──────────────────────────────────────────
  const [title, setTitle] = useState('Lumpini Suite Asok — 1 Bed 35 ตร.ม. แต่งครบ')
  const [propertyType, setPropertyType] = useState('condo_rent')
  const [price, setPrice] = useState('18500')
  const [depositMonths, setDepositMonths] = useState('2')
  const [minContract, setMinContract] = useState('12')
  const [electricRate, setElectricRate] = useState('การไฟฟ้า')
  const [waterRate, setWaterRate] = useState('18')
  
  const [areaSqm, setAreaSqm] = useState('35')
  const [bedrooms, setBedrooms] = useState('1')
  const [bathrooms, setBathrooms] = useState('1')
  const [floor, setFloor] = useState('15')
  
  const [district, setDistrict] = useState('คลองเตย')
  const [province, setProvince] = useState('กรุงเทพมหานคร')
  const [addressLine, setAddressLine] = useState('สุขุมวิท ซอย 12')
  const [transit, setTransit] = useState('BTS อโศก (280 ม.)')
  
  const [description, setDescription] = useState(
    'ห้องสวย แต่งครบพร้อมเข้าอยู่ วิวสระว่ายน้ำ เฟอร์นิเจอร์ Built-in ครบชุด เครื่องใช้ไฟฟ้าครบ แอร์ 2 เครื่อง ทีวี ตู้เย็น ไมโครเวฟ เครื่องซักผ้า ทำเลดีมากเดินไป BTS อโศก เพียง 3 นาที เลี้ยงน้องแมวได้'
  )

  // สิ่งอำนวยความสะดวก
  const [amenities, setAmenities] = useState<Record<string, boolean>>({
    has_ac: true,
    has_water_heater: true,
    has_fridge: true,
    has_washing_machine: true,
    has_microwave: true,
    has_tv: true,
    has_balcony: true,
    is_furnished: true,
    has_elevator: true,
    has_parking: true,
    has_pool: true,
    has_gym: true,
    has_security: true,
    pet_allowed: true,
  })

  const toggleAmenity = (key: string) => {
    setAmenities(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // รูปภาพจำลอง
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80',
  ])

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // จำลองการเพิ่มรูปภาพ
      const newImg = URL.createObjectURL(e.target.files[0])
      setImages(prev => [...prev, newImg])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // จำลองการบันทึกลง Supabase Database
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              ลงประกาศห้องพักใหม่
              <span className="text-[11px] font-mono bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-normal">
                STEP 2 · LISTING FLOW
              </span>
            </h1>
            <p className="text-xs text-slate-400">กรอกข้อมูลให้ครบถ้วนเพื่อเพิ่มโอกาสให้ผู้เช่าติดต่อเร็วขึ้น</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || success}
            className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                กำลังบันทึก...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                ลงประกาศสำเร็จ!
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                เผยแพร่ประกาศ
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Success Banner */}
        {success && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">สร้างประกาศเรียบร้อยแล้ว!</p>
              <p className="text-xs text-emerald-600">ระบบกำลังนำคุณกลับไปยังหน้า Dashboard...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ─── Left & Center: Multi-Section Form ─── */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">

            {/* 1. ข้อมูลพื้นฐาน */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-3">
                <Building className="w-5 h-5 text-sky-500" />
                <h2>1. ข้อมูลพื้นฐาน</h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  หัวข้อประกาศ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="เช่น Lumpini Suite Asok — วิวสระว่ายน้ำ ชั้น 15 แต่งครบ"
                  className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    ประเภทอสังหาริมทรัพย์ <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={propertyType}
                    onChange={e => setPropertyType(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-sky-400 bg-white"
                  >
                    <option value="condo_rent">คอนโดมิเนียม (ให้เช่า)</option>
                    <option value="dormitory">หอพัก / อพาร์ทเมนต์</option>
                    <option value="house_rent">บ้านเดี่ยว / ทาวน์เฮาส์ (ให้เช่า)</option>
                    <option value="condo_sale">คอนโดมิเนียม (ขาย)</option>
                    <option value="house_sale">บ้านเดี่ยว (ขาย)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    สัญญาขั้นต่ำ
                  </label>
                  <select
                    value={minContract}
                    onChange={e => setMinContract(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-sky-400 bg-white"
                  >
                    <option value="1">1 เดือน (ระยะสั้น)</option>
                    <option value="3">3 เดือน</option>
                    <option value="6">6 เดือน</option>
                    <option value="12">1 ปี (มาตรฐาน)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. ราคาและเงื่อนไขการเช่า */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-3">
                <DollarSign className="w-5 h-5 text-emerald-500" />
                <h2>2. ราคาและเงื่อนไขสัญญา</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    ราคาเช่า / เดือน (บาท) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-mono">฿</span>
                    <input
                      type="number"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="15000"
                      className="w-full text-sm border border-slate-200 rounded-xl pl-8 pr-4 py-2.5 outline-none focus:border-sky-400 font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    เงินประกัน / ค่ามัดจำ
                  </label>
                  <select
                    value={depositMonths}
                    onChange={e => setDepositMonths(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-sky-400 bg-white"
                  >
                    <option value="1">มัดจำ 1 เดือน</option>
                    <option value="2">มัดจำ 2 เดือน (มาตรฐาน)</option>
                    <option value="3">มัดจำ 3 เดือน</option>
                  </select>
                </div>
              </div>

              {/* อัตราค่าน้ำ ค่าไฟ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    อัตราค่าไฟ
                  </label>
                  <input
                    type="text"
                    value={electricRate}
                    onChange={e => setElectricRate(e.target.value)}
                    placeholder="เช่น ตามบิลการไฟฟ้า หรือ 7 บาท/หน่วย"
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    อัตราค่าน้ำ
                  </label>
                  <input
                    type="text"
                    value={waterRate}
                    onChange={e => setWaterRate(e.target.value)}
                    placeholder="เช่น 18 บาท/หน่วย หรือ เหมาจ่าย 100 บาท"
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            {/* 3. รายละเอียดสเปกห้อง */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-3">
                <Home className="w-5 h-5 text-indigo-500" />
                <h2>3. รายละเอียดขนาดห้อง</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">พื้นที่ (ตร.ม.)</label>
                  <input
                    type="number"
                    value={areaSqm}
                    onChange={e => setAreaSqm(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-sky-400 font-mono text-center"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">ห้องนอน</label>
                  <select
                    value={bedrooms}
                    onChange={e => setBedrooms(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-sky-400 bg-white text-center"
                  >
                    <option value="0">Studio</option>
                    <option value="1">1 นอน</option>
                    <option value="2">2 นอน</option>
                    <option value="3">3+ นอน</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">ห้องน้ำ</label>
                  <select
                    value={bathrooms}
                    onChange={e => setBathrooms(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-sky-400 bg-white text-center"
                  >
                    <option value="1">1 น้ำ</option>
                    <option value="2">2 น้ำ</option>
                    <option value="3">3+ น้ำ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">ชั้นที่อยู่</label>
                  <input
                    type="text"
                    value={floor}
                    onChange={e => setFloor(e.target.value)}
                    placeholder="เช่น 15"
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-sky-400 text-center"
                  />
                </div>
              </div>
            </div>

            {/* 4. ทำเลและการเดินทาง */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <h2>4. ที่ตั้งและการเดินทาง</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">ซอย / ถนน / อาคาร</label>
                  <input
                    type="text"
                    value={addressLine}
                    onChange={e => setAddressLine(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">เขต / อำเภอ</label>
                  <input
                    type="text"
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  สถานีรถไฟฟ้า / มหาวิทยาลัยใกล้เคียง
                </label>
                <select
                  value={transit}
                  onChange={e => setTransit(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-sky-400 bg-white"
                >
                  {TRANSIT_OPTIONS.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5. สิ่งอำนวยความสะดวก & นโยบาย (Checklist) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h2>5. สิ่งอำนวยความสะดวก</h2>
                </div>
                <span className="text-xs text-slate-400">เลือกที่มีในห้องพัก</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { key: 'has_ac', label: '❄️ เครื่องปรับอากาศ' },
                  { key: 'has_water_heater', label: '🚿 เครื่องทำน้ำอุ่น' },
                  { key: 'has_fridge', label: '🧊 ตู้เย็น' },
                  { key: 'has_washing_machine', label: '🧺 เครื่องซักผ้า' },
                  { key: 'has_microwave', label: '🍲 ไมโครเวฟ' },
                  { key: 'has_tv', label: '📺 โทรทัศน์' },
                  { key: 'has_balcony', label: '🌅 ระเบียงห้อง' },
                  { key: 'is_furnished', label: '🛋️ เฟอร์นิเจอร์ครบ' },
                  { key: 'has_pool', label: '🏊 สระว่ายน้ำ' },
                  { key: 'has_gym', label: '🏋️ ฟิตเนส' },
                  { key: 'has_parking', label: '🚗 ที่จอดรถ' },
                  { key: 'has_elevator', label: '🛗 ลิฟต์โดยสาร' },
                  { key: 'has_security', label: '🛡️ รปภ. 24 ชม.' },
                  { key: 'pet_allowed', label: '🐾 เลี้ยงสัตว์ได้ (Pet OK)' },
                ].map(({ key, label }) => {
                  const active = amenities[key]
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleAmenity(key)}
                      className={`text-xs text-left px-3.5 py-2.5 rounded-xl border transition flex items-center justify-between ${
                        active
                          ? 'bg-sky-50 border-sky-300 text-sky-800 font-medium'
                          : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{label}</span>
                      {active && <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 6. อัปโหลดรูปภาพห้องพัก */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <ImageIcon className="w-5 h-5 text-violet-500" />
                  <h2>6. รูปภาพห้องพัก</h2>
                </div>
                <span className="text-xs text-slate-400">อัปโหลดอย่างน้อย 3 รูป</span>
              </div>

              {/* Upload Box */}
              <label className="border-2 border-dashed border-slate-300 hover:border-sky-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-sky-50/30 transition">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-2">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-700">คลิกเพื่ออัปโหลดรูปภาพ หรือลากไฟล์มาวางที่นี่</p>
                <p className="text-xs text-slate-400 mt-1">รองรับ JPG, PNG, WebP (ไม่เกิน 10MB ต่อรูป)</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleSimulateUpload}
                  className="hidden"
                />
              </label>

              {/* Image Previews Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                {images.map((imgUrl, i) => (
                  <div key={i} className="relative aspect-4/3 rounded-xl overflow-hidden group border border-slate-200 bg-slate-100">
                    <img src={imgUrl} alt={`Room ${i + 1}`} className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute top-1.5 left-1.5 bg-sky-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-xs">
                        รูปหน้าปก
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500/90 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. รายละเอียดเพิ่มเติม */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                รายละเอียดเพิ่มเติม (คำอธิบายห้องพัก)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="ระบุจุดเด่น ทำเล กฎระเบียบหอพัก หรือข้อตกลงพิเศษ..."
                className="w-full text-sm border border-slate-200 rounded-xl p-4 outline-none focus:border-sky-400 leading-relaxed"
              />
            </div>

          </form>

          {/* ─── Right: Live Listing Preview ─── */}
          <div className="space-y-4">
            <div className="sticky top-24">
              
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
                <Eye className="w-4 h-4 text-sky-500" />
                ตัวอย่างการ์ดประกาศที่จะปรากฏบนหน้าเว็บ
              </div>

              {/* Preview Card */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
                {/* Cover Image */}
                <div className="relative aspect-16/10 bg-slate-200">
                  {images[0] ? (
                    <img src={images[0]} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      ไม่มีรูปภาพ
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {propertyType === 'condo_rent' ? 'คอนโดเช่า' : 'หอพัก'}
                  </span>
                  {amenities.pet_allowed && (
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <PawPrint className="w-3 h-3" /> เลี้ยงสัตว์ได้
                    </span>
                  )}
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xl font-bold text-sky-600 font-mono">
                        ฿{Number(price || 0).toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 font-normal"> /เดือน</span>
                    </div>
                    <span className="text-xs text-slate-500">{areaSqm} ตร.ม. · {bedrooms === '0' ? 'Studio' : `${bedrooms} นอน`}</span>
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                    {title || 'ชื่อประกาศห้องพัก'}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {district} · <span className="text-sky-600 font-medium">{transit}</span>
                  </p>

                  <div className="flex gap-1.5 flex-wrap pt-2 border-t border-slate-100">
                    {amenities.has_ac && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">แอร์</span>}
                    {amenities.is_furnished && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">เฟอร์ฯ ครบ</span>}
                    {amenities.has_pool && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">สระว่ายน้ำ</span>}
                    {amenities.has_gym && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">ฟิตเนส</span>}
                  </div>
                </div>
              </div>

              {/* Tip Box */}
              <div className="mt-4 p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-800 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Info className="w-4 h-4 text-sky-600" />
                  เคล็ดลับการลงประกาศ:
                </p>
                <p className="text-sky-700 leading-relaxed">
                  ประกาศที่มีรูปถ่ายครบ 5 มุม (ห้องนอน, ห้องน้ำ, ระเบียง, ครัว, ส่วนกลาง) และระบุค่าไฟชัดเจน จะมีผู้ติดต่อสอบถามเร็วกว่าประกาศทั่วไปถึง 3 เท่า
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
