'use client'

// ============================================================
// app/properties/[id]/page.tsx
// หน้ารายละเอียดห้องพัก (Property Details Page)
// ============================================================
import { useState, use } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Sparkles,
  CheckCircle2,
  PawPrint,
  Home,
  Shield,
  Phone,
  MessageSquare,
  Calendar,
  Eye,
  Share2,
  Heart,
  ChevronRight,
  Clock,
  Zap,
  Droplets,
  Building
} from 'lucide-react'
import { MOCK_PROPERTIES, PropertyItem } from '@/lib/mockData'

export default function PropertyDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const property: PropertyItem = MOCK_PROPERTIES[id] || MOCK_PROPERTIES['1']

  const [activeImage, setActiveImage] = useState(0)
  const [phoneRevealed, setPhoneRevealed] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      
      {/* ─── Top Navbar ─── */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับหน้าหลัก
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSaved(!saved)}
            className={`p-2 rounded-xl border transition flex items-center gap-1.5 text-xs font-medium ${
              saved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="hidden sm:inline">{saved ? 'บันทึกแล้ว' : 'บันทึกห้องนี้'}</span>
          </button>
          <button className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition text-xs flex items-center gap-1.5">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">แชร์</span>
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">

        {/* ─── Breadcrumb ─── */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="hover:text-sky-600">หน้าแรก</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{property.province}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{property.district}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 font-medium truncate max-w-xs">{property.title}</span>
        </div>

        {/* ─── Image Gallery (ขนาดเท่ากัน สัดส่วนคงที่ คมชัด) ─── */}
        <div className="space-y-3">
          {/* Main Large Image */}
          <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden bg-slate-200 shadow-md">
            <img
              src={property.images[activeImage] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {/* Badges on main image */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                {property.type}
              </span>
              {property.verified && (
                <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> เจ้าของยืนยันแล้ว
                </span>
              )}
            </div>
            {property.petAllowed && (
              <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
                <PawPrint className="w-3.5 h-3.5" /> เลี้ยงสัตว์ได้ (Pet-Friendly)
              </span>
            )}
          </div>

          {/* Thumbnails Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-16/10 rounded-2xl overflow-hidden border-2 transition ${
                  activeImage === idx
                    ? 'border-sky-500 ring-2 ring-sky-200'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ─── Main Content & Price Sidebar Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ─── Left 2 Cols: Details ─── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title & Location */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {property.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                {property.addressLine}, {property.subdistrict}, {property.district}, {property.province}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-200">
                <span>🚈 สถานีใกล้เคียง:</span> {property.transit}
              </div>
            </div>

            {/* AI Summary Box */}
            <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border border-sky-200 rounded-3xl p-6 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>AI สรุปจุดเด่นของห้องนี้ (AI Generated Summary)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                {property.aiSummary}
              </p>
            </div>

            {/* Room Specs Grid */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
                <Building className="w-5 h-5 text-sky-500" />
                สเปกและขนาดห้องพัก
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="text-2xl mb-1">📐</div>
                  <div className="text-xs text-slate-400">พื้นที่ใช้สอย</div>
                  <div className="text-base font-bold text-slate-800 font-mono mt-0.5">{property.area} ตร.ม.</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="text-2xl mb-1">🛏️</div>
                  <div className="text-xs text-slate-400">ห้องนอน</div>
                  <div className="text-base font-bold text-slate-800 mt-0.5">
                    {property.bed === 0 ? 'Studio' : `${property.bed} ห้องนอน`}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="text-2xl mb-1">🚿</div>
                  <div className="text-xs text-slate-400">ห้องน้ำ</div>
                  <div className="text-base font-bold text-slate-800 mt-0.5">{property.bath} ห้องน้ำ</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <div className="text-2xl mb-1">🏢</div>
                  <div className="text-xs text-slate-400">ชั้นที่อยู่</div>
                  <div className="text-base font-bold text-slate-800 mt-0.5">ชั้น {property.floor}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
              <h2 className="text-base font-bold text-slate-800">รายละเอียดเพิ่มเติมจากเจ้าของ</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-light">
                {property.description}
              </p>
            </div>

            {/* Amenities List */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                สิ่งอำนวยความสะดวกในห้องและส่วนกลาง
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200/80 px-3.5 py-2.5 rounded-xl"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Landlord Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-base font-bold text-slate-800 mb-4">ข้อมูลผู้ให้เช่า / เจ้าของห้อง</h2>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={property.landlord.avatar}
                    alt={property.landlord.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm sm:text-base">
                      {property.landlord.name}
                      {property.landlord.verified && (
                        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          ✓ ยืนยันตัวตนแล้ว
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ตอบกลับ: <strong className="text-slate-700">{property.landlord.responseRate}</strong> · {property.landlord.responseTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" /> แชทคุย
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ─── Right 1 Col: Sticky Pricing & Booking Sidebar ─── */}
          <div className="space-y-5">
            <div className="sticky top-24 bg-white rounded-3xl border border-slate-200 p-6 shadow-lg space-y-5">
              
              {/* Monthly Price Header */}
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs text-slate-400">ราคาค่าเช่า</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-extrabold text-sky-600 font-mono">
                    ฿{property.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ เดือน</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                    สัญญาขั้นต่ำ {property.minContractMonths} เดือน
                  </span>
                  <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                    มัดจำ {property.depositMonths} เดือน
                  </span>
                </div>
              </div>

              {/* Utilities Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-4 space-y-2.5 text-xs">
                <div className="font-bold text-slate-700 flex items-center gap-1 mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  อัตราค่าสาธารณูปโภค
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ค่าไฟ:</span>
                  <span className="font-semibold text-slate-800">{property.electricRate}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ค่าน้ำ:</span>
                  <span className="font-semibold text-slate-800">{property.waterRate}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ค่าส่วนกลาง:</span>
                  <span className="font-semibold text-emerald-600">{property.commonFee}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-2xl transition flex items-center justify-center gap-2 shadow-xs text-sm">
                  <MessageSquare className="w-4 h-4" />
                  ส่งข้อความสอบถามเจ้าของ
                </button>

                <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 rounded-2xl transition flex items-center justify-center gap-2 text-xs">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  นัดหมายวันเข้าดูห้องพัก
                </button>
              </div>

              {/* Contact Phone (Anti-Scraping Reveal) */}
              <div className="border-t border-slate-100 pt-4 text-center">
                {phoneRevealed ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center animate-in fade-in">
                    <span className="text-xs text-emerald-700 font-medium">เบอร์โทรศัพท์เจ้าของห้อง:</span>
                    <p className="text-base font-bold text-emerald-900 font-mono mt-0.5 flex items-center justify-center gap-1.5">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      089-762-8841
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setPhoneRevealed(true)}
                    className="text-xs text-slate-500 hover:text-sky-600 underline font-medium flex items-center justify-center gap-1.5 mx-auto"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    กดเพื่อแสดงเบอร์ติดต่อเจ้าของ
                  </button>
                )}
              </div>

              {/* PDPA & Security Guarantee */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                <Shield className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>ข้อมูลและเบอร์โทรศัพท์ได้รับการคุ้มครองตาม PDPA</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
