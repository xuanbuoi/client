/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useGetAllImagesQuery } from '@/redux/api/image'
import { useformatDate } from '@/utils/hook'
import { IImage } from '@/utils/type'
import Image from 'next/image'
import { useEffect, useState } from 'react'
export default function Home() {
  const [images, setImages] = useState<IImage[]>([])

  const { data, isSuccess, isFetching } = useGetAllImagesQuery()
  useEffect(() => {
    if (isSuccess && data) {
      setImages(data)
    }
  }, [data, isSuccess])

  return (
    <main className="bg-gray-100">
     <Header />
      <div className="mx-4 mt-6">
        <div className="grid lg:grid-cols-5 lg:gap-5 phone:w-full md:grid-cols-5 md:gap-5 phone:gap-y-5">
          {images.map((item) => (
            <div
              className="flex flex-col overflow-hidden relative"
              key={item.id}
            >
              <Image
                width={500}
                height={500}
                src={item.url}
                className=" phone:w-full md:w-full lg:w-full w-full group-hover:opacity-90 object-fill "
                alt=""
              />

              <div className="flex flex-col absolute bottom-0 w-full pl-2 text-white font-medium bg-gradient-to-r from-violet-500 to-transparent">
                <span>Cặp đôi: {item?.name}</span>
                <span>Quê Quán: {item?.address}</span>
                <span>Người kết nối: {item?.contactPerson}</span>
                <span>Chuyến du lịch tại: {item?.travelAddress}</span>
                <span>
                  Đã hoành thành:{' '}
                  {
                    useformatDate(item?.updatedAt!.toLocaleString()).split(
                      ' '
                    )[0]
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
        <br />
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </main>
  )
}
