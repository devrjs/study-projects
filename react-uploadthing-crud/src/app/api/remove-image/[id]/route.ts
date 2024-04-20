import { connectMongoDB } from '@/lib/MongoConnect'
import { Image } from '@/lib/models/Image'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest, URLParams: any) {
  try {
    const id = URLParams.params.id

    await connectMongoDB()

    await Image.findByIdAndDelete(id)

    return NextResponse.json({ message: 'Image Deleted Successfully' })
  } catch (error) {
    return NextResponse.json(
      { error, message: 'Something went wrong!' },
      { status: 400 },
    )
  }
}
