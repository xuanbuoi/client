import { APP_URL, IUser } from '@/utils/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_URL}/api/users`
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => '/'
    }),
    getUser: builder.query<IUser, string | undefined>({
      query: (id) => `/${id}`
    }),
    addUser: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body
      })
    }),
    updateUser: builder.mutation<IUser, { id: string; body: Partial<IUser> }>({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body
      })
    }),

    deleteUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      })
    }),

    updateMoney: builder.mutation<void, Partial<any>>({
      query: (body) => ({
        url: `/updateMoney`,
        method: 'PUT',
        body
      })
    }),
    updateBlocked: builder.mutation<void, Partial<any>>({
      query: (body) => ({
        url: `/blocked`,
        method: 'PUT',
        body
      })
    })
  })
})

export const {
  useGetAllUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateMoneyMutation,
  useGetUserQuery,
  useUpdateBlockedMutation
} = userApi
