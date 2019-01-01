import { Document, Schema, Model, model } from 'mongoose'
import { ITag } from './ITag'
import * as uuid from 'uuid'

export interface ITagModel extends ITag, Document {

}

export const TagSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hex: {
    type: String,
    required: true,
  },
  tagId: {
    type: String,
  },
  articles: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Number,
  }
})

TagSchema.pre<ITagModel>('save', function (next: any) {
  if (!this.tagId) {
    this.tagId = uuid()
  }

  if (!this.createdAt) {
    this.createdAt = (new Date()).getTime()
  }
})


export const Tag: Model<ITagModel> = model<ITagModel>('Tag', TagSchema)