/* eslint-disable @next/next/no-img-element */
'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NotFound from '@/components/NotFound'
import PaginationControls from '@/components/PaginationControls'
import { useGetAllProductsQuery } from '@/redux/api/product'
import { useStorage } from '@/utils/hook'
import { IProduct, IUser } from '@/utils/type'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Discover = ({
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
  const limit = searchParams['limit'] ?? '8'

  const start = (Number(page) - 1) * Number(limit)
  const end = start + Number(limit)
  const entries = data?.slice(start, end)
  const totalPage = Math.ceil(data?.length! / Number(limit))

  const [account, setAccount] = useState<IUser>()
  const session = useStorage()

  useEffect(() => {
    if (session.getItem('user')) {
      setAccount(JSON.parse(session.getItem('user')))
    }
  }, [])

  if (!account) return <NotFound />

  return (
    <main className="bg-gray-100">
      <Header />
      {!account ||
        (!account?.blocked && (
          <div className="mx-4 mt-6">
            <div className="grid p-4 phone:grid-cols-1 phone:gap-y-4 md:grid-cols-4 md:grid-flow-row md:gap-4">
              {entries?.map((product, index) => {
                let pricePro = product.price.toLocaleString('en-US') + ' đ'

                const totalPrice =
                  (product.price + product.bonus!).toLocaleString('en-US') +
                  ' đ'

                return (
                  <div
                    key={product.id}
                    className=" p-2 rounded-lg shadow text-center flex flex-col justify-center items-center border-2 border-black"
                  >
                    <strong className="text-blue-600 text-lg">
                      SP{' '}
                      <span>
                        {index + 1 < 10 ? '0' + (index + 1) : index + 1}
                      </span>{' '}
                      {product.name}
                    </strong>
                    <img
                      src={product.url as string}
                      alt={''}
                      width={300}
                      height={300}
                      className=" mx-auto object-cover "
                    />

                    <br />
                    <br />

                    <p className="text-center font-semibold">
                      Giá: <span className="text-[#F62D51]">{pricePro}</span>{' '}
                      Đánh giá + thanh toán nhận:{' '}
                      <span className="text-[#F62D51]">{totalPrice}</span>
                    </p>
                    <span className="font-semibold">
                      Đã có {product.views ?? product.comments?.length} lượt
                      đánh giá
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
            {entries && (
              <PaginationControls
                totalPage={totalPage}
                hasNextPage={end < data?.length!}
                hasPrevPage={start > 0}
                slug={'discover'}
              />
            )}
          </div>
        ))}
      <br />
      <br />
      <br />
      <br />

      <Footer />
    </main>
  )
}

export default Discover
