'use client'
import {
  useDeleteConnectMutation,
  useGetAllConnectQuery
} from '@/redux/api/connect'
import { useformatDate } from '@/utils/hook'
import { APP_URL, IConnect } from '@/utils/type'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import CreateConnect from './CreateConnect'

const Connect = () => {
  const [connects, setConnects] = useState<IConnect[]>([])
  const [nameSearch, setphoneSearch] = useState<string>('')
  const { data, isSuccess, isFetching } = useGetAllConnectQuery()

  const fetchConnects = async (): Promise<IConnect[]> => {
    const response = await fetch(`${APP_URL}/api/connects`)
    const images = await response.json()
    return images as IConnect[]
  }

  const pathName = usePathname()
  useEffect(() => {
    fetchConnects().then((data) => setConnects(data))
  }, [pathName])

  useEffect(() => {
    if (isSuccess && data) {
      setConnects(data)
    }
  }, [data, isSuccess])
  const router = useRouter()
  const [deleteConnect] = useDeleteConnectMutation()

  const handleDelete = (id?: string) => {
    if (id) {
      deleteConnect(id).then(() => {
        toast.success('Xóa thành công')
        setConnects(connects.filter((item) => item.id !== id))
      })
    }
    connects.filter((item) => item.id !== id)
  }
  const [add, setAdd] = useState(true)

  const Card = () => (
    <div
      role="status"
      className="animate-pulse w-full max-w-[295px] bg-white border border-gray-200 rounded-lg shadow"
    >
      <div className="flex flex-col items-center py-3">
        <svg
          className="w-24 h-24 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <h5 className="h-6 mt-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></h5>
        <span className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-4"></span>
      </div>
      <div className="flex my-4 space-x-3 justify-center">
        <button className="h-9 bg-gray-200 rounded-lg dark:bg-gray-700 w-28 mb-4"></button>
        <button className="h-9 bg-gray-200 rounded-lg dark:bg-gray-700 w-28 mb-4"></button>
      </div>
    </div>
  )
  return (
    <div>
      <button
        className={`${
          add
            ? ' bg-blue-700 rounded-lg hover:bg-blue-800 '
            : ' bg-gray-700 rounded-lg hover:bg-gray-800 '
        } " block items-center px-4 py-2 text-sm font-medium text-center text-white mb-3 "`}
        onClick={() => setAdd(!add)}
      >
        {add ? 'Thêm kết nối' : 'Hiển thị tất cả kết nối'}
      </button>
      {add ? (
        <div>
          <div className="bg-white p-4 rounded-sm">
            <h1 className="font-semibold text-xl">Tìm theo tên</h1>
            <form className="flex mt-2">
              <input
                type="text"
                placeholder="Nhập tên"
                className="flex-1 border-gray-300"
                value={nameSearch}
                onChange={(e) => setphoneSearch(e.target.value)}
                onBlur={(e) => {
                  if (e.target.value === '') setConnects(data!)
                }}
              />
              <button
                type="submit"
                className="border border-purple-600 text-purple-600 p-2"
                onClick={(e) => {
                  e.preventDefault()
                  setConnects(
                    connects.filter(
                      (item) =>
                        item.name?.toLocaleLowerCase() ===
                        nameSearch.toLowerCase()
                    )
                  )
                }}
              >
                Tìm kiếm
              </button>
            </form>
          </div>
          <br />
          <div className="bg-white p-4">
            {isFetching ? (
              <div className="grid grid-cols-4 gap-5">
                {Array(12)
                  .fill(0)
                  .map((_, index) => {
                    return <Card key={index} />
                  })}
              </div>
            ) : (
              <table className="w-full text-sm text-left bg-white">
                <thead className="text-xs uppercase">
                  <tr className="text-center">
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Tên
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tuổi
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Giới tính
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ngày tạo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {connects?.map((item, index) => {
                    return (
                      <tr
                        className="bg-white border-b text-center"
                        key={item.id}
                      >
                        <td className="px-6 py-4">
                          <span>{index + 1}</span>
                        </td>
                        <td className="px-6 py-4 hover:text-blue-300 cursor-pointer">
                          {item.name}
                        </td>
                        <td className="px-6 py-4">{item.age}</td>
                        <td className="px-6 py-4">
                          {item.gender ? 'Nam' : 'Nữ'}
                        </td>
                        <td className="px-6 py-4">
                          {useformatDate(item.createdAt?.toLocaleString())}
                        </td>
                        <td
                          className="px-6 py-4 text-white space-x-1 text-xs
"
                        >
                          <button className="bg-yellow-400 p-2 rounded-sm">
                            <Link href={`connects/${item.id}/edit`}>
                              <AiFillEdit />
                            </Link>
                          </button>
                          <button
                            className="bg-[#F62D51] p-2 rounded-sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            <BsFillTrashFill />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <CreateConnect />
      )}
    </div>
  )
}

export default Connect
