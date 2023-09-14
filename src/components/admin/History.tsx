import { useGetAllHistoryQuery } from '@/redux/api/banking'
import { useformatDate } from '@/utils/hook'
import { ITransaction } from '@/utils/type'
import React, { useEffect, useState } from 'react'

const History = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const { isSuccess, data } = useGetAllHistoryQuery()
  useEffect(() => {
    if (isSuccess && data) {
      setTransactions(data)
    }
  }, [data, isSuccess])
  return (
    <table className="w-full text-sm text-left bg-white">
      <thead className="text-xs uppercase">
        <tr className="text-center">
          <th scope="col" className="px-6 py-3">
            STT
          </th>
          <th scope="col" className="px-6 py-3">
            Tiền nạp/rút
          </th>
          <th scope="col" className="px-6 py-3">
            Tên khách hàng
          </th>
          <th scope="col" className="px-6 py-3">
            SĐT
          </th>
          <th scope="col" className="px-6 py-3">
            Số tiền
          </th>
          <th scope="col" className="px-6 py-3">
            Thời gian
          </th>
          <th scope="col" className="px-6 py-3">
            Tình trạng
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((item, index) => {
          return (
            <tr className="bg-white border-b text-center" key={item.id}>
              <td className="px-6 py-4 hover:text-blue-300 cursor-pointer">
                {index + 1}
              </td>
              <td
                className={`${
                  item.transactionType == 'withdraw'
                    ? 'text-red-400'
                    : 'text-green-500'
                }  " px-6 py-4 hover:text-blue-300 cursor-pointer"`}
              >
                {item.transactionType == 'withdraw' ? '-' : '+'}{' '}
                {item.amount!.toLocaleString('en-US')} VNĐ
              </td>
              <td className="px-6 py-4">
                {item.name == null ? item.user?.name : item.name}
                {item.transactionType == 'deposite' && ' (Nạp tiền)'}
              </td>
              <td className="px-6 py-4">{item.user?.phone}</td>
              <td className="px-6 py-4">
                {item.user?.money!.toLocaleString('en-US')} VNĐ
              </td>
              <td className="px-6 py-4">
                {useformatDate(item.updatedAt?.toLocaleString())}
              </td>
              <td
                className={`${
                  item.status == 'pending'
                    ? 'text-yellow-400'
                    : item.status == 'accept'
                    ? 'text-green-500'
                    : 'text-red-500'
                }  " px-6 text-xs "`}
              >
                {item.status == 'pending'
                  ? 'Đang xử lý'
                  : item.status == 'accept'
                  ? 'Đã chuyển'
                  : 'Bị từ chối'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default History
