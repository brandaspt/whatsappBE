import mongoose from "mongoose"
import { IPrivateGroupDocument } from "../../typings/privateGroup"

const { Schema, model } = mongoose

const PrivateGroupSchema = new Schema<IPrivateGroupDocument>({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messageHistory: {
    type: [Schema.Types.ObjectId],
    ref: "Message",
  },
})

export default model<IPrivateGroupDocument>("PrivateGroup", PrivateGroupSchema)
