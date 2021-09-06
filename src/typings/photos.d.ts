import mongoose, { Schema } from "mongoose"

const { Schema } = mongoose

export interface IPhoto {
  description?: string
  userId: Schema.Types.ObjectId
  url: string
}
