/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useStorage } from '@/utils/hook'
import { IUser } from '@/utils/type'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Header = () => {
  const [user, setUser] = useState<IUser>()
  const session = useStorage()
  useEffect(() => {
    if (session.getItem('user')) setUser(JSON.parse(session.getItem('user')))
  }, [])
  return (
    <nav className="w-full flex bg-white items-center border-gray-200 md:px-10 phone:px-2 py-1 shadow-md z-50">
      <div className="relative">
        {user ? (
          <button
            className="hover:text-black text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full phone:w-auto px-5 py-2.5 text-center flex mx-auto"
            onClick={() => {
              session.removeItem('user')
              session.removeItem('isLogin')
              window.location.reload()
            }}
          >
            Đăng xuất
          </button>
        ) : (
          <Link href={`/login`} className="text-5xl cursor-pointer">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full phone:w-auto px-5 py-2.5 text-center flex mx-auto"
              type="button"
            >
              Đăng nhập
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
