/* eslint-disable react-hooks/exhaustive-deps */
import { useGetUserQuery, useUpdateMoneyMutation } from '@/redux/api/user'
import { useStorage } from '@/utils/hook'
import { APP_URL, IProduct, IUser } from '@/utils/type'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-custom-alert'

const Moddal = ({
  open,
  setOpen,
  product
}: {
  open: boolean
  setOpen: (open: boolean) => void
  product: IProduct
}) => {
  const [account, setAccount] = useState<IUser>()
  const session = useStorage()

  useEffect(() => {
    if (session.getItem('user')) {
      setAccount(JSON.parse(session.getItem('user')))
    }
  }, [])
  const fetchUser = async (userId: string): Promise<IUser> => {
    const response = await fetch(`${APP_URL}/api/users/${userId}`)
    const userData = await response.json()
    return userData as IUser
  }
  const [updateMoney, rs] = useUpdateMoneyMutation()
  const handleUpdateMoney = () => {
    if (!account) toast.error('Vui lòng đăng nhập')
    const data = {
      id: account?.id,
      bonus: product.bonus
    }
    updateMoney(data)
    setOpen(false)
    toast.success(
      'Bạn đã hoàn thành đánh giá sản phẩm vui lòng quay lại để nhận hoa hồng'
    )
    setTimeout(async () => {
      try {
        const user: IUser = await fetchUser(account?.id!)
        session.setItem('user', JSON.stringify(user))
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }, 5000)
  }
  return (
    <div>
      <ToastContainer floatingTime={3000} />

      {open && (
        <div className="fixed top-10 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] phone:w-[90%] m-0 mx-auto left-0 right-0 ">
          <div className="relative w-full max-w-2xl max-h-full mx-auto">
            <div className="absolute bg-white left-1/2 -translate-x-1/2 rounded-lg dark:bg-gray-700 w-full shadow-xl">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Đánh giá hoành thành
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="staticModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setOpen(false)}
                >
                  OK
                </button>
                <button
                  data-modal-hide="staticModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleUpdateMoney}
                >
                  Hoàn thành
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Moddal
