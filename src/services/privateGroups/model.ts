import mongoose from "mongoose"
import { IPrivateGroupDocument } from "../../typings/privateGroup"

const { Schema, model } = mongoose

const PrivateGroupSchema = new Schema<IPrivateGroupDocument>({
  users: [String],
  messageHistory: {
    type: [String],
    ref: "Message",
  },
})

export default model<IPrivateGroupDocument>("PrivateGroup", PrivateGroupSchema)
