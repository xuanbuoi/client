import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authApi } from './api/auth'
import { productApi } from './api/product'
import { userApi } from './api/user'
import { commentApi } from './api/comment'
import { connectApi } from './api/connect'
import { imgApi } from './api/image'
import { creditApi } from './api/credit'
import { bankingApi } from './api/banking'

export function makeStore() {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [commentApi.reducerPath]: commentApi.reducer,
      [connectApi.reducerPath]: connectApi.reducer,
      [imgApi.reducerPath]: imgApi.reducer,
      [creditApi.reducerPath]: creditApi.reducer,
      [bankingApi.reducerPath]: bankingApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userApi.middleware,
        productApi.middleware,
        authApi.middleware,
        commentApi.middleware,
        connectApi.middleware,
        imgApi.middleware,
        creditApi.middleware,
        bankingApi.middleware
      )
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
