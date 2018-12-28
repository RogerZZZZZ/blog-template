import { Document, Schema, Model, model } from 'mongoose'
import { IPost } from './IPost'
import * as uuid from 'uuid/v4'

export interface IPostModel extends IPost, Document {
  updatedAt: number;
  postId: string;
}

const TagSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hex: {
    type: String,
    required: true,
  },
})

export const PostSchema: Schema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
  categoryId: String,
  abstract: String,
  content: String,
  title: String,
  tags:  [TagSchema],
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
