import { connectMongoDB } from '@/lib/MongoConnect'
import { Image } from '@/lib/models/Image'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectMongoDB()

    const data = await Image.find().sort({ createdAt: -1 }).exec()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error, message: 'Something went wrong!' },
      { status: 400 },
    )
  }
}
