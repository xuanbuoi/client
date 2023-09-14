/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {
  useAddDepositeMutation,
  useGetAllOwnBankingQuery
} from '@/redux/api/banking'
import { useStorage } from '@/utils/hook'
import { IOwnBanking, IUser } from '@/utils/type'
import { useEffect, useState } from 'react'
import { toast } from 'react-custom-alert'
import { IoCopyOutline } from 'react-icons/io5'
import { MdDone } from 'react-icons/md'
import Loading from './Loading'
interface IProps {
  openRechargeModal: boolean
  setOpenRechargeModal: (openRechargeModal: boolean) => void
}

const ModalRecharge = ({ openRechargeModal, setOpenRechargeModal }: IProps) => {
  const [account, setAccount] = useState<IUser>()
  const session = useStorage()

  const [select, setSelect] = useState<IOwnBanking | undefined>(undefined)
  useEffect(() => {
    if (session.getItem('user')) {
      setAccount(JSON.parse(session.getItem('user')))
    }
  }, [])

  const [amount, setAmount] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const { data, isSuccess } = useGetAllOwnBankingQuery()
  const [ownBanking, setOwnBanking] = useState<IOwnBanking[]>()
  useEffect(() => {
    if (isSuccess && data) {
      setOwnBanking(data)
    }
  }, [data, isSuccess])

  const [addDeposite] = useAddDepositeMutation()
  const [loading, setLoading] = useState(false)
  const handleSubmit = () => {
    if (!select) return
    if (account) {
      const data = {
        select,
        amount: parseInt(amount),
        user: account,
        content: account.phone
      }
      setLoading(true)
      addDeposite(data)
        .then((res) => {
          setOpenRechargeModal(false)
          if (res) {
            toast.success('Yêu cầu nạp tiền thành công')
            setSelect(undefined)
            setAmount('')
            setContent('')
            setLoading(false)
          }
        })
        .catch((err) => {
          toast.error('Nạp tiền thất bại')
        })
    }
  }

  return (
    <>
      {openRechargeModal && (
        <div className="border-2 shadow-md shadow-black rounded-xl p-4 fixed top-20 mt-20 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-fit phone:w-[90%] m-0 mx-auto left-0 right-0 bg-white md:w-fit">
          <div className="flex justify-center items-center w-full">
            <h1 className="text-center font-bold text-xl p-3 ">
              Nạp tiền vào tài khoản
            </h1>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              onClick={() => {
                setOpenRechargeModal(false)
                setSelect(undefined)
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <p>Chọn một trong các phương thức sau để nạp tiền vào tài khoản</p>
          <div className="grid grid-cols-3 gap-2 p-4">
            {ownBanking?.map((bank, index) => {
              return (
                <div
                  key={index}
                  className="bg-slate-200 cursor-pointer text-center"
                  onClick={() => {
                    setSelect(bank)
                  }}
                >
                  <p className="p-4">{bank.bankingName}</p>
                </div>
              )
            })}
          </div>
          {select && (
            <div>
              <hr />
              <p className="mb-1">
                Hoàn thành đơn nạp tiền với nội dung chuyển khoản:
              </p>
              <div className="space-y-3">
                <p className="flex">
                  Ngân hàng {select?.bankingName}:&ensp;
                  <span className="text-red-500 flex items-center">
                    <ClipboardCopy copyText={select?.accountNumber!} />
                  </span>
                </p>
                <p className="flex">
                  Chủ tài khoản:&ensp;
                  <span className="text-red-500 flex items-center">
                    <ClipboardCopy copyText={select?.name!} />
                  </span>
                </p>
                <p className="flex">
                  Số tiền:&ensp;
                  <span className="flex items-center">
                    <input
                      type="text"
                      value={amount}
                      className="border-gray-300 h-7"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <ClipboardCopy copyText={amount} isInput={true} />
                  </span>
                </p>
                <p>
                  Nội dung chuyển khoản:&ensp;
                  <span className="text-red-500">{account?.phone}</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-white">
                <button
                  type="button"
                  className="w-full bg-green-500 rounded py-1 mt-2 flex justify-center items-center"
                  onClick={handleSubmit}
                >
                  {loading ? <Loading /> : 'Nạp tiền'}
                </button>

                <button
                  type="button"
                  className="w-full bg-gray-500 rounded py-1 mt-2"
                  onClick={() => {
                    setOpenRechargeModal(false)
                    setSelect(undefined)
                    setAmount('')
                    setContent('')
                  }}
                >
                  Huỷ
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ModalRecharge

function ClipboardCopy({
  copyText,
  isInput
}: {
  copyText: string
  isInput?: boolean
}) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText).then(() => {
      setIsCopied(true)
      toast.success('Đã sao chép')
    })
  }

  return (
    <div>
      {/* <input type="text" value={copyText} readOnly /> */}
      <span className="text-red-500 flex items-center">
        {!isInput && <span>{copyText}</span>} &ensp;
        <span onClick={handleCopyClick} className="cursor-pointer">
          {isCopied ? <MdDone /> : <IoCopyOutline />}
        </span>
      </span>
    </div>
  )
}
