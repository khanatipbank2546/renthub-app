import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',   // Supabase Storage CDN
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',  // Google Avatar
      },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: '10mb' },  // รองรับอัปโหลดรูปหลายรูปพร้อมกัน
  },
}

export default nextConfig
