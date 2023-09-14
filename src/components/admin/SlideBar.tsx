/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  AiOutlineCreditCard,
  AiOutlineDisconnect,
  AiOutlineHistory,
  AiTwotoneHome
} from 'react-icons/ai'
import { FaProductHunt, FaUserTie } from 'react-icons/fa'
import { BiMoneyWithdraw } from 'react-icons/bi'
const Slidebar = () => {
  const [user, setUser] = useState(false)
  const [products, setProducts] = useState(false)
  const [connects, setConnects] = useState(false)
  const [recharge, setRecharge] = useState(false)
  const [withdraw, setWithdraw] = useState(false)
  const [history, setHistory] = useState(false)

  const pathname = usePathname()
  const slug = pathname.split('/').pop()
  const slug_detail_1 = pathname.split('/')[2]
  const slug_detail_2 = pathname.split('/').pop()
  useEffect(() => {
    if (
      slug === 'users' ||
      (slug_detail_2 == 'edit' && slug_detail_1 == 'users')
    ) {
      setUser(true)
    } else if (
      slug === 'products' ||
      (slug_detail_2 == 'edit' && slug_detail_1 == 'products')
    ) {
      setProducts(true)
    } else if (
      slug === 'connects' ||
      (slug_detail_2 == 'edit' && slug_detail_1 == 'connects')
    ) {
      setConnects(true)
    } else if (
      slug === 'recharge' ||
      (slug_detail_2 == 'edit' && slug_detail_1 == 'recharge')
    ) {
      setRecharge(true)
    } else if (
      slug === 'withdraw' ||
      (slug_detail_2 == 'edit' && slug_detail_1 == 'withdraw')
    ) {
      setWithdraw(true)
    } else if (
      slug === 'credits' ||
      (slug_detail_2 == 'edit' && slug_detail_1 == 'credits')
    ) {
      setWithdraw(true)
    } else if (
      slug === 'history' ||
      (slug_detail_2 == 'edit' && slug_detail_1 == 'history')
    ) {
      setHistory(true)
    }
  }, [slug])

  return (
    <aside className="w-60 bg-black text-white h-[92vh] overflow-auto no-scrollbar pb-10 fixed top-[8%] z-20 xl:h-screen xl:top-14">
      <div className="pt-1">
        <ul>
          <li
            className={
              slug === 'users' ||
              (slug_detail_1 === 'users' && slug_detail_2 === 'edit')
                ? 'bg-[#FF0000]'
                : ''
            }
          >
            <Link
              href="/dashboard/users"
              className="pl-7 flex items-center p-2 text-xl font-normal group  hover:bg-[#FF0000] cursor-pointer]"
            >
              <FaUserTie
                className={`${
                  slug === 'users' ||
                  (slug_detail_1 === 'users' &&
                    slug_detail_2 === 'edit' &&
                    'text-white ')
                } "text-[#ff0000] group-hover:text-white"`}
              />
              <span className="ml-3">Người dùng</span>
            </Link>
          </li>
          <li
            className={
              slug === 'products' ||
              (slug_detail_1 === 'products' && slug_detail_2 === 'edit')
                ? 'bg-[#FF0000]'
                : ''
            }
          >
            <Link
              href="/dashboard/products"
              className="pl-7 flex items-center p-2 text-xl font-normal group  hover:bg-[#FF0000] cursor-pointer]"
            >
              <FaProductHunt
                className={`${
                  slug === 'products' ||
                  (slug_detail_1 === 'products' &&
                    slug_detail_2 === 'edit' &&
                    'text-white ')
                } "text-[#ff0000] group-hover:text-white"`}
              />
              <span className="ml-3">Sản phẩm</span>
            </Link>
          </li>
          <li
            className={
              slug === 'connects' ||
              (slug_detail_1 === 'connects' && slug_detail_2 === 'edit')
                ? 'bg-[#FF0000]'
                : ''
            }
          >
            <Link
              href="/dashboard/connects"
              className="pl-7 flex items-center p-2 text-xl font-normal group  hover:bg-[#FF0000] cursor-pointer]"
            >
              <AiOutlineDisconnect
                className={`${
                  slug === 'connects' ||
                  (slug_detail_1 === 'connects' &&
                    slug_detail_2 === 'edit' &&
                    'text-white ' &&
                    'text-white ')
                } "text-[#ff0000] group-hover:text-white"`}
              />
              <span className="ml-3">Kết nối</span>
            </Link>
          </li>
          <li className={slug === 'recharge' ? 'bg-[#FF0000]' : ''}>
            <Link
              href="/dashboard/recharge"
              className="pl-7 flex items-center p-2 text-xl font-normal group  hover:bg-[#FF0000] cursor-pointer]"
            >
              <BiMoneyWithdraw
                className={`${
                  slug === 'recharge' && 'text-white '
                } "text-[#ff0000] group-hover:text-white"`}
              />
              <span className="ml-3">Nạp tiền</span>
            </Link>
          </li>
          <li className={slug === 'withdraw' ? 'bg-[#FF0000]' : ''}>
            <Link
              href="/dashboard/withdraw"
              className="pl-7 flex items-center p-2 text-xl font-normal group  hover:bg-[#FF0000] cursor-pointer]"
            >
              <BiMoneyWithdraw
                className={`${
                  slug === 'withdraw' && 'text-white '
                } "text-[#ff0000] group-hover:text-white"`}
              />
              <span className="ml-3">Rút tiền</span>
            </Link>
          </li>
          <li className={slug === 'credits' ? 'bg-[#FF0000]' : ''}>
            <Link
              href="/dashboard/credits"
              className="pl-7 flex items-center p-2 text-xl font-normal group  hover:bg-[#FF0000] cursor-pointer]"
            >
              <AiOutlineCreditCard
                className={`${
                  slug === 'credits' && 'text-white '
                } "text-[#ff0000] group-hover:text-white"`}
              />
              <span className="ml-3">Thêm tài khoản</span>
            </Link>
          </li>
          <li className={slug === 'history' ? 'bg-[#FF0000]' : ''}>
            <Link
              href="/dashboard/history"
              className="pl-7 flex items-center p-2 text-xl font-normal group  hover:bg-[#FF0000] cursor-pointer]"
            >
              <AiOutlineHistory
                className={`${
                  slug === 'history' && 'text-white '
                } "text-[#ff0000] group-hover:text-white"`}
              />
              <span className="ml-3">Lịch sử nạp rút</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Slidebar
