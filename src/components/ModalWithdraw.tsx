/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  useAddWithdrawMutation,
  useGetAllOwnBankingQuery
} from '@/redux/api/banking'
import { useStorage } from '@/utils/hook'
import { FormSubmit, IOwnBanking, ITransaction, IUser } from '@/utils/type'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
interface IProps {
  openWithdrawModal: boolean
  setOpenWithdrawModal: (openWithdrawModal: boolean) => void
  availableBalance: number
}

const ModalWithdraw = ({
  openWithdrawModal,
  setOpenWithdrawModal,
  availableBalance
}: IProps) => {
  const initState: ITransaction = {
    name: '',
    accountNumber: '',
    bankingName: '',
    amount: 0
  }

  const [withdraw, setWithdraw] = useState<ITransaction>(initState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setWithdraw({ ...withdraw, [name]: value })
  }

  const [account, setAccount] = useState<IUser>()
  const session = useStorage()

  useEffect(() => {
    if (session.getItem('user')) {
      setAccount(JSON.parse(session.getItem('user')))
      setWithdraw({ ...withdraw, user: JSON.parse(session.getItem('user')) })
    }
  }, [])

  const { data, isSuccess } = useGetAllOwnBankingQuery()
  const [ownBanking, setOwnBanking] = useState<IOwnBanking[]>()
  useEffect(() => {
    if (isSuccess && data) {
      setOwnBanking(data)
    }
  }, [data, isSuccess])

  const [addWithdraw] = useAddWithdrawMutation()
  const handleSubmit = (e: FormSubmit) => {
    // setOpenRechargeModal(false)
    e.preventDefault()
    if (withdraw.amount! > availableBalance) {
      toast.error('Số tiền rút không được lớn hơn số dư khả dụng')
      return
    }
    if (account) {
      setWithdraw({ ...withdraw, user: account })
      addWithdraw(withdraw).then((res) => {
        if (res) {
          toast.success('Yêu cầu rút tiền thành công vui lòng chờ xác nhận')
          setOpenWithdrawModal(false)
        }
      })
    }
  }
  return (
    <>
      {openWithdrawModal && (
        <div className="border-2 border-black p-4 fixed top-20 mt-20 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-fit phone:w-[90%] m-0 mx-auto left-0 right-0 bg-white md:w-fit">
          <h1 className="text-center font-bold text-xl w-full p-3 ">
            Rút tiên khỏi tài khoản
          </h1>

          <div>
            <p className="mb-1">Hoàn thành đơn rút tiền:</p>
            <br />

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    value={withdraw.accountNumber}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="accountNumber"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Số tài khoản
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="bankingName"
                    value={withdraw.bankingName}
                    onChange={handleChange}
                    id="bankingName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="bankingName"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tên ngân hàng
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="amount"
                    value={withdraw.amount ? withdraw.amount : ''}
                    onChange={handleChange}
                    id="amount"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="amount"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Số tiền
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="name"
                    value={withdraw.name}
                    onChange={handleChange}
                    id="name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Chủ tài khoản
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-white">
                <button
                  type="submit"
                  className="w-full bg-green-500 rounded py-1 mt-2"
                >
                  Yêu cầu rút tiền
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-500 rounded py-1 mt-2"
                  onClick={() => {
                    setOpenWithdrawModal(false)
                    setWithdraw(initState)
                  }}
                >
                  Huỷ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalWithdraw
