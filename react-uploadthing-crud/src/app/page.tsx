'use client'

import { Header } from '@/components/Header'
import { Loader } from '@/components/Loader'
import { Navbar } from '@/components/Navbar'
import { Picture } from '@/components/Picture'
import { Popup } from '@/components/Popup'
import { Uploader } from '@/components/Uploader'
import { ImageType } from '@/lib/models/Image'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
  const [pictures, setPictures] = useState<ImageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [updateGallery, setUpdateGallery] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [imgURL, setImgURL] = useState('')

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('api/get-images')
      .then((res) => {
        console.log(res.data)
        setPictures(res.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [updateGallery])

  return (
    <main className="container">
      <div className="sticky top-0 z-10 bg-white pb-4">
        <Navbar />
        <Header />
      </div>

      <div className="grid grid-cols-1 gap-4 pb-12 pt-4 md:grid-cols-2 lg:grid-cols-3">
        <Uploader setUpdateGallery={setUpdateGallery} />

        {pictures.map((picture: ImageType) => (
          <Picture
            key={picture._id}
            id={picture._id}
            imgURL={picture.imgURL}
            fileKey={picture.fileKey}
            setIsLoading={setIsLoading}
            setUpdateGallery={setUpdateGallery}
            setOpenPopup={setOpenPopup}
            setImgURL={setImgURL}
          />
        ))}
      </div>

      {isLoading && <Loader />}
      {openPopup && <Popup imgURL={imgURL} setOpenPopup={setOpenPopup} />}
    </main>
  )
}
