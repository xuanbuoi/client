import { APP_URL, IConnect } from '@/utils/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const connectApi = createApi({
  reducerPath: 'connectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_URL}/api/connects`
  }),
  endpoints: (builder) => ({
    getAllConnect: builder.query<IConnect[], void>({
      query: () => '/'
    }),
    getConnect: builder.query<IConnect, string>({
      query: (id) => `/${id}`
    }),
    addConnect: builder.mutation<IConnect, Partial<IConnect>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body
      })
    }),
    updateConnect: builder.mutation<
      IConnect,
      { id: string; body: Partial<IConnect> }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body
      })
    }),

    deleteConnect: builder.mutation<IConnect, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetAllConnectQuery,
  useAddConnectMutation,
  useDeleteConnectMutation,
  useUpdateConnectMutation,
  useGetConnectQuery
} = connectApi
