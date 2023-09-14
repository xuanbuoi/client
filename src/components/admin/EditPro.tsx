'use client'

import {
  useAddProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation
} from '@/redux/api/product'
import React, { useEffect, useState } from 'react'
import { BiComment } from 'react-icons/bi'
import { TfiMoney } from 'react-icons/tfi'
import { TbCut } from 'react-icons/tb'
import { useformatDate } from '@/utils/hook'
import { IoCaretBack } from 'react-icons/io5'
import Link from 'next/link'
import { FormSubmit, IProduct, InputChange } from '@/utils/type'
import { imageUpload } from '@/utils/upload'
import { toast } from 'react-custom-alert'
import Loading from '../Loading'
import Image from 'next/image'

const EditPro = ({ id }: { id: string }) => {
  const { data: dataProduct, isSuccess: successProduct } =
    useGetProductByIdQuery(id)
  const [totalPrice, setTotalPrice] = useState<number | string>(0 || '')
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const [createdAt, setCreatedAt] = useState<string>('')

  useEffect(() => {
    if (successProduct && dataProduct) {
      setProduct(dataProduct)
      setTotalPrice(dataProduct.price + dataProduct.bonus!)
      setCreatedAt(useformatDate(dataProduct.createdAt?.toLocaleString()))
    }
  }, [dataProduct, successProduct])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name !== 'total') setProduct({ ...product, [name]: value })
  }
  const [currnetFileImg, setCurrnetFileImg] = useState<File | undefined>(
    undefined
  )
  const [upload, setUpload] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files![0]
    setCurrnetFileImg(file)
    setUpload(true)
    setLoading(true)

    const photo = await imageUpload(file)
    if (photo.url === undefined) return
    if (photo.url) {
      setProduct({ ...product, url: photo.url as string })
      setLoading(false)
      setUpload(false)
    }
  }

  const [updateProduct] = useUpdateProductMutation()
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    const data = {
      id,
      body: product!
    }
    setLoadingUpdate(true)
    updateProduct(data).then(() => {
      toast.success('Cập nhật thành công')
      setLoadingUpdate(false)
    })
  }

  return (
    <>
      <button className="p-3 bg-black text-white rounded-lg">
        <Link href={'/dashboard/products'}>
          <IoCaretBack />
        </Link>
      </button>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              className="border-gray-300"
              placeholder=""
              value={product?.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Time
            </label>
            <input
              type="text"
              name="createdAt"
              className="border-gray-300"
              placeholder=""
              value={createdAt}
              onChange={(e) => {
                setCreatedAt(e.target.value)
                setProduct({
                  ...product,
                  createdAt: new Date(e.target.value)
                })
              }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Giá thanh toán
            </label>
            <div className="flex items-center">
              <span className="bg-gray-300 p-3">
                <TfiMoney />
              </span>
              <input
                type="text"
                name="price"
                className="border-gray-100"
                placeholder=" "
                value={product?.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="">
              Giá sau thanh toán
            </label>
            <div className="flex items-center">
              <span className="bg-gray-300 p-3">
                <TfiMoney />
              </span>
              <input
                type="text"
                name="total"
                className="border-gray-100"
                placeholder=" "
                value={totalPrice}
                onChange={(e) => {
                  setTotalPrice(e.target.value)
                  setProduct({
                    ...product,
                    bonus: Number(e.target.value) - product.price
                  })
                }}
              />
            </div>
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="">
              Lượt đánh giá
            </label>
            <div className="flex items-center">
              <span className="bg-gray-300 p-3">
                <BiComment />
              </span>
              <input
                type="text"
                name="views"
                className="border-gray-100"
                placeholder=" "
                value={
                  product?.views !== null
                    ? product?.views
                    : product?.comments?.length
                }
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="z-0 w-full mb-6 flex flex-col">
          <label htmlFor="floating_last_name" className="">
            Hình ảnh
          </label>
          <div className="flex space-x-3">
            <Image
              width={500}
              height={500}
              src={
                currnetFileImg
                  ? URL.createObjectURL(currnetFileImg)
                  : product?.url!
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
            {loading && <Loading />}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md w-full text-center items-center justify-center flex hover:bg-blue-700"
          disabled={loading}
        >
          {loadingUpdate ? <Loading /> : 'Cập nhật'}
        </button>
      </form>
    </>
  )
}

export default EditPro
