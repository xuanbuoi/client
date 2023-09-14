import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '@/utils/type'

export interface ProductState {
  products: IProduct[]
  value?: number
  loading?: boolean
}

const initialState: ProductState = {
  products: [],
  value: 10,
  loading: false
}

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
})

// export actions

export const getproducts = (state: any) => state.Products.products

export default ProductSlice.reducer
