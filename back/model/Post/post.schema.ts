import { Document, Model, model, Schema } from 'mongoose'
import { IPost } from './IPost'

export interface IPostModel extends IPost, Document {
  updatedAt: number;
}

export const PostSchema: Schema = new Schema({
  categoryId: String,
  abstract: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags:  [String],
  pinned: {
    type: Boolean,
    default: false,
  },
  updatedAt: Number,
})

PostSchema.pre<IPostModel>('save', function (next: any) {
  this.updatedAt = (new Date()).getTime()
  next()
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', PostSchema)
