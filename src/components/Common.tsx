/* eslint-disable react-hooks/exhaustive-deps */
import { useStorage } from '@/utils/hook'
import { IUser } from '@/utils/type'
import React, { useEffect, useState } from 'react'
import { RxBarChart } from 'react-icons/rx'

const Common = () => {
  const [user, setUser] = useState<IUser>({
    id: '1',
    name: 'Nguyễn Văn A',
    phone: 'asdfasdf',
    money: 200000
  })
  const session = useStorage()
  useEffect(() => {
    if (session.getItem('user')) setUser(JSON.parse(session.getItem('user')))
  }, [])
  const money = user.money
  return (
    <div className="flex items-center justify-between mb-3">
      <p>Trang quản trị</p>
      <div className="flex items-center">
        <span className="text-5xl text-blue-500">
          <RxBarChart />
        </span>
        <div>
          <p className="text-xs">VNĐ</p>
          <strong className="text-blue-600 text-xl">
            {money!.toLocaleString('en-US')}
          </strong>
        </div>
      </div>
    </div>
  )
}

export default Common
