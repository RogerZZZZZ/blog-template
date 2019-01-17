import { Document, Model, model, Schema } from 'mongoose'
import { ICategory } from './ICategory'

export interface ICategoryModel extends ICategory, Document {
}

export const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  articles: {
    type: Array,
    default: [],
  },
})

export const Category: Model<ICategoryModel> = model<ICategoryModel>('Category', CategorySchema)