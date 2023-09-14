import { IUser } from '@/utils/type'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  users: IUser[]
  value: number
  loading: boolean
}

const initialState: UserState = {
  users: [],
  value: 10,
  loading: false
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserList: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload)
    }
  }
})

// export actions
export const { setUserList, addUser } = userSlice.actions

export const getUserList = (state: any) => state.users.userList
const userReducer = userSlice.reducer

export default userReducer
