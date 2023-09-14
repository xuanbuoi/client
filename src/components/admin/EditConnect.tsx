import {
  useGetConnectQuery,
  useUpdateConnectMutation
} from '@/redux/api/connect'
import { FormSubmit, IConnect, InputChange } from '@/utils/type'
import { imageUpload } from '@/utils/upload'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { IoCaretBack } from 'react-icons/io5'
import Loading from '../Loading'

const EditConnect = ({ id }: { id: string }) => {
  const { data, isSuccess } = useGetConnectQuery(id)

  const [connect, setConnect] = useState<IConnect>()
  useEffect(() => {
    if (isSuccess && data) {
      setConnect(data)
    }
  }, [data, isSuccess])

  const [currnetFileImg, setCurrnetFileImg] = useState<File | undefined>(
    undefined
  )
  const [upload, setUpload] = useState<boolean>(false)
  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setConnect({ ...connect, [name]: value })
  }
  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files![0]
    setCurrnetFileImg(file)
    setUpload(true)
    const photo = await imageUpload(file)
    if (photo.url === undefined) return
    if (photo.url) {
      setConnect({ ...connect, avatar: photo.url })
      setUpload(false)
    }
  }

  const [updateConnect, result] = useUpdateConnectMutation()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault()
    const dataUpdate = {
      id,
      body: connect!
    }
    setLoading(true)
    console.log(dataUpdate)
    updateConnect(
      {
        id,
        body: connect!
      }!
    )
      .then(() => {
        toast.success('Cập nhật thành công')
        router.replace('/dashboard/connects')
        setLoading(false)
      })
      .catch((err) => {
        toast.error('Cập nhật thất bại')
      })
  }

  return (
    <>
      <button className="p-3 bg-black text-white rounded-lg">
        <Link href={'/dashboard/connects'}>
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
              value={connect?.name}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Tuổi
            </label>
            <input
              type="text"
              name="age"
              className="border-gray-300"
              placeholder=""
              value={connect?.age}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Quê quán
            </label>
            <input
              type="text"
              name="address"
              className="border-gray-300"
              placeholder=""
              value={connect?.address}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Công việc
            </label>
            <input
              type="text"
              name="job"
              className="border-gray-300"
              placeholder=""
              value={connect?.job}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Sở thích
            </label>
            <input
              type="text"
              name="favorite"
              className="border-gray-300"
              placeholder=""
              value={connect?.favorite}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Giới tính
          </label>
          <select
            id="type"
            value={connect?.gender ? '0' : '1'}
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => {
              const { value } = e.target
              if (value === 'no') return
              setConnect({
                ...connect,
                gender: value === '0' ? true : false
              })
            }}
          >
            <option value="no">Lựa chọn giói tính</option>
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
          </select>
        </div>

        <div className="z-0 w-full mb-6 flex flex-col">
          <label htmlFor="floating_last_name" className="font-semibold">
            Hình ảnh
          </label>
          <div className="flex space-x-3">
            <Image
              width={500}
              height={500}
              src={
                currnetFileImg
                  ? URL.createObjectURL(currnetFileImg)
                  : connect?.avatar!
              }
              alt=""
              className="w-32 h-32"
            />
            <input
              className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 h-fit w-fit"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              onChange={handleChangeImg}
            />
            {upload && <Loading />}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md w-full mt-4 flex justify-center items-center hover:bg-blue-700"
          disabled={upload}
        >
          {loading ? <Loading /> : 'Cập nhật'}
        </button>
      </form>
    </>
  )
}

export default EditConnect
