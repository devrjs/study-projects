import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { IoMdClose } from 'react-icons/io'

interface PopupProps {
  imgURL: string
  setOpenPopup: Dispatch<SetStateAction<boolean>>
}

export function Popup({ imgURL, setOpenPopup }: PopupProps) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#00000060] p-8">
      <IoMdClose
        onClick={() => setOpenPopup(false)}
        className="absolute right-0 top-0 m-4 cursor-pointer text-3xl text-white"
      />

      <Image
        src={imgURL}
        alt="image"
        width={0}
        height={0}
        priority
        unoptimized
        className="h-full max-h-fit w-full max-w-fit rounded-lg object-cover"
      />
    </div>
  )
}
