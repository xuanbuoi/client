/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import Loading from '@/components/Loading'
import { useLoginMutation } from '@/redux/api/auth'
import { useStorage } from '@/utils/hook'
/* eslint-disable @next/next/no-img-element */
import { ILogin, InputChange, FormSubmit, IUser } from '@/utils/type'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-custom-alert'

const Login = () => {
  const initalState: ILogin = {
    phone: '',
    password: ''
  }
  const [user, setUser] = useState<IUser>()
  const [login, setLogin] = useState<ILogin>(initalState)
  const { phone, password } = login
  const [loginAuth, result] = useLoginMutation()
  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target
    setLogin({ ...login, [name]: value })
  }
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const session = useStorage()
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    setLoading(true)

    loginAuth(login).then((result: any) => {
      if (result.data) {
        setUser(result.data)
        setLoading(false)
        session.setItem('isLogin', 'login')
        session.setItem('user', JSON.stringify(result.data))
        router.replace('/')
      } else {
        setLoading(false)
        toast.error('Số điện thoại hoặc mật khẩu không đúng')
      }
    })
  }
  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 flex h-screen"
      style={{
        backgroundImage:
          'url(https://cdn.vanguardngr.com/wp-content/uploads/2020/02/love.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 md:h-screen pb-3">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 phone:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 phone:p-8 md:pb-3">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Xin chào
            </h1>
            <h2
              className="m-0 text-gray-400 text-center"
              style={{ marginTop: 0 }}
            >
              Vui lòng đăng nhập để sử dụng các tính năng khác
            </h2>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="" className="text-sm text-gray-400">
                  Số diện thoại
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  className="bg-gray-200 border border-gray-300 text-gray-900 phone:text-sm rounded-lg block w-full p-2.5 "
                  required
                  value={phone}
                  onChange={handleChangeInput}
                />
              </div>
              <div>
                <label htmlFor="" className="text-sm text-gray-400">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-200 border border-gray-300 text-gray-900 phone:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
                  required
                  value={password}
                  onChange={handleChangeInput}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex justify-center"
              >
                {loading ? <Loading /> : 'Đăng nhập'}
              </button>
            </form>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-center">
              Bạn chưa có tài khoản? <br />
              <button className="w-full mx-auto text-black border border-gray-200 py-1 rounded shadow-lg">
                <Link href="/sign-up" className="">
                  Đăng kí
                </Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
