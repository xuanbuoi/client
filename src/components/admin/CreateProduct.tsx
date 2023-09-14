/* eslint-disable @next/next/no-img-element */
'use client'

import { useAddProductMutation } from '@/redux/api/product'
import { IProduct } from '@/utils/type'
import { imageUpload } from '@/utils/upload'
import React, { useState } from 'react'
import { toast } from 'react-custom-alert'
import { AiFillCamera } from 'react-icons/ai'
import Loading from '../Loading'

const CreateProduct = () => {
  const initState: IProduct = {
    id: '',
    name: '',
    price: 0,
    url: '',
    votes: 0,
    purchases: 0
  }
  const [product, setProduct] = useState<IProduct>(initState)
  const { name, price } = product
  const [currnetFileImg, setCurrnetFileImg] = useState<File | undefined>(
    undefined
  )
  const [upload, setUpload] = useState<boolean>(false)
  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files![0]
    setCurrnetFileImg(file)
    setUpload(true)
    const photo = await imageUpload(file)
    setUpload(false)
    if (photo.url === undefined) return
    if (photo.url) {
      setProduct({ ...product, url: photo.url })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }
  const [addProduct, result] = useAddProductMutation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !price || !currnetFileImg) {
      toast.warning('Vui lòng điền vào tất cả các trường')
      return
    }
    addProduct(product)

    if (result.data) {
      toast.success('Thêm sản phẩm thành công')
    }
  }

  return (
    <div>
      <form className="w-1/4 p-2 pl-5 mt-4" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={name}
            onChange={handleInputChange}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Tên sản phẩm
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="price"
            id="price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={price !== 0 ? price : ''}
            onChange={handleInputChange}
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Giá tiền(VNĐ)
          </label>
        </div>
        <div className="grid grid-cols-2">
          <div className="relative z-0 w-full mb-6 group">
            <div className="relative flex flex-col items-center">
              <div className="flex">
                {currnetFileImg && upload && <Loading />}

                <div>
                  {currnetFileImg === undefined ? (
                    <svg
                      className="w-40 h-20 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  ) : (
                    <>
                      <img
                        src={
                          currnetFileImg && URL.createObjectURL(currnetFileImg)
                        }
                        alt=""
                        className=" object-cover w-16 h-16"
                      />
                    </>
                  )}
                </div>
              </div>
              <label
                htmlFor="file"
                className="flex items-center justify-center cursor-pointer space-x-1 p-1 text-white bg-gray-800 absolute rounded-full -bottom-1/3 transform -translate-x-1/2 object-cover w-6 h-6 left-3/4 top-3/4"
              >
                <AiFillCamera className="w-6 h-6" />
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

        <div className="flex my-4 space-x-3 justify-center">
          <button
            className={`   " inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 "`}
            type="submit"
            disabled={upload}
          >
            Thêm sản phẩm
          </button>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-red-500 border rounded-lg hover:bg-red-700 "
            type="reset"
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct
