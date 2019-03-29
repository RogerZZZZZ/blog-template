import { Document, Model, model, Schema } from 'mongoose'
import { IImage } from './IImage'

export interface IImageModel extends IImage, Document {

}

const ImageSchema: Schema = new Schema({
  path: {
    type: String,
  },

  caption: {
    type: String,
  },
})

export const Image: Model<IImageModel> = model<IImageModel>('Image', ImageSchema)