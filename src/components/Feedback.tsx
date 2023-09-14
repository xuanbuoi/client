/* eslint-disable react-hooks/exhaustive-deps */
import { useCreateCmtMutation } from '@/redux/api/comment'
import { useStorage } from '@/utils/hook'
import {
  APP_URL,
  FormSubmit,
  IComment,
  IProduct,
  IUser,
  InputChange
} from '@/utils/type'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { FaStar } from 'react-icons/fa'
import ONE_STAR from '../assets/1star.gif'
import TWO_STAR from '../assets/2star.gif'
import THREE_STAR from '../assets/3star.gif'
import FOUR_STAR from '../assets/4star.gif'
import FIVE_STAR from '../assets/5star.gif'
import Moddal from './Moddal'

const listIcon = [
  {
    id: 1,
    icon: <Image src={ONE_STAR} alt="" className="w-10 h-10" />
  },
  {
    id: 2,
    icon: <Image src={TWO_STAR} alt="" className="w-10 h-10" />
  },
  {
    id: 3,
    icon: <Image src={THREE_STAR} alt="" className="w-10 h-10" />
  },
  {
    id: 4,

    icon: <Image src={FOUR_STAR} alt="" className="w-10 h-10" />
  },
  {
    id: 5,

    icon: <Image src={FIVE_STAR} alt="" className="w-10 h-10" />
  }
]

const FeedBack = ({ product }: { product: IProduct }) => {
  let pathName = ''
  const [user, setUser] = useState<IUser>()
  const [rating, setRating] = useState(5)
  const [open, setOpen] = useState(false)

  const session = useStorage()

  const pathname = usePathname()
  const slug = pathname.split('/').pop()
  const initialState: IComment = {
    comment: '',
    productId: slug as string,
    userId: '',
    votes: 5
  }
  const [comment, setComment] = useState<IComment>(initialState)
  useEffect(() => {
    if (session.getItem('user')) setUser(JSON.parse(session.getItem('user')))
  }, [])
  const handleStarHover = (index: number) => {
    setRating(index)
    setComment({ ...comment, votes: index })
  }

  const handleChangeInput = (e: InputChange) => {
    const { name, value } = e.target
    setComment({ ...comment, [name]: value })
  }
  const [createCmt, result] = useCreateCmtMutation()
  const fetchUser = async (userId: string): Promise<IUser> => {
    const response = await fetch(`${APP_URL}/api/users/${userId}`)
    const userData = await response.json()
    return userData as IUser
  }
  async function handleSubmit(event: FormSubmit): Promise<void> {
    event.preventDefault()
    if (!user) {
      toast.warning('Bạn cần đăng nhập để đánh giá')
      return
    }
    if (user && user.money && user.money < 100) {
      toast.error('Bạn không đủ số tiền để đánh giá')
      return
    }

    if (user && user.money && user.money >= 100) {
      const cmt = {
        ...comment,
        userId: user.id
      }
      createCmt(cmt)
      setOpen(true)
      if (result) {
        try {
          const user: IUser = await fetchUser(cmt.userId!)
          session.setItem('user', JSON.stringify(user))
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
    }
  }

  return (
    <div className="mt-5">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Đánh giá của bạn
      </h5>
      <div className="flex space-x-4 items-center h-4 mb-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            onMouseEnter={() => handleStarHover(index)}
            className={`${
              rating >= index ? 'text-yellow-500' : 'text-gray-400'
            } cursor-pointer
          `}
          >
            <FaStar />
          </span>
        ))}
        {listIcon.find((item) => item.id === rating)?.icon}
      </div>

      <div className="relative">
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            {!user && (
              <Link
                href={`/login`}
                className="text-red-500 font-semibold italic underline"
              >
                Bạn cần đăng nhập để đánh giá
              </Link>
            )}

            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <textarea
                id="editor"
                rows={5}
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Viết đánh giá...."
                value={comment.comment}
                onChange={handleChangeInput}
                name="comment"
                readOnly={!user}
              ></textarea>

              <br />
            </div>
          </div>
          <button
            className={`absolute bottom-1 right-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md  ${
              !user && 'cursor-not-allowed'
            } `}
          >
            Đánh giá
          </button>
        </form>
      </div>
      <div className="m-0">
        <Moddal open={open} setOpen={setOpen} product={product} />
      </div>
    </div>
  )
}

export default FeedBack
