import { APP_URL, IImage } from '@/utils/type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const imgApi = createApi({
  reducerPath: 'imgApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APP_URL}/api/images`
  }),
  endpoints: (builder) => ({
    getAllImages: builder.query<IImage[], void>({
      query: () => '/'
    }),

    getImage: builder.query<IImage, string>({
      query: (id) => `/${id}`
    }),

    addImage: builder.mutation<IImage, Partial<IImage | FormData>>({
      query: (body) => ({
        url: '/create',
        method: 'POST',
        body
      })
    }),

    deleteImage: builder.mutation<IImage, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      })
    }),
    updateCouple: builder.mutation<void, { id: string; body: Partial<IImage> }>(
      {
        query: ({ id, body }) => ({
          url: `/${id}`,
          method: 'PUT',
          body
        })
      }
    )
  })
})

export const {
  useGetAllImagesQuery,
  useGetImageQuery,
  useAddImageMutation,
  useDeleteImageMutation,
  useUpdateCoupleMutation
} = imgApi
