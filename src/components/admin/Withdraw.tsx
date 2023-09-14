import {
  useGetWithdrawAllRequestQuery,
  useRejectWithdrawMutation,
  useUpdateStatusMutation
} from '@/redux/api/banking'
import { ITransaction } from '@/utils/type'
import { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'

const Withdraw = () => {
  const [withdraw, setWithdraw] = useState<ITransaction[]>([])
  const { data, isSuccess } = useGetWithdrawAllRequestQuery()

  useEffect(() => {
    if (isSuccess && data) {
      setWithdraw(data)
    }
  }, [data, isSuccess])

  const [acceptWithdraw] = useUpdateStatusMutation()

  const handleAccept = (id: string) => {
    if (id) {
      const selected = withdraw.find((item) => item.id === id)
      acceptWithdraw({ selected, status: 'accept' }).then((res) => {
        if (res) {
          toast.success('Chập nhận thành công')
        }
      })
    }
  }

  const [rejectWithdraw] = useRejectWithdrawMutation()
  const handleReject = (id: string) => {
    if (id) {
      rejectWithdraw(id).then((res) => {
        if (res) {
          toast.success('Từ chối thành công')
          setWithdraw(withdraw.filter((item) => item.id !== id))
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
              Ngân hàng
            </th>
            <th scope="col" className="px-6 py-3">
              Tên
            </th>
            <th scope="col" className="px-6 py-3">
              STK
            </th>
            <th scope="col" className="px-6 py-3">
              Sô tiền cần rút
            </th>
            <th scope="col" className="px-6 py-3">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {withdraw?.map((item, index) => {
            return (
              <tr className="bg-white border-b text-center" key={item.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 hover:text-blue-300 cursor-pointer">
                  {item.bankingName}
                </td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.accountNumber}</td>
                <td className="px-6 py-4">
                  {item.amount!.toLocaleString('en-US')} VNĐ
                </td>
                <td
                  className="px-6 py-4 text-white space-x-1 text-xs
"
                >
                  <button
                    className="bg-yellow-400 p-2 rounded-sm"
                    onClick={() => handleAccept(item.id!)}
                  >
                    Chập nhận
                  </button>
                  <button
                    className="bg-[#F62D51] p-2 rounded-sm"
                    onClick={() => handleReject(item.id!)}
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

export default Withdraw
