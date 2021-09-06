import mongoose, { Document, Model, Schema } from "mongoose"

export interface IUser {
  name: string
  surname: string
  email: string
  groups: [string]
  password?: string
  avatar?: string
  bio?: string
  refreshToken?: string
}

export interface IUserDocument extends Document, IUser {}

export interface IUserModel extends Model<IUserDocument> {
  checkCredentials(email: string, password: string): Promise<IUserDocument | null>
}
