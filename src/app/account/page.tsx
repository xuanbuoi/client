/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import Acc from '@/components/Account'
import NotFound from '@/components/NotFound'
import { useGetUserQuery } from '@/redux/api/user'
import { useStorage } from '@/utils/hook'
import { APP_URL, IUser } from '@/utils/type'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Account = () => {
  const fetchUser = async (userId: string): Promise<IUser> => {
    const response = await fetch(`${APP_URL}/api/users/${userId}`)
    const userData = await response.json()
    return userData as IUser
  }
  const [account, setAccount] = useState<IUser>()
  const session = useStorage()

  useEffect(() => {
    if (session.getItem('user')) {
      setAccount(JSON.parse(session.getItem('user')))
    }
  }, [])

  useEffect(() => {
    const getUser = async () => {
      if (account) {
        const user: IUser = await fetchUser(account?.id!)
        session.setItem('user', JSON.stringify(user))
      }
    }
    getUser()
  }, [account])

  if (!account) return <NotFound />

  return <Acc />
}

export default Account
