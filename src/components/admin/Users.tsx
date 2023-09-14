'use client'
import { useAddMoneyByAdminMutation } from '@/redux/api/banking'
import { useGetAllCommentsQuery } from '@/redux/api/comment'
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateBlockedMutation
} from '@/redux/api/user'
import { useformatDate } from '@/utils/hook'
import { APP_URL, IComment, IUser } from '@/utils/type'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { AiFillEdit, AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import Loading from '../Loading'
import Card from '../Card'
import { usePathname, useRouter } from 'next/navigation'

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [comments, setComments] = useState<IComment[]>([])

  const [users_1, setUsers_1] = useState<IUser[]>([])
  const [comments_1, setComments_1] = useState<IComment[]>([])
  const [phone, setphone] = useState<string>('')
  const {
    data: dataUser,
    isSuccess: successUser,
    isFetching: fetchUser
  } = useGetAllUsersQuery()
  const {
    data: dataComment,
    isSuccess: successComment,
    isFetching: fetchComment
  } = useGetAllCommentsQuery()
  useEffect(() => {
    if (successUser && dataUser) {
      setUsers(dataUser)
      setUsers_1(dataUser)
    }
  }, [dataUser, successUser])

  useEffect(() => {
    if (successComment && dataComment) {
      setComments(dataComment)
      setComments_1(dataComment)
    }
  }, [dataComment, successComment])

  const [deleteUser] = useDeleteUserMutation()

  const handleDelete = (id?: string) => {
    if (id)
      deleteUser(id).then((res) => {
        toast.success('Xóa thành công!!!')
        setUsers(users.filter((item) => item.id !== id))
      })
  }

  const [updateBlocked] = useUpdateBlockedMutation()
  const handleBlocked = (id: string, blocked: boolean) => {
    const data = {
      id: id,
      blocked: !blocked
    }
    updateBlocked(data).then((res) => {
      if (res) {
        toast.success('Mở khoá người dùng thành công!!!')
        setUsers(
          users.map((item) => {
            if (item.id === id) {
              return { ...item, blocked: true }
            }
            return item
          })
        )
      }
    })
  }

  const [type, setType] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [item, setItem] = useState<IUser>()

  const fetchUsers = async (): Promise<IUser[]> => {
    const response = await fetch(`${APP_URL}/api/users`)
    const images = await response.json()
    return images as IUser[]
  }

  const pathName = usePathname()
  useEffect(() => {
    fetchUsers().then((data) => setUsers(data))
  }, [pathName])

  return (
    <div>
      <div className="bg-white p-4 rounded-sm">
        <h1 className="font-semibold text-xl">Tìm theo SĐT</h1>
        <form className="flex mt-2">
          <input
            type="text"
            placeholder="Nhập phone"
            className="flex-1 border-gray-300"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <button
            type="submit"
            className="border border-purple-600 text-purple-600 p-2"
            onClick={(e) => {
              e.preventDefault()
              setUsers(users.filter((item) => item.phone === phone))
            }}
          >
            Tìm kiếm
          </button>
        </form>
      </div>
      <br />
      <div className="bg-white p-4">
        <h1 className="font-semibold text-xl">Danh sách thành viên</h1>
        <br />
        <div className="grid grid-cols-4 space-x-5 mt-4 text-white font-semibold h-28">
          <div className="p-5 bg-[#2861FE] text-center">
            <h1 className="text-5xl mb-1">{users_1.length}</h1>
            <span>Thành viên</span>
          </div>
          <div className="p-5 bg-[#7560EE] text-center">
            <h1 className="text-5xl mb-1">{users_1.length}</h1>
            <span>Hoạt động</span>
          </div>
          <div className="p-5 bg-[#37BEA7] text-center">
            <h1 className="text-5xl mb-1">{comments_1.length}</h1>
            <span>Đánh giá</span>
          </div>
          <div className="p-5 bg-[#353A40] text-center">
            <h1 className="text-5xl mb-1">{users_1.length}</h1>
            <span>TK hoạt động</span>
          </div>
        </div>
        <br />

        {fetchUser ? (
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
                  Tên
                </th>
                <th scope="col" className="px-6 py-3">
                  Tổng tiền
                </th>
                <th scope="col" className="px-6 py-3">
                  Tiền bị đóng băng
                </th>
                <th scope="col" className="px-6 py-3">
                  SĐT
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày tạo
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, index) => {
                return (
                  <tr className="bg-white border-b text-center" key={item.id}>
                    <td className="px-6 py-4 hover:text-blue-300 cursor-pointer">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      {item.money!.toLocaleString('en-US')} VNĐ
                    </td>
                    <td className="px-6 py-4">
                      {item.amoutBlock!.toLocaleString('en-US')} VNĐ
                    </td>
                    <td className="px-6 py-4">{item.phone}</td>
                    <td className="px-6 py-4">
                      {useformatDate(item.createdAt?.toLocaleString())}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button
                        className="px-2 rounded border-2 border-black"
                        onClick={() => {
                          setOpen(true)
                          setType('deposite')
                          setItem(item)
                        }}
                      >
                        +
                      </button>
                      <button
                        className="px-2 rounded border-2 border-black"
                        onClick={() => {
                          setOpen(true)
                          setType('withdraw')
                          setItem(item)
                        }}
                      >
                        -
                      </button>
                    </td>
                    <td
                      className="px-6 py-4 text-white space-x-1 text-xs
"
                    >
                      <button className="bg-yellow-400 p-2 rounded-sm">
                        <Link href={`users/${item.id}/edit`}>
                          <AiFillEdit />
                        </Link>
                      </button>
                      <button
                        className="bg-[#F62D51] p-2 rounded-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <BsFillTrashFill />
                      </button>
                      <button
                        className="text-lg text-black p-2 rounded-sm"
                        onClick={() => handleBlocked(item.id!, item.blocked!)}
                      >
                        {item.blocked ? <AiFillLock /> : <AiFillUnlock />}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
        {open && (
          <ModalAdmin
            transactionType={type}
            user={item!}
            open={open}
            setOpen={setOpen}
          />
        )}
      </div>
    </div>
  )
}
//tổng tièn, tiền khả dụng và tiền bị đóng băng

export default Users
interface Props {
  transactionType: string
  user: IUser
  open: boolean
  setOpen: (open: boolean) => void
}
const ModalAdmin = ({ transactionType, user, setOpen }: Props) => {
  const [addMoneyByAdmin] = useAddMoneyByAdminMutation()
  const [amount, setAmount] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const changeMoney = () => {
    setLoading(true)
    const data = {
      user,
      amount: Number(amount),
      transactionType
    }
    addMoneyByAdmin(data).then((res) => {
      if (res) {
        setLoading(false)
        toast.success(
          `Bạn đã ${
            transactionType == 'deposite' ? 'nạp tiền' : 'rút tiền'
          } thành công`
        )
        setOpen(false)
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    })
  }
  return (
    <div className="fixed top-10 z-50 overflow-x-hidden overflow-y-auto md:inset-0 phone:w-[90%] m-0 mx-auto left-0 right-0 p-3 md:w-2/5">
      <div className="absolute bg-white left-1/2 -translate-x-1/2 rounded-lg w-full shadow-xl p-3 border-2 border-black">
        <div className="flex items-start justify-between ">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {transactionType === 'deposite'
              ? 'Nạp tiền cho thành viên'
              : 'Rút tiền cho thành viên'}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
            onClick={() => setOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form action="" className="flex space-x-3">
          <input
            type="text"
            value={amount}
            className="w-full border border-black p-2 rounded-lg"
            onChange={(e) => {
              setAmount(e.target.value)
            }}
            placeholder="Nhập số tiền"
          />

          <button
            data-modal-hide="staticModal"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg py-2.5 text-center w-28 flex justify-center items-center"
            onClick={changeMoney}
          >
            {loading ? (
              <Loading />
            ) : transactionType == 'deposite' ? (
              'Nạp tiền'
            ) : (
              'Rút tiền'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
