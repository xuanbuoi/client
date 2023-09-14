/* eslint-disable @next/next/no-img-element */
import {
  useAddImageMutation,
  useDeleteImageMutation,
  useGetAllImagesQuery
} from '@/redux/api/image'
import { APP_URL, IImage } from '@/utils/type'
import { imageUpload } from '@/utils/upload'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import Card from '../Card'
import Loading from '../Loading'
const Images = () => {
  const [images, setImages] = useState<IImage[]>([])
  const fetchImgs = async (): Promise<IImage[]> => {
    const response = await fetch(`${APP_URL}/api/images`)
    const images = await response.json()
    return images as IImage[]
  }
  const [flag, setFlag] = useState<boolean>(false)

  const pathName = usePathname()
  useEffect(() => {
    fetchImgs().then((data) => setImages(data))
  }, [pathName, flag])

  const [add, setAdd] = React.useState(true)

  const { data, isSuccess, isFetching } = useGetAllImagesQuery()
  useEffect(() => {
    if (isSuccess && data) {
      setImages(data)
    }
  }, [data, isSuccess])

  const initState: IImage = {
    url: '',
    name: '',
    address: '',
    contactPerson: '',
    travelAddress: ''
  }

  const [img, setImg] = useState<IImage>(initState)
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
      setUpload(false)
      setImg({ ...img, url: photo.url })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setImg({ ...img, [name]: value })
  }

  const [addImg, result] = useAddImageMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    addImg(img).then(() => {
      setImg(initState)
      setCurrnetFileImg(undefined)
      toast.success('Thêm hình ảnh thành công')
      setLoading(false)
      setImages([...images, img])
      setAdd(true)
    })
  }

  const [deleteImg] = useDeleteImageMutation()
  const [imgDelete, setImgDelete] = useState<IImage>()
  const [open, setOpen] = useState<boolean>(false)
  const [loadingDel, setLoadingDel] = useState<boolean>(false)
  const handleDetele = (img: IImage) => {
    setLoadingDel(true)
    if (img) {
      deleteImg(img.id!).then(() => {
        toast.success('Xóa thành công')
        setImages(images.filter((item) => item.id !== img.id))
        setFlag(!flag)
        setOpen(false)
        setLoadingDel(false)
      })
    } else {
      toast.error('Xóa thất bại')
    }
  }

  return (
    <div>
      <button
        className={`${
          add
            ? ' bg-blue-700 rounded-lg hover:bg-blue-800 '
            : ' bg-gray-700 rounded-lg hover:bg-gray-800 '
        } " block items-center px-4 py-2 text-sm font-medium text-center text-white  "`}
        onClick={() => setAdd(!add)}
      >
        {add ? 'Thêm hình ảnh' : 'Hiển thị hình ảnh'}
      </button>
      {!add ? (
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
            </div>
            <div className="grid grid-cols-1">
              <div className="relative z-0 w-full mb-6 group">
                <div className="relative flex flex-col items-center w-full">
                  {currnetFileImg === undefined ? (
                    <label
                      htmlFor="file"
                      className="flex items-center justify-center cursor-pointer space-x-1 p-1 text-white -bottom-1/3 transform  object-fill w-full relative"
                    >
                      <svg
                        className="h-40 text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                      <input
                        type="file"
                        id="file"
                        accept=".png, .jpeg, .jpg"
                        className="hidden"
                        onChange={handleChangeImg}
                      />
                    </label>
                  ) : (
                    <>
                      <img
                        src={
                          currnetFileImg && URL.createObjectURL(currnetFileImg)
                        }
                        alt=""
                        className={`${
                          currnetFileImg && upload && ' opacity-25 '
                        }  " object-fill w-full h-40 rounded relative "`}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex my-4 space-x-3 justify-start ml-10">
            <button
              className={`   " inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 "`}
              type="submit"
              disabled={upload}
            >
              {loading ? <Loading /> : 'Thêm hình ảnh'}
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-red-500 border rounded-lg hover:bg-red-700 "
              type="reset"
            >
              Huỷ
            </button>
          </div>
        </form>
      ) : (
        <div>
          {isFetching ? (
            <div className="grid grid-cols-4 gap-5">
              {Array(12)
                .fill(0)
                .map((_, index) => {
                  return <Card key={index} />
                })}
            </div>
          ) : (
            <div className="mx-4 mt-6">
              <div className="grid lg:grid-cols-5 lg:gap-5 phone:w-full md:grid-cols-5 md:gap-5 phone:gap-y-5">
                {images.map((item) => (
                  <div key={item.id} className="relative group cursor-psointer">
                    <Image
                      width={400}
                      height={400}
                      src={item.url}
                      className="phone:w-full md:w-full lg:w-full w-full h-40 object-cover group-hover:opacity-90"
                      alt=""
                    />
                    <div className="hidden group-hover:absolute group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:flex items-center justify-center p-20 space-x-3">
                      <button className="text-white bg-yellow-500 rounded-full text-4xl p-2 cursor-pointer">
                        <Link href={`dashboard/${item.id}/edit`}>
                          <AiFillEdit />
                        </Link>
                      </button>
                      <span
                        className="text-white bg-red-500 rounded-full text-4xl p-2 cursor-pointer"
                        onClick={() => {
                          setImgDelete(item)
                          setOpen(true)
                        }}
                      >
                        <BsFillTrashFill />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <br />
            </div>
          )}
        </div>
      )}

      {open && (
        <ModalAdmin
          setOpen={setOpen}
          img={imgDelete!}
          callback={handleDetele}
          loading={loadingDel}
        />
      )}
    </div>
  )
}

export default Images

interface Props {
  setOpen: (value: boolean) => void
  img: IImage
  callback: (img: IImage) => void
  loading?: boolean
}
const ModalAdmin = ({ setOpen, callback, img, loading }: Props) => {
  return (
    <div className="fixed top-10 z-50 overflow-x-hidden overflow-y-auto md:inset-0 phone:w-[90%] m-0 mx-auto left-0 right-0 p-3 md:w-2/5">
      <div className="absolute bg-white left-1/2 -translate-x-1/2 rounded-lg w-full shadow-xl p-3 border-2 border-black">
        <div className="flex items-start justify-between ">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Bạn có chắc chắn muốn xóa hình ảnh này không?
          </h3>
        </div>
        <div className="space-x-4 text-white">
          <button
            className="px-4 py-1 rounded-lg bg-green-500 border border-gray-200"
            onClick={() => {
              callback(img)
            }}
          >
            {loading ? <Loading /> : 'Xoá'}
          </button>
          <button
            className="px-4 py-1 rounded-lg bg-red-500 border border-gray-200"
            onClick={() => setOpen(false)}
          >
            Huỷ
          </button>
        </div>
      </div>
    </div>
  )
}
