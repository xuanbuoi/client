/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client'

import Images from '@/components/admin/Images'
import Navbar from '@/components/admin/Navbar'
import Slidebar from '@/components/admin/SlideBar'
import { useStorage } from '@/utils/hook'
import { IUser } from '@/utils/type'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [user, setUser] = useState<IUser>()
  const session = useStorage()
  useEffect(() => {
    if (session.getItem('user')) setUser(JSON.parse(session.getItem('user')))
  }, [])

  return (
    <div>
      <Head>
        {/* <title>{route.path.charAt(0).toUpperCase()}</title> */}
        <title>long</title>
      </Head>
      <Navbar />
      <div className="flex">
        <Slidebar />
        <div className="ml-64 h-screen flex-1">
          <div className="p-4 ">
            <Images />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
