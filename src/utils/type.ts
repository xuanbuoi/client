import { FormEvent, ChangeEvent } from 'react'

export type FormSubmit = FormEvent<HTMLFormElement>
export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLSelectElement
>
export type StorageType = 'session' | 'local'
export type UseStorageReturnValue = {
  getItem: (key: string, type?: StorageType) => string
  setItem: (key: string, value: string, type?: StorageType) => boolean
  removeItem: (key: string, type?: StorageType) => void
}

export const APP_URL = 'http://localhost:5000'
// export const APP_URL = 'https://rt-14na.vercel.app'

export interface IComment {
  id?: string
  comment: string
  userId: string
  productId: string
  votes: number
  createdAt?: Date | string
  updatedAt?: Date | string
  user?: IUser
}

export interface IImage {
  id?: string
  url: string
  name?: string
  address?: string
  contactPerson?: string
  travelAddress?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface IProduct {
  id?: string
  name: string
  price: number
  votes: number
  url: string
  purchases: number
  bonus?: number
  views?: number
  createdAt?: Date | string
  updatedAt?: Date | string
  comments?: IComment[]
}

export interface IUser {
  id?: string
  phone?: string
  money?: number
  avatar?: string
  name?: string
  isAdmin?: boolean
  createdAt?: Date | string
  amoutBlock?: number
  blocked?: boolean
  password?: string
}
export interface IConnect {
  id?: string
  avatar?: string
  address?: string
  job?: string
  favorite?: string
  name?: string
  age?: number
  gender?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface ITransaction {
  id?: string
  user?: IUser
  money?: number
  createdAt?: Date | string
  updatedAt?: Date | string
  check?: boolean
  bankingName?: string
  name?: string
  accountNumber?: string
  transactionType?: string
  amount?: number
  status?: string
  reason?: string
  content?: string
}

export interface IOwnBanking {
  id?: string
  bankingName?: string
  name?: string
  accountNumber?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface ILogin extends IUser {
  password?: string
}

export interface IRegister extends ILogin {
  cf_password: string
}
