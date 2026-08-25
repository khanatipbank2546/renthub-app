import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RentHub Thailand',
  description: 'แพลตฟอร์มรวบรวมหอพัก บ้านเช่า คอนโด ทั่วไทย',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className="antialiased font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  )
}
