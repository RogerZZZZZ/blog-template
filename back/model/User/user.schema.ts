import { Document, Model, model, Schema } from 'mongoose'
import * as passwordHash from 'password-hash'
import { IUser } from './IUser'

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  github: String,
  email: String,
  linkedIn: String,
  education: [],
  experience: [],
  project: []
})

UserSchema.methods.fullName = function() : string {
  return this.name.trim()
}

UserSchema.pre<IUserModel>('save', function (next: any) {
  this.password = passwordHash.generate(this.password)

  if (!this.createdAt) {
    this.createdAt = new Date()
  }
  next()
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)
