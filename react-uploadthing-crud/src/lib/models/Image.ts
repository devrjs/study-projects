import { Schema, model, models } from 'mongoose'

export type ImageType = {
  _id: string
  imgURL: string
  fileKey: string
  createdAt: string
  updatedAt: string
}

const imageSchema = new Schema<ImageType>(
  {
    imgURL: {
      type: String,
      require: true,
    },
    fileKey: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
)

const Image = models.Image || model<ImageType>('Image', imageSchema)

export { Image }
