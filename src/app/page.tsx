import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  Home as HomeIcon,
  Search,
  MapPin,
  Sparkles,
  PlusCircle,
  User,
  PawPrint,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { MOCK_PROPERTIES } from '@/lib/mockData'

const PROPERTIES_LIST = Object.values(MOCK_PROPERTIES)

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* ─── Global Navbar ─── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shadow-xs">
                <HomeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                Rent<span className="text-sky-500">Hub</span>
              </span>
              <span className="text-[10px] font-mono bg-sky-50 text-sky-600 border border-sky-200 px-1.5 py-0.5 rounded ml-1">
                DEMO
              </span>
            </Link>

            {/* Middle Nav Links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="text-sky-600 font-semibold">หน้าแรก</Link>
              <Link href="/#explore" className="hover:text-sky-500 transition">ค้นหาห้องพัก</Link>
              <Link href="/#areas" className="hover:text-sky-500 transition">ทำเลยอดนิยม</Link>
            </div>

            {/* Right CTA */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition"
                  >
                    <User className="w-4 h-4 text-sky-500" />
                    <span className="hidden sm:inline">ไปที่</span> Dashboard
                  </Link>
                  <Link
                    href="/listings/new"
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl transition shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>ลงประกาศใหม่</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-600 px-3 py-2 transition"
                  >
                    เข้าสู่ระบบ
                  </Link>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl transition shadow-xs"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>ลงประกาศฟรี</span>
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <header className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-mono text-sky-300 mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            AI-POWERED REAL ESTATE & RENTAL MARKETPLACE
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            หา<span className="text-sky-400">หอพัก บ้านเช่า คอนโด</span><br className="hidden sm:block" />
            ที่ตรงใจด้วยระบบ AI อัจฉริยะ
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            ค้นหาด้วยภาษาคน เช่น <em>"คอนโดใกล้ BTS อโศก เลี้ยงแมวได้ งบ 15,000 มีฟิตเนส"</em> หรือคลิกดูรายละเอียดห้องพักได้ทันที
          </p>

          {/* AI Search Box */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2.5 shadow-2xl flex items-center gap-2 border border-slate-200">
            <div className="flex items-center gap-2 pl-3 flex-1 text-slate-700">
              <Search className="w-5 h-5 text-sky-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="พิมพ์ค้นหาด้วยภาษาคน เช่น 'หอพัก ม.เกษตร มีแอร์ ไม่เกิน 5000'..."
                className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder:text-slate-400"
              />
            </div>
            <Link
              href="/#explore"
              className="bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition flex-shrink-0"
            >
              ค้นหาห้อง
            </Link>
          </div>

          {/* Quick Search Chips */}
          <div className="mt-4 flex flex-wrap justify-center items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">🔥 คำค้นหายอดนิยม:</span>
            <span className="bg-white/10 hover:bg-white/20 cursor-pointer px-2.5 py-1 rounded-full border border-white/10 transition">คอนโดใกล้ BTS เลี้ยงสัตว์ได้</span>
            <span className="bg-white/10 hover:bg-white/20 cursor-pointer px-2.5 py-1 rounded-full border border-white/10 transition">หอพักราคาถูก ม.เกษตร</span>
            <span className="bg-white/10 hover:bg-white/20 cursor-pointer px-2.5 py-1 rounded-full border border-white/10 transition">บ้านเช่า สาทร มีที่จอดรถ</span>
          </div>

        </div>
      </header>

      {/* ─── Popular Areas ─── */}
      <section id="areas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">ทำเลยอดนิยม 🏙️</h2>
            <p className="text-xs text-slate-500">เลือกดูห้องพักตามทำเลแนวรถไฟฟ้าและมหาวิทยาลัย</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[
            { name: 'อโศก - สุขุมวิท', count: '1,420 ห้อง', emoji: '🏢', bg: 'bg-blue-50 text-blue-800' },
            { name: 'สาทร - สีลม', count: '890 ห้อง', emoji: '🌿', bg: 'bg-emerald-50 text-emerald-800' },
            { name: 'พระราม 9 - รัชดา', count: '1,150 ห้อง', emoji: '🛍️', bg: 'bg-violet-50 text-violet-800' },
            { name: 'อารีย์ - พญาไท', count: '640 ห้อง', emoji: '☕', bg: 'bg-amber-50 text-amber-800' },
            { name: 'ม.เกษตร - บางเขน', count: '980 ห้อง', emoji: '🎓', bg: 'bg-cyan-50 text-cyan-800' },
            { name: 'ม.กรุงเทพ - รังสิต', count: '750 ห้อง', emoji: '✨', bg: 'bg-pink-50 text-pink-800' },
          ].map((area, i) => (
            <div
              key={i}
              className={`${area.bg} rounded-2xl p-4 text-center border border-slate-200/60 hover:shadow-md cursor-pointer transition`}
            >
              <div className="text-2xl mb-1">{area.emoji}</div>
              <div className="font-bold text-xs sm:text-sm">{area.name}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{area.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Listings ─── */}
      <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">ประกาศห้องพักล่าสุด ✨</h2>
            <p className="text-xs text-slate-500">คลิกที่การ์ดห้องใดก็ได้เพื่อดูรายละเอียดแบบเต็ม</p>
          </div>
          {user ? (
            <Link
              href="/listings/new"
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              + ลงประกาศห้องของคุณ
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              เข้าสู่ระบบเพื่อลงประกาศ →
            </Link>
          )}
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTIES_LIST.map((p) => (
            <Link
              key={p.id}
              href={`/properties/${p.id}`}
              className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
            >
              {/* Image Container — ล็อกความสูงคงที่แน่นอน 100% ด้วย h-52 และ object-cover */}
              <div className="relative w-full h-52 shrink-0 overflow-hidden bg-slate-100">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap z-10">
                  <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {p.type}
                  </span>
                  {p.verified && (
                    <span className="bg-emerald-500 text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-0.5 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" /> ยืนยันแล้ว
                    </span>
                  )}
                </div>

                {p.petAllowed && (
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs z-10">
                    <PawPrint className="w-3 h-3" /> เลี้ยงสัตว์ได้
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-2xl font-extrabold text-sky-600 font-mono">
                      ฿{p.price.toLocaleString()}
                      <span className="text-xs text-slate-400 font-normal"> /เดือน</span>
                    </span>
                    <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-lg">
                      {p.area} ตร.ม. · {p.bed === 0 ? 'Studio' : `${p.bed} นอน`}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-sky-600 transition">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>{p.district}</span> · <span className="text-sky-600 font-medium">{p.transit}</span>
                  </p>

                  {/* Amenities Tags */}
                  <div className="flex gap-1.5 flex-wrap mt-3.5">
                    {p.tags.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-50 border border-slate-200/80 text-slate-600 px-2 py-0.5 rounded-lg"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    ว่างพร้อมอยู่
                  </span>
                  <span className="text-xs font-bold text-sky-600 group-hover:text-sky-700 flex items-center gap-1">
                    ดูรายละเอียดห้อง <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="font-bold text-slate-300">RentHub Thailand — แพลตฟอร์มรวบรวมหอพัก บ้านเช่า คอนโด ยุค AI</p>
          <p>© 2026 RentHub. All rights reserved. Powered by Next.js 15 & Supabase</p>
        </div>
      </footer>

    </div>
  )
}
