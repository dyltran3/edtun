import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ed-Tun STEM - Interactive Learning Platform',
  description: 'Nền tảng Giáo dục Tương tác & Tư duy Khởi nghiệp Thực chiến',
  keywords: 'education, STEM, interactive learning, coding, Vietnam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
