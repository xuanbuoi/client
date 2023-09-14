/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/user'
import { useformatDate, isValidDateTimeFormat } from '@/utils/hook'
import { IUser } from '@/utils/type'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { IoCaretBack } from 'react-icons/io5'

const EditUser = ({ id }: { id: string }) => {
  const { data, isSuccess } = useGetUserQuery(id)
  const [user, setUser] = useState<IUser>({} as IUser)
  const [block, setBlock] = useState<string>('0')
  const [time, setTime] = useState<string>('' as string)

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data)
      setBlock(data.amoutBlock?.toLocaleString('en-US') || '0')
      setTime(useformatDate(data.createdAt?.toLocaleString()))
    }
  }, [data, isSuccess])

  function convertCurrency(amount?: number) {
    return (amount ? amount.toLocaleString('en-US') : 0) + ' VNĐ'
  }

  const [updateUser] = useUpdateUserMutation()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newUser = {
      ...user,
      amoutBlock: parseInt(block.replace(/,/g, '')),
      createdAt: time
    }
    const data = {
      id: newUser.id!,
      body: {
        ...newUser,
        password: password || undefined
      }
    }
    updateUser(data).then((res) => {
      toast.success('Cập nhật thành công')
      router.replace('/dashboard/users')
    })
  }

  const [password, setPassword] = useState<string>('')

  return (
    <>
      <button className="p-3 bg-black text-white rounded-lg">
        <Link href={'/dashboard/users'}>
          <IoCaretBack />
        </Link>
      </button>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Tên
            </label>
            <input
              type="text"
              name="name"
              className="border-gray-300"
              placeholder=""
              value={user?.name || ''}
              readOnly
              disabled
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="">
              SĐT
            </label>
            <input
              type="text"
              name="phone"
              className="border-gray-300"
              placeholder=" "
              value={user?.phone || ''}
              readOnly
              disabled
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Tổng tiền
            </label>
            <input
              type="text"
              name="money"
              className="border-gray-300"
              placeholder=""
              value={convertCurrency(user?.money)}
              readOnly
              disabled
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="">
              Tiền khả dụng
            </label>
            <input
              type="text"
              className="border-gray-300"
              placeholder=" "
              value={convertCurrency(user.money! - user.amoutBlock!)}
              readOnly
              disabled
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="">
              Tiền bị đóng băng
            </label>
            <input
              type="text"
              name="amoutBlock"
              className="border-gray-300"
              placeholder={block + ' VNĐ'}
              value={block}
              onChange={(e) => {
                setBlock(e.target.value)
              }}
              onBlur={(e) => {
                if (isNaN(parseInt(e.target.value.toString().split(' ')[0]))) {
                  setBlock('0')
                  toast.warning('Vui lòng nhập số')
                  return
                }

                setBlock(
                  parseInt(e.target.value).toLocaleString('en-US') + ' VNĐ'
                )
              }}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Ngày tạo
            </label>
            <input
              type="text"
              name="createdAt"
              className="border-gray-300"
              placeholder=""
              value={time}
              onBlur={(e) => {
                if (!isValidDateTimeFormat(e.target.value)) {
                  toast.warning(
                    'Vui lòng nhập đúng định dạng yyyy-mm-dd hh:mm:ss(2023-08-23 22:55:47)'
                  )
                  return
                }
              }}
              onChange={(e) => {
                setTime(e.target.value)
              }}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="">
              Mật khẩu
            </label>
            <input
              type="text"
              name="password"
              className="border-gray-300"
              placeholder="Mật khẩu mới "
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 p-2 rounded-md w-full">
          Lưu
        </button>
      </form>
    </>
  )
}

export default EditUser
