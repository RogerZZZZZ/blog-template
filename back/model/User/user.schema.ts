import { Document, Schema, Model, model } from 'mongoose'
import { IUser } from './IUser'
import * as passwordHash from 'password-hash'

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
  name: {
    type: String,
    default: 'admin',
  },
  github: String,
  email: String,
  linkedIn: String,
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
