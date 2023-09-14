/* eslint-disable @next/next/no-img-element */
import { useAddConnectMutation } from '@/redux/api/connect'
import { FormSubmit, IConnect, InputChange } from '@/utils/type'
import { imageUpload } from '@/utils/upload'
import React, { useState } from 'react'
import { toast } from 'react-custom-alert'
import Loading from '../Loading'

const CreateConnect = () => {
  const initState: IConnect = {
    name: '',
    age: 0,
    avatar: '',
    address: '',
    job: '',
    favorite: '',
    gender: false
  }

  const [connect, setConnect] = useState<IConnect>(initState)

  const [currnetFileImg, setCurrnetFileImg] = useState<File | undefined>(
    undefined
  )
  const [upload, setUpload] = useState<boolean>(false)
  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setConnect({ ...connect, [name]: value })
  }
  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files![0]
    setCurrnetFileImg(file)
    setUpload(true)
    const photo = await imageUpload(file)
    if (photo.url === undefined) return
    if (photo.url) {
      setConnect({ ...connect, avatar: photo.url })
      setUpload(false)
    }
  }

  const [addConnect, result] = useAddConnectMutation()
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault()
    //check validate
    if (
      connect.name === '' &&
      connect.age === 0 &&
      connect.address === '' &&
      connect.job === '' &&
      connect.favorite === ''
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }
    setLoading(true)

    addConnect(connect!)
      .then(() => {
        toast.success('Thêm thành công')
        setLoading(false)
      })
      .catch((err) => {
        toast.error('Thêm thất bại')
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Tên
            </label>
            <input
              type="text"
              name="name"
              className="border-gray-300"
              placeholder=""
              value={connect?.name}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Tuổi
            </label>
            <input
              type="text"
              name="age"
              className="border-gray-300"
              placeholder=""
              value={connect?.age === 0 ? '' : connect?.age}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Quê quán
            </label>
            <input
              type="text"
              name="address"
              className="border-gray-300"
              placeholder=""
              value={connect?.address}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Công việc
            </label>
            <input
              type="text"
              name="job"
              className="border-gray-300"
              placeholder=""
              value={connect?.job}
              onChange={handleChange}
            />
          </div>
          <div className="z-0 w-full mb-6 flex flex-col">
            <label htmlFor="floating_first_name" className="">
              Sở thích
            </label>
            <input
              type="text"
              name="favorite"
              className="border-gray-300"
              placeholder=""
              value={connect?.favorite}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Giới tính
          </label>
          <select
            id="type"
            value={connect?.gender ? '0' : '1'}
            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) => {
              const { value } = e.target
              if (value === 'no') return
              setConnect({
                ...connect,
                gender: value === '0' ? true : false
              })
            }}
          >
            <option value="no">Lựa chọn giói tính</option>
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <div className="z-0  mb-6 flex flex-col">
            <label htmlFor="floating_last_name" className="font-semibold">
              Hình ảnh
            </label>
            <div className="relative flex flex-col items-center w-full">
              {currnetFileImg === undefined ? (
                <label
                  htmlFor="file"
                  className="flex items-center justify-center cursor-pointer space-x-1 p-1 text-white  transform  object-fill w-full "
                >
                  <svg
                    className="h-40 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                  <input
                    type="file"
                    id="file"
                    accept=".png, .jpeg, .jpg"
                    className="hidden"
                    onChange={handleChangeImg}
                  />
                </label>
              ) : (
                <>
                  <img
                    src={currnetFileImg && URL.createObjectURL(currnetFileImg)}
                    alt=""
                    className={`${
                      currnetFileImg && upload && ' opacity-25 '
                    }  " object-fill w-full h-40 rounded relative "`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md w-full mt-4 flex justify-center items-center"
          disabled={upload}
        >
          {loading ? <Loading /> : 'Lưu'}
        </button>
      </form>
    </>
  )
}

export default CreateConnect
