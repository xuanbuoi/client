/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import FeedBack from '@/components/Feedback'
import Header from '@/components/Header'
import { useGetCmtByProductIdQuery } from '@/redux/api/comment'
import { useGetProductByIdQuery } from '@/redux/api/product'
import { IComment, IProduct } from '@/utils/type'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Detail = ({ params }: { params: any }) => {
  const { slug: id } = params
  const [product, setProduct] = useState<IProduct>()

  const { data, isFetching, isSuccess } = useGetProductByIdQuery(id)
  useEffect(() => {
    if (isSuccess && data) {
      setProduct(data)
    }
  }, [data, isSuccess])

  const [comment, setComment] = useState<IComment[]>([])

  const {
    data: dataCmt,
    isFetching: fetchCmt,
    isSuccess: successCmt
  } = useGetCmtByProductIdQuery(id)
  useEffect(() => {
    if (successCmt && dataCmt) {
      setComment(dataCmt)
    }
  }, [dataCmt, successCmt])

  if (isFetching) return <div>Loading...</div>
  if (!product) return <div>Not found</div>
  return (
    <>
      <Header />
      <div className=" p-2 flex flex-col items-center">
        <Image src={product.url as string} alt={''} width={400} height={400} />
        <div className="text-2xl">
          <span>{product.price.toLocaleString('en-US')}</span> đ Votes:{' '}
          <span>{product.votes.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-3">
        {/* {comment.map((cmt) => {
          return (
            <div key={cmt.id} className="border border-gray-300 px-3 py-2">
              <div className="flex space-x-2">
                <img
                  src={cmt.user?.avatar as string}
                  alt={''}
                  className="rounded-full object-cover w-10 h-10"
                />
                <div className="text-xs">
                  <p>{cmt.user?.name}</p>
                  <div className="flex">{renderStart(cmt.votes)}</div>
                  <span>{useFormattedDate(cmt.createdAt as string)}</span>
                </div>
              </div>
              <p>{cmt.comment}</p>
            </div>
          )
        })} */}
        <FeedBack product={product} />
      </div>
    </>
  )
}

export default Detail
