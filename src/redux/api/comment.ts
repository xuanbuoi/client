import { APP_URL, IComment, ILogin, IProduct, IUser } from '@/utils/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_URL}/api/comments`
  }),
  endpoints: (builder) => ({
    createCmt: builder.mutation<IComment, Partial<IComment>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body
      })
    }),
    getAllComments: builder.query<IComment[], void>({
      query: () => '/'
    }),
    getCmtByProductId: builder.query<IComment[], string>({
      query: (id) => `/${id}`
    })
  })
})

export const {
  useCreateCmtMutation,
  useGetCmtByProductIdQuery,
  useGetAllCommentsQuery
} = commentApi
