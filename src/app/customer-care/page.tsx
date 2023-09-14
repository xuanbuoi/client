'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'

const CustomCare = () => {
  return (
    <main className="bg-gray-100">
      <Header />
      <div className="mx-4 mt-6">
        <div className="w-[90%] mx-auto text-sm text-left bg-white p-4">
          <p className="font-bold text-2xl mb-2">
            Thông tin liên hệ và hỗ trợ từ hệ thống
          </p>
          <div className="h-[1px] bg-gray-300"></div>
          <p>Liên hệ hệ thống hỗ trợ 24/7</p>
          <Link href={`#`} className="text-blue-500">
            https://banmuonhenho.online
          </Link>
          <p>Telegram: @cskhbanmuonhenho</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default CustomCare
