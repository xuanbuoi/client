import {
  useGetDepositeAllRequestQuery,
  useUpdateStatusMutation
} from '@/redux/api/banking'
import { ITransaction } from '@/utils/type'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'

const Recharge = () => {
  const [recharge, setRecharge] = useState<ITransaction[]>([])
  const { data, isSuccess } = useGetDepositeAllRequestQuery()

  useEffect(() => {
    if (isSuccess && data) {
      setRecharge(data)
    }
  }, [data, isSuccess])

  const [updateStatus] = useUpdateStatusMutation()

  const handleAccept = (id: string, status: string) => {
    if (id) {
      const selected = recharge.find((item) => item.id === id)
      updateStatus({ selected, status }).then((res) => {
        if (res) {
          toast.success(
            `${status === 'accept' ? 'Chấp nhận' : 'Từ chối'} thành công`
          )
          setRecharge(recharge.filter((item) => item.id !== id))
        }
      })
    }
  }

  return (
    <div>
      <table className="w-full text-sm text-left bg-white">
        <thead className="text-xs uppercase">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              #
            </th>

            <th scope="col" className="px-6 py-3">
              Banking
            </th>

            <th scope="col" className="px-6 py-3">
              STK
            </th>
            <th scope="col" className="px-6 py-3">
              Nội dung
            </th>
            <th scope="col" className="px-6 py-3">
              Sô tiền nạp
            </th>
            <th scope="col" className="px-6 py-3">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {recharge?.map((item, index) => {
            return (
              <tr className="bg-white border-b text-center" key={item.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 hover:text-blue-300 cursor-pointer">
                  {item.bankingName}
                </td>
                <td className="px-6 py-4">{item.accountNumber}</td>
                <td className="px-6 py-4">{item.content}</td>
                <td className="px-6 py-4">
                  {item.amount!.toLocaleString('en-US')} VNĐ
                </td>
                <td
                  className="px-6 py-4 text-white space-x-1 text-xs
"
                >
                  <button
                    className="bg-yellow-400 p-2 rounded-sm"
                    onClick={() => handleAccept(item.id!, 'accept')}
                  >
                    Chập nhận
                  </button>
                  <button
                    className="bg-[#F62D51] p-2 rounded-sm"
                    onClick={() => handleAccept(item.id!, 'reject')}
                  >
                    Từ chối
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recharge
