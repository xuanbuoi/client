/* eslint-disable @next/next/no-img-element */
import {
  useGetAllImagesQuery,
  useGetImageQuery,
  useUpdateCoupleMutation
} from '@/redux/api/image'
import { IImage } from '@/utils/type'
import { imageUpload } from '@/utils/upload'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { AiFillCamera } from 'react-icons/ai'
import { IoCaretBack } from 'react-icons/io5'
import Loading from '../Loading'
import { useformatDate } from '@/utils/hook'
const EditImg = ({ id }: { id: string }) => {
  const { data, isSuccess } = useGetImageQuery(id)
  const [img, setImg] = useState<IImage>({} as IImage)
  const [updatedAt, setUpdatedAt] = useState<string>('')
  useEffect(() => {
    if (isSuccess && data) {
      setImg(data)
      setUpdatedAt(useformatDate(data.updatedAt?.toLocaleString()))
    }
  }, [data, isSuccess])

  const [currnetFileImg, setCurrnetFileImg] = useState<File | undefined>(
    undefined
  )
  const [upload, setUpload] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files![0]
    setCurrnetFileImg(file)
    setUpload(true)
    const photo = await imageUpload(file)
    if (photo.url === undefined) return
    if (photo.url) {
      setImg({ ...img, url: photo.url })
      setUpload(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setImg({ ...img, [name]: value })
  }

  const [updateCouple] = useUpdateCoupleMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      id,
      body: img
    }

    setLoading(true)
    console.log(data)
    updateCouple(data!).then(() => {
      setCurrnetFileImg(undefined)
      setLoading(false)
      toast.success('Cập nhật thành công')
    })
  }

  const [images, setImages] = useState<IImage[]>([])

  const { data: dataImg, isSuccess: successImg } = useGetAllImagesQuery()
  const refresh = () => {
    if (successImg && dataImg) {
      setImages(dataImg)
    }
  }

  return (
    <>
      <button className="p-3 bg-black text-white rounded-lg" onClick={refresh}>
        <Link href={'/dashboard'}>
          <IoCaretBack />
        </Link>
      </button>
      <form className="w-full p-2 pl-5 mt-4" onSubmit={handleSubmit}>
        <div className="flex justify-start items-center space-x-4">
          <div className="ml-4">
            <div className="z-0 w-full mb-2 flex flex-col">
              <label htmlFor="floating_first_name" className="">
                Cặp đôi
              </label>
              <input
                type="text"
                name="name"
                className="border-gray-300 rounded-lg"
                placeholder=""
                value={img?.name!}
                onChange={handleChange}
                required
              />
            </div>
            <div className="z-0 w-full mb-2 flex flex-col">
              <label htmlFor="floating_first_name" className="">
                Quê quán
              </label>
              <input
                type="text"
                name="address"
                className="border-gray-300 rounded-lg"
                placeholder=""
                value={img?.address!}
                onChange={handleChange}
                required
              />
            </div>
            <div className="z-0 w-full mb-2 flex flex-col">
              <label htmlFor="floating_first_name" className="">
                Người kết nối
              </label>
              <input
                type="text"
                name="contactPerson"
                className="border-gray-300 rounded-lg"
                placeholder=""
                value={img?.contactPerson!}
                onChange={handleChange}
                required
              />
            </div>
            <div className="z-0 w-full mb-2 flex flex-col">
              <label htmlFor="floating_first_name" className="">
                chuyến du lịch tại
              </label>
              <input
                type="text"
                name="travelAddress"
                className="border-gray-300 rounded-lg"
                placeholder=""
                value={img?.travelAddress!}
                onChange={handleChange}
                required
              />
            </div>
            <div className="z-0 w-full mb-2 flex flex-col">
              <label htmlFor="floating_first_name" className="">
                Ngày hoàn thành
              </label>
              <input
                type="text"
                name="travelAddress"
                className="border-gray-300 rounded-lg"
                placeholder=""
                value={updatedAt!}
                onChange={(e) => {
                  setUpdatedAt(e.target.value)
                  setImg({ ...img, updatedAt: new Date(e.target.value) })
                }}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="relative z-0 w-full mb-6 group">
              <div className="relative flex flex-col items-center w-full">
                <div className="w-40 h-40">
                  {img.url ? (
                    <img
                      src={
                        currnetFileImg
                          ? URL.createObjectURL(currnetFileImg)
                          : (img.url! as string)
                      }
                      alt=""
                      className="object-fill w-full h-full rounded relative"
                    />
                  ) : (
                    <svg
                      className="w-full h-full text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  )}
                </div>
                <label
                  htmlFor="file"
                  className="flex items-center justify-center cursor-pointer space-x-1 p-1 text-white bg-gray-800 absolute rounded-full transform object-cover w-10 h-10 -right-4 -top-4 text-center"
                >
                  {upload ? (
                    <Loading />
                  ) : (
                    <AiFillCamera className="w-10 h-10" />
                  )}
                  <input
                    type="file"
                    id="file"
                    accept=".png, .jpeg, .jpg"
                    className="hidden"
                    onChange={handleChangeImg}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex my-4 space-x-3 justify-start ml-10">
          <button
            className={`   " inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 "`}
            type="submit"
            disabled={loading}
          >
            {loading ? <Loading /> : 'Cập nhật'}
          </button>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-red-500 border rounded-lg hover:bg-red-700 "
            type="reset"
          >
            Huỷ
          </button>
        </div>
      </form>
    </>
  )
}

export default EditImg
