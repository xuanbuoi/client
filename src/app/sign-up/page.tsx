'use client'

import Loading from '@/components/Loading'
import { useAddUserMutation } from '@/redux/api/user'
/* eslint-disable @next/next/no-img-element */
import { FormSubmit, IRegister, InputChange } from '@/utils/type'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-custom-alert'

const Register = () => {
  const initalState: IRegister = {
    name: '',
    phone: '',
    password: '',
    cf_password: ''
  }

  const [register, setRegister] = useState<IRegister>(initalState)
  const { name, phone, password, cf_password } = register

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target
    setRegister({ ...register, [name]: value })
  }
  const [registerUser, result] = useAddUserMutation()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    if (password !== cf_password) {
      return toast.error('Mật khẩu và xác nhận mật khẩu không khớp')
    } else {
      setLoading(true)
      registerUser(register).then((res: any) => {
        if (res.data) {
          toast.success('Đăng kí thành công')
          setRegister(initalState)
          router.replace('/login')
          setLoading(false)
        } else {
          toast.error('Đăng kí thất bại')
        }
      })
    }
  }

  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <section
        className="h-screen"
        style={{
          backgroundImage:
            'url(https://cdn.vanguardngr.com/wp-content/uploads/2020/02/love.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="px-6 h-full text-gray-800 ">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 ">
            <div className="xl:ml-20 md:w-1/3 phone:w-full mb-12 md:mb-0 bg-white rounded-lg shadow p-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Đăng kí
              </h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="" className="text-sm text-gray-400">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="bg-gray-200 border border-gray-300 text-gray-900 phone:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                    autoComplete="name"
                    name="name"
                    value={name}
                    onChange={handleChangeInput}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="" className="text-sm text-gray-400">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="bg-gray-200 border border-gray-300 text-gray-900 phone:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                    autoComplete="phone"
                    name="phone"
                    value={phone}
                    onChange={handleChangeInput}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="" className="text-sm text-gray-400">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="bg-gray-200 border border-gray-300 text-gray-900 phone:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                    autoComplete="new-password"
                    name="password"
                    value={password}
                    onChange={handleChangeInput}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="" className="text-sm text-gray-400">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    className="bg-gray-200 border border-gray-300 text-gray-900 phone:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                    autoComplete="new-password"
                    name="cf_password"
                    value={cf_password}
                    onChange={handleChangeInput}
                    required
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center flex justify-center mb-5"
                  >
                    {loading ? <Loading /> : 'Đăng kí'}
                  </button>
                </div>
              </form>
              <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-center">
                Bạn đã có tài khoản?
                <br />
                <button className="w-full mx-auto text-black border border-gray-200 py-1 rounded shadow-lg">
                  <Link href="/login" className="">
                    Đăng nhập
                  </Link>
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register
