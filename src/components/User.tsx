/* eslint-disable @next/next/no-img-element */
import { useDeleteUserMutation } from '@/redux/api/user'
import { IUser } from '@/utils/type'
import React, { useState } from 'react'

const User = ({ user }: { user: IUser }) => {
  const [isUpdate, setIsUpdate] = useState(false)

  const [deleteUser] = useDeleteUserMutation()

  const handleDelete = (id?: string) => {
    if (id) deleteUser(id)
  }

  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center py-5">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
          src={user.avatar as string}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.phone}
        </span>
      </div>
      <div className="flex my-4 space-x-3 justify-center">
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-red-500 border rounded-lg hover:bg-red-700 "
          onClick={() => {
            if (!isUpdate) handleDelete(user.id)
            else {
              setIsUpdate(false)
            }
          }}
        >
          {isUpdate ? 'Huỷ' : 'Xoá'}
        </button>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ">
          Cập nhật
        </button>
      </div>
    </div>
  )
}

export default User
