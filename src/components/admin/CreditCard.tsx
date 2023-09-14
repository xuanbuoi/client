import {
  useAddOwnBankingMutation,
  useDeleteOwnBankinMutation,
  useGetAllOwnBankingQuery
} from '@/redux/api/banking'
import { IOwnBanking } from '@/utils/type'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import Loading from '../Loading'

const CreditCard = () => {
  const initState: IOwnBanking = {
    bankingName: '',
    name: '',
    accountNumber: ''
  }

  const [loading, setLoading] = useState<boolean>(false)
  const { data, isSuccess } = useGetAllOwnBankingQuery()
  const [ownBanking, setOwnBanking] = useState<IOwnBanking[]>()
  useEffect(() => {
    if (isSuccess && data) {
      setOwnBanking(data)
    }
  }, [data, isSuccess])
  const [credit, setCredit] = useState<IOwnBanking>(initState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setCredit({ ...credit, [name]: value })
  }

  const [addOwnBanking] = useAddOwnBankingMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    addOwnBanking(credit).then((res) => {
      if (res) {
        toast.success('Thêm tài khoản thành công')
        setOwnBanking([...ownBanking!, credit])
        setCredit(initState)
        setLoading(false)
      }
    })
  }

  const [own, setOwn] = useState<IOwnBanking>()

  const [open, setOpen] = useState<boolean>(false)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

  const [deleteOwbBanking] = useDeleteOwnBankinMutation()
  const deleteBanking = (own: IOwnBanking) => {
    setLoadingDelete(true)
    if (own) {
      deleteOwbBanking(own.id!).then((res) => {
        if (res) {
          toast.success('Xoá tài khoản thành công')
          setOwnBanking(ownBanking?.filter((item) => item.id !== own.id))
          setOpen(false)
          setLoadingDelete(false)
        }
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Tên ngân hàng
            </label>
            <input
              type="text"
              name="bankingName"
              className="border-gray-300"
              placeholder=""
              value={credit.bankingName}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="">
              Số tài khoản
            </label>
            <input
              type="text"
              name="accountNumber"
              className="border-gray-300"
              placeholder=" "
              value={credit.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="">
              Tên chủ tài khoản
            </label>
            <input
              type="text"
              name="name"
              className="border-gray-300"
              placeholder=" "
              value={credit.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md w-full flex justify-center text-white"
        >
          {loading ? <Loading /> : 'Thêm tài khoản'}
        </button>
      </form>
      <br />
      <table className="w-full text-sm text-left bg-white">
        <thead className="text-xs uppercase">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              #
            </th>

            <th scope="col" className="px-6 py-3">
              Tên ngân hàng
            </th>
            <th scope="col" className="px-6 py-3">
              STK
            </th>
            <th scope="col" className="px-6 py-3">
              Tên
            </th>
            <th scope="col" className="px-6 py-3">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {ownBanking?.map((item, index) => {
            return (
              <tr className="bg-white border-b text-center" key={item.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 hover:text-blue-300 cursor-pointer">
                  {item.bankingName}
                </td>
                <td className="px-6 py-4">{item.accountNumber}</td>
                <td className="px-6 py-4">{item.name}</td>

                <td
                  className="px-6 py-4 text-white space-x-1 text-xs
"
                >
                  <button
                    className="bg-[#F62D51] p-2 rounded-sm"
                    onClick={() => {
                      setOpen(true)
                      setOwn(item)
                    }}
                  >
                    Xoá tài khoản
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {open && (
        <ModalAdmin
          setOpen={setOpen}
          own={own!}
          callback={deleteBanking}
          loading={loadingDelete}
        />
      )}
    </div>
  )
}

export default CreditCard

interface Props {
  setOpen: (value: boolean) => void
  own: IOwnBanking
  callback: (own: IOwnBanking) => void
  loading?: boolean
}
const ModalAdmin = ({ setOpen, callback, own, loading }: Props) => {
  return (
    <div className="fixed top-10 z-50 overflow-x-hidden overflow-y-auto md:inset-0 phone:w-[90%] m-0 mx-auto left-0 right-0 p-3 md:w-2/5">
      <div className="absolute bg-white left-1/2 -translate-x-1/2 rounded-lg w-full shadow-xl p-3 border-2 border-black">
        <div className="flex items-start justify-between ">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Bạn có chắc chắn muốn xóa tài khoản này không?
          </h3>
        </div>
        <div className="space-x-4 text-white">
          <button
            className="px-4 py-1 rounded-lg bg-green-500 border border-gray-200"
            onClick={() => {
              callback(own)
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
