import { UseStorageReturnValue, StorageType } from './type'

export const useStorage = (): UseStorageReturnValue => {
  const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' =>
    `${type ?? 'session'}Storage`

  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

  const getItem = (key: string, type?: StorageType): string => {
    return isBrowser ? window[storageType(type)][key] : ''
  }

  const setItem = (key: string, value: string, type?: StorageType): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value)
      return true
    }

    return false
  }

  const removeItem = (key: string, type?: StorageType): void => {
    window[storageType(type)].removeItem(key)
  }

  return {
    getItem,
    setItem,
    removeItem
  }
}

export const useFormattedDate = (inputDateString: string) => {
  const inputDate = new Date(inputDateString)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const formattedDate = `${inputDate.getUTCDate()} ${
    months[inputDate.getUTCMonth()]
  } ${inputDate.getUTCFullYear()} ${inputDate
    .getUTCHours()
    .toString()
    .padStart(2, '0')}:${inputDate.getUTCMinutes().toString().padStart(2, '0')}`

  return formattedDate
}

export const useformatDate = (inputDateString?: string): string => {
  if (!inputDateString) return ''
  const dateObj = new Date(inputDateString)

  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')
  const seconds = String(dateObj.getSeconds()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDate
}
export function isValidDateTimeFormat(input: string): boolean {
  const dateTimePattern: RegExp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

  if (!dateTimePattern.test(input)) {
    return false
  }

  const [datePart, timePart] = input.split(' ')

  const [year, month, day] = datePart.split('-').map(Number)

  const [hours, minutes, seconds] = timePart.split(':').map(Number)

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    isNaN(hours) ||
    isNaN(minutes) ||
    isNaN(seconds)
  ) {
    return false
  }

  if (
    year < 1000 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    return false
  }

  return true
}
