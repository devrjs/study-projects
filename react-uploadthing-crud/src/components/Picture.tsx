import axios from 'axios'
import Image from 'next/image'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

interface PictureProps {
  imgURL: string
  fileKey: string
  id: string
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setUpdateGallery: Dispatch<SetStateAction<boolean>>
  setOpenPopup: Dispatch<SetStateAction<boolean>>
  setImgURL: Dispatch<SetStateAction<string>>
}

export function Picture({
  imgURL,
  fileKey,
  id,
  setIsLoading,
  setUpdateGallery,
  setOpenPopup,
  setImgURL,
}: PictureProps) {
  const removePicture = (e: FormEvent<HTMLDivElement>) => {
    e.stopPropagation()

    setIsLoading(true)

    axios
      .delete('api/uploadthing', { data: { fileKey } })
      .then((res) => {
        console.log(res)

        axios
          .delete(`api/remove-image/${id}`)
          .then((res) => {
            console.log(res)
            setUpdateGallery((prevState) => !prevState)
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false))
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  const openPicture = () => {
    setImgURL(imgURL)
    setOpenPopup(true)
  }

  return (
    <div
      className="group relative cursor-pointer overflow-hidden"
      onClick={openPicture}
    >
      <Image
        src={imgURL}
        alt="picture"
        width={0}
        height={0}
        priority
        unoptimized
        className="h-[250px] w-full rounded-lg object-cover"
      />

      <div
        onClick={removePicture}
        className="absolute bottom-0 left-0 grid w-full translate-y-8 place-items-center bg-[#00000060] py-1 transition-transform duration-500 group-hover:translate-y-0"
      >
        <div className="flex items-center gap-2 text-red-600">
          <RiDeleteBinLine />
          Remove
        </div>
      </div>
    </div>
  )
}
