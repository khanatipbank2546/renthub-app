// ============================================================
// app/(protected)/dashboard/page.tsx — หน้า Dashboard
// Protected Route: Middleware จะ redirect ถ้าไม่ได้ Login
// ============================================================
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogOut, Home, Plus, MessageSquare, User } from 'lucide-react'

export const metadata = {
  title: 'Dashboard | RentHub',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // ดึงข้อมูล profile จาก Supabase
  const { data: profileData } = await supabase
    .from('profiles')
    .select('display_name, avatar_url, role')
    .eq('id', user.id)
    .single()

  const profile = profileData as { display_name?: string; avatar_url?: string; role?: string } | null

  // ดึงจำนวนประกาศของเจ้าของ
  const { count: listingCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', user.id)

  const displayName = profile?.display_name
    || user.user_metadata?.full_name
    || user.email?.split('@')[0]
    || 'ผู้ใช้'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-800">Rent<span className="text-sky-500">Hub</span></span>
        </div>
        <form action="/auth/signout" method="POST">
          <button
            formAction={async () => {
              'use server'
              const { createClient } = await import('@/lib/supabase/server')
              const supabase = await createClient()
              await supabase.auth.signOut()
              redirect('/login')
            }}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition"
          >
            <LogOut className="w-4 h-4" />
            ออกจากระบบ
          </button>
        </form>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            สวัสดีครับ คุณ{displayName} 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {user.email} · {profile?.role === 'landlord' ? '🏠 ผู้ให้เช่า' : '🔍 ผู้เช่า'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
            <div className="text-3xl font-bold text-sky-500">{listingCount ?? 0}</div>
            <div className="text-sm text-slate-500 mt-1">ประกาศของฉัน</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
            <div className="text-3xl font-bold text-emerald-500">0</div>
            <div className="text-sm text-slate-500 mt-1">ข้อความใหม่</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
            <div className="text-3xl font-bold text-amber-500">0</div>
            <div className="text-sm text-slate-500 mt-1">รายการที่บันทึก</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
            <div className="text-3xl font-bold text-violet-500">0</div>
            <div className="text-sm text-slate-500 mt-1">ยอดผู้ชม</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/listings/new"
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl p-6 flex items-center gap-4 transition shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold">ลงประกาศใหม่</div>
              <div className="text-sky-100 text-sm">อัปโหลดรูป ให้ AI เติมข้อมูล</div>
            </div>
          </a>

          <a
            href="/messages"
            className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center gap-4 transition shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <div className="font-bold text-slate-800">ข้อความ</div>
              <div className="text-slate-500 text-sm">ดูข้อความจากผู้เช่า</div>
            </div>
          </a>

          <a
            href="/profile"
            className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center gap-4 transition shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
              <User className="w-6 h-6 text-violet-500" />
            </div>
            <div>
              <div className="font-bold text-slate-800">โปรไฟล์</div>
              <div className="text-slate-500 text-sm">แก้ไขข้อมูลส่วนตัว</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
