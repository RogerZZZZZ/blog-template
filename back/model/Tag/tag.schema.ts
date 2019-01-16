import { Document, Model, model, Schema } from 'mongoose'
import { ITag } from './ITag'

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
  articles: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Number,
  }
})

TagSchema.pre<ITagModel>('save', function (next: any) {
  console.log('pre save tag')
  if (!this.createdAt) {
    this.createdAt = (new Date()).getTime()
  }

  next()
})


export const Tag: Model<ITagModel> = model<ITagModel>('Tag', TagSchema)