import { Document, Schema, Model, model } from 'mongoose'
import { IVersion } from './IVersion'

export interface IVersionModel extends IVersion, Document {

}

export const VersionSchema: Schema = new Schema ({
  version: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  }
})

export const Version: Model<IVersionModel> = model<IVersionModel>('Version', VersionSchema)