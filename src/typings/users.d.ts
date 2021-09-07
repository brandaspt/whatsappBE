import mongoose, { Document, Model, Schema } from "mongoose"
import { IGroupDocument } from "./group"

export interface IUser {
  name: string
  surname: string
  email: string
  groups: Schema.Types.ObjectId[]
  password?: string
  avatar?: string
  bio?: string
  refreshToken?: string
}

export interface IUserDocument extends Document, IUser {}

export interface IUserModel extends Model<IUserDocument> {
  checkCredentials(email: string, password: string): Promise<IUserDocument | null>
}
