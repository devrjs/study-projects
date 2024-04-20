import { UploadDropzone } from '@/utils/uploadthing'
import axios from 'axios'
import { Dispatch, SetStateAction } from 'react'

interface UploaderProps {
  setUpdateGallery: Dispatch<SetStateAction<boolean>>
}

export function Uploader({ setUpdateGallery }: UploaderProps) {
  const uploadImage = (imgURL: string, fileKey: string) => {
    axios
      .post('/api/upload-image', { imgURL, fileKey })
      .then((res) => {
        console.log(res)
        setUpdateGallery((prevState) => !prevState)
      })
      .catch((err) => console.log(err))
  }

  return (
    <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log('Files: ', res)
        uploadImage(res[0].url, res[0].key)
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`)
      }}
    />
  )
}
