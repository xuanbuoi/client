/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
'use client'

import {
  useDeleteProductMutation,
  useGetAllProductsQuery
} from '@/redux/api/product'
import { useformatDate } from '@/utils/hook'
import { IProduct } from '@/utils/type'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { AiFillEdit } from 'react-icons/ai'
import { BsFillTrashFill } from 'react-icons/bs'
import Loading from '../Loading'
import CreateProduct from './CreateProduct'

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  //add product
  const [currnetFileImg, setCurrnetFileImg] = useState<File | undefined>(
    undefined
  )
  const [add, setAdd] = useState(true)
  const { data, isSuccess, isFetching } = useGetAllProductsQuery()
  useEffect(() => {
    if (isSuccess && data) {
      setProducts(data)
    }
  }, [data, isSuccess])
  const [isFeedback, setIsFeedback] = useState<boolean>(false)

  const [deleteProduct] = useDeleteProductMutation()

  const [open, setOpen] = useState<boolean>(false)
  const [loadingDel, setLoadingDel] = useState<boolean>(false)
  const [product, setProduct] = useState<IProduct>()

  const handleDelete = (product: IProduct) => {
    setLoadingDel(true)
    if (product) {
      deleteProduct(product.id!).then((res: any) => {
        if (res.data) {
          toast.success('Xóa sản phẩm thành công')
          setProducts(products.filter((item) => item.id !== product.id))
          setLoadingDel(false)
          setOpen(false)
        } else {
          toast.error('Xóa sản phẩm thất bại')
          setLoadingDel(false)
          setOpen(false)
        }
      })
    }
  }

  return (
    <div className="">
      <button
        className={`${
          add
            ? ' bg-blue-700 rounded-lg hover:bg-blue-800 '
            : ' bg-gray-700 rounded-lg hover:bg-gray-800 '
        } " block items-center px-4 py-2 text-sm font-medium text-center text-white  "`}
        onClick={() => setAdd(!add)}
      >
        {add ? 'Thêm SP' : 'Hiển thị sản phẩm'}
      </button>
      {add ? (
        <div className="flex">
          <div className=" relative overflow-x-auto shadow-md phone:rounded-lg inline-block w-full">
            <table className="w-full text-sm text-left bg-white mt-4">
              <thead className="text-xs uppercase">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Tên SP
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá thanh toán
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá sau thanh toán
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, index) => {
                  return (
                    <tr className="bg-white border-b text-center" key={item.id}>
                      <td className="px-6 py-4">{index + 1}</td>
                      <td
                        className="px-6 py-4 hover:text-blue-300 cursor-pointer font-semibold"
                        onClick={() => {
                          setIsFeedback(true)
                        }}
                      >
                        {item.name}
                      </td>
                      <td className="px-6 py-4">
                        {item.price.toLocaleString('en-US')} VNĐ
                      </td>
                      <td className="px-6 py-4">
                        {(item.bonus! + item.price).toLocaleString('en-US')} VNĐ
                      </td>

                      <td className="px-6 py-4 ">
                        <span className="bg-[#31C1A5] text-white">
                          {useformatDate(item.createdAt?.toLocaleString())}{' '}
                          Updated:{' '}
                          {useformatDate(item.updatedAt?.toLocaleString())}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white space-x-1 flex">
                        <button className="bg-yellow-400 p-2 rounded-sm">
                          <Link href={`products/${item.id}/edit`}>
                            <AiFillEdit />
                          </Link>
                        </button>
                        <button
                          className="bg-[#F62D51] p-2 rounded-sm"
                          onClick={() => {
                            setOpen(true)
                            setProduct(item)
                          }}
                        >
                          <BsFillTrashFill />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <CreateProduct />
      )}

      {open && (
        <ModalAdmin
          setOpen={setOpen}
          prod={product!}
          callback={handleDelete}
          loading={loadingDel}
        />
      )}
    </div>
  )
}

export default Products
interface Props {
  setOpen: (value: boolean) => void
  prod: IProduct
  callback: (prod: IProduct) => void
  loading?: boolean
}
const ModalAdmin = ({ setOpen, callback, prod, loading }: Props) => {
  return (
    <div className="fixed top-10 z-50 overflow-x-hidden overflow-y-auto md:inset-0 phone:w-[90%] m-0 mx-auto left-0 right-0 p-3 md:w-2/5">
      <div className="absolute bg-white left-1/2 -translate-x-1/2 rounded-lg w-full shadow-xl p-3 border-2 border-black">
        <div className="flex items-start justify-between ">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </h3>
        </div>
        <div className="space-x-4 text-white">
          <button
            className="px-4 py-1 rounded-lg bg-green-500 border border-gray-200"
            onClick={() => {
              callback(prod)
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
