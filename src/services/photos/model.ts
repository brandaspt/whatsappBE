import mongoose from "mongoose"
import { IPhoto } from "src/typings/photos"

const { Schema, model } = mongoose

const PhotoSchema = new Schema<IPhoto>(
  {
    description: String,
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    dateTaken: Date,
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

PhotoSchema.methods.toJSON = function () {
  const photo = this.toObject()
  delete photo.__v
  return photo
}

export default model<IPhoto>("Photo", PhotoSchema)
