import { APP_URL, IOwnBanking, ITransaction } from '@/utils/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const bankingApi = createApi({
  reducerPath: 'bankingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_URL}/api/banking`
  }),
  endpoints: (builder) => ({
    getDepositeAllRequest: builder.query<ITransaction[], void>({
      query: () => '/deposite'
    }),
    getWithdrawAllRequest: builder.query<ITransaction[], void>({
      query: () => '/withdraw'
    }),
    getDepositeHistory: builder.query<ITransaction[], string>({
      query: (id) => `/deposite-history/${id}`
    }),
    getWithdrawHistory: builder.query<ITransaction[], string>({
      query: (id) => `/withdraw-history/${id}`
    }),
    getAllOwnBanking: builder.query<ITransaction[], void>({
      query: () => '/owner'
    }),
    getAllHistory: builder.query<ITransaction[], void>({
      query: () => '/history'
    }),

    addOwnBanking: builder.mutation<
      IOwnBanking,
      Partial<IOwnBanking | FormData>
    >({
      query: (body) => ({
        url: '/owner',
        method: 'POST',
        body
      })
    }),

    addDeposite: builder.mutation<ITransaction, Partial<any>>({
      query: (body) => ({
        url: '/deposite',
        method: 'POST',
        body
      })
    }),
    addWithdraw: builder.mutation<
      ITransaction,
      Partial<ITransaction | FormData>
    >({
      query: (body) => ({
        url: '/withdraw',
        method: 'POST',
        body
      })
    }),
    addMoneyByAdmin: builder.mutation<ITransaction, Partial<any>>({
      query: (body) => ({
        url: '/history',
        method: 'POST',
        body
      })
    }),

    updateStatus: builder.mutation<ITransaction, Partial<any>>({
      query: (body) => ({
        url: `/update`,
        method: 'PUT',
        body
      })
    }),
    rejectDeposite: builder.mutation<ITransaction, string>({
      query: (id) => ({
        url: `/deposite/${id}`,
        method: 'PUT'
      })
    }),

    rejectWithdraw: builder.mutation<ITransaction, string>({
      query: (id) => ({
        url: `/withdraw/${id}`,
        method: 'PUT'
      })
    }),

    deleteOwnBankin: builder.mutation<IOwnBanking, string>({
      query: (id) => ({
        url: `/owner/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetDepositeAllRequestQuery,
  useGetWithdrawAllRequestQuery,
  useGetDepositeHistoryQuery,
  useGetWithdrawHistoryQuery,
  useGetAllOwnBankingQuery,
  useAddDepositeMutation,
  useAddWithdrawMutation,
  useAddOwnBankingMutation,
  useUpdateStatusMutation,
  useDeleteOwnBankinMutation,
  useRejectDepositeMutation,
  useRejectWithdrawMutation,
  useGetAllHistoryQuery,
  useAddMoneyByAdminMutation
} = bankingApi
