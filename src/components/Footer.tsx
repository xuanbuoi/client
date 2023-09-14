/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useStorage } from '@/utils/hook'
import { IUser } from '@/utils/type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const Footer = () => {
  const pathname = usePathname()
  const [user, setUser] = useState<IUser>()
  const session = useStorage()
  useEffect(() => {
    if (session.getItem('user')) setUser(JSON.parse(session.getItem('user')))
  }, [])

  return (
    <>
      <nav className="mt-20 h-20 w-full flex bg-white items-center  border-gray-200 px-10 py-2.5 shadow-md z-50 fixed  bottom-0 left-0 right-0 justify-center phone:flex-row">
        <div className="absolute left-0 ml-10 phone:ml-0 -translate-y-1/2 top-1/2 phone:mt-2">
          {/* {user ? (
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
          )} */}
        </div>
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 phone:space-x-12 phone:flex phone:flex-row">
          <li>
            <Link
              href={`/`}
              className={` ${
                pathname == '/' && 'text-red-500'
              }  " block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 "`}
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              href={`/connect`}
              className={` ${
                pathname == '/connect' && 'text-red-500'
              }  " block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 "`}
            >
              Kết nối
            </Link>
          </li>
          {user && (
            <li>
              <Link
                href={`/discover`}
                className={` ${
                  pathname == '/discover' && 'text-red-500'
                }  " block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 "`}
              >
                Khám phá
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link
                href={`/account`}
                className={` ${
                  pathname == '/account' && 'text-red-500'
                }  " block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 "`}
              >
                Cá nhân
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Footer
