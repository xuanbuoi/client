import { APP_URL, ILogin, IProduct, IUser } from '@/utils/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_URL}/api/auth`
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, Partial<ILogin>>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body
      })
    })
  })
})

export const { useLoginMutation } = authApi
