import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import { GrPrevious, GrNext } from 'react-icons/gr'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPage: number
  slug: string
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPage,
  slug
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = searchParams.get('limit') ?? '8'

  return (
    <div className="flex gap-2 justify-center">
      <button
        className="border text-black p-1 px-3"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/${slug}/?page=${page - 1}&limit=${limit}`)
        }}
      >
        <GrPrevious />
      </button>

      <div className="flex space-x-3">
        {Array.from({ length: totalPage }).map((_, index) => (
          <Link
            key={index}
            href={`/${slug}/?page=${index + 1}&limit=${limit}`}
            className={`border text-black p-1 px-2 ${
              page === index + 1 ? 'bg-gray-300' : ''
            }`}
          >
            {index + 1}
          </Link>
        ))}
      </div>

      <button
        className="border text-black p-1 px-3"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/${slug}/?page=${page + 1}&limit=${limit}`)
        }}
      >
        <GrNext />
      </button>
    </div>
  )
}

export default PaginationControls
