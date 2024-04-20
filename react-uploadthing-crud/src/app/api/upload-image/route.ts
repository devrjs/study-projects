import { connectMongoDB } from '@/lib/MongoConnect'
import { Image } from '@/lib/models/Image'
import { NextResponse } from 'next/server'

export async function POST(request: NextResponse) {
  try {
    const body = await request.json()
    const { imgURL, fileKey } = body

    await connectMongoDB()

    const data = await Image.create({
      imgURL,
      fileKey,
    })

    return NextResponse.json({ message: 'Image Uploaded Succesfully', data })
  } catch (error) {
    return NextResponse.json(
      { error, message: 'Something went wrong!' },
      { status: 400 },
    )
  }
}
