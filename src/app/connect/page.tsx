/* eslint-disable @next/next/no-img-element */
'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PaginationControls from '@/components/PaginationControls'
import { useGetAllConnectQuery } from '@/redux/api/connect'
import { IConnect } from '@/utils/type'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Connect = ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const [connects, setConnects] = useState<IConnect[]>([])
  const { data, isSuccess, isFetching } = useGetAllConnectQuery()
  useEffect(() => {
    if (isSuccess && data) {
      setConnects(data)
    }
  }, [data, isSuccess])
  const page = searchParams['page'] ?? '1'
  const limit = searchParams['limit'] ?? '8'

  const start = (Number(page) - 1) * Number(limit)
  const end = start + Number(limit)
  const entries = connects?.slice(start, end)
  const totalPage = Math.ceil(connects?.length! / Number(limit))

  return (
    <>
      <main className="bg-gray-100">
        <Header />
        <div className="mx-4 mt-6">
          <div className="grid p-4 phone:grid-cols-1 phone:gap-y-4 md:grid-cols-4 md:grid-flow-row md:gap-4">
            {entries?.map((connect, index) => {
              return (
                <div
                  key={connect.id}
                  className="rounded-lg flex flex-col text-left relative"
                >
                  <img
                    src={connect.avatar}
                    alt={''}
                    width={500}
                    height={500}
                    className=" mx-auto object-cover rounded"
                  />
                  <div className="mx-auto h-fit pb-4 pt-9 w-full absolute bottom-0 pl-2 text-white font-medium bg-gradient-to-t from-black to-transparent">
                    <div className="grid grid-cols-2 mb-2">
                      {connect.name && (
                        <p>
                          Tên: <span>{connect.name}</span>
                        </p>
                      )}
                      {connect.age && (
                        <p>
                          Tuổi: <span>{connect.age}</span>
                        </p>
                      )}
                      <p>
                        Giới tính:
                        <span>{connect.gender ? ' Nam' : ' Nữ'}</span>
                      </p>
                      {connect.address && (
                        <p>
                          Địa chỉ: <span>{connect.address}</span>
                        </p>
                      )}
                      {connect.job && (
                        <p>
                          Công việc: <span>{connect.job}</span>
                        </p>
                      )}
                      {connect.favorite && (
                        <p>
                          Sở thích: <span>{connect.favorite}</span>
                        </p>
                      )}
                    </div>
                    <Link
                      href={'/customer-care'}
                      className="bg-[#F62D51] w-40 p-1 px-2 text-white text-sm rounded-sm my-2"
                    >
                      Liên hệ
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          {entries.length > 0 && (
            <PaginationControls
              totalPage={totalPage}
              hasNextPage={end < connects?.length!}
              hasPrevPage={start > 0}
              slug={'connect'}
            />
          )}
        </div>
        <br />
        <br />
        <br />
        <br />

        <Footer />
      </main>
    </>
  )
}

export default Connect
