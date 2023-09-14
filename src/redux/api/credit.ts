import { APP_URL, IOwnBanking } from '@/utils/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const creditApi = createApi({
  reducerPath: 'creditApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_URL}/api/credits`
  }),
  endpoints: (builder) => ({
    getAllCredits: builder.query<IOwnBanking[], void>({
      query: () => '/'
    }),

    addCredit: builder.mutation<IOwnBanking, Partial<IOwnBanking | FormData>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body
      })
    }),

    deleteCredit: builder.mutation<IOwnBanking, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetAllCreditsQuery,
  useAddCreditMutation,
  useDeleteCreditMutation
} = creditApi
