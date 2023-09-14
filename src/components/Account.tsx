/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useUpdateUserMutation } from '@/redux/api/user'
import { useStorage, useformatDate } from '@/utils/hook'
import { FormSubmit, ITransaction, IUser } from '@/utils/type'
import { imageUpload } from '@/utils/upload'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { RiAccountCircleLine } from 'react-icons/ri'
import Footer from './Footer'
import Header from './Header'
import Loading from './Loading'
import ModalRecharge from './ModalRecharge'
import ModalWithdraw from './ModalWithdraw'
import {
  useGetDepositeHistoryQuery,
  useGetWithdrawHistoryQuery
} from '@/redux/api/banking'
import { toast } from 'react-custom-alert'
const Acc = () => {
  const [account, setAccount] = useState<IUser>()
  const session = useStorage()
  const [name, setName] = useState<string>()
  const [phone, setphone] = useState<string>('')
  const [money, setMoney] = useState<number>(0)
  const [avatar, setAvatar] = useState<string>()
  const [oldACC, setOldACC] = useState<IUser>()
  const [openRechargeModal, setOpenRechargeModal] = useState(false)
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false)

  const [historyRecharge, setHistoryRecharge] = useState<ITransaction[]>([])
  const [historyWithdraw, setHistoryWithdraw] = useState<ITransaction[]>([])

  const { data: dataDeposite, isSuccess: successDeposite } =
    useGetDepositeHistoryQuery(account?.id!)
  const { data: dataWithdraw, isSuccess: successWithdraw } =
    useGetWithdrawHistoryQuery(account?.id!)

  useEffect(() => {
    if (dataDeposite && successDeposite) {
      setHistoryRecharge(dataDeposite)
    }
  }, [successDeposite, dataDeposite])

  useEffect(() => {
    if (dataWithdraw && successWithdraw) {
      setHistoryWithdraw(dataWithdraw)
    }
  }, [successWithdraw, dataWithdraw])

  useEffect(() => {
    if (session.getItem('user')) {
      setName(JSON.parse(session.getItem('user')).name)
      setphone(JSON.parse(session.getItem('user')).phone)
      setAvatar(JSON.parse(session.getItem('user')).avatar)
      setMoney(JSON.parse(session.getItem('user')).money)
      setAccount(JSON.parse(session.getItem('user')))
      setOldACC(JSON.parse(session.getItem('user')))
    }
  }, [])

  const userName = account?.name
  const [edit, setEdit] = useState<boolean>(false)
  const [upload, setUpload] = useState<boolean>(false)
  const [currnetFileImg, setCurrnetFileImg] = useState<File | undefined>(
    undefined
  )
  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files![0]
    setCurrnetFileImg(file)
    setUpload(true)
    const photo = await imageUpload(file)
    setUpload(false)
    if (photo.url === undefined) return

    if (photo.url) {
      setAvatar(photo.url)
      const updateAcc: IUser = {
        name: account?.name,
        phone: account?.phone,
        avatar: photo.url,
        money: account?.money,
        id: account?.id
      }
      const data = {
        id: account?.id!,
        body: updateAcc!
      }
      updateUser(data)
      session.setItem('user', JSON.stringify(updateAcc))
      if (rs) {
        toast.success('Cập nhật thành công!')
      }
    }
  }

  const [updateUser, rs] = useUpdateUserMutation()
  const handleSubmit = (e: FormSubmit) => {
    const id = account?.id
    e.preventDefault()

    const check =
      oldACC?.avatar === account?.avatar &&
      oldACC?.name === account?.name &&
      oldACC?.phone === account?.phone

    if (check) {
      return
    } else {
      const data = {
        id: id!,
        body: account!
      }
      updateUser(data)
      if (rs) {
        toast.success('Cập nhật thành công!')
        setEdit(false)
        session.setItem('user', JSON.stringify(account))
      }
    }
  }
  function convertCurrency(amount?: number) {
    return (amount ? amount.toLocaleString('en-US') : 0) + ' VNĐ'
  }
  const [openRecharge, setOpenRecharge] = useState(false)
  const [openDraw, setOpenDraw] = useState(false)
  return (
    <>
      <Header />
      <section className="bg-gray-50 dark:bg-gray-900 flex">
        <div
          className="w-full flex flex-col items-center  px-6 py-8 lg:py-0 p-3 pt-4"
          style={{
            background: '#F3F4F6'
          }}
        >
          <div className="w-full rounded-lg shadow dark:border md:mt-10 phone:max-w-2xl  phone:p-3 p-3 ">
            <div className="flex mb-3 justify-center">
              <span className="">Tên: {name}</span>
            </div>
            <div className="flex justify-center text-center mx-auto">
              {account?.avatar ? (
                <img
                  src={avatar}
                  alt=""
                  className="rounded-full object-cover w-20 h-20"
                />
              ) : currnetFileImg ? (
                <img
                  src={
                    currnetFileImg
                      ? URL.createObjectURL(currnetFileImg)
                      : (avatar as string)
                  }
                  alt=""
                  className="rounded-full object-cover w-20 h-20"
                />
              ) : (
                <label
                  htmlFor="file"
                  className="flex items-center justify-center cursor-pointer space-x-1 p-1 text-white bg-gray-800 rounded-full transformobject-cover w-6 h-6 mb-12"
                >
                  <span className="text-7xl bg-black rounded-full mt-10">
                    <RiAccountCircleLine />
                  </span>
                  <input
                    type="file"
                    id="file"
                    accept=".png, .jpeg, .jpg"
                    className="hidden "
                    onChange={handleChangeImg}
                  />
                </label>
              )}
            </div>

            <div className="flex space-x-5 mb-3">
              <span className="w-36">Số tiền thực tế: </span>
              <p>{convertCurrency(account?.money!)}</p>
            </div>

            <div className="flex space-x-5 mb-3">
              <span className="w-36">Số tiền khả dụng: </span>
              <p>{convertCurrency(account?.money! - account?.amoutBlock!)} </p>
            </div>

            <div className="flex space-x-5 mb-3">
              <span className="w-36">Số tiền đóng băng: </span>
              <p>{convertCurrency(account?.amoutBlock!)}</p>
            </div>
            <Link
              href={`/customer-care`}
              className="text-blue-500 italic underline "
            >
              Chăm sóc khách hàng
            </Link>
            <div className="flex space-x-2 mt-2">
              <button
                className="border-2 border-black px-2"
                onClick={() => setOpenRechargeModal(true)}
              >
                Nạp tiền
              </button>
              <button
                className="border-2 border-black px-2"
                onClick={() => setOpenWithdrawModal(true)}
              >
                Rút tiền
              </button>
            </div>
            <button
              type="button"
              className="flex items-center w-full font-normal transition duration-7 group my-3"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
              onClick={() => setOpenRecharge(!openRecharge)}
            >
              <span
                className="flex-1 text-left whitespace-nowrap"
                sidebar-toggle-item="true"
              >
                Lịch sử nạp tiền
              </span>
              {openRecharge ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openRecharge && (
              <div className="bg-white w-full mb-4">
                <table className="w-[90%] mx-auto text-sm text-left">
                  <thead className="text-xs uppercase border-b-2 border-gray-300">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-3 text-right">
                        STT
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Số tiền
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Thời gian
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyRecharge.map((item, index) => (
                      <tr
                        className="bg-white border-b text-center"
                        key={item.id}
                      >
                        <td className="px-6 py-4 text-right">{index + 1}</td>

                        <td className="px-6 py-4">
                          {item.amount!.toLocaleString('en-US')} đ
                        </td>
                        <td className="px-6 py-4">
                          {useformatDate(item.createdAt!.toLocaleString())}
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <button
              type="button"
              className="flex items-center w-full font-normal transition duration-7 group"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
              onClick={() => setOpenDraw(!openDraw)}
            >
              <span
                className="flex-1 text-left whitespace-nowrap mb-2"
                sidebar-toggle-item="true"
              >
                Lịch sử rút tiền
              </span>
              {openDraw ? <FaChevronDown /> : <FaChevronRight />}
            </button>
            {openDraw && (
              <div className="bg-white w-full overflow-x-auto">
                <table className="w-full mx-auto text-sm text-left">
                  <thead className="text-xs uppercase border-b-2 border-gray-300">
                    <tr className="text-center text-xs w-full">
                      <th scope="col" className="px-6 py-3 text-right">
                        STT
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tên NH
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Chủ tài khoản
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Trạng thái
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Lí do
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Số tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyWithdraw.map((item, index) => (
                      <tr
                        className="bg-white border-b text-center"
                        key={item.id}
                      >
                        <td className="px-6 text-right pb-2">{index + 1}</td>
                        <td className="px-6 text-right">{item.bankingName}</td>
                        <td className="px-6 text-left">{item.name}</td>
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
                        <td>{item.reason}</td>
                        <td className="px-6">
                          {item.amount!.toLocaleString('en-US')} đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {upload && <Loading />}
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
        <Footer />
        <div className="m-0">
          <ModalRecharge
            openRechargeModal={openRechargeModal}
            setOpenRechargeModal={setOpenRechargeModal}
          />
        </div>
        <div className="m-0">
          <ModalWithdraw
            availableBalance={account?.money! - account?.amoutBlock!}
            openWithdrawModal={openWithdrawModal}
            setOpenWithdrawModal={setOpenWithdrawModal}
          />
        </div>
      </section>
    </>
  )
}

export default Acc
{
  /* <div className="p-6 space-y-4 md:space-y-6 phone:p-8">
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Chào mừng trở lại,

            {userName}
          </h1>
          <div className="relative">
            {upload && <Loading />}
            <img
              src={
                currnetFileImg
                  ? URL.createObjectURL(currnetFileImg)
                  : (avatar as string)
              }
              alt=""
              className="rounded-full object-cover w-16 h-16"
            />
            {edit && (
              <label
                htmlFor="file"
                className="flex items-center justify-center cursor-pointer space-x-1 p-1 text-white bg-gray-800 absolute rounded-full -bottom-1/3 transform -translate-x-1/2 object-cover w-6 h-6 left-3/4 -translate-y-1/2"
              >
                <AiFillCamera className="w-6 h-6" />
                <input
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  className="hidden"
                  onChange={handleChangeImg}
                />
              </label>
            )}
          </div>
        </div>
        <div style={{ marginTop: 4 }}>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tên tài khoản
          </label>
          {edit ? (
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 phone:text-sm rounded-lg block w-full p-2.5"
              placeholder="name@company.com"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setAccount({ ...account!, name: e.target.value })
              }}
            />
          ) : (
            <p className="bg-gray-50 border border-gray-300 text-gray-900 phone:text-sm rounded-lg block w-full p-2.5 cursor-default">
              {name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            phone của bạn
          </label>
          {edit ? (
            <input
              type="phone"
              name="phone"
              id="phone"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 phone:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value)
              }}
            />
          ) : (
            <p className="bg-gray-50 border border-gray-300 text-gray-900 phone:text-sm rounded-lg block w-full p-2.5 cursor-default">
              {phone}
            </p>
          )}
        </div>
        {edit ? (
          <div className="flex space-x-3">
            <button
              type="button"
              className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => setEdit(false)}
            >
              Huỷ bỏ
            </button>
            <button
              type="submit"
              disabled={upload}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
            >
              Lưu
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
            onClick={() => {
              setEdit(true)
            }}
          >
            Cập nhật
          </button>
        )}
      </form>
    </div> */
}
