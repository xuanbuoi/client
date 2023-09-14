'use client'

import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useGetAllProductsQuery } from '@/redux/api/product'
import { IProduct } from '@/utils/type'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
export const renderStart = (rate?: number) => {
  const stars = []
  const max = 5
  if (rate === undefined) return
  for (let i = 0; i < max; i++) {
    if (i < Math.floor(rate)) {
      stars.push(<AiFillStar key={i} className="text-[#FFD700]" />)
    } else {
      stars.push(<AiOutlineStar key={i} className="text-[#FFD700]" />)
    }
  }
  return stars
}
const Products = ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const [products, setProducts] = useState<IProduct[]>([])
  const { data, isSuccess, isFetching } = useGetAllProductsQuery()
  useEffect(() => {
    if (isSuccess && data) {
      setProducts(data)
    }
  }, [data, isSuccess])

  const page = searchParams['page'] ?? '1'
  const limit = searchParams['limit'] ?? '10'

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(limit)
  const end = start + Number(limit)
  const entries = data?.slice(start, end)
  const totalPage = Math.ceil(data?.length! / Number(limit))

  if (isFetching) return <div>Loading...</div>
  return (
    <div className="grid grid-cols-4 grid-flow-row gap-4 p-4 phone:grid-cols-1 phone:gap-y-4">
      {products.map((product, index) => {
        let pricePro = product.price.toLocaleString('en-US') + ' đ'
        const randomAmount = (Math.random() * 100).toFixed(0)

        const totalPrice =
          (product.price + Number(randomAmount)).toLocaleString('en-US') + ' đ'

        return (
          <div
            key={product.id}
            className=" p-2 rounded-lg shadow text-center flex flex-col justify-center items-center border-4 border-black"
          >
            <strong className="text-blue-600 text-lg">
              SP <span>{index + 1 < 10 ? '0' + (index + 1) : index + 1}</span>{' '}
              {product.name}
            </strong>
            <Image
              src={product.url as string}
              alt={''}
              width={300}
              height={300}
              className=" mx-auto object-cover "
            />
            <br />
            <br />

            <p className="text-center font-semibold">
              Giá: <span className="text-[#F62D51]">{pricePro}</span> Đánh giá +
              thanh toán nhận:{' '}
              <span className="text-[#F62D51]">{totalPrice}</span>
            </p>
            <span className="font-semibold">
              Đã có {product.comments?.length} lượt đánh giá
            </span>
            <Link
              href={`products/${product.id}`}
              className="bg-[#F62D51] w-40 p-1 px-2 text-white text-sm rounded-sm my-2"
            >
              Đánh giá sản phẩm
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Products
