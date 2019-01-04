import { Document, Model, model, Schema } from 'mongoose'
import * as uuid from 'uuid/v4'
import { IPost } from './IPost'

export interface IPostModel extends IPost, Document {
  updatedAt: number;
  postId: string;
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
})

PostSchema.pre<IPostModel>('save', function (next: any) {
  if (!this.updatedAt) {
    this.updatedAt = (new Date()).getTime()
  }
  if (!this.postId) {
    this.postId = uuid()
  }
  next()
})

export const Post: Model<IPostModel> = model<IPostModel>('Post', PostSchema)
