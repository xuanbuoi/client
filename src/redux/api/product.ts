import { APP_URL, IProduct } from '@/utils/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_URL}/api/products`
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], void>({
      query: () => '/'
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `/${id}`
    }),
    addProduct: builder.mutation<IProduct, Partial<IProduct | FormData>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body
      })
    }),
    updateProduct: builder.mutation<
      IProduct,
      { id: string; body: Partial<IProduct> }
    >({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PUT',
        body
      })
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi
